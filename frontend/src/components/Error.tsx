import { Link } from "react-router";

function Error() {
  return (
    <>
      <div className="bg-black text-white text-center min-h-screen flex justify-center items-center">
        <div>You haven't signed it yet</div>
        <div className="px-5">|</div>
        <p>
          Please{" "}
          <Link to={"/login"} className="text-neutral-500">
            click here
          </Link>{" "}
          to login
        </p>
        <div className="px-5">|</div>
        <p>
          <Link to={"/register"} className="text-neutral-500">
            Click here
          </Link>{" "}
          to register an account
        </p>
      </div>
    </>
  );
}

export default Error;
