import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/playfair-display/wght.css';
import '@fontsource-variable/manrope/wght.css';
import './lb.css';
import './index.css';
import App from './App';

hydrateRoot(document.getElementById('root')!, <StrictMode><App /></StrictMode>);
