# CSAT & Deep Link Tools

A modern React application built with Vite that combines two essential GSK tools:
1. **CSAT Survey URL Generator** - Generate customized survey URLs with various parameters
2. **Deep Link URL Converter** - Convert URLs for different business units and output types

## Features

### CSAT Survey URL Generator
- Generate survey URLs for different channels (1:1Email, MassEmail)
- Support for 30+ countries
- Commercial/Medical/Both group options
- Optional fields for ContentLab ID, Therapy Area, Brand, Specialty, and EM NA
- Generate both Smiley and Star survey versions
- One-click URL copying

### Deep Link URL Converter
- Convert URLs for Pharma and ViiV business units
- Support for Mass and Veeva output types
- Automatic parameter injection and URL reconstruction
- Error handling and validation
- Copy converted URLs to clipboard

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Modern React UI framework
- **Material Icons** - Consistent iconography
- **ESLint** - Code linting and formatting

## Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Material Design** - Clean, modern interface following Google's Material Design
- **GSK Brand Colors** - Custom theme with orange (#fe6633) and green (#00a54d)
- **Tabbed Interface** - Easy navigation between tools
- **Form Validation** - Client-side validation with helpful error messages
- **Accessibility** - Proper ARIA labels and keyboard navigation

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### CSAT Survey URL Generator

1. Select the **CSAT Generator** tab
2. Fill in the required fields:
   - **Channel**: Choose between 1:1Email or MassEmail
   - **Country**: Select from 30+ available countries
   - **Group**: Choose Commercial, Medical, or Both
3. Optionally fill in additional fields for more specific targeting
4. Click **Generate URLs** to create both Smiley and Star survey versions
5. Use the **Copy URL** buttons to copy the generated URLs

### Deep Link URL Converter

1. Select the **Deep Link Converter** tab
2. Paste or enter your URL in the **Input URL** field
3. Select your **Business Unit** (Pharma or ViiV)
4. Choose the **Output Type** (Mass or Veeva)
5. Click **Convert** to generate the modified URL
6. Use **Copy URL** to copy the converted URL
7. Use **Reset** to clear all fields

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── CSATGenerator.jsx    # CSAT survey URL generator
│   │   └── DeepLinkConverter.jsx # Deep link URL converter
│   ├── App.jsx                  # Main app with theming and navigation
│   └── main.jsx                 # React application entry point
├── index.html                   # HTML template
├── package.json                 # Project dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Customization

### Theming
The app uses a custom Material-UI theme defined in `src/App.jsx`. You can modify colors, typography, and component styles by updating the theme configuration.

### Adding Countries
To add new countries to the CSAT generator, update the `countries` array in `src/components/CSATGenerator.jsx`.

### URL Templates
The base URLs and parameter handling can be modified in the respective component files.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Follow the existing code style and patterns
2. Test your changes thoroughly
3. Update documentation as needed
4. Ensure accessibility standards are maintained

## License

Internal GSK tool - Not for external distribution.
