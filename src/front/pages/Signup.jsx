import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { signup } from "../store";

export const Signup = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const ok = await signup(dispatch, email, password);

        if (ok) {
            setSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        }
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: 420 }}>
                <div className="card-body p-4">
                    <h4 className="card-title mb-1">Crear cuenta</h4>
                    <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                        Ingresa tus datos para registrarte
                    </p>

                    {store.authError && (
                        <div className="alert alert-danger py-2">{store.authError}</div>
                    )}
                    {success && (
                        <div className="alert alert-success py-2">
                            ¡Cuenta creada! Redirigiendo al login...
                        </div>
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
                                placeholder="Mínimo 6 caracteres"
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
                                    Registrando...
                                </>
                            ) : "Crear cuenta"}
                        </button>
                    </form>

                    <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "0.875rem" }}>
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};