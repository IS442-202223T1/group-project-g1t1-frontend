import { useUserContext } from "src/contexts/userContext";
import { testToken } from "src/api/account";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export default function isLoggedIn() {
  if (
    sessionStorage.getItem("loginStatus") === null ||
    sessionStorage.getItem("loginStatus") === "false"
  ) {
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
      .catch((err) => {
        authenticated = false;
      });
    return authenticated;
  }
  return true;
}
