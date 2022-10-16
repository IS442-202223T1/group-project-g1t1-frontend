import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { UpdatePassContextProvider } from "src/contexts/updatePassContext";
import { UpdatePassRoute, UpcomingPassRoute, BorrowPassRoute, EmployeesRoute, ReportsRoute, UpdatePassDetailsRoute, CreatePassRoute } from "src/routes";
import Common from "src/components/common";

function App() {
  const userType = "admin";

  return (
    <Router>
      <UpdatePassContextProvider>
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
            <Route exact path='/update-pass-details' component={UpdatePassDetailsRoute} />
            <Route exact path='/create-pass' component={CreatePassRoute} />
          </Switch>
        </Common>
      </UpdatePassContextProvider>
    </Router>
  );
}

export default App;
