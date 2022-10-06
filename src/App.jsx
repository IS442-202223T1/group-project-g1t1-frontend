import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { HomeRoute, BorrowRoute } from "src/routes";
import Common from "src/components/common";

function App() {
  return (
    <Router>
      <Common>
        <Switch>
          <Route exact path='/' component={HomeRoute} />
          <Route exact path='/borrow-pass' component={BorrowRoute} />
        </Switch>
      </Common>
    </Router>
  );
}

export default App;

