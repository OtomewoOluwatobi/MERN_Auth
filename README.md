# MERN Authentication Project

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application for user authentication. It includes a backend API for user registration and login, and a frontend React application for interacting with the API.

## Project Structure

```
.vite/
back_end/
  .env
  package.json
  routes.js
  server.js
  controller/
    UserController.js
  model/
    User.js
front_end/
  eslint.config.js
  index.html
  package.json
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
  public/
    vite.svg
  src/
    App.tsx
    Dashboard.tsx
    index.css
    Login.tsx
    main.tsx
    ProtectedRoute.tsx
    Register.tsx
    vite-env.d.ts
    assets/
      test_bg.jpg
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd back_end
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `back_end` directory with the following content:

   ```env
   PORT=3001
   MONGODB_URI=<your_mongodb_connection_string>
   NODE_ENV=development
   JWT_SECRET=<your_jwt_secret>
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB URI and `<your_jwt_secret>` with a secure secret key.

4. Start the backend server:

   ```sh
   npm run dev
   ```

   The backend server will run on `http://localhost:3001`.

## Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd front_end
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   The frontend application will run on `http://localhost:5173`.

## Features

- User registration with validation
- User login with JWT authentication
- Protected routes for authenticated users
- Responsive UI built with React and TailwindCSS

## API Endpoints

### Backend

- `POST /api/register`: Register a new user
- `POST /api/login`: Login an existing user

## Scripts

### Backend

- `npm run dev`: Start the backend server in development mode

### Frontend

- `npm run dev`: Start the frontend development server
- `npm run build`: Build the frontend for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Validation**: Yup
- **Styling**: TailwindCSS

## License

This project is licensed under the MIT License.
