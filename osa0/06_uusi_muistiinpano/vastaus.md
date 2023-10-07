```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    browser-->>server: New note
        Note right of browser: Sending a new note to the server. Browser rerenders notes list containing the new note without reloading the page
    deactivate server
```
