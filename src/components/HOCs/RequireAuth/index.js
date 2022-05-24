import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

function RequireAuth({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (user.roles[0] !== "DISPETCHER") {
        localStorage.removeItem("user");
        signOut(() => navigate("/", { replace: true }));
    }

    return children;
}

export default RequireAuth;
