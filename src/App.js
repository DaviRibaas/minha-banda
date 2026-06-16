import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Authpage';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;