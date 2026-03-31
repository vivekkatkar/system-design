import { useContext, useState } from "react"
import {axiosInstance} from "../config/axios.js"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx"

export default function Signin(){
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try{
            setLoading(true);
            const res = await axiosInstance.post("/user/signin/", { username, password });
            if(res.data.status == 200){
                const token = res.data.token;
                await login(token);
                navigate("/dashboard")
            }
        }catch(err){
            console.log(err);
            alert("Error in signin");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                :root {
                    --green: #22c55e; --green-dark: #16a34a;
                    --green-light: #dcfce7; --green-muted: #bbf7d0;
                    --bg: #f0fdf4; --text: #0f1f17; --muted: #6b7c74;
                    --border: #d1fae5; --white: #ffffff; --radius: 10px;
                }

                .auth-root {
                    min-height: 100vh;
                    background: var(--bg);
                    font-family: 'Instrument Sans', sans-serif;
                    display: flex;
                    flex-direction: column;
                }

                .auth-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 48px;
                    height: 56px;
                    border-bottom: 1px solid var(--border);
                    background: rgba(240,253,244,0.9);
                    backdrop-filter: blur(12px);
                }

                .auth-logo {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 15px; font-weight: 700; color: var(--text);
                    letter-spacing: -0.02em;
                }

                .auth-logo-mark {
                    width: 24px; height: 24px;
                    background: var(--green); border-radius: 6px;
                    display: grid; place-items: center;
                    color: white; font-size: 12px; font-weight: 700;
                }

                .auth-nav-link {
                    font-family: inherit; font-size: 13px; font-weight: 500;
                    color: var(--muted); background: none; border: none;
                    cursor: pointer; padding: 6px 12px; border-radius: 7px;
                    transition: color 0.15s, background 0.15s;
                }
                .auth-nav-link:hover { color: var(--text); background: var(--green-light); }

                .auth-body {
                    flex: 1; display: flex; align-items: center;
                    justify-content: center; padding: 48px 24px;
                }

                .auth-card {
                    width: 100%; max-width: 400px;
                    background: var(--white);
                    border: 1px solid #d1fae5;
                    border-radius: 18px;
                    padding: 40px 36px;
                    box-shadow: 0 8px 40px rgba(34,197,94,0.08), 0 2px 8px rgba(0,0,0,0.04);
                }

                .auth-icon {
                    width: 48px; height: 48px;
                    background: var(--green-light);
                    border-radius: 12px;
                    display: grid; place-items: center;
                    font-size: 22px; margin-bottom: 24px;
                }

                .auth-heading {
                    font-size: 24px; font-weight: 700;
                    letter-spacing: -0.03em; color: var(--text);
                    margin-bottom: 6px;
                }

                .auth-subtext {
                    font-size: 13.5px; color: var(--muted);
                    margin-bottom: 32px; line-height: 1.5;
                }

                .auth-field { margin-bottom: 16px; }

                .auth-label {
                    display: block; font-size: 12px; font-weight: 600;
                    color: var(--text); margin-bottom: 6px; letter-spacing: 0.01em;
                }

                .auth-input {
                    width: 100%; padding: 11px 14px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 13px; font-weight: 400;
                    background: var(--bg); color: var(--text);
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius); outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }
                .auth-input::placeholder { color: #a7c4b0; font-weight: 300; }
                .auth-input:focus {
                    border-color: var(--green);
                    box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
                    background: #fff;
                }

                .auth-btn {
                    width: 100%; margin-top: 8px;
                    padding: 12px;
                    font-family: inherit; font-size: 14px; font-weight: 600;
                    color: #fff; background: var(--green);
                    border: none; border-radius: var(--radius);
                    cursor: pointer;
                    box-shadow: 0 4px 16px rgba(34,197,94,0.3);
                    transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
                }
                .auth-btn:hover:not(:disabled) {
                    background: var(--green-dark);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 22px rgba(34,197,94,0.35);
                }
                .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .auth-divider {
                    display: flex; align-items: center; gap: 12px;
                    margin: 24px 0;
                }
                .auth-divider-line { flex: 1; height: 1px; background: var(--border); }
                .auth-divider-text {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px; color: #a7c4b0; font-weight: 300;
                }

                .auth-footer-text {
                    text-align: center; font-size: 13px;
                    color: var(--muted);
                }
                .auth-footer-link {
                    background: none; border: none;
                    font-family: inherit; font-size: 13px;
                    font-weight: 600; color: var(--green-dark);
                    cursor: pointer; text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .auth-footer-link:hover { color: var(--green); }
            `}</style>

            <div className="auth-root">
                <nav className="auth-nav">
                    <div className="auth-logo">
                        <div className="auth-logo-mark">D</div>
                        Docspace
                    </div>
                    <button className="auth-nav-link" onClick={() => navigate("/user/signup")}>
                        No account? Sign up →
                    </button>
                </nav>

                <div className="auth-body">
                    <div className="auth-card">
                        <div className="auth-icon">👋</div>
                        <div className="auth-heading">Welcome back</div>
                        <p className="auth-subtext">Sign in to access your documents.</p>

                        <div className="auth-field">
                            <label className="auth-label">Username</label>
                            <input
                                className="auth-input"
                                type="text"
                                placeholder="your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Password</label>
                            <input
                                className="auth-input"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            />
                        </div>

                        <button
                            className="auth-btn"
                            onClick={handleLogin}
                            disabled={loading || !username || !password}
                        >
                            {loading ? "Signing in..." : "Sign in →"}
                        </button>

                        <div className="auth-divider">
                            <div className="auth-divider-line"></div>
                            <span className="auth-divider-text">or</span>
                            <div className="auth-divider-line"></div>
                        </div>

                        <p className="auth-footer-text">
                            Don't have an account?{" "}
                            <button className="auth-footer-link" onClick={() => navigate("/user/signup")}>
                                Create one
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}