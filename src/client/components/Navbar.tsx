import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../services/api-service";
const Navbar = () => {

    const TOKEN = localStorage.getItem('token');
    const nav = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem(TOKEN_KEY);
        nav('/login');
    };

    return <div className="bg-dark">
        <Link className="btn btn-primary m-2" to={"/"}>
            Home
        </Link>
        <Link className="btn btn-primary m-2" to={"/chirps"}>
            Timeline
        </Link>
        <Link className="btn btn-primary m-2" to={"/chirps/create"}>
            New Chirp
        </Link>
        {!TOKEN && (
            <Link className="btn btn-primary m-2 position-absolute end-0" to={"/login"}>
                Login
            </Link>
        )}
        {TOKEN && (
            <button className="btn btn-primary m-2 position-absolute end-0" onClick={handleLogout}>
                Logout
            </button>
        )}
    </div>;
};

export default Navbar;