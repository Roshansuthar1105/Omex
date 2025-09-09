# Omex AI Logo Guidelines

This document provides guidelines for using the Omex AI logo across various platforms and contexts.

## Logo Variants

| File | Purpose | Description |
|------|---------|-------------|
| `omex-logo.svg` | Primary logo | Clean, professional logo with angle brackets and circular "O" on blue background |
| `omex-logo-transparent.svg` | For colored backgrounds | Transparent background version with blue brackets and gradient circle |
| `omex-logo-mono.svg` | For printing | Monochrome (black) version for print materials |
| `omex-logo-white.svg` | For dark backgrounds | White version for use on dark backgrounds |
| `omex-icon.svg` | Icon-only usage | Compact icon-only version without text |
| `omex-favicon.svg` | Browser favicon | Compact version for browser tabs and bookmarks |
| `omex-text-logo.svg` | Horizontal logo | Combined icon and text logo for headers and branded materials |

## Design Concept

The Omex AI logo represents:
1. **Code & Development**: Angle brackets symbolize code syntax and development
2. **Integration**: The circular "O" represents completeness and integration
3. **Focus**: The minimal design ensures clear recognition at any size

## Brand Colors

- Primary Blue: `#2563EB`
- Accent Purple: `#8B5CF6`
- White: `#FFFFFF`
- Black: `#000000`

## Usage Guidelines

1. **Clear Space**: Always maintain sufficient clear space around the logo
2. **Scaling**: Don't stretch or distort the logo - scale proportionally
3. **Background**: Ensure good contrast on any background
4. **Modifications**: Don't alter the colors or proportions

## Implementation Examples

### Navbar Integration

The logo automatically switches between light and dark modes:

```jsx
// Light mode: uses omex-logo-transparent.svg
// Dark mode: uses omex-logo-white.svg
<img 
  src={isDark ? "/omex-logo-white.svg" : "/omex-logo-transparent.svg"}
  alt="Omex AI" 
  className="h-10 w-auto transition-transform duration-300 transform group-hover:scale-110" 
/>
```

### Footer Integration

Similar implementation in the footer component:

```jsx
<img 
  src={isDark ? "/omex-logo-white.svg" : "/omex-logo-transparent.svg"}
  alt="Omex AI" 
  className="h-10 w-auto mr-2" 
/>
```

## Screenshots

### Light Mode
![Navbar Light Mode](logo-navbar-light.png)
![Footer Light Mode](logo-footer-light.png)

### Dark Mode
![Navbar Dark Mode](logo-navbar-dark.png)
![Footer Dark Mode](logo-footer-dark.png)

## Favicon Integration

Add to your HTML head:

```html
<link rel="icon" href="/omex-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
```

## Usage in React

### As an image:
```jsx
import React from 'react';

function Header() {
  return (
    <header>
      <img 
        src="/omex-logo.svg" 
        alt="Omex AI" 
        width="150" 
        height="auto" 
      />
      {/* rest of your header */}
    </header>
  );
}

export default Header;
```

### As an inline SVG (for more styling control):
```jsx
import React from 'react';
import { ReactComponent as OmexLogo } from '../path/to/omex-logo.svg';

function Header() {
  return (
    <header>
      <OmexLogo className="header-logo" />
      {/* rest of your header */}
    </header>
  );
}

export default Header;
```

## Guidelines

1. **Clear Space**: Always maintain sufficient clear space around the logo
2. **Scaling**: Don't stretch or distort the logo - scale proportionally
3. **Background**: Ensure good contrast on any background
4. **Modifications**: Don't alter the colors or proportions

## Favicon Integration

Add to your HTML head:

```html
<link rel="icon" href="/omex-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
```
