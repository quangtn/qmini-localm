# 🧠 Local LLM Model Picker

A sleek, interactive single-page dashboard for browsing, filtering, and selecting locally hosted Large Language Models (LLMs). Built with React and Tailwind CSS, this tool helps you quickly find the right model for your task based on size, parameters, and use case tags.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Managing multiple local LLM models can be overwhelming. This dashboard provides a centralized interface to:

- **Visualize** all your available models at a glance
- **Filter** models by task category (coding, reasoning, security, etc.)
- **Sort** by size, parameters, or name
- **Search** across model names and tags
- **Monitor** RAM compatibility with your system

Whether you're running models via Ollama, LM Studio, vLLM, or any other local inference server, this picker helps you choose the optimal model for each task.

---

## Features

| Feature | Description |
|---------|-------------|
| 🔍 **Real-time Search** | Filter models instantly by name or tag |
| 🏷️ **Category Filters** | Quick filter chips for All, OpenClaw, Coding, Security, Reasoning, Fast, General, Long-Context, Vision |
| ⚡ **OpenClaw Preset** | One-click filter for recommended models (glm-4.7-flash, qwen3-coder-30b, qwq-32b, llama-4-scout) |
| ↕️ **Multi-Sort Options** | Sort by Size (GB), Parameters, or Name (ascending/descending) |
| 📋 **One-Click Copy** | Copy model names to clipboard with visual feedback |
| 📊 **Size Visualization** | Color-coded progress bars indicate model size relative to RAM |
| 🧠 **RAM Indicator** | System RAM display with compatibility warnings and VRAM explanation tooltip |
| 🎯 **Flagship Comparisons** | Hover tooltips showing equivalent closed-source models (GPT-4, Claude, etc.) |
| ⭐ **Default Highlight** | Visual badge for recommended default model |
| ☀️/🌙 **Theme Toggle** | Light mode (default) and dark mode support |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |

---

## Demo

### Filter by Category
Click any filter chip to narrow down models by use case:

```
[All] [OpenClaw] [Coding] [Security] [Reasoning] [Fast] [General] [Long-Context] [Vision]
```

**OpenClaw Preset:** A curated filter showing the recommended models for different tasks:
- **glm-4.7-flash** — General daily tasks (default)
- **qwen3-coder-30b** — Coding and code generation
- **qwq-32b** — Complex reasoning and analysis
- **llama-4-scout** — Vision and long-context documents

### Search
Type in the search bar to filter by model name or tags:

```
Search: "qwen" → Shows all Qwen models
Search: "lightweight" → Shows ministral-3-3b, deepseek-coder-v2-lite
```

### Sort
Use the dropdown to organize results:

```
Size (Smallest) → ministral-3-3b (2.99 GB) first
Size (Largest)  → gpt-oss-120b (62.56 GB) first
Parameters      → Sort by model parameter count
Name            → Alphabetical ordering
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for cloning the repository)

Verify your installations:

```bash
node --version
# v18.x.x or higher

npm --version
# 9.x.x or higher
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/local-llm-model-picker.git
cd local-llm-model-picker
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser

Navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## Usage

### Basic Workflow

1. **Browse Models** — Scroll through the card grid to see all available models
2. **Filter by Task** — Click a category chip (e.g., "Coding") to filter models
3. **Search** — Type in the search bar to find specific models
4. **Sort** — Use the dropdown to organize by size, parameters, or name
5. **Copy Model Name** — Click the copy icon on any card to copy the model identifier
6. **Check RAM & VRAM** — Review the RAM indicator to ensure model compatibility

### Example Use Cases

| Task | Recommended Filter | Top Models | Flagship Equivalent |
|------|-------------------|------------|---------------------|
| Daily coding | Coding | `qwen/qwen3-coder-30b` | Claude 3.5 Sonnet |
| Security audit | Security | `nousresearch/hermes-4-70b` | Claude 3 Opus |
| Quick lookups | Fast | `mistralai/ministral-3-3b` | GPT-3.5 Turbo |
| Document analysis | Vision | `llama-4-scout-17b-16e-instruct` | GPT-4o |
| Complex reasoning | Reasoning | `qwen/qwq-32b`, `gpt-oss-120b` | OpenAI o1-mini, GPT-4 Turbo |
| General tasks | General | `zai-org/glm-4.7-flash` | GPT-4o |

