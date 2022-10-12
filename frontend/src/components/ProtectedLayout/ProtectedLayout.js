import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getAdminAuthorityToken,
  getToken,
} from "../../services/sessionStorage";
const ProtectedLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login", { replace: true });
    }
    const adminAuthorityToken = getAdminAuthorityToken();
    if (adminAuthorityToken) {
      navigate("/admin/error");
    }
  }, []);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
export default ProtectedLayout;
