import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PublicLayout, PrivateLayout } from "src/layouts";
import { UpdateMembershipContextProvider } from "src/contexts/updateMembershipContext";
import { UserProvider } from "src/contexts/userContext";
import "./App.css";
import { ViewMembershipContextProvider } from "./contexts/viewMembershipContext";

function App() {

  return (
    <Router>
      <UserProvider>
        <UpdateMembershipContextProvider>
          <ViewMembershipContextProvider>
          <Switch>
            <Route path="/login" component={PublicLayout} />
            <Route path="/verify-email" component={PublicLayout} />
            <Route path="/create-account" component={PublicLayout} />
            <Route path="/" component={PrivateLayout} />
          </Switch>
          </ViewMembershipContextProvider>
        </UpdateMembershipContextProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
