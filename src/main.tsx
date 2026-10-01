import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/common/Layout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import App from './App';
import CustomLoader from './components/common/CustomLoader';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<CustomLoader />}>
            <Layout>
              <App />
            </Layout>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
