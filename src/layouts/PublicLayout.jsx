import { Route, Switch } from "react-router-dom";
import { LoginRoute, VerifyEmailRoute, CreateAccountRoute } from "src/routes";

export default function PublicLayout() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginRoute} />
      <Route exact path='/verify-email' component={VerifyEmailRoute} />
      <Route exact path='/create-account' component={CreateAccountRoute} />
    </Switch>
  );
}
