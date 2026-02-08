# Projectaes

Next.js 14 app with **Material UI (MUI)** v5 and the App Router.

## Setup

1. **Install dependencies** (requires Node.js 18+):

   ```bash
   npm install
   ```

2. **Run the dev server**:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## What's included

- **Next.js 14** with App Router and TypeScript
- **MUI (Material UI)** v5 with Emotion for styling
- **ThemeRegistry** – Emotion cache + `ThemeProvider` wired for Next.js App Router (SSR-friendly)
- **Custom theme** in `app/theme.ts` (edit for colors, typography, etc.)
- **CssBaseline** for consistent defaults

## Project structure

```
app/
  layout.tsx       # Root layout with ThemeRegistry
  page.tsx         # Home page (sample MUI components)
  theme.ts        # MUI theme
  ThemeRegistry.tsx # MUI + Emotion provider for App Router
  globals.css
```

## Using MUI

Import components from `@mui/material` and icons from `@mui/icons-material`:

```tsx
import { Button, TextField } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
```

To change the theme, edit `app/theme.ts`.
