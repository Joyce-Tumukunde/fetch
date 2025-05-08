import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Import your CSS file for styling

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(
                "https://fehdan-meat-processing-backend-test.onrender.com/api/v1/accounts/login/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.detail || "Login failed.");
            } else {
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                navigate("/list-users");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login.");
        }
    };

    return (
        <div className="container">
            <h2 className="form-title">Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="button">Login</button>
                <div className="bottom-text">
                    <p>
                        New to Logo? <a href="/register">Register Here</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
