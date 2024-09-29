// pages/_app.js
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/globals.css'; // Import custom styles (ensure order to allow overrides)
import { ThemeProvider } from 'next-themes'; // Theming support
import { useEffect } from 'react'; // For executing side effects

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Optionally, initialize analytics or other third-party scripts here
    console.log("Application started"); // Placeholder for any startup logic
  }, []);

  return (
    <ThemeProvider enableSystem={true} attribute="class"> {/* Provides theming support for light/dark mode */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
