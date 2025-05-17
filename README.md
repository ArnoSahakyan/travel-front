# Wanderluxe

Wanderluxe is a full-stack travel agency web application built with modern tools and best practices. The frontend is developed using **React 19** with **TypeScript** and styled using **Tailwind CSS**. The application is designed to provide a seamless experience for users to explore destinations, book tours, manage their accounts, and more.

## Features

- 🏠 Public pages including Home, Blog, Destinations, Tours, About, Contact, FAQ, and Legal.
- 🔐 Authentication with Sign In, Sign Up, and Forgot Password pages.
- 👤 Profile section for authenticated users, including:
    - Account Info (with React Hook Form + Zod for validation)
    - Bookings
    - WishlistsPage
- 🔄 State management using **Zustand**.
- 📄 Protected and unprotected route handling with React Router DOM.
- ⚙️ Modular layout structure with reusable layouts for public and profile pages.
- 🧪 Strongly typed with TypeScript and follows strict linting/formatting standards using ESLint and Prettier.

## Stack

- **React 19**
- **TypeScript**
- **React Router DOM 7**
- **Tailwind CSS**
- **Zustand** for state management
- **React Hook Form** + **Zod** for form handling and validation
- **Vite** for fast development and bundling
- **ESLint** + **Prettier** for consistent code formatting and linting

## Development

To start the project locally:

```bash
yarn install
yarn dev
```

To build for production:

```bash
yarn build
```

To run lint and format fixes:

```bash
yarn fix
```