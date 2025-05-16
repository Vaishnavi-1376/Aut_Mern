import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", formData);
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            alert(error.response?.data || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Login</h2>
                {["email", "password"].map((field) => (
                    <input
                        key={field}
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleChange}
                        className="mb-2 p-2 w-full border border-gray-300 rounded"
                        required
                    />
                ))}
                <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
