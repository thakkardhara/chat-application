

import { BiLogOut } from "react-icons/bi";
import UseLogout from "../../hooks/UseLogout";

const Logout = () => {
  const { loading, logout } = UseLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}

export default Logout;
