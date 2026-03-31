import { useNavigate } from "react-router-dom"

export default function Landing(){
    const navigate = useNavigate();
    const redirect = (path) => navigate(path);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --green: #22c55e;
                    --green-dark: #16a34a;
                    --green-light: #dcfce7;
                    --green-muted: #bbf7d0;
                    --bg: #ffffff;
                    --bg2: #f8faf9;
                    --text: #0f1f17;
                    --muted: #6b7c74;
                    --border: #e2ede8;
                    --radius: 10px;
                }

                body { background: var(--bg); }

                .land {
                    min-height: 100vh;
                    font-family: 'Instrument Sans', sans-serif;
                    color: var(--text);
                    background: var(--bg);
                    display: flex;
                    flex-direction: column;
                }

                /* NAV */
                .land-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 56px;
                    height: 60px;
                    border-bottom: 1px solid var(--border);
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(12px);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }

                .land-logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--text);
                    letter-spacing: -0.02em;
                }

                .land-logo-mark {
                    width: 26px;
                    height: 26px;
                    background: var(--green);
                    border-radius: 7px;
                    display: grid;
                    place-items: center;
                    color: white;
                    font-size: 13px;
                    font-weight: 700;
                }

                .land-nav-right { display: flex; gap: 8px; align-items: center; }

                .nav-link {
                    padding: 7px 16px;
                    font-family: inherit;
                    font-size: 13.5px;
                    font-weight: 500;
                    color: var(--muted);
                    background: none;
                    border: none;
                    border-radius: var(--radius);
                    cursor: pointer;
                    transition: color 0.15s, background 0.15s;
                }
                .nav-link:hover { color: var(--text); background: var(--bg2); }

                .nav-cta {
                    padding: 7px 18px;
                    font-family: inherit;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #fff;
                    background: var(--green);
                    border: none;
                    border-radius: var(--radius);
                    cursor: pointer;
                    transition: background 0.15s, transform 0.15s;
                }
                .nav-cta:hover { background: var(--green-dark); transform: translateY(-1px); }

                /* HERO */
                .land-hero {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 88px 24px 64px;
                    background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
                }

                .hero-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    background: var(--green-light);
                    border: 1px solid var(--green-muted);
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--green-dark);
                    margin-bottom: 28px;
                    font-family: 'JetBrains Mono', monospace;
                    letter-spacing: 0.02em;
                }

                .hero-chip-dot {
                    width: 6px; height: 6px;
                    background: var(--green);
                    border-radius: 50%;
                }

                .hero-h1 {
                    font-size: clamp(40px, 6vw, 68px);
                    font-weight: 700;
                    letter-spacing: -0.04em;
                    line-height: 1.05;
                    color: var(--text);
                    max-width: 700px;
                    margin-bottom: 22px;
                }

                .hero-h1 em {
                    font-style: normal;
                    color: var(--green-dark);
                }

                .hero-sub {
                    font-size: 16.5px;
                    font-weight: 400;
                    color: var(--muted);
                    max-width: 420px;
                    line-height: 1.65;
                    margin-bottom: 40px;
                }

                .hero-btns {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-bottom: 64px;
                }

                .hero-btn-primary {
                    padding: 12px 28px;
                    font-family: inherit;
                    font-size: 15px;
                    font-weight: 600;
                    color: #fff;
                    background: var(--green);
                    border: none;
                    border-radius: var(--radius);
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(34,197,94,0.3);
                    transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
                }
                .hero-btn-primary:hover {
                    background: var(--green-dark);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(34,197,94,0.35);
                }

                .hero-btn-ghost {
                    padding: 12px 28px;
                    font-family: inherit;
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text);
                    background: #fff;
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius);
                    cursor: pointer;
                    transition: border-color 0.15s, transform 0.15s;
                }
                .hero-btn-ghost:hover { border-color: #a3d9b8; transform: translateY(-2px); }

                /* MOCK UI */
                .hero-mock {
                    width: 100%;
                    max-width: 680px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.08), 0 0 0 1px var(--border);
                    overflow: hidden;
                }

                .mock-topbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--border);
                    background: var(--bg2);
                }

                .mock-dots { display: flex; gap: 5px; }
                .mock-dot { width: 9px; height: 9px; border-radius: 50%; }

                .mock-title {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11px;
                    color: var(--muted);
                    font-weight: 400;
                }

                .mock-body { padding: 20px; display: flex; flex-direction: column; gap: 8px; }

                .mock-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 8px;
                    border: 1px solid var(--border);
                    transition: border-color 0.15s;
                }
                .mock-row:hover { border-color: var(--green-muted); }

                .mock-file-icon {
                    width: 34px; height: 34px;
                    background: var(--green-light);
                    border-radius: 8px;
                    display: grid; place-items: center;
                    font-size: 15px; flex-shrink: 0;
                }

                .mock-info { flex: 1; text-align: left; }
                .mock-name { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
                .mock-meta { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--muted); }
                .mock-date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a0b0a8; }

                /* FEATURES */
                .land-features {
                    padding: 80px 56px;
                    background: var(--bg);
                    max-width: 1080px;
                    margin: 0 auto;
                    width: 100%;
                }

                .feat-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--green-dark);
                    text-align: center;
                    margin-bottom: 12px;
                }

                .feat-title {
                    font-size: clamp(24px, 3vw, 36px);
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    color: var(--text);
                    text-align: center;
                    margin-bottom: 48px;
                }

                .feat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }

                .feat-card {
                    padding: 28px 24px;
                    background: var(--bg2);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .feat-card:hover {
                    box-shadow: 0 8px 32px rgba(34,197,94,0.1);
                    transform: translateY(-3px);
                }

                .feat-icon {
                    width: 40px; height: 40px;
                    background: var(--green-light);
                    border-radius: 10px;
                    display: grid; place-items: center;
                    font-size: 18px; margin-bottom: 16px;
                }

                .feat-card-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
                .feat-card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

                /* CTA STRIP */
                .land-cta {
                    margin: 0 56px 80px;
                    padding: 56px 48px;
                    background: linear-gradient(135deg, #16a34a, #22c55e);
                    border-radius: 20px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .land-cta::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 240px; height: 240px;
                    background: rgba(255,255,255,0.08);
                    border-radius: 50%;
                }

                .land-cta::after {
                    content: '';
                    position: absolute;
                    bottom: -80px; left: -40px;
                    width: 280px; height: 280px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 50%;
                }

                .cta-h2 {
                    font-size: clamp(24px, 3vw, 36px);
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.025em;
                    margin-bottom: 10px;
                    position: relative;
                }

                .cta-sub {
                    font-size: 15px;
                    color: rgba(255,255,255,0.75);
                    margin-bottom: 28px;
                    position: relative;
                }

                .cta-btn {
                    position: relative;
                    padding: 12px 32px;
                    font-family: inherit;
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--green-dark);
                    background: #fff;
                    border: none;
                    border-radius: var(--radius);
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    transition: transform 0.15s, box-shadow 0.15s;
                }
                .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.2); }

                /* FOOTER */
                .land-footer {
                    border-top: 1px solid var(--border);
                    padding: 22px 56px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .footer-copy {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11.5px;
                    color: var(--muted);
                    font-weight: 300;
                }

                .footer-links { display: flex; gap: 8px; }

                .footer-link {
                    padding: 6px 12px;
                    font-family: inherit;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--muted);
                    background: none;
                    border: none;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: color 0.15s, background 0.15s;
                }
                .footer-link:hover { color: var(--text); background: var(--bg2); }

                @media (max-width: 768px) {
                    .land-nav, .land-footer { padding: 0 20px; }
                    .land-footer { height: auto; padding: 18px 20px; flex-direction: column; gap: 12px; }
                    .feat-grid { grid-template-columns: 1fr; }
                    .land-cta { margin: 0 20px 60px; padding: 40px 24px; }
                    .land-features { padding: 60px 20px; }
                }
            `}</style>

            <div className="land">
                {/* Nav */}
                <nav className="land-nav">
                    <div className="land-logo">
                        <div className="land-logo-mark">D</div>
                        Docspace
                    </div>
                    <div className="land-nav-right">
                        <button className="nav-link" onClick={() => redirect("/user/signin")}>Sign in</button>
                        <button className="nav-cta" onClick={() => redirect("/user/signup")}>Get started</button>
                    </div>
                </nav>

                {/* Hero */}
                <section className="land-hero">
                    <div className="hero-chip">
                        <span className="hero-chip-dot"></span>
                        Free to use · No credit card
                    </div>
                    <h1 className="hero-h1">Write, store &<br /><em>stay organised</em></h1>
                    <p className="hero-sub">A minimal document workspace that stays out of your way. Create docs instantly, find them always.</p>
                    <div className="hero-btns">
                        <button className="hero-btn-primary" onClick={() => redirect("/user/signup")}>Start for free →</button>
                        <button className="hero-btn-ghost" onClick={() => redirect("/user/signin")}>Sign in</button>
                    </div>
                    <div className="hero-mock">
                        <div className="mock-topbar">
                            <div className="mock-dots">
                                <div className="mock-dot" style={{background:'#ff5f57'}}></div>
                                <div className="mock-dot" style={{background:'#febc2e'}}></div>
                                <div className="mock-dot" style={{background:'#28c840'}}></div>
                            </div>
                            <span className="mock-title">dashboard — my docs</span>
                            <span></span>
                        </div>
                        <div className="mock-body">
                            {[
                                { name: "Product Roadmap Q2", meta: "Created by you", date: "Mar 29", icon: "📋" },
                                { name: "Meeting Notes — Design", meta: "Created by you", date: "Mar 26", icon: "📝" },
                                { name: "API Integration Brief", meta: "Created by you", date: "Mar 21", icon: "⚙️" },
                            ].map((d, i) => (
                                <div className="mock-row" key={i}>
                                    <div className="mock-file-icon">{d.icon}</div>
                                    <div className="mock-info">
                                        <div className="mock-name">{d.name}</div>
                                        <div className="mock-meta">{d.meta}</div>
                                    </div>
                                    <div className="mock-date">{d.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="land-features">
                    <div className="feat-label">Why Docspace</div>
                    <div className="feat-title">Built for people who just want to write</div>
                    <div className="feat-grid">
                        {[
                            { icon: "⚡", title: "Instant creation", desc: "Name it and go. New docs are live in one click — no templates, no friction." },
                            { icon: "📂", title: "Always organised", desc: "Every document you create lives on your dashboard, sorted and ready to find." },
                            { icon: "🔐", title: "Private by default", desc: "Your account, your docs. Everything is tied to you and only visible to you." },
                        ].map((f, i) => (
                            <div className="feat-card" key={i}>
                                <div className="feat-icon">{f.icon}</div>
                                <div className="feat-card-title">{f.title}</div>
                                <p className="feat-card-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="land-cta">
                    <div className="cta-h2">Ready to get started?</div>
                    <p className="cta-sub">Free forever. No setup required.</p>
                    <button className="cta-btn" onClick={() => redirect("/user/signup")}>Create your account</button>
                </div>

                {/* Footer */}
                <footer className="land-footer">
                    <span className="footer-copy">© {new Date().getFullYear()} Docspace</span>
                    <div className="footer-links">
                        <button className="footer-link" onClick={() => redirect("/user/signin")}>Sign in</button>
                        <button className="footer-link" onClick={() => redirect("/user/signup")}>Sign up</button>
                    </div>
                </footer>
            </div>
        </>
    )
}