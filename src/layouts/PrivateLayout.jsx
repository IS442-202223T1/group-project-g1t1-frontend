import { useState, useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import Common from "src/components/common";
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
import { testToken } from "src/api/testToken";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export default function PrivateLayout() {
  const userType = "admin";
  const [token, setToken] = useState("");

  const history = useHistory();
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    currentUserRoles,
    setUserRolesToStateAndSession,
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
    <Common>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            if (currentUserRoles.includes("Admin")) {
              return <UpdateMembershipRoute />;
            }
            // return <UpdateMembershipRoute />
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
    </Common>
  );
}
