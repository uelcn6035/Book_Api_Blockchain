# Sample React App with Next UI

This project, `sample-react-app`, is a modern, responsive front-end application built using [Vite](https://vitejs.dev/) and [Next UI](https://nextui.org/react) for React. It's designed to connect to a custom weather API to fetch and display weather data dynamically.

## Features

- **Modern React UI**: Utilizes React 18 for component-based architecture.
- **Styling with Next UI**: Offers a rich set of UI components for building intuitive interfaces.
- **Responsive Design**: Ensures the app looks great on both desktop and mobile devices.
- **Weather API Integration**: Connects to a custom-built weather API to display real-time weather data.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm/yarn

## Installation

To set up the project locally, follow these steps:

1. **Open in Codespaces** or clone repository:

   ```bash
   git clone https://github.com/CDT-UEL/sample-react-app
   cd sample-react-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to view the app.

## Connecting to the Weather API

The frontend app is designed to work with the `weather_API` built in week 3 with Express. However, your browser will throw a cors polity error. To address that we must install cors and use it in the `server.ts` file as follows:

1. Open the [weather_api](https://github.com/lucian-duta/weather_api) in Codespaces or locally.
2. Run the following command in the terminal to install cors:

   ```bash
     npm install cors
   ```

2. Enable CORS in your Express application by adding the following to your `server.ts`:

   ```typescript
   import cors from "cors";
   
   app.use(cors());
   ```

3. Ensure the backend server is running and accessible by running:

   ```bash
   npm run build
   
   npm run start
   ```

4. Modify the frontend app's API request URLs to point to **your** weather API endpoints. In the `src/api/actions.ts` file, update the `API_URL` to your server's address:

   ```typescript
   API_URL = "http://localhost:5000";
   ```

## Weather API Documentation

For detailed information on the weather API endpoints, parameters, and responses, refer to the week 3 tutorial and the [Weather API Documentation](https://github.com/lucian-duta/weather_api).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or further assistance, please contact [Lucian Duta](mailto:l.duta@uel.ac.uk).
