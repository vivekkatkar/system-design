
* Feature :
    1. Real time editing

    2. Share documents 

    3. Conflict Resolution 

    4. Handle Live cursor position 

    5. Store snapshots 


* Frontend
    1. Signin / Signup 

    2. List Documents

    3. Create Doc 

    4. Share Doc


* Primary-Backend 
    1. User Related endpoints

    2. Create, delete share docs endpoints


* WebSocket Server
    1. Handles users updating same document

    2. Send doc update events to kafka which are then processed by worker to update final state of document

