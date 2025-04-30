# Flashcard App

A beautiful, modern flashcard application built with Electron, React, and Tailwind CSS, featuring interactive cards, customizable themes, and category management.

![Flashcard App Screenshot](https://via.placeholder.com/800x450)

## Features

- **Interactive Flashcards**: Flip cards with space bar or mouse click
- **Keyboard Navigation**: Navigate between cards using arrow keys
- **Category Management**: Organize your flashcards by categories
- **Beautiful Themes**: Choose from 5 gradient themes:
  - Dark (Default)
  - Light
  - Sunset
  - Mint
  - Monochrome
- **Minimalist UI**: Clean, distraction-free interface
- **Custom Window Controls**: Frameless window with custom title bar
- **Animations**: Smooth animations for card flipping and transitions
- **Persistent Storage**: Your cards and categories are saved locally

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (14.x or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/Abdi-Suufi/FlashCardApp.git
   cd flashcard-app
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Run the app in development mode:
   ```
   npm run electron:dev
   ```
   or
   ```
   yarn electron:dev
   ```

4. Build the app for production:
   ```
   npm run electron:build
   ```
   or
   ```
   yarn electron:build
   ```

## Usage

### Creating Cards

1. Click "Create New Card" in the sidebar
2. Fill in the question and answer
3. Select a category (optional)
4. Click "Create Card"

### Managing Cards

- **Flip Card**: Click on the card or press the space bar
- **Navigate**: Use the arrow buttons or left/right arrow keys
- **Delete Card**: Click the trash icon

### Managing Categories

1. Click "New" next to Categories in the sidebar
2. Enter a category name
3. Click "Save"
4. Edit or delete categories using the icons next to each category name

### Changing Themes

1. Click on the "Theme" option at the bottom of the sidebar
2. Select one of the available themes

## Project Structure

```
flashcard-app/
├── dist/                # Production build
├── node_modules/        # Dependencies
├── src/                 # Source code
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── main.js              # Electron main process
├── preload.js           # Electron preload script
├── index.html           # HTML template
├── package.json         # Project metadata and dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Technology Stack

- **Electron**: Cross-platform desktop app framework
- **React**: UI library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Electron Store**: Persistent storage
- **Heroicons**: SVG icon set

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)