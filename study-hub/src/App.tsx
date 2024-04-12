import './App.css';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import { SnackbarProvider } from 'notistack';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ListSubjectsPage from './pages/ListSubjectsPage/ListSubjectsPage';
import SubjectPage from './pages/SubjectPage/SubjectPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D41A6D',
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: { 'fontFamily': '"Source Sans 3", sans-serif' },
});

function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider
          clientId="738777886358-745pr29p66qlearc5r7mc7lve57lebcn.apps.googleusercontent.com"
        >
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/reset-password/:email/:token" element={<ForgotPasswordPage />} />
              <Route path="/sign-up/:token" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/subjects" element={<ListSubjectsPage />} />
              <Route path="/subject/:id" element={<SubjectPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
