import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ListUsers.css"; // Import your CSS file for styling

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        async function fetchUsers() {
            const url = "https://fehdan-meat-processing-backend-test.onrender.com/api/v1/accounts/?is_active=true";
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to fetch users.");
                } else {
                    const data = await response.json();
                    if (data && data.results) {
                        setUsers(data.results);
                    } else {
                        setError("No users found.");
                    }
                }
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("An unexpected error occurred while fetching users.");
            }
        }
        fetchUsers();
    }, [token]);

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            {error && <p className="error">{error}</p>}
            {users.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {users.map((userItem) => {
                        const { id, user, phone_number, address, date_of_birth, loyalty_points, preferred_payment_method } = userItem;
                        return (
                            <li key={id} className="user-card">
                                <p><strong>ID:</strong> {id}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                                <p><strong>Phone:</strong> {phone_number}</p>
                                <p><strong>Address:</strong> {address}</p>
                                <p><strong>Date of Birth:</strong> {date_of_birth}</p>
                                <p><strong>Loyalty Points:</strong> {loyalty_points}</p>
                                <p><strong>Payment:</strong> {preferred_payment_method}</p>
                                <p><Link to={`/details/${id}`}>View Details</Link></p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                !error && <p>No users available.</p>
            )}
        </div>
    );
}

export default ListUsers;
