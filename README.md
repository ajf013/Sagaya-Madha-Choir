# 🎵 Sagaya Madha Choir

A beautiful, modern Progressive Web App (PWA) for managing and viewing choir song lyrics. Built with React, featuring a stunning glassmorphism UI design and user-contributed lyrics functionality.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff.svg)

## ✨ Features

### 🎨 Design
- **Glassmorphism UI**: Beautiful light theme with purple gradient background and semi-transparent glass cards
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **Tamil Font Support**: Perfect rendering of Tamil lyrics with Noto Sans Tamil

### 📖 Song Management
- **290+ Songs**: Comprehensive collection organized by categories
- **Smart Search**: Search songs by number or title
- **Tabular Layout**: Clean, organized song index with single header
- **Category Grouping**: Songs organized by event/date

### 🎨 Lyrics Features
- **Colored Lyrics**: Support for multi-color text formatting
- **User Contributions**: Anyone can add or edit lyrics
- **Color Palette**: 4 colors available (Black, White, Red, Cornflower Blue)
- **Rich Text Editor**: Select text and apply colors
- **Live Preview**: See formatted lyrics before saving
- **LocalStorage Persistence**: Lyrics saved locally in browser

### 📱 PWA Capabilities
- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile devices
- **Fast Loading**: Optimized with Vite build tool

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ajf013/Sagaya-Madha-Choir.git
cd Sagaya-Madha-Choir
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🏗️ Build for Production

Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📖 How to Use

### Viewing Songs
1. Browse the song index on the home page
2. Use the search bar to find specific songs by number or title
3. Click on any song to view its details and lyrics

### Adding/Editing Lyrics
1. Click on a song to open its detail page
2. Click the **"Upload Lyrics"** or **"Edit Lyrics"** button
3. Type or paste lyrics in the text editor
4. Select any text you want to color
5. Choose a color from the palette (Black, White, Red, or Cornflower Blue)
6. Click **"Apply Color to Selected Text"**
7. Preview the formatted lyrics
8. Click **"Save Lyrics"** to store them

### Tips
- Lyrics are saved in your browser's localStorage
- Each device maintains its own lyrics
- Use different colors for chorus, verses, and musical notes
- The preview shows exactly how lyrics will appear

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Animation**: Framer Motion 12.34.0
- **Icons**: Lucide React 0.563.0
- **Styling**: Inline styles (no CSS framework)
- **Fonts**: Noto Sans Tamil, Outfit, Inter

## 📁 Project Structure

```
sagaya-madha-choir/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── logo.jpg
│   ├── components/
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── LyricsEditor.jsx
│   │   ├── SongDetail.jsx
│   │   ├── SongIndex.jsx
│   │   └── SplashScreen.jsx
│   ├── data/
│   │   └── songData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Color Palette

The app uses a carefully curated color scheme:

- **Background**: Purple gradient (#667eea to #764ba2)
- **Glass Elements**: Semi-transparent white (rgba(255, 255, 255, 0.25))
- **Primary Text**: Slate 800 (#1e293b)
- **Accent**: Indigo/Violet (#6366f1)

### Lyrics Colors
- ⚫ **Black** (#000000) - Regular text
- ⚪ **White** (#FFFFFF) - Highlighted text
- 🔴 **Red** (#ef4444) - Chorus/Important sections
- 🔵 **Cornflower Blue** (#6366f1) - Musical notes/Instructions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Francis Cruz**

- GitHub: [@ajf013](https://github.com/ajf013)
- LinkedIn: [Francis Cruz](https://www.linkedin.com/in/ajf013-francis-cruz/)
- Instagram: [@fcruz_013](https://www.instagram.com/fcruz_013/)
- Twitter/X: [@Itsme_Ajf013](https://x.com/Itsme_Ajf013)

## 🙏 Acknowledgments

- Sagaya Madha Choir community
- All contributors who help add and maintain lyrics
- Google Fonts for Noto Sans Tamil and Outfit fonts

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for the Sagaya Madha Choir community
