# Train Simulator

A full-stack project with separate frontend and backend applications.  
Uses [pnpm](https://pnpm.io/) for fast and efficient package management.


Train Simulator is a web-based application designed to simulate real-time train operations, schedules, and station management. The project provides both a modern frontend (React, Vite, MUI) and a robust backend (Express, WebSocket), allowing users to visualize train movements, interact with simulation data, and manage train-related scenarios. It serves as a learning tool for transportation planning, train scheduling, and software architecture in real-time systems.

Features:

Interactive train simulation on a map or track
Real-time data updates via WebSocket
Schedule management and train control
Multilingual UI support (i18next)
Clean material-based design (MUI)
Use Cases:

Education: Teach scheduling, dispatching, and train operations.
Planning: Prototype and test train station layouts or schedules.
Demonstration: Showcase real-time data flows and modern full-stack practices.


---

## Project Structure

```
trainSimulator/
│
├── backend/      # Express.js server (API & WebSocket)
└── frontend/     # React + Vite client
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (Install via `npm i -g pnpm`)

---

### 1. Install Dependencies

From the root of your project, run:

```sh
pnpm install
```

Or install dependencies for each app:

```sh
cd frontend
pnpm install

cd ../backend
pnpm install
```

---

### 2. Running the Apps

#### Frontend

```sh
cd frontend
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) (default Vite port).

#### Backend

```sh
cd backend
pnpm dev
```

> Starts the Express server with live reload (nodemon).  
> Default port: `3000`

---

## Scripts Reference

### Frontend (`frontend/package.json`)

- **`dev`**: Start Vite dev server
- **`build`**: TypeScript build & production build
- **`lint`**: Run ESLint
- **`preview`**: Preview production build

### Backend (`backend/package.json`)

- **`start`**: Start server (node)
- **`dev`**: Start server with nodemon

---

## Tech Stack

**Frontend:**  
- React 19, Vite, MUI, Emotion, i18next

**Backend:**  
- Express 5, WebSocket (ws), CORS

---


## Author

Rakesh Esi
