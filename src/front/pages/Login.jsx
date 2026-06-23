import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../store";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const ok = await login(dispatch, email, password);

        if (ok) navigate("/private");
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: 420 }}>
                <div className="card-body p-4">
                    <h4 className="card-title mb-1">Iniciar sesión</h4>
                    <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                        Bienvenido de vuelta
                    </p>

                    {store.authError && (
                        <div className="alert alert-danger py-2">{store.authError}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="tu@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                                    Verificando...
                                </>
                            ) : "Iniciar sesión"}
                        </button>
                    </form>

                    <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "0.875rem" }}>
                        ¿No tienes cuenta?{" "}
                        <Link to="/signup">Regístrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};