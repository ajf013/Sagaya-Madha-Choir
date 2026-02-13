import { supabase, supabaseUrl, supabaseKey } from '../supabaseClient';

class AudioStorage {

    // Upload audio file to Supabase Storage and save metadata to Table
    // Now supports progress tracking and uses File object directly
    async saveAudio(songId, file, fileName, onProgress) {
        try {
            // 1. Upload file to Supabase Storage using XHR for progress
            // Generate a safe, ASCII-only filename for storage to avoid "Invalid key" errors
            // We use a timestamp to ensure uniqueness and a generic extension
            const fileExt = fileName.split('.').pop();
            const safeStorageName = `${Date.now()}_audio.${fileExt}`;
            const filePath = `song-${songId}/${safeStorageName}`;

            // Construct the storage URL manually
            const storageUrl = `${supabaseUrl}/storage/v1/object/song-audio/${filePath}`;

            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', storageUrl);

                // Set headers
                xhr.setRequestHeader('Authorization', `Bearer ${supabaseKey}`);
                xhr.setRequestHeader('apikey', supabaseKey);
                // Try to infer content type, default to audio/mpeg
                xhr.setRequestHeader('Content-Type', file.type || 'audio/mpeg');
                xhr.setRequestHeader('x-upsert', 'true'); // Allow overwriting

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable && onProgress) {
                        onProgress(event.loaded, event.total);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    } else {
                        // Extract error message from Supabase response if possible
                        let errorMsg = `Upload failed: ${xhr.status} ${xhr.statusText}`;
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.message) errorMsg += ` - ${response.message}`;
                        } catch (e) { /* ignore json parse error */ }

                        console.error('XHR Upload Error:', xhr.responseText);
                        reject(new Error(errorMsg));
                    }
                };

                xhr.onerror = () => reject(new Error('Network error during upload'));

                xhr.send(file);
            });

            // 2. Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('song-audio')
                .getPublicUrl(filePath);

            // 3. Save metadata to 'songs_audio' table
            // We store the ORIGINAL fileName here so the user sees the correct name
            const { error: dbError } = await supabase
                .from('songs_audio')
                .upsert({
                    id: songId,
                    file_name: fileName,
                    audio_url: publicUrl,
                    storage_path: filePath,
                    uploaded_at: new Date().toISOString()
                });

            if (dbError) throw dbError;

            return publicUrl;
        } catch (error) {
            console.error("Error saving audio to Supabase:", error);
            throw error;
        }
    }

    // Get audio metadata from Table
    async getAudio(songId) {
        try {
            const { data, error } = await supabase
                .from('songs_audio')
                .select('*')
                .eq('id', songId)
                .single();

            if (error) {
                // If no row found, .single() returns error code PGRST116 (JSON object is null)
                // We treat this as "no audio" rather than a crash
                if (error.code === 'PGRST116') return null;
                throw error;
            }

            if (data) {
                return {
                    audio: data.audio_url,
                    fileName: data.file_name,
                    storagePath: data.storage_path
                };
            }
            return null;

        } catch (error) {
            console.error("Error fetching audio from Supabase:", error);
            return null;
        }
    }

    // Delete audio from Storage and Table
    async deleteAudio(songId) {
        try {
            // 1. Get metadata first to know the storage path
            const audioData = await this.getAudio(songId);

            if (!audioData) return;

            // 2. Delete from Supabase Storage
            const { error: storageError } = await supabase.storage
                .from('song-audio')
                .remove([audioData.storagePath]);

            if (storageError) throw storageError;

            // 3. Delete from 'songs_audio' table
            const { error: dbError } = await supabase
                .from('songs_audio')
                .delete()
                .eq('id', songId);

            if (dbError) throw dbError;

        } catch (error) {
            console.error("Error deleting audio from Supabase:", error);
            throw error;
        }
    }
}

export const audioStorage = new AudioStorage();
