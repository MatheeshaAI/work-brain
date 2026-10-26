# Lead Dashboard

A simple local dashboard for viewing leads, adding comments, and uploading documents tied to the existing `Leads/` and `Documents/` folders.

## Setup

1. Open a terminal in `Dashboard/`.
2. Run `npm install`.
3. Start the server with `npm start`.
4. Open `http://localhost:4000` in your browser.

## Features

- Browse leads loaded from `Leads/*.md`
- View lead metadata and document folder location
- Add comments directly into the lead markdown under `## Comments`
- Upload documents into the matching `Documents/[Lead Name] - [REF_ID]/` folder
- Document links are served from the existing `Documents/` directory
