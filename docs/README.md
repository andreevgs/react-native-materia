# React Native Materia Docs

This project serves as the official documentation website and interactive component showcase for the `react-native-materia` library. Built with Expo, Expo Router, and React Native for Web, it provides cross-platform documentation with native Material Design 3 (Material You) styling.

## Architecture

Documentation pages combine static technical descriptions with live, interactive component previews. Content is authored as Markdown files inside the `content` directory and imported directly into Expo Router pages via a dedicated Metro transformer (`md-transformer.js`).

Rather than relying on heavy third-party markdown engines, the app uses an internal parser (`utils/md-parser.ts`) designed for performance and tight integration with the Materia design system. The parser breaks markdown text into structured blocks, tokenizes code snippets with Material Design color schemes, and embeds live component demos through slot directives (`<!-- SLOT: componentName -->`).

## Development

To start the local development server for the web interface, run the following command from the `docs` directory:

```bash
npm run web
```

To build a production-ready static web bundle into the `dist` folder:

```bash
npm run export
```

Code quality and linting checks can be executed using:

```bash
npm run lint
```

## Structure

The `app` directory implements file-based routing with Expo Router, organizing guides under `about` and component references under `components`. Reusable UI pieces, including the header, navigation sidebar, and code snippet visualizers, reside in `components`. Application theming and persistent light/dark mode preferences are handled by `providers/CurrentThemeProvider.tsx`, applying Materia design tokens seamlessly across the entire layout.
