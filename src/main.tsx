import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import 'katex/dist/katex.min.css';

if ("serviceWorker" in navigator) {
  const registerSW = () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (reg) {
        console.log(
          "[Learn] Service Worker Registered successfully:",
          reg.scope,
        );
      })
      .catch(function (err) {
        console.error("[Learn] Service Worker Registration Failed:", err);
      });
  };

  if (document.readyState === "complete") {
    registerSW();
  } else {
    window.addEventListener("load", registerSW);
  }
} else {
  console.warn(
    "[Learn] Service Worker is not supported in this browser/environment (requires HTTPS or localhost).",
  );
}

createRoot(document.getElementById('root')!).render(<App></App>);
