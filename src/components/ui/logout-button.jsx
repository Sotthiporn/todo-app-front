import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("auth_token");
        navigate("/login");
    };

    return (
        <div onClick={handleLogout} className="cursor-pointer">
            <LogOut className="h-5 w-5 text-destructive" />
            <span className="sr-only">Logout</span>
        </div>
    );
};

export { LogoutButton };
