# React.js Template with ESLint & Prettier

This is a ready-to-use React.js template powered by Vite, TypeScript, ESLint, and Prettier. It helps developers quickly start projects with best practices in place.

## Features
- **Vite** for fast development and builds
- **TypeScript** for type safety
- **ESLint** with recommended rules and Prettier integration
- **Prettier** for automatic code formatting
- **Sitemap Generation** with `vite-plugin-sitemap`
- **React Hooks & React Refresh** ESLint plugins
- **Predefined Folder Structure** for better project organization

## Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/ArnoSahakyan/react-template my-project  
cd my-project  
yarn install  
```
Or with npm:
```sh
npm install
```

## Folder Structure
The `src` directory follows a structured layout for easy navigation:

```
src  
│── assets        # Static assets (images, fonts, etc.)  
│── components    # Reusable UI components  
│── context       # React Context API for state management  
│── hooks         # Custom React hooks  
│── middlewares   # Middleware logic  
│── pages         # Page components for routing  
│── providers     # Context providers  
│── router        # Application routing configuration  
│── shared        # Shared utilities and helper functions  
│── store         # Global state management (e.g., Redux/Zustand)  
```

## Cleaning Up Example Files
After cloning the repository, you can remove the placeholder files by running the following command in your terminal:

### For Unix-based systems (macOS/Linux):
```sh
find src/ -type f -name ".gitkeep" -delete
```

### For Windows (Command Prompt):
```sh
del /S src\.gitkeep
```

This will remove all the example files and placeholder files from the project, leaving only the folder structure in place.

## Scripts
- `yarn dev` – Start the development server
- `yarn build` – Build for production
- `yarn preview` – Preview the production build
- `yarn lint` – Run ESLint with auto-fix
- `yarn format` – Format code using Prettier
- `yarn fix` – Run both linting and formatting

## Getting Started
1. Clone the repo
2. Install dependencies with `yarn install` or `npm install`
3. Start the dev server using `yarn dev`
4. Build your React project!

## Repository
[GitHub: ArnoSahakyan/react-template](https://github.com/ArnoSahakyan/react-template)

## License
This template is open-source and free to use.

---