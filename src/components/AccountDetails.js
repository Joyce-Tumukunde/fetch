import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/AccountDetails.css"; // Import your CSS file for styling

function AccountDetails() {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchAccountDetails() {
      try {
        const response = await fetch(
          `https://fehdan-meat-processing-backend-test.onrender.com/api/v1/accounts/${accountId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch account details.");
        } else {
          const data = await response.json();
          setAccount(data);
        }
      } catch (err) {
        console.error("Error fetching account details:", err);
        setError("An error occurred while fetching account details.");
      }
    }
    fetchAccountDetails();
  }, [accountId, token]);

  return (
    <div className="account-details-container">
      <h2>Account Details</h2>
      {error && <p className="error">{error}</p>}
      {account ? (
        <table className="account-table">
          <tbody>
            <tr><th>ID</th><td>{account.id}</td></tr>
            {account.user && (
              <>
                <tr><th>Username</th><td>{account.user.username}</td></tr>
                <tr><th>Email</th><td>{account.user.email}</td></tr>
                <tr><th>First Name</th><td>{account.user.first_name}</td></tr>
                <tr><th>Last Name</th><td>{account.user.last_name}</td></tr>
              </>
            )}
            <tr><th>Active</th><td>{account.is_active ? "Yes" : "No"}</td></tr>
            <tr><th>Phone</th><td>{account.phone_number}</td></tr>
            <tr><th>Address</th><td>{account.address}</td></tr>
            <tr><th>Date of Birth</th><td>{account.date_of_birth}</td></tr>
            <tr><th>Loyalty Points</th><td>{account.loyalty_points}</td></tr>
            <tr><th>Preferred Payment</th><td>{account.preferred_payment_method}</td></tr>
          </tbody>
        </table>
      ) : (
        !error && <p>Loading account details...</p>
      )}
    </div>
  );
}

export default AccountDetails;
