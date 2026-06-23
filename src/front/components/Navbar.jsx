import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { logout } from "../store";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(dispatch);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand fw-semibold" to="/">
                JWT<span className="text-info">Auth</span>
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navMenu"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navMenu">
                <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
                    {!store.token ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-info btn-sm px-3" to="/signup">
                                    Registrarse
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/private">
                                    Zona privada
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger btn-sm px-3"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};