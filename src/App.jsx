import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { UpdateMembershipContextProvider } from "src/contexts/updateMembershipContext";
import { UpdateMembershipRoute, UpcomingPassRoute, BorrowPassRoute, EmployeesRoute, ReportsRoute, UpdateMembershipDetailsRoute, CreateMembershipRoute, EditPassRoute } from "src/routes";
import Common from "src/components/common";

function App() {
  const userType = "admin";

  return (
    <Router>
      <UpdateMembershipContextProvider>
        <Common>
          <Switch>
            <Route 
              exact path='/' 
              render={() => {
                if (userType === "admin") {
                  return <UpdateMembershipRoute />
                }
                return <UpcomingPassRoute />
              }}
            />
            <Route exact path='/borrow-pass' component={BorrowPassRoute} />
            <Route exact path='/employees' component={EmployeesRoute} />
            <Route exact path='/reports' component={ReportsRoute} />
            <Route exact path='/update-membership-details' component={UpdateMembershipDetailsRoute} />
            <Route exact path='/create-membership' component={CreateMembershipRoute} />
            <Route exact path='/edit-pass' component={EditPassRoute} />
          </Switch>
        </Common>
      </UpdateMembershipContextProvider>
    </Router>
  );
}

export default App;
