import { Link } from "react-router-dom";

const ProfileDropDown = ({ handleLogout, user }) => {
  const dropDownItems = (
    <>
      <li>
        <Link to={"/profile"} className="justify-between">
          Profile
        </Link>
      </li>
      <li>
        <Link to={"/my-bids"}>My Bids</Link>
      </li>
      <li>
        <Link to={"/my-tasks"}>My Tasks</Link>
      </li>
      <li>
        <Link to={"/bid-requests"}>Bid Requests</Link>
      </li>
      <li className="mt-2">
        <button
          onClick={handleLogout}
          className="bg-gray-200 block text-center"
        >
          Logout
        </button>
      </li>
    </>
  );
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div title={user?.displayName} className="w-10 rounded-full">
          <img
            referrerPolicy="no-referrer"
            alt={user?.displayName}
            src={user?.photoURL}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {dropDownItems}
      </ul>
    </div>
  );
};

export default ProfileDropDown;
