import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Self-hosted fonts - no external requests, better performance & privacy.
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import './styles/theme.css';
import App from './App';
import { I18nProvider } from './i18n/context';

// BASE_URL follows vite.config.ts `base` ('/' on username.github.io,
// '/repo/' on project pages) so links and assets work in both setups.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>,
);
