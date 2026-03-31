import { useContext, useEffect, useState } from "react"
import {axiosInstance} from "../config/axios.js"
import {AuthContext} from "../context/AuthContext.jsx"
import {Link} from "react-router-dom"

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
                    min-height: 100vh; background: var(--bg);
                    font-family: 'Instrument Sans', sans-serif;
                    color: var(--text); display: flex; flex-direction: column;
                }

                /* TOPBAR */
                .dash-topbar {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0 40px; height: 60px;
                    background: var(--bg2); border-bottom: 1px solid var(--border);
                    position: sticky; top: 0; z-index: 50;
                }
                .dash-logo { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
                .dash-logo-mark { width: 26px; height: 26px; background: var(--green); border-radius: 7px; display: grid; place-items: center; color: white; font-size: 12px; font-weight: 700; }
                .dash-user-pill { display: flex; align-items: center; gap: 8px; padding: 6px 12px 6px 8px; background: var(--green-light); border: 1px solid var(--green-muted); border-radius: 100px; }
                .dash-user-avatar { width: 22px; height: 22px; background: var(--green); border-radius: 50%; display: grid; place-items: center; color: white; font-size: 10px; font-weight: 700; }
                .dash-user-name { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; font-weight: 400; color: var(--green-dark); }

                /* MAIN */
                .dash-main { flex: 1; padding: 40px; max-width: 960px; width: 100%; margin: 0 auto; }

                /* STATS */
                .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 36px; }
                .stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 20px 22px; }
                .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--muted); font-weight: 400; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; }
                .stat-value { font-size: 28px; font-weight: 700; color: var(--text); letter-spacing: -0.04em; }
                .stat-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

                /* CREATE */
                .dash-create-section { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin-bottom: 28px; }
                .create-section-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 14px; }
                .create-row { display: flex; gap: 10px; }
                .create-input { flex: 1; padding: 11px 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; background: var(--bg); color: var(--text); border: 1.5px solid var(--border); border-radius: var(--radius); outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
                .create-input::placeholder { color: #a7c4b0; }
                .create-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(34,197,94,0.1); background: #fff; }
                .create-btn { padding: 11px 22px; font-family: inherit; font-size: 13.5px; font-weight: 600; color: #fff; background: var(--green); border: none; border-radius: var(--radius); cursor: pointer; white-space: nowrap; box-shadow: 0 3px 12px rgba(34,197,94,0.25); transition: background 0.15s, transform 0.15s; }
                .create-btn:hover:not(:disabled) { background: var(--green-dark); transform: translateY(-1px); }
                .create-btn:disabled { opacity: 0.45; cursor: not-allowed; }

                /* DOCS SECTION */
                .docs-section { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
                .docs-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid var(--border); }
                .docs-header-title { font-size: 14px; font-weight: 600; color: var(--text); }
                .docs-count { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); background: var(--bg); border: 1px solid var(--border); padding: 3px 10px; border-radius: 100px; }

                /* DOC CARD */
                .doc-card { border-bottom: 1px solid var(--border); padding: 18px 24px; transition: background 0.12s; display: flex; align-items: center; gap: 12px; }
                .doc-card:last-child { border-bottom: none; }
                .doc-card:hover { background: #f7fdf9; }

                .doc-file-icon { width: 36px; height: 36px; background: var(--green-light); border-radius: 9px; display: grid; place-items: center; font-size: 16px; flex-shrink: 0; }
                .doc-info { flex: 1; min-width: 0; }
                .doc-name { font-size: 14px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
                .doc-meta { display: flex; gap: 16px; flex-wrap: wrap; }
                .doc-meta-item { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--muted); font-weight: 300; }
                .doc-meta-item b { color: #b0c8bc; font-weight: 400; }

                .doc-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

                .open-editor-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 8px 16px;
                    font-family: 'Instrument Sans', sans-serif;
                    font-size: 12.5px; font-weight: 600;
                    color: var(--green-dark); background: var(--green-light);
                    border: 1px solid var(--green-muted); border-radius: 8px;
                    text-decoration: none; white-space: nowrap;
                    transition: background 0.15s, border-color 0.15s, transform 0.15s;
                }
                .open-editor-btn:hover { background: var(--green-muted); border-color: #86efac; transform: translateY(-1px); }

                .share-hint {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 7px 12px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px; color: var(--muted);
                    background: var(--bg); border: 1px solid var(--border);
                    border-radius: 8px; white-space: nowrap;
                }

                /* Empty */
                .docs-empty { padding: 48px 24px; text-align: center; }
                .docs-empty-icon { font-size: 36px; margin-bottom: 12px; }
                .docs-empty-text { font-size: 14px; color: var(--muted); margin-bottom: 4px; font-weight: 500; }
                .docs-empty-sub { font-size: 13px; color: #a0b8ac; }

                @media (max-width: 640px) {
                    .dash-main { padding: 20px; }
                    .dash-stats { grid-template-columns: 1fr; }
                    .doc-card { flex-wrap: wrap; }
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
                            docs.map((doc, index) => (
                                <div className="doc-card" key={index}>
                                    <div className="doc-file-icon">📝</div>
                                    <div className="doc-info">
                                        <div className="doc-name">{doc.docname}</div>
                                        <div className="doc-meta">
                                            <span className="doc-meta-item"><b>ID </b>{doc.id}</span>
                                            <span className="doc-meta-item"><b>By </b>{doc.created_by}</span>
                                            <span className="doc-meta-item">
                                                {new Date(doc.created_at).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="doc-actions">
                                        <Link className="open-editor-btn" to={`/editor/${doc.id}`}>
                                            ✏️ Open Editor
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}