> 💡 **Tip:** Hover over the "≈ Flagship" badge on any model card to see its equivalent closed-source model comparison.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search bar |
| `Escape` | Clear search / Close dropdown |

---

## Configuration

### Modifying System RAM

Update the `SYSTEM_RAM` constant in `src/App.jsx`:

```javascript
// Change this value to match your system's available RAM (in GB)
const SYSTEM_RAM = 70;
```

> **Note:** System RAM includes both your computer's RAM and GPU VRAM combined. However, for best performance with large models, sufficient dedicated VRAM is recommended.

### Adding New Models

Add entries to the `models` array in `src/App.jsx`:

```javascript
{
  id: "unique-model-id",
  name: "provider/model-name",
  parameters: "7B",
  paramSort: 7,           // Numeric value for sorting
  size: 4.37,             // Size in GB
  tags: ["general", "fast", "lightweight", "openclaw"],
  recommendedFor: "Quick general tasks",
  isDefault: false,       // Set true for recommended default
  equivalentTo: "GPT-4 (general)",  // Flagship model comparison
}
```

### Customizing Categories

Modify the `categories` array in `src/App.jsx` to add or remove filter options:

```javascript
const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "openclaw", label: "OpenClaw", icon: Zap },
  { id: "coding", label: "Coding", icon: Code },
  { id: "your-category", label: "Your Label", icon: YourIcon },
  // ...
];
```

### Customizing Tag Colors

Add or modify entries in the `tagColors` and `tagColorsLight` objects in `src/App.jsx`:

```javascript
const tagColors = {
  "your-tag": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  // ... (dark mode styles)
};

const tagColorsLight = {
  "your-tag": "bg-indigo-100 text-indigo-900 border-indigo-300",
  // ... (light mode styles)
};
```

---

## Project Structure

```
local-llm-model-picker/
├── src/
│   ├── App.jsx                  # Main application with all components
│   ├── index.css                # Tailwind CSS imports
│   └── main.jsx                 # React entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vercel.json                  # Vercel deployment config
└── README.md
```

---

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | React DOM rendering |
| `lucide-react` | ^0.300.0 | Icon library |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^5.0.0 | Build tool and dev server |
| `tailwindcss` | ^3.4.0 | Utility-first CSS framework |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | CSS vendor prefixing |
| `@vitejs/plugin-react` | ^4.2.0 | React plugin for Vite |

### Install All Dependencies

```bash
npm install react react-dom lucide-react
npm install -D vite tailwindcss postcss autoprefixer @vitejs/plugin-react
```

---

## Customization

### Theming

The dashboard supports both **light mode** (default) and **dark mode**. Toggle between themes using the sun/moon icon in the header.

To customize:

1. **Colors** — Modify the conditional classes based on `isDarkMode` state
2. **Primary Color** — Replace `blue-500` references with your preferred color
3. **Accents** — Update tag colors in the `tagColors` and `tagColorsLight` objects

### Adding Features

Potential enhancements you can implement:

- [ ] Model comparison mode (side-by-side)
- [ ] Favorites/bookmarks with localStorage persistence
- [ ] Export selected model config as JSON
- [ ] Integration with Ollama/LM Studio APIs
- [ ] Model download progress tracking
- [ ] Performance benchmarks display
- [ ] Custom theme color picker

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use functional components with hooks
- Follow Tailwind CSS utility-first approach
- Maintain consistent naming conventions
- Add comments for complex logic

---

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) — Beautiful open-source icons
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Vite](https://vitejs.dev/) — Next-generation frontend tooling

---

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/local-llm-model-picker/issues) page
2. Open a new issue with detailed information
3. Include your browser, OS, and Node.js version

---

**Made with ❤️ for the local LLM community**
```


