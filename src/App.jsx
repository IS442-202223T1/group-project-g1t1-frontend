import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PublicLayout, PrivateLayout } from "src/layouts";
import { UpdateMembershipContextProvider } from "src/contexts/updateMembershipContext";
import { UserProvider } from "src/contexts/userContext";
import "./App.css";

function App() {

  return (
    <Router>
      <UserProvider>
        <UpdateMembershipContextProvider>
          <Switch>
            <Route path="/login" component={PublicLayout} />
            <Route path="/" component={PrivateLayout} />
          </Switch>
        </UpdateMembershipContextProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
