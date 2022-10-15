import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { UpdatePassRoute, UpcomingPassRoute, BorrowPassRoute, EmployeesRoute, ReportsRoute } from "src/routes";
import Common from "src/components/common";

function App() {
  const userType = "admin";

  return (
    <Router>
      <Common>
        <Switch>
          <Route 
            exact path='/' 
            render={() => {
              if (userType === "admin") {
                return <UpdatePassRoute />
              }
              return <UpcomingPassRoute />
            }}
          />
          <Route exact path='/borrow-pass' component={BorrowPassRoute} />
          <Route exact path='/employees' component={EmployeesRoute} />
          <Route exact path='/reports' component={ReportsRoute} />
        </Switch>
      </Common>
    </Router>
  );
}

export default App;
