import BorrowerNavBar from "./borrower/NavBar";
import AdminNavBar from "./admin/NavBar";

export default function Common({children}) {
  const userType = "admin";

  switch (userType) {
    case "admin":
      return (
        <>
          <AdminNavBar />
          {children}
        </>
      );
    case "borrower":
      return (
        <>
          <BorrowerNavBar />
          {children}
        </>
      );
    default:
      return (
        <>
          <BorrowerNavBar />
          {children}
        </>
      );
  }
}
