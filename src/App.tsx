import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Stream from './components/Stream';
import Navbar from './components/Navbar';
import Register from './components/Login/Register';
import Account from './components/Account';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Navbar setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} isLoggedIn={false}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stream />} />
          <Route path="/account" element={<Account />} />
          <Route path="/:username" element={<StreamWrapper />} />
        </Routes>
      </BrowserRouter>
      <Login onClose={() => setIsLoginOpen(false)} isOpen={isLoginOpen} />
      <Register onClose={() => setIsRegisterOpen(false)} isOpen={isRegisterOpen} />
    </>
  )
}

const StreamWrapper = () => {
  const {username}  = useParams();
  return <Stream username={username} />
}

export default App;