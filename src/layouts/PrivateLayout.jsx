import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "src/components/common/navbar";
import {
  UpdateMembershipRoute,
  UpcomingPassRoute,
  BorrowPassRoute,
  EmployeesRoute,
  ReportsRoute,
  UpdateMembershipDetailsRoute,
  CreateMembershipRoute,
  EditPassRoute,
} from "src/routes";
import { useUserContext } from "src/contexts/userContext";
import { testToken } from "src/api/account";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export default function PrivateLayout() {
  return isLoggedIn() ? (
    <>
      <NavBar />
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            if (sessionStorage.getItem("role") === "admin") {
              return <UpdateMembershipRoute />;
            }
            return <UpcomingPassRoute />;
          }}
        />
        <Route exact path='/borrow-pass' component={BorrowPassRoute} />
        <Route exact path='/employees' component={EmployeesRoute} />
        <Route exact path='/reports' component={ReportsRoute} />
        <Route exact path='/update-membership-details' component={UpdateMembershipDetailsRoute} />
        <Route exact path='/create-membership' component={CreateMembershipRoute} />
        <Route exact path='/edit-pass' component={EditPassRoute} />
      </Switch>
    </>
  ) : <Redirect to={{ pathname: "/login"}} />;
}

function isLoggedIn() {
  if (sessionStorage.getItem("loginStatus") === null || sessionStorage.getItem("loginStatus") === "false") {
    const {
      setLoginStatusToStateAndSession,
      setUserRolesToStateAndSession,
      setCurrentSelectedRoleToStateAndSession,
      setCurrentUserEmailToStateAndSession,
    } = useUserContext();

    const token = sessionStorage.getItem("token");
    let authenticated;
    testToken(token)
      .then((res) => {
        if (res) {
          const decoded = jwt_decode(token);
          setLoginStatusToStateAndSession(true);
          setUserRolesToStateAndSession(decoded.USER_ROLES);
          setCurrentSelectedRoleToStateAndSession(decoded.USER_ROLES[0]);
          setCurrentUserEmailToStateAndSession(decoded.sub);
          authenticated = true;
        } 
        authenticated = false;
        
      })
      .catch((err) => {authenticated = false});
    return authenticated;
  }
  return true;
}