# ✈️ Wanderluxe – Frontend

Wanderluxe is a modern full-stack travel agency application. This is the **frontend**, built with **React 19** + **TypeScript**, designed to provide a fast, elegant, and responsive user experience.

---

## 🚀 Features

* 🏖 Public pages: Home, Destinations, Tours, Blog, About, Contact, FAQ, Legal
* 🔐 Auth system: Sign In / Sign Up / Forgot Password / Reset Password
* 👤 Profile for authenticated users:

  * Update personal information
  * Change password
  * View bookings
  * Manage favorites
* 💬 Contact form with email delivery (via backend)
* ⚙️ Dynamic routing with protected and unprotected route guards
* 🧠 Global state management with Zustand
* 🔄 API communication with React Query and Axios
* 🧪 Full form validation using Zod + React Hook Form
* 🌙 Dark mode support

---

## 🧰 Tech Stack

| Layer              | Tool                      |
|--------------------|---------------------------|
| UI Library         | **React 19**              |
| Language           | **TypeScript**            |
| Styling            | **Tailwind CSS**          |
| Forms & Validation | **React Hook Form + Zod** |
| State Management   | **Zustand**               |
| API Fetching       | **Axios + React Query**   |
| Routing            | **React Router DOM v7**   |
| Build Tool         | **Vite**                  |
| Linting & Format   | **ESLint + Prettier**     |

---

## 🗂 Project Structure

```
src/
├── assets/              # Static images & assets
├── components/          # Reusable UI components
├── constants/           # Global constants & enums
├── hooks/               # Custom hooks
├── layouts/             # Layout wrappers (public, profile)
├── pages/               # Route pages
├── routes/              # Route definitions
├── shared/              # Shared types & schemas
├── store/               # Zustand store
├── utils/               # Helper functions
├── api/                 # Axios instances & API calls
└── main.tsx             # Entry point
```

---

## 📦 Setup & Development

### Install dependencies

```bash
yarn install
```

### Run development server

```bash
yarn dev
```

### Build for production

```bash
yarn build
```

### Format & fix linting issues

```bash
yarn fix
```

---

## 🌐 Environment Variables

Create a `.env` file in the root with:

```env
VITE_BACK_BASE_URL=http://localhost:8080/api
VITE_SUPABASE_STORAGE_URL=<your_supabase_storage_url>
```

You can point this to your backend API URL.

---

## 📜 Scripts

| Command       | Description                        |
|---------------|------------------------------------|
| `yarn dev`    | Run development server             |
| `yarn build`  | Build for production               |
| `yarn fix`    | Lint + Format code with Prettier   |
| `yarn lint`   | Run ESLint on all TypeScript files |
| `yarn format` | Format files using Prettier        |

---

## 🛣 Example Routes

| Path                    | Page                      |
|-------------------------|---------------------------|
| `/`                     | Home                      |
| `/tours`                | Tour listing              |
| `/destinations`         | Destination listing       |
| `/contact`              | Contact form              |
| `/auth/signin`          | Login                     |
| `/auth/signup`          | Register                  |
| `/auth/forgot-password` | Request password reset    |
| `/auth/reset-password`  | Reset password with token |
| `/profile/info`         | Account info (protected)  |

---

## 📬 API Integration

This frontend uses Axios and React Query to call a RESTful API hosted on the backend (`/api/...`). You’ll need to have the [Wanderluxe Backend](https://github.com/your-backend-url) running locally or in production.

---

## 🙌 Contributing

This is a solo/portfolio project for now. If you'd like to contribute or collaborate, feel free to fork or message me!
