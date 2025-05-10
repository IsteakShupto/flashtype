import { Link } from "react-router";
import Logout from "./Logout";

function Header() {
  return (
    <>
      <div className="bg-black text-neutral-400 flex align-items justify-start absolute left-10 top-10">
        <Link to={"/"} className="cursor-pointer">
          <i className="fa-solid fa-bolt"></i> Flashtype
        </Link>
      </div>
      <div className="flex align-items justify-end absolute right-10 top-10 gap-2">
        <Link
          to={"/results"}
          className="cursor-pointer px-2 py-1 rounded-md text-neutral-400"
        >
          <i className="fa-solid fa-chart-simple"></i> Results
        </Link>
        <Logout />
      </div>
    </>
  );
}

export default Header;
