import NavBar from "./NavBar";

export default function Common({children}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
