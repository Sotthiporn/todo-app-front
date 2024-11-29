import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const RedirectIfAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = Cookies.get("auth_token");
        if (token && location.pathname === "/login") {
            navigate("/", { replace: true });
        }
    }, [navigate, location]);
};

export default RedirectIfAuth;
