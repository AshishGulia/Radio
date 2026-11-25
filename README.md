# RadioTym 📻

A modern, responsive web application for streaming live global and local radio stations with a luxury aesthetic, tactile controls, and rich media playback.

---

## Highlights

- **Worldwide Radio Streaming**: Access a curated collection of local Indian and international live radio stations across multiple music genres.
- **Dynamic Frosted Player**: Layered backdrop with opaque frosted glass blur adapting dynamically to active theme and background wallpapers.
- **Tactile UI Controls**: Physical depth shadows, responsive elevation transitions, and luxury champagne-gold color accents.
- **Car Mode (CarPlay / Android Auto Friendly)**: High-contrast OLED interface with oversized touch targets and driver-friendly playback controls.
- **Live Lyrics & Multi-language Support**: View song lyrics in original format alongside translation into 100+ global languages.
- **Sleep Timer**: Built-in sleep countdown with quick presets and customizable timer.
- **Favorites & Collections**: Organize favorite stations into personalized folders.
- **Zero Build Configuration**: Built purely with HTML5, CSS3, and modern Vanilla JavaScript.

---

## Directory Structure

```
RadioTym/
├── index.html              # Main application entry point
├── css/
│   ├── styles.css          # Core design system, variables, layouts & themes
│   └── player.css          # Full-screen player, backdrop blur & tactile controls
├── js/
│   ├── app.js              # Application lifecycle, routing & initialization
│   ├── player.js           # Audio streaming engine, state & media session
│   ├── data.js             # Station catalog, genres, wallpapers & language data
│   ├── nowplaying.js       # Track metadata detection & synchronization
│   ├── carmode.js          # CarPlay and Android Auto car mode controller
│   ├── lyrics.js           # Lyrics viewer & bilingual translation engine
│   ├── settings.js         # User preferences, wallpapers & sleep timer
│   └── ads.js              # Banner & audio transition support
├── .gitignore              # Git ignore rules for OS and runtime files
└── .gitattributes          # Line ending and asset handling configurations
```

---

## Getting Started

### Prerequisites

Any modern web browser (Chrome, Firefox, Safari, Edge) on Desktop, iOS, or Android.

### Running Locally

You can serve the project using any static file server:

#### Using Node.js:
```bash
npx serve .
```

#### Using Python:
```bash
python -m http.server 3000
```

#### Using VS Code:
Right-click `index.html` and select **Open with Live Server**.

---

## Technologies Used

- **HTML5**: Semantic markup and HTML5 Audio API.
- **CSS3**: Custom CSS variables, flexbox, CSS grid, and backdrop-filter frosted blur.
- **Vanilla JavaScript (ES6+)**: Modular IIFE architecture without heavy runtime dependencies.
- **Font Awesome 6**: Vector icons for navigation and media controls.
- **Media Session API**: Lock screen controls and system-level media integration.

---

## License

This project is open-source and available under the terms of the MIT License.
