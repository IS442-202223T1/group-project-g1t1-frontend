import { Route, Switch } from "react-router-dom";
import { LoginRoute, VerifyEmailRoute } from "src/routes";

export default function PublicLayout() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginRoute} />
      <Route exact path='/verify-email' component={VerifyEmailRoute} />
    </Switch>
  );
}
