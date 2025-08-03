import { useNavigate } from "react-router";
import { useLogoutMutation } from "../app/services/services";

function Logout() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
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
