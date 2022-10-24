import { useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
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
  const history = useHistory();
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    currentUserRoles,
    setUserRolesToStateAndSession,
    currentSelectedRole,
    setCurrentSelectedRoleToStateAndSession,
    setCurrentUserEmailToStateAndSession,
  } = useUserContext();

  useEffect(() => {
    if (!isUserLoggedIn) {
      const token = sessionStorage.getItem("token");
      testToken(token)
        .then((res) => {
          if (res) {
            const decoded = jwt_decode(token);
            setUserRolesToStateAndSession(decoded.USER_ROLES);
            setCurrentSelectedRoleToStateAndSession(decoded.USER_ROLES[0]);
            setCurrentUserEmailToStateAndSession(decoded.sub);
            setIsUserLoggedIn(true);
          } else {
            history.push("/login");
          }
        })
        .catch((err) => {
          history.push("/login");
        });
    }
  }, []);

  return (
    <>
      <NavBar />
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            if (currentSelectedRole === "admin") {
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
  );
}
