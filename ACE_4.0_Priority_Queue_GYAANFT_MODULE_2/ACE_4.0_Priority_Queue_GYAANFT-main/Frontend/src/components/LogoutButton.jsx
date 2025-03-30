import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <button
          className="btn btn-primary logoutBtn text-xl pl-5 hover:text-red-600 cursor-pointer rounded-full "
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <i className="ri-logout-box-r-line"></i>
        </button>
        <br />
      </>
    );
  }
};

export default LogoutButton;