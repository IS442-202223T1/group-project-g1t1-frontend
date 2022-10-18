import { Route, Switch } from "react-router-dom";
import { LoginRoute } from "src/routes";

export default function PublicLayout() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginRoute} />
    </Switch>
  );
}
