CREATE TABLE Users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Documents (
    id VARCHAR(50) PRIMARY KEY,
    docname VARCHAR(255) NOT NULL,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE Permissions (
    doc_id VARCHAR(50),
    user_id VARCHAR(50),
    role VARCHAR(20) CHECK (role IN ('viewer', 'editor', 'owner')),
    PRIMARY KEY (doc_id, user_id),
    FOREIGN KEY (doc_id) REFERENCES Documents(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);