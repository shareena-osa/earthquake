# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
npm start

<!-- REPLACE WITH PROJECT-SPECIFIC README BELOW -->

# Earthquake Visualizer

A React app that visualizes recent earthquakes on an interactive map using OpenStreetMap tiles via React‑Leaflet. Filter by minimum magnitude, search by place name, and inspect quake details via popups.

## Features
- Recent earthquakes from USGS GeoJSON feed
- Interactive map with scalable circle markers by magnitude
- Filter by minimum magnitude
- Search by location name
- Responsive layout with collapsible sidebar (mobile friendly)

## Tech Stack
- React (CRA, React 19 runtime)
- React‑Leaflet + Leaflet
- Tailwind CSS v4
- PostCSS with `@tailwindcss/postcss` and `autoprefixer`
- date‑fns

## Prerequisites
- Node.js 18+ (recommended LTS)
- npm 9+

## Quick Start
```bash
# install dependencies
npm install --no-audit --no-fund

# start the dev server (default port 3000)
npm start
```

If port 3000 is in use, either stop the other process or run on another port:

- PowerShell (Windows):
```powershell
$Env:PORT = "3001"; npm start
```
- bash:
```bash
PORT=3001 npm start
```

Build for production:
```bash
npm run build
```
The optimized assets will be in `build/`.

## Project Structure
```
public/
src/
  components/
    Map.js
    Sidebar.js
  App.js
  App.css
  index.css
  index.js
postcss.config.js
tailwind.config.js
```

## Tailwind CSS v4 setup
This project uses Tailwind v4’s new single‑import CSS entry.

- `src/index.css` contains:
```css
@import "tailwindcss";
/* app styles below */
```

- `postcss.config.js` enables Tailwind only for app CSS (not third‑party CSS) and always runs `autoprefixer`:
```js
module.exports = (ctx) => {
  const isNodeModule = ctx && ctx.file && ctx.file.dirname && ctx.file.dirname.includes("node_modules");
  return {
    plugins: [
      !isNodeModule && require("@tailwindcss/postcss"),
      require("autoprefixer"),
    ].filter(Boolean),
  };
};
```

- `tailwind.config.js` scans `src/**/*.{js,jsx,ts,tsx}`.

## Map and Leaflet notes
- `src/components/Map.js` imports `leaflet/dist/leaflet.css` and configures the default marker icons so they render correctly in bundlers.
- The map uses `CircleMarker` sized and colored by magnitude; popups display place, magnitude, time, depth, and a link to USGS.

## Usage
- Open the app; the sidebar lets you:
  - Set minimum magnitude
  - Search by place keyword
- Click a marker to open its popup and view details.

## Troubleshooting
- Tailwind/PostCSS error: “using tailwindcss directly as a PostCSS plugin”
  - Ensure `@tailwindcss/postcss` is installed (this project already depends on it) and `postcss.config.js` uses it as above.
  - Ensure `src/index.css` uses `@import "tailwindcss";` (v4 style), not `@tailwind base;`, etc.
- Leaflet CSS build error inside `node_modules`
  - This project disables Tailwind for `node_modules` CSS to avoid processing third‑party styles.
- Port 3000 already in use
  - Set the `PORT` environment variable as shown in Quick Start.
- Console output in certain environments
  - Prefer avoiding `console.log` in production‑like environments where non‑structured stdio may interfere with tooling.

## Deployment
- Static hosts (Netlify, Vercel, GitHub Pages): build with `npm run build` and deploy the `build/` folder.
- Behind a subpath: CRA handles static asset paths; if you deploy under a subpath, configure the `homepage` field in `package.json` accordingly.

## Scripts
- `npm start` — Start dev server
- `npm run build` — Create production build
- `npm test` — Run tests

## License
Add your preferred license here.
