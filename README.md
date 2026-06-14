# 3D Virtual Eyewear Try-On

A React-based web application that allows users to virtually try on different pairs of glasses using their webcam and the Jeeliz Virtual Try-On Widget.

## Features

*  Virtual try-on experience using webcam face tracking
*  Browse through a large collection of eyewear models
*  Change background scenes
*  Adjust glasses position manually
*  Responsive design
*  Interactive image carousel for model selection

## Technologies Used

* React
* Material UI (MUI)
* React Slick Carousel
* Jeeliz Virtual Try-On Widget
* CSS Modules

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at:

```txt
http://localhost:3000
```

## Required Dependencies

```bash
npm install @mui/material
npm install @emotion/react @emotion/styled
npm install react-slick slick-carousel
npm install jeelizvtowidget
```

## Project Structure

```txt
src/
├── components/
│   ├── AppCanvas.jsx
│   ├── Carousel.jsx
│   ├── Spacer.jsx
│   └── css/
│       └── styles.module.css
│
├── backgrounds/
│   ├── background.jpg
│   ├── background2.jpg
│   ├── background3.jpg
│   └── background4.jpg
│
├── App.jsx
├── glasses.js
├── index.js
└── index.css
```

## How It Works

1. The application initializes the Jeeliz Virtual Try-On Widget.
2. The user's webcam feed is displayed.
3. Users can browse glasses models using the carousel.
4. Selecting a model loads it onto the user's face in real time.
5. Users can enter adjustment mode to fine-tune the glasses position.
6. Backgrounds can be changed dynamically.

## Controls

### Eyewear Navigation

* **Start**: Load the first eyewear model.
* **Previous**: Load the previous model.
* **Next**: Load the next model.

### Adjustment Mode

* **Adjust**: Enter manual positioning mode.
* **Quit**: Exit adjustment mode.

### Backgrounds

* **Change Background**: Cycle through available backgrounds.

## Browser Permissions

The application requires access to the user's webcam.

When prompted by your browser:

* Allow camera access.
* Ensure your device has a functioning webcam.

## Known Limitations

* Requires webcam access.
* Performance depends on device hardware and browser capabilities.
* Some eyewear models may take a moment to load depending on network speed.

## Future Improvements

* Search and filter eyewear models.
* Favorites system.
* Screenshot capture functionality.
* Mobile-specific optimizations.
* Additional background themes.
* Product information panel.

## License

This project is intended for educational and demonstration purposes.
