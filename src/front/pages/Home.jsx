import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		if (!backendUrl) return;
		fetch(backendUrl + "/api/hello")
			.then(r => r.json())
			.then(data => dispatch({ type: "set_hello", payload: data.message }))
			.catch(() => { });
	}, []);

	const isAuth = !!store.token;

	return (
		<div style={{ minHeight: "100vh", background: "#0f172a", color: "#f1f5f9" }}>

			{/* Hero */}
			<div style={{
				maxWidth: 680,
				margin: "0 auto",
				padding: "7rem 1.5rem 4rem",
				textAlign: "center",
			}}>
				{/* Icono */}
				<div style={{
					width: 72, height: 72,
					background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
					borderRadius: 20,
					display: "flex", alignItems: "center", justifyContent: "center",
					margin: "0 auto 2rem",
					fontSize: "2rem",
					boxShadow: "0 0 40px rgba(56,189,248,0.3)",
				}}>
					🔐
				</div>

				<h1 style={{
					fontSize: "clamp(2rem, 5vw, 3rem)",
					fontWeight: 700,
					lineHeight: 1.15,
					marginBottom: "1.25rem",
					background: "linear-gradient(135deg, #f1f5f9 30%, #38bdf8 100%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
				}}>
					Autenticación JWT<br />con Flask y React
				</h1>

				<p style={{
					fontSize: "1.0625rem",
					color: "#94a3b8",
					lineHeight: 1.7,
					marginBottom: "2.5rem",
					maxWidth: 480,
					margin: "0 auto 2.5rem",
				}}>
					Sistema completo de autenticación con JSON Web Tokens.
					Registro, inicio de sesión y rutas privadas protegidas.
				</p>

				{/* CTAs */}
				{!isAuth ? (
					<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
						<Link to="/signup" style={{
							padding: "11px 28px",
							background: "linear-gradient(135deg, #38bdf8, #6366f1)",
							color: "#fff",
							borderRadius: 10,
							textDecoration: "none",
							fontWeight: 600,
							fontSize: "0.9375rem",
							boxShadow: "0 4px 20px rgba(56,189,248,0.25)",
							transition: "opacity .15s",
						}}>
							Crear cuenta
						</Link>
						<Link to="/login" style={{
							padding: "11px 28px",
							background: "rgba(255,255,255,0.06)",
							color: "#f1f5f9",
							borderRadius: 10,
							textDecoration: "none",
							fontWeight: 600,
							fontSize: "0.9375rem",
							border: "1px solid rgba(255,255,255,0.12)",
						}}>
							Iniciar sesión
						</Link>
					</div>
				) : (
					<Link to="/private" style={{
						padding: "11px 28px",
						background: "linear-gradient(135deg, #38bdf8, #6366f1)",
						color: "#fff",
						borderRadius: 10,
						textDecoration: "none",
						fontWeight: 600,
						fontSize: "0.9375rem",
					}}>
						Ir a zona privada →
					</Link>
				)}
			</div>

			{/* Feature cards */}
			<div style={{
				maxWidth: 860,
				margin: "0 auto",
				padding: "0 1.5rem 6rem",
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
				gap: 16,
			}}>
				{[
					{ icon: "✍️", title: "Registro", desc: "Crea tu cuenta con email y contraseña. Contraseñas hasheadas con bcrypt." },
					{ icon: "🔑", title: "Login JWT", desc: "Autenticación con tokens firmados. El token se guarda en sessionStorage." },
					{ icon: "🛡️", title: "Rutas privadas", desc: "Validación automática del token en cada ruta protegida del frontend." },
					{ icon: "🚪", title: "Logout seguro", desc: "Cierre de sesión limpia el token del almacenamiento del navegador." },
				].map(({ icon, title, desc }) => (
					<div key={title} style={{
						background: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.08)",
						borderRadius: 14,
						padding: "1.5rem",
					}}>
						<div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{icon}</div>
						<div style={{ fontWeight: 600, marginBottom: "0.4rem", color: "#f1f5f9" }}>{title}</div>
						<div style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
					</div>
				))}
			</div>

			{/* Status bar del backend */}
			{store.message && (
				<div style={{
					position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
					background: "rgba(15,23,42,0.95)",
					border: "1px solid rgba(56,189,248,0.3)",
					borderRadius: 100,
					padding: "8px 20px",
					fontSize: "0.8125rem",
					color: "#38bdf8",
					backdropFilter: "blur(8px)",
					whiteSpace: "nowrap",
				}}>
					● Backend conectado: {store.message}
				</div>
			)}
		</div>
	);
};