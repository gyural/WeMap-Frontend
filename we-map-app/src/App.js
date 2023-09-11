import './App.css';
import { createContext, useState } from 'react';
import LoginCard from './components/accounts/LoginCard';
import RegisterCard from './components/accounts/RegisterCard';
const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <RegisterCard/>
    </AuthContext.Provider>
  );
}

export default App;
export {AuthContext};

