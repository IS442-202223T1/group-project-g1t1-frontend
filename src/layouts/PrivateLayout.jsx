import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "src/components/common/navbar";
import {
  UpdateMembershipRoute,
  UpcomingBookingsRoute,
  EmployeesRoute,
  ReportsRoute,
  UpdateMembershipDetailsRoute,
  CreateMembershipRoute,
  EditMembershipRoute,
  PastBookingsRoute,
  ViewMembershipsRoute,
  ViewMembershipDetailsRoute,
  GopBookingsListRoute
} from "src/routes";
import { useUserContext } from "src/contexts/userContext";
import { testToken } from "src/api/account";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import ConfirmedBookings from "src/components/gopBookingsList";

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

            if (sessionStorage.getItem("role") === "gop") {
              return <ConfirmedBookings />;
            }
            return <UpcomingBookingsRoute />;
          }}
        />
        <Route exact path='/view-memberships' component={ViewMembershipsRoute} />
        <Route exact path='/employees' component={EmployeesRoute} />
        <Route exact path='/reports' component={ReportsRoute} />
        <Route exact path='/view-membership-details' component={ViewMembershipDetailsRoute} />
        <Route exact path='/update-membership-details' component={UpdateMembershipDetailsRoute} />
        <Route exact path='/create-membership' component={CreateMembershipRoute} />
        <Route exact path='/edit-membership' component={EditMembershipRoute} />
        <Route exact path='/past-bookings' component={PastBookingsRoute} />
        <Route exact path='/gop-bookings-list' component={GopBookingsListRoute} />
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
