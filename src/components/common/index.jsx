import { useUserContext } from "src/contexts/userContext";
import BorrowerNavBar from "./borrower/NavBar";
import AdminNavBar from "./admin/NavBar";

export default function Common({children}) {
  const { currentUserRoles } = useUserContext();
  const isAdmin = currentUserRoles.includes("Admin");

  switch (isAdmin) {
    case true:
      return (
        <>
          <BorrowerNavBar />
          {children}
        </>
      );
    default:
      return (
        <>
          <AdminNavBar />
          {children}
        </>
      );
  }
}
