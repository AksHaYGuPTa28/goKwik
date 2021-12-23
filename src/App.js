import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/login/login";
import { auth } from "./firebaseConfig";
import Main from "./components/main/main";
import { Route, Switch } from "react-router";
import AddParticipants from "./components/addParticipants/addParticipants";
import EditParticipants from "./components/editParticipants/editParticipants";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        console.log(userAuth);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/addParticipants">
          <AddParticipants />
        </Route>
        <Route exact path="/editParticipants/:id">
          <EditParticipants />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
