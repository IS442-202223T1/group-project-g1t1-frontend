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
} from "src/routes";
import ExistingBookings from "src/components/existingBookings";
import isLoggedIn from "./isLoggedIn";

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
              return <ExistingBookings />;
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
      </Switch>
    </>
  ) : <Redirect to={{ pathname: "/login"}} />;
}


