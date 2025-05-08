import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        date_of_birth: "",
        profile_picture: "",
        loyalty_points: 0,
        preferred_payment_method: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                name === "loyalty_points" ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(
                "https://fehdan-meat-processing-backend-test.onrender.com/api/v1/accounts/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Registration failed.");
            } else {
                navigate("/login");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("An error occurred during registration.");
        }
    };

    return (
        <div className="container">
            <h2 className="form-title">Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Profile Picture URL:</label>
                    <input
                        type="url"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Loyalty Points:</label>
                    <input
                        type="number"
                        name="loyalty_points"
                        value={formData.loyalty_points}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Preferred Payment Method:</label>
                    <input
                        type="text"
                        name="preferred_payment_method"
                        value={formData.preferred_payment_method}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="button">
                    Register
                </button>
                <div className="bottom-text">
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
            </form>
           
        </div>
    );
}

export default Register;
