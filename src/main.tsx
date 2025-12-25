import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import 'katex/dist/katex.min.css';
createRoot(document.getElementById('root')!).render(<App></App>);
