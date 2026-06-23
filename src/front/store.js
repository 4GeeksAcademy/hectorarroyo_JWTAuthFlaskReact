const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const initialStore = () => {
    return {
        message: null,
        token: sessionStorage.getItem("token") || null,
        user: null,
        authError: null,
    };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {

        case "set_hello":
            return { ...store, message: action.payload };

        case "set_token":
            return { ...store, token: action.payload, authError: null };

        case "set_user":
            return { ...store, user: action.payload };

        case "set_auth_error":
            return { ...store, authError: action.payload };

        case "logout":
            return { ...store, token: null, user: null, authError: null };

        default:
            throw Error("Unknown action: " + action.type);
    }
}

// ── Thunks (funciones async que reciben dispatch) ──────────────

export const signup = async (dispatch, email, password) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();
        if (!resp.ok) {
            dispatch({ type: "set_auth_error", payload: data.msg || "Error al registrar" });
            return false;
        }
        dispatch({ type: "set_auth_error", payload: null });
        return true;
    } catch {
        dispatch({ type: "set_auth_error", payload: "No se pudo conectar con el servidor" });
        return false;
    }
};

export const login = async (dispatch, email, password) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();
        if (!resp.ok) {
            dispatch({ type: "set_auth_error", payload: data.msg || "Credenciales inválidas" });
            return false;
        }
        sessionStorage.setItem("token", data.token);
        dispatch({ type: "set_token", payload: data.token });
        dispatch({ type: "set_user", payload: data.user });
        return true;
    } catch {
        dispatch({ type: "set_auth_error", payload: "No se pudo conectar con el servidor" });
        return false;
    }
};

export const logout = (dispatch) => {
    sessionStorage.removeItem("token");
    dispatch({ type: "logout" });
};

export const validateToken = async (dispatch, token) => {
    if (!token) return false;
    try {
        const resp = await fetch(`${BACKEND_URL}/api/private`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) {
            sessionStorage.removeItem("token");
            dispatch({ type: "logout" });
            return false;
        }
        const data = await resp.json();
        dispatch({ type: "set_user", payload: data.user });
        return true;
    } catch {
        return false;
    }
};