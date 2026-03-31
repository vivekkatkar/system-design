import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ROLES} from "../utils/constants.jsx"
import { axiosInstance } from "../config/axios.js";

export default function Editor() {
    const { docId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(ROLES.UNAUTHRIZED);
    const [shareOpen, setShareOpen] = useState(false);
    const [sharedUserId, setSharedUserId] = useState("");
    const [shareRole, setShareRole] = useState("");

    const handlePermission = async () => {
        try {
            const res = await axiosInstance.post("/docs/add/permission", { docId, toId: sharedUserId, role: shareRole });

            alert(res.data.message);
            setSharedUserId("");
            setShareRole("");
        } catch (err) {
            console.log(err);
            alert("Error sharing document");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const socket = new WebSocket(
            `ws://localhost:8080?token=${token}&docId=${docId}`
        );

        socket.addEventListener("open", () => {
            socket.send("Hello Server!");
        });

        socket.addEventListener("message", (event) => {
            const msg = event.data;

            if (msg.startsWith("ROLE:")) {
                const role = msg.substring(5);
                setRole(role);
                setLoading(false);
            }

            console.log("Message:", msg);
        });

        socket.addEventListener("close", (event) => {
            console.log("Closed:", event.reason);

            if (role == ROLES.UNAUTHRIZED) {
                setLoading(false);
                if(event.reason) alert(event.reason);
            }
        });

        return () => {
            socket.close();
        };
    }, [docId]);

    /* ── Shared styles ── */
    const sharedStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --green: #22c55e; --green-dark: #16a34a;
            --green-light: #dcfce7; --green-muted: #bbf7d0;
            --bg: #f0fdf4; --bg2: #ffffff; --text: #0f1f17;
            --muted: #6b7c74; --border: #d1fae5; --radius: 10px;
        }
        body { background: var(--bg); }
    `;

    /* ── Loading ── */
    if (loading) {
        return (
            <>
                <style>{`
                    ${sharedStyles}
                    .state-root { min-height: 100vh; background: var(--bg); font-family: 'Instrument Sans', sans-serif; display: flex; flex-direction: column; }
                    .state-topbar { display: flex; align-items: center; gap: 8px; padding: 0 40px; height: 60px; background: var(--bg2); border-bottom: 1px solid var(--border); }
                    .state-logo-mark { width: 26px; height: 26px; background: var(--green); border-radius: 7px; display: grid; place-items: center; color: white; font-size: 12px; font-weight: 700; }
                    .state-logo-text { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
                    .state-body { flex: 1; display: flex; align-items: center; justify-content: center; }
                    .state-card { text-align: center; padding: 48px 56px; background: var(--bg2); border: 1px solid var(--border); border-radius: 18px; box-shadow: 0 8px 40px rgba(34,197,94,0.07); }
                    .spinner { width: 44px; height: 44px; border: 3px solid var(--green-muted); border-top-color: var(--green); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px; }
                    @keyframes spin { to { transform: rotate(360deg); } }
                    .state-title { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
                    .state-sub { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--muted); font-weight: 300; }
                `}</style>
                <div className="state-root">
                    <div className="state-topbar">
                        <div className="state-logo-mark">D</div>
                        <span className="state-logo-text">Docspace</span>
                    </div>
                    <div className="state-body">
                        <div className="state-card">
                            <div className="spinner"></div>
                            <div className="state-title">Checking access...</div>
                            <div className="state-sub">Verifying your permissions for this document</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ── Denied ── */
    if (role == ROLES.UNAUTHRIZED) {
        return (
            <>
                <style>{`
                    ${sharedStyles}
                    .state-root { min-height: 100vh; background: var(--bg); font-family: 'Instrument Sans', sans-serif; display: flex; flex-direction: column; }
                    .state-topbar { display: flex; align-items: center; gap: 8px; padding: 0 40px; height: 60px; background: var(--bg2); border-bottom: 1px solid var(--border); }
                    .state-logo-mark { width: 26px; height: 26px; background: var(--green); border-radius: 7px; display: grid; place-items: center; color: white; font-size: 12px; font-weight: 700; }
                    .state-logo-text { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
                    .state-body { flex: 1; display: flex; align-items: center; justify-content: center; }
                    .denied-card { text-align: center; padding: 48px 56px; background: var(--bg2); border: 1px solid #fecaca; border-radius: 18px; box-shadow: 0 8px 40px rgba(239,68,68,0.06); max-width: 400px; }
                    .denied-icon { width: 52px; height: 52px; background: #fef2f2; border-radius: 50%; display: grid; place-items: center; font-size: 22px; margin: 0 auto 20px; border: 1px solid #fecaca; }
                    .denied-title { font-size: 18px; font-weight: 700; color: #991b1b; margin-bottom: 8px; }
                    .denied-sub { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin-bottom: 28px; }
                    .denied-btn { padding: 10px 24px; font-family: 'Instrument Sans', sans-serif; font-size: 13.5px; font-weight: 600; color: #fff; background: var(--green); border: none; border-radius: var(--radius); cursor: pointer; box-shadow: 0 3px 12px rgba(34,197,94,0.25); transition: background 0.15s, transform 0.15s; }
                    .denied-btn:hover { background: var(--green-dark); transform: translateY(-1px); }
                    .denied-doc-id { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #b0c8bc; margin-top: 20px; }
                `}</style>
                <div className="state-root">
                    <div className="state-topbar">
                        <div className="state-logo-mark">D</div>
                        <span className="state-logo-text">Docspace</span>
                    </div>
                    <div className="state-body">
                        <div className="denied-card">
                            <div className="denied-icon">🔒</div>
                            <div className="denied-title">Access Denied</div>
                            <p className="denied-sub">You don't have permission to view or edit this document. Contact the owner to request access.</p>
                            <button className="denied-btn" onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
                            <div className="denied-doc-id">doc/{docId}</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    /* ── role badge config ── */
    const roleMeta = {
        [ROLES.OWNER]:  { label: "Owner",    bg: "#fef9c3", border: "#fde68a", color: "#92400e", icon: "👑" },
        [ROLES.EDITOR]: { label: "Editor",   bg: "var(--green-light)", border: "var(--green-muted)", color: "var(--green-dark)", icon: "✏️" },
        [ROLES.VIEWER]: { label: "View only", bg: "#f0f9ff", border: "#bae6fd", color: "#0369a1", icon: "👁" },
    };
    const badge = roleMeta[role] ?? roleMeta[ROLES.VIEWER];
    const isReadOnly = role === ROLES.VIEWER;
    const isOwner    = role === ROLES.OWNER;

    /* ── Editor ── */
    return (
        <>
            <style>{`
                ${sharedStyles}

                .editor-root {
                    min-height: 100vh; background: var(--bg);
                    font-family: 'Instrument Sans', sans-serif;
                    color: var(--text); display: flex; flex-direction: column;
                    position: relative;
                }

                /* Topbar */
                .editor-topbar {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0 24px; height: 56px;
                    background: var(--bg2); border-bottom: 1px solid var(--border);
                    position: sticky; top: 0; z-index: 100;
                }
                .editor-topbar-left { display: flex; align-items: center; gap: 10px; }
                .editor-logo-mark { width: 26px; height: 26px; background: var(--green); border-radius: 7px; display: grid; place-items: center; color: white; font-size: 12px; font-weight: 700; }
                .editor-logo-text { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
                .topbar-sep { width: 1px; height: 18px; background: var(--border); }
                .editor-doc-name { font-size: 13.5px; font-weight: 600; color: var(--text); }
                .editor-doc-id { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--muted); font-weight: 300; }
                .editor-topbar-right { display: flex; align-items: center; gap: 8px; }

                /* Role badge */
                .role-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 5px 11px;
                    border-radius: 100px;
                    font-size: 12px; font-weight: 600;
                    background: ${badge.bg}; border: 1px solid ${badge.border}; color: ${badge.color};
                }

                /* Connected badge */
                .topbar-status { display: flex; align-items: center; gap: 6px; padding: 5px 12px; background: var(--green-light); border: 1px solid var(--green-muted); border-radius: 100px; font-size: 12px; font-weight: 600; color: var(--green-dark); }
                .status-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

                /* Share button (owner only) */
                .share-trigger-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 7px 16px;
                    font-family: inherit; font-size: 13px; font-weight: 600;
                    color: #fff; background: var(--green);
                    border: none; border-radius: 8px; cursor: pointer;
                    box-shadow: 0 2px 10px rgba(34,197,94,0.25);
                    transition: background 0.15s, transform 0.15s;
                }
                .share-trigger-btn:hover { background: var(--green-dark); transform: translateY(-1px); }

                .topbar-back-btn { padding: 7px 14px; font-family: inherit; font-size: 12.5px; font-weight: 500; color: var(--muted); background: none; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; transition: color 0.15s, background 0.15s; }
                .topbar-back-btn:hover { color: var(--text); background: var(--bg); }

                /* Toolbar */
                .editor-toolbar {
                    display: flex; align-items: center; gap: 4px;
                    padding: 8px 24px; background: var(--bg2);
                    border-bottom: 1px solid var(--border); flex-wrap: wrap;
                }
                .toolbar-group { display: flex; align-items: center; gap: 2px; padding-right: 10px; margin-right: 6px; border-right: 1px solid var(--border); }
                .toolbar-group:last-child { border-right: none; }
                .toolbar-btn { width: 30px; height: 30px; display: grid; place-items: center; background: none; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--muted); transition: background 0.12s, color 0.12s; font-family: 'Instrument Sans', sans-serif; font-weight: 600; }
                .toolbar-btn:hover:not(:disabled) { background: var(--green-light); color: var(--green-dark); }
                .toolbar-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                .toolbar-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #b0c8bc; font-weight: 300; letter-spacing: 0.06em; text-transform: uppercase; padding: 0 4px; }

                /* Readonly banner */
                .readonly-banner {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 24px;
                    background: #f0f9ff; border-bottom: 1px solid #bae6fd;
                    font-size: 13px; color: #0369a1; font-weight: 500;
                }
                .readonly-banner-icon { font-size: 15px; }

                /* Body */
                .editor-body { flex: 1; display: flex; padding: 40px 24px; max-width: 860px; width: 100%; margin: 0 auto; }

                /* Paper */
                .editor-paper {
                    width: 100%; min-height: 560px;
                    background: var(--bg2); border: 1px solid var(--border);
                    border-radius: 14px; padding: 40px 48px;
                    box-shadow: 0 4px 24px rgba(34,197,94,0.06);
                    outline: none;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 14px; font-weight: 400; color: var(--text); line-height: 1.8;
                    resize: none;
                    transition: box-shadow 0.15s, border-color 0.15s;
                }
                .editor-paper::placeholder { color: #b0c8bc; }
                .editor-paper:focus:not([readonly]) { border-color: var(--green-muted); box-shadow: 0 4px 32px rgba(34,197,94,0.1); }
                .editor-paper[readonly] { background: #fafffe; cursor: default; color: #374151; }

                /* Footer */
                .editor-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 24px; border-top: 1px solid var(--border); background: var(--bg2); }
                .footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: #b0c8bc; font-weight: 300; }
                .footer-save-btn { padding: 8px 20px; font-family: inherit; font-size: 13px; font-weight: 600; color: #fff; background: var(--green); border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 10px rgba(34,197,94,0.25); transition: background 0.15s, transform 0.15s; }
                .footer-save-btn:hover { background: var(--green-dark); transform: translateY(-1px); }

                /* ── Share Modal (Google Docs style) ── */
                .share-overlay {
                    position: fixed; inset: 0; z-index: 200;
                    background: rgba(15, 31, 23, 0.35);
                    backdrop-filter: blur(3px);
                    display: flex; align-items: center; justify-content: center;
                    padding: 24px;
                }

                .share-modal {
                    background: var(--bg2);
                    border: 1px solid var(--border);
                    border-radius: 18px;
                    width: 100%; max-width: 480px;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.12);
                    overflow: hidden;
                    animation: modal-in 0.18s ease;
                }

                @keyframes modal-in {
                    from { opacity: 0; transform: scale(0.96) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }

                .share-modal-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 20px 24px 16px;
                    border-bottom: 1px solid var(--border);
                }

                .share-modal-title {
                    font-size: 15px; font-weight: 700; color: var(--text);
                    letter-spacing: -0.01em;
                }

                .share-modal-doc-id {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px; color: var(--muted); font-weight: 300;
                    margin-top: 2px;
                }

                .share-modal-close {
                    width: 30px; height: 30px; display: grid; place-items: center;
                    background: none; border: none; border-radius: 7px;
                    cursor: pointer; font-size: 16px; color: var(--muted);
                    transition: background 0.12s, color 0.12s;
                }
                .share-modal-close:hover { background: var(--bg); color: var(--text); }

                .share-modal-body { padding: 20px 24px 24px; }

                .share-field-label {
                    font-size: 11.5px; font-weight: 600; color: var(--text);
                    margin-bottom: 6px; letter-spacing: 0.01em;
                }

                .share-modal-input {
                    width: 100%; padding: 10px 14px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 13px;
                    background: var(--bg); color: var(--text);
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius); outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                    margin-bottom: 14px;
                }
                .share-modal-input::placeholder { color: #a7c4b0; }
                .share-modal-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(34,197,94,0.1); background: #fff; }

                .share-role-row {
                    display: flex; gap: 10px; margin-bottom: 20px;
                }

                .share-role-option {
                    flex: 1; padding: 10px 12px;
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius);
                    cursor: pointer; text-align: center;
                    transition: border-color 0.15s, background 0.15s;
                    background: var(--bg);
                }
                .share-role-option:hover { border-color: var(--green-muted); background: var(--green-light); }
                .share-role-option.selected { border-color: var(--green); background: var(--green-light); }

                .share-role-icon { font-size: 18px; margin-bottom: 4px; }
                .share-role-name { font-size: 12.5px; font-weight: 600; color: var(--text); }
                .share-role-desc { font-size: 10.5px; color: var(--muted); margin-top: 2px; font-family: 'JetBrains Mono', monospace; font-weight: 300; }

                .share-modal-footer {
                    display: flex; gap: 8px; justify-content: flex-end;
                    padding-top: 4px;
                }

                .share-cancel-btn {
                    padding: 9px 20px; font-family: inherit; font-size: 13.5px; font-weight: 500;
                    color: var(--muted); background: none; border: 1px solid var(--border);
                    border-radius: 8px; cursor: pointer; transition: color 0.15s, background 0.15s;
                }
                .share-cancel-btn:hover { color: var(--text); background: var(--bg); }

                .share-confirm-btn {
                    padding: 9px 24px; font-family: inherit; font-size: 13.5px; font-weight: 600;
                    color: #fff; background: var(--green); border: none; border-radius: 8px;
                    cursor: pointer; box-shadow: 0 3px 12px rgba(34,197,94,0.25);
                    transition: background 0.15s, transform 0.15s;
                }
                .share-confirm-btn:hover:not(:disabled) { background: var(--green-dark); transform: translateY(-1px); }
                .share-confirm-btn:disabled { opacity: 0.45; cursor: not-allowed; }
            `}</style>

            <div className="editor-root">

                {/* Topbar */}
                <div className="editor-topbar">
                    <div className="editor-topbar-left">
                        <div className="editor-logo-mark">D</div>
                        <span className="editor-logo-text">Docspace</span>
                        <div className="topbar-sep"></div>
                        <div>
                            <div className="editor-doc-name">Document</div>
                            <div className="editor-doc-id">{docId}</div>
                        </div>
                    </div>
                    <div className="editor-topbar-right">
                        {/* Role badge */}
                        <div className="role-badge">
                            <span>{badge.icon}</span>
                            {badge.label}
                        </div>

                        {/* Connected */}
                        <div className="topbar-status">
                            <span className="status-dot"></span>
                            Connected
                        </div>

                        {/* Share (owner only) */}
                        {isOwner && (
                            <button className="share-trigger-btn" onClick={() => setShareOpen(true)}>
                                🔗 Share
                            </button>
                        )}

                        <button className="topbar-back-btn" onClick={() => navigate("/dashboard")}>
                            ← Dashboard
                        </button>
                    </div>
                </div>

                {/* Toolbar — disabled for viewer */}
                <div className="editor-toolbar">
                    <div className="toolbar-group">
                        <span className="toolbar-label">Format</span>
                        <button className="toolbar-btn" disabled={isReadOnly} title="Bold"><b>B</b></button>
                        <button className="toolbar-btn" disabled={isReadOnly} title="Italic"><i>I</i></button>
                        <button className="toolbar-btn" disabled={isReadOnly} title="Underline"><u>U</u></button>
                    </div>
                    <div className="toolbar-group">
                        <span className="toolbar-label">Heading</span>
                        <button className="toolbar-btn" disabled={isReadOnly} title="H1">H1</button>
                        <button className="toolbar-btn" disabled={isReadOnly} title="H2">H2</button>
                        <button className="toolbar-btn" disabled={isReadOnly} title="H3">H3</button>
                    </div>
                    <div className="toolbar-group">
                        <span className="toolbar-label">Insert</span>
                        <button className="toolbar-btn" disabled={isReadOnly} title="Link">🔗</button>
                        <button className="toolbar-btn" disabled={isReadOnly} title="Image">🖼</button>
                        <button className="toolbar-btn" disabled={isReadOnly} title="Code">{"<>"}</button>
                    </div>
                </div>

                {/* Read-only banner */}
                {isReadOnly && (
                    <div className="readonly-banner">
                        <span className="readonly-banner-icon">👁</span>
                        You have view-only access to this document. Contact the owner to request edit access.
                    </div>
                )}

                {/* Writing area */}
                <div className="editor-body">
                    <textarea
                        className="editor-paper"
                        placeholder={isReadOnly ? "This document is read-only." : "Start writing your document here..."}
                        readOnly={isReadOnly}
                    />
                </div>

                {/* Footer */}
                <div className="editor-footer">
                    <span className="footer-meta">doc / {docId} · connected via WebSocket</span>
                    {!isReadOnly && (
                        <button className="footer-save-btn">Save</button>
                    )}
                </div>

                {/* Share Modal — owner only */}
                {isOwner && shareOpen && (
                    <div className="share-overlay" onClick={(e) => e.target === e.currentTarget && setShareOpen(false)}>
                        <div className="share-modal">
                            <div className="share-modal-header">
                                <div>
                                    <div className="share-modal-title">Share document</div>
                                    <div className="share-modal-doc-id">doc / {docId}</div>
                                </div>
                                <button className="share-modal-close" onClick={() => setShareOpen(false)}>✕</button>
                            </div>
                            <div className="share-modal-body">

                                <div className="share-field-label">User ID</div>
                                <input
                                    className="share-modal-input"
                                    placeholder="Enter the user ID to share with..."
                                    value={sharedUserId}
                                    onChange={(e) => setSharedUserId(e.target.value)}
                                />

                                <div className="share-field-label" style={{marginBottom: '10px'}}>Access level</div>
                                <div className="share-role-row">
                                    <div
                                        className={`share-role-option ${shareRole === "editor" ? "selected" : ""}`}
                                        onClick={() => setShareRole("editor")}
                                    >
                                        <div className="share-role-icon">✏️</div>
                                        <div className="share-role-name">Editor</div>
                                        <div className="share-role-desc">Can edit</div>
                                    </div>
                                    <div
                                        className={`share-role-option ${shareRole === "viewer" ? "selected" : ""}`}
                                        onClick={() => setShareRole("viewer")}
                                    >
                                        <div className="share-role-icon">👁</div>
                                        <div className="share-role-name">Viewer</div>
                                        <div className="share-role-desc">Read only</div>
                                    </div>
                                </div>

                                <div className="share-modal-footer">
                                    <button className="share-cancel-btn" onClick={() => setShareOpen(false)}>Cancel</button>
                                    <button
                                        className="share-confirm-btn"
                                        disabled={!sharedUserId || !shareRole}
                                        onClick={() => { handlePermission(); setShareOpen(false); }}
                                    >
                                        Grant access
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}