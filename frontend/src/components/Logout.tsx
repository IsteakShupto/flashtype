import { useNavigate } from "react-router";
import { useLogoutMutation } from "../app/services/services";

function Logout() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  return (
    <>
      <button
        className="cursor-pointer text-neutral-400"
        onClick={async () => {
          await logout(undefined);
          navigate("/login");
        }}
      >
        <i className="fa-solid fa-right-from-bracket"></i> Logout
      </button>
    </>
  );
}

export default Logout;
