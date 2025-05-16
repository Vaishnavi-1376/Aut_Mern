import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", formData);
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {["firstname", "lastname", "email", "password"].map((field) => (
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
                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
