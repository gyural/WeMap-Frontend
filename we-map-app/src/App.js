import './App.css';
import { createContext, useState } from 'react';
import LoginCard from './components/LoginCard';
const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <LoginCard />
    </AuthContext.Provider>
  );
}

export default App;
export {AuthContext};

