import { createContext, useState, useEffect } from "react";
import {axiosInstance} from "../config/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyToken = async () => {
        const token = localStorage.getItem("token");

        console.log("verify token : ", token);
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            console.log("Calling backend ");
            const res = await axiosInstance.get("/verify", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data); // contains userId + username
        } catch (err) {
            localStorage.removeItem("token");
            setUser(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        await verifyToken();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};