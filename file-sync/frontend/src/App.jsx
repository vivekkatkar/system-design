import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css"

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/user/signin" element={<Signin />} />
                    <Route path="/user/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;