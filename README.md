# 🖥️ Live Device Monitoring Dashboard

A real-time device monitoring dashboard built with **MERN stack + MySQL** that simulates live device statuses, allows audio playback of recorded communication, and includes advanced filtering, pagination, and routing.

---

## 🚀 Features

- 📡 **Live Device Updates** every second via WebSocket
- 🎛️ 20 Device Cards with 3 Lines + 1 Radio per device
- 🔁 **CSS-only Pagination** (8 devices per page)
- 📼 **Recordings Page** with:
  - Date Picker
  - SYNC / RELOAD / FILTER controls
  - Audio playback
- 🔍 **Advanced Filtering** by line, in/out, and duration
- 🧠 **MySQL-backed** metadata and local `.mp3` storage

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router DOM
- Socket.IO Client
- React DatePicker

### Backend

- Node.js + Express
- MySQL (with mysql2)
- Socket.IO Server
- dotenv + CORS

---

## 📂 Folder Structure

```
.
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── recordings.js
│   ├── models/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── recordings/
│   │   ├── cinematic-designed-sci-fi-whoosh-transition-nexawave-228295.mp3
│   │   ├── relaxing-guitar-loop-v5-245859.mp3
│   │   ├── sample-12s.mp3
│   │   ├── sample-15s.mp3
│   │   ├── sample-6s.mp3
│   │   └── sample-9s.mp3
│   ├── routes/
│   │   └── recordings.js
│   ├── server.js
│   ├── socket/
│   │   └── deviceSocket.js
│   └── .env
├── frontend/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── vite.svg
│   ├── README.md
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   └── DeviceCard.jsx
│   │   ├── index.css
│   │   ├── lib/
│   │   │   └── socket.js
│   │   ├── main.jsx
│   │   └── pages/
│   │       ├── DashboardPage.jsx
│   │       └── RecordingsPage.jsx
│   └── vite.config.js
├── LICENSE
├── README.md
```

---

## 📑 API Endpoints

### REST Endpoints

- `GET /api/recordings?deviceId=<id>&date=<YYYY-MM-DD>`

  - Returns: List of recordings for a device (optionally filtered by date)
  - Example: `/api/recordings?deviceId=1&date=2025-07-12`

- `GET /recordings/<filename>.mp3`
  - Returns: Serves the requested .mp3 recording file
  - Example: `/recordings/sample-12s.mp3`

### WebSocket Events

- Connect to: `ws://<server>:<port>`
- Event: `devicePackets`
  - Description: Emits an array of device status packets every second
  - Example payload:
    ```json
    [
      {
        "deviceId": 1,
        "voltage": "13.45",
        "channel": "A2",
        "timestamp": "2025-07-12T12:34:56.789Z",
        "lines": [
          { "line": 1, "status": "ACTIVE" },
          { "line": 2, "status": "IDLE" },
          { "line": 3, "status": "ACTIVE" }
        ],
        "radio": { "channel": "R1", "status": "ON" }
      }
    ]
    ```

---

## 🧪 How It Works

1. Backend simulates device packets every second using Socket.IO
2. Frontend receives and updates 20 device cards live
3. Each card has a “Recordings” button → navigates to filtered list
4. Recordings can be:
   - Filtered by date, line, in/out, duration
   - Played via in-browser `<audio>` player

---

## 🚧 Project Progress

- [x] Create GitHub repo and initial folder structure
- [x] Backend: Setup Express server
- [x] Backend: Connect MySQL and create `recordings` table
- [x] Backend: Serve audio files from `recordings/` folder
- [x] Backend: Setup WebSocket for live updates
- [x] Frontend: React app setup with Vite
- [x] Frontend: Dashboard page with 20 device cards
- [x] Frontend: CSS-only pagination (8 devices per page)
- [x] Frontend: WebSocket client to receive live status
- [x] Frontend: Recordings page with filters and audio player
- [x] Recordings: Full filter system and live reload
- [x] Testing, bug fixes, and final polish

---

## 🧠 Author

👨‍💻 Made with 💡 by Jaikesh Kain  
📫 Reach me at kainjaikesh@gmail.com
🌐 GitHub: @Jaikeshkain (https://github.com/Jaikeshkain)
