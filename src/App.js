import { useEffect, useState } from 'react';
import "./App.css";
import Login from "./components/login/login";
import { auth } from "./firebaseConfig";
import Main from "./components/main/main";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Main /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
