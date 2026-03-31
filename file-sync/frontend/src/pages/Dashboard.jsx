import { useContext, useEffect, useState } from "react"
import {axiosInstance} from "../config/axios.js"
import {AuthContext} from "../context/AuthContext.jsx"

export default function Dashboard(){
    const [filename, setFilename] = useState("");
    const [flag, setFlag] = useState(false);
    const [docs, setDocs] = useState([]);

    const {user} = useContext(AuthContext);

    const handleCreateFile = async () => {
        try{
            const res = await axiosInstance.post("/docs/create", { docname: filename });
            alert(res.data.message);
            setFlag(!flag);
        }catch(err){
            console.log(err);
            alert("Error calling backend");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const path = "/docs/" + user.userId + "/";
            const res = await axiosInstance.get(path);
            setDocs(res.data.data)
        }
        fetchData();
    }, [flag]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                :root {
                    --green: #22c55e; --green-dark: #16a34a;
                    --green-light: #dcfce7; --green-muted: #bbf7d0;
                    --bg: #f0fdf4; --bg2: #ffffff; --text: #0f1f17;
                    --muted: #6b7c74; --border: #d1fae5; --radius: 10px;
                }

                .dash-root {
                    min-height: 100vh;
                    background: var(--bg);
                    font-family: 'Instrument Sans', sans-serif;
                    color: var(--text);
                    display: flex; flex-direction: column;
                }

                /* TOPBAR */
                .dash-topbar {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 40px; height: 60px;
                    background: var(--bg2);
                    border-bottom: 1px solid var(--border);
                    position: sticky; top: 0; z-index: 50;
                }

                .dash-logo {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 15px; font-weight: 700; color: var(--text);
                    letter-spacing: -0.02em;
                }

                .dash-logo-mark {
                    width: 26px; height: 26px;
                    background: var(--green); border-radius: 7px;
                    display: grid; place-items: center;
                    color: white; font-size: 12px; font-weight: 700;
                }

                .dash-user-pill {
                    display: flex; align-items: center; gap: 8px;
                    padding: 6px 12px 6px 8px;
                    background: var(--green-light);
                    border: 1px solid var(--green-muted);
                    border-radius: 100px;
                }

                .dash-user-avatar {
                    width: 22px; height: 22px;
                    background: var(--green);
                    border-radius: 50%;
                    display: grid; place-items: center;
                    color: white; font-size: 10px; font-weight: 700;
                }

                .dash-user-name {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11.5px; font-weight: 400;
                    color: var(--green-dark);
                }

                /* MAIN */
                .dash-main {
                    flex: 1; padding: 40px;
                    max-width: 900px; width: 100%; margin: 0 auto;
                }

                /* STATS ROW */
                .dash-stats {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 14px; margin-bottom: 36px;
                }

                .stat-card {
                    background: var(--bg2);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    padding: 20px 22px;
                }

                .stat-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px; color: var(--muted);
                    font-weight: 400; letter-spacing: 0.05em;
                    text-transform: uppercase; margin-bottom: 8px;
                }

                .stat-value {
                    font-size: 28px; font-weight: 700;
                    color: var(--text); letter-spacing: -0.04em;
                }

                .stat-sub {
                    font-size: 12px; color: var(--muted); margin-top: 2px;
                }

                /* CREATE ROW */
                .dash-create-section {
                    background: var(--bg2);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    padding: 24px;
                    margin-bottom: 28px;
                }

                .create-section-title {
                    font-size: 14px; font-weight: 600; color: var(--text);
                    margin-bottom: 14px;
                }

                .create-row {
                    display: flex; gap: 10px;
                }

                .create-input {
                    flex: 1; padding: 11px 16px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 13px; font-weight: 400;
                    background: var(--bg); color: var(--text);
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius); outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }
                .create-input::placeholder { color: #a7c4b0; }
                .create-input:focus {
                    border-color: var(--green);
                    box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
                    background: #fff;
                }

                .create-btn {
                    padding: 11px 22px;
                    font-family: inherit; font-size: 13.5px; font-weight: 600;
                    color: #fff; background: var(--green);
                    border: none; border-radius: var(--radius);
                    cursor: pointer; white-space: nowrap;
                    box-shadow: 0 3px 12px rgba(34,197,94,0.25);
                    transition: background 0.15s, transform 0.15s;
                }
                .create-btn:hover:not(:disabled) {
                    background: var(--green-dark); transform: translateY(-1px);
                }
                .create-btn:disabled { opacity: 0.45; cursor: not-allowed; }

                /* DOCS LIST */
                .docs-section {
                    background: var(--bg2);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    overflow: hidden;
                }

                .docs-header {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 18px 24px;
                    border-bottom: 1px solid var(--border);
                }

                .docs-header-title {
                    font-size: 14px; font-weight: 600; color: var(--text);
                }

                .docs-count {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11px; color: var(--muted);
                    background: var(--bg);
                    border: 1px solid var(--border);
                    padding: 3px 10px; border-radius: 100px;
                }

                .docs-table-head {
                    display: grid;
                    grid-template-columns: 2fr 1.2fr 1.2fr 1fr;
                    padding: 10px 24px;
                    background: var(--bg);
                    border-bottom: 1px solid var(--border);
                }

                .docs-th {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: #a0b8ac;
                }

                .docs-row {
                    display: grid;
                    grid-template-columns: 2fr 1.2fr 1.2fr 1fr;
                    padding: 14px 24px;
                    border-bottom: 1px solid var(--border);
                    align-items: center;
                    transition: background 0.12s;
                    cursor: default;
                }
                .docs-row:last-child { border-bottom: none; }
                .docs-row:hover { background: #f7fdf9; }

                .doc-name-cell {
                    display: flex; align-items: center; gap: 10px;
                }

                .doc-file-icon {
                    width: 30px; height: 30px;
                    background: var(--green-light);
                    border-radius: 8px;
                    display: grid; place-items: center;
                    font-size: 13px; flex-shrink: 0;
                }

                .doc-name { font-size: 13.5px; font-weight: 600; color: var(--text); }

                .doc-cell {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11.5px; color: var(--muted); font-weight: 400;
                }

                .doc-id-cell {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px; color: #b0c8bc;
                }

                .docs-empty {
                    padding: 48px 24px;
                    text-align: center;
                }

                .docs-empty-icon {
                    font-size: 36px; margin-bottom: 12px;
                }

                .docs-empty-text {
                    font-size: 14px; color: var(--muted); margin-bottom: 4px;
                    font-weight: 500;
                }

                .docs-empty-sub {
                    font-size: 13px; color: #a0b8ac;
                }

                @media (max-width: 640px) {
                    .dash-main { padding: 20px; }
                    .dash-stats { grid-template-columns: 1fr; }
                    .docs-table-head { display: none; }
                    .docs-row { grid-template-columns: 1fr; gap: 4px; }
                }
            `}</style>

            <div className="dash-root">
                {/* Topbar */}
                <div className="dash-topbar">
                    <div className="dash-logo">
                        <div className="dash-logo-mark">D</div>
                        Docspace
                    </div>
                    {user && (
                        <div className="dash-user-pill">
                            <div className="dash-user-avatar">
                                {(user.email || user.userId || "U")[0].toUpperCase()}
                            </div>
                            <span className="dash-user-name">{user.email || user.userId}</span>
                        </div>
                    )}
                </div>

                <div className="dash-main">
                    {/* Stats */}
                    <div className="dash-stats">
                        <div className="stat-card">
                            <div className="stat-label">Total Docs</div>
                            <div className="stat-value">{docs.length}</div>
                            <div className="stat-sub">documents created</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Latest</div>
                            <div className="stat-value" style={{fontSize:'16px', paddingTop:'6px'}}>
                                {docs.length > 0
                                    ? new Date(docs[0]?.created_at).toLocaleDateString("en-US", {month:"short", day:"numeric"})
                                    : "—"
                                }
                            </div>
                            <div className="stat-sub">most recent doc</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Workspace</div>
                            <div className="stat-value" style={{fontSize:'16px', paddingTop:'6px', color:'var(--green-dark)'}}>Active</div>
                            <div className="stat-sub">all systems go</div>
                        </div>
                    </div>

                    {/* Create */}
                    <div className="dash-create-section">
                        <div className="create-section-title">New document</div>
                        <div className="create-row">
                            <input
                                className="create-input"
                                placeholder="Document name..."
                                value={filename}
                                onChange={(e) => setFilename(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && filename && handleCreateFile()}
                            />
                            <button
                                className="create-btn"
                                onClick={handleCreateFile}
                                disabled={!filename}
                            >
                                + Create
                            </button>
                        </div>
                    </div>

                    {/* Docs */}
                    <div className="docs-section">
                        <div className="docs-header">
                            <span className="docs-header-title">Your documents</span>
                            <span className="docs-count">{docs.length} docs</span>
                        </div>

                        {docs.length === 0 ? (
                            <div className="docs-empty">
                                <div className="docs-empty-icon">📄</div>
                                <div className="docs-empty-text">No documents yet</div>
                                <div className="docs-empty-sub">Create your first doc above to get started.</div>
                            </div>
                        ) : (
                            <>
                                <div className="docs-table-head">
                                    <span className="docs-th">Name</span>
                                    <span className="docs-th">ID</span>
                                    <span className="docs-th">Owner</span>
                                    <span className="docs-th">Created</span>
                                </div>
                                {docs.map((doc, index) => (
                                    <div className="docs-row" key={index}>
                                        <div className="doc-name-cell">
                                            <div className="doc-file-icon">📝</div>
                                            <span className="doc-name">{doc.docname}</span>
                                        </div>
                                        <span className="doc-id-cell">{doc.id}</span>
                                        <span className="doc-cell">{doc.created_by}</span>
                                        <span className="doc-cell">
                                            {new Date(doc.created_at).toLocaleDateString("en-US", {
                                                month: "short", day: "numeric", year: "numeric"
                                            })}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}