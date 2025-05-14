# Netflix Frontend Clone

This project is a Netflix-inspired frontend application built using React, TypeScript, and Material-UI. It provides a user-friendly interface for browsing, registering, logging in, and managing user profiles.

## Features

- **Authentication**: Users can register, log in, and log out securely.
- **User Profile**: View and edit user details.
- **Responsive Header**: A fixed header with a Netflix-style theme that adapts to different screen sizes.
- **Global Theme**: A Netflix red theme applied globally using Material-UI's `ThemeProvider`.
- **Centralized State Management**: Redux is used to manage authentication and user data.
- **Optimized API Calls**: API calls are centralized and optimized to avoid redundancy.

## Project Structure

```
src/
├── components/       # Reusable UI components (e.g., Header, Layout)
├── hooks/            # Custom React hooks (e.g., useAuth)
├── pages/            # Page components (e.g., Login, Register, UserProfile)
├── services/         # API service files (e.g., authService)
├── store/            # Redux store and slices
├── styles/           # Global styles and themes
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/netflix-frontend-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd netflix-frontend-clone
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality issues.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
VITE_API_BASE_URL=<your-api-base-url>
```

## Key Components

### Header
- Displays the Netflix logo.
- Shows the user's avatar and menu options (Profile, Logout) when logged in.
- Provides a login link for unauthenticated users.

### UserProfile Page
- Fetches user details from the Redux store or API.
- Allows users to edit their profile information.

### Register Page
- Redirects authenticated users to the home page.
- Provides a registration form for new users.

## API Integration

- All API calls are centralized in the `authService` file.
- Axios is used for making HTTP requests.
- The `/profile` API is optimized to avoid redundant calls.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Material-UI**: For styling and responsive design.
- **Redux**: For state management.
- **Axios**: For API requests.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Enjoy building and exploring the Netflix Frontend Clone!
