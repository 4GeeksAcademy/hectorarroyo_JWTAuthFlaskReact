import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { validateToken, logout } from "../store";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
            return;
        }
        validateToken(dispatch, store.token).then((valid) => {
            if (!valid) navigate("/login");
            else setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="text-center text-muted">
                    <div className="spinner-border mb-3" role="status" />
                    <p>Validando sesión...</p>
                </div>
            </div>
        );
    }

    const user = store.user;
    const initials = user?.email?.slice(0, 2).toUpperCase() ?? "??";

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: 480 }}>
                <div className="card-body p-4">

                    <span className="badge bg-success-subtle text-success border border-success-subtle mb-3">
                        ● Sesión autenticada
                    </span>

                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div
                            className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-semibold"
                            style={{ width: 52, height: 52, fontSize: "1rem", flexShrink: 0 }}
                        >
                            {initials}
                        </div>
                        <div>
                            <h5 className="mb-0">Zona privada</h5>
                            <small className="text-muted">Acceso verificado mediante JWT</small>
                        </div>
                    </div>

                    <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <span className="text-muted" style={{ fontSize: "0.8125rem" }}>Usuario</span>
                            <span className="fw-medium">{user?.email}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <span className="text-muted" style={{ fontSize: "0.8125rem" }}>ID</span>
                            <span className="fw-medium">#{user?.id}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <span className="text-muted" style={{ fontSize: "0.8125rem" }}>Estado</span>
                            <span className="text-success fw-medium">Activo ✓</span>
                        </li>
                    </ul>

                    <button
                        className="btn btn-outline-danger"
                        onClick={() => { logout(dispatch); navigate("/login"); }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};