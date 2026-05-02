# Hospital Management System

A microservices-based Hospital Management System built with React (frontend) and Node.js (backend).

## Project Structure

```
hospital-management/
├── frontend/                  # React frontend (Vite)
├── api-gateway/               # API Gateway (port 5000)
├── user-service/              # User auth service (port 5001)
├── patient-service/           # Patient management service (port 5002)
├── appointment-service/       # Appointment service (port 5003)
├── notification-service/      # Notification service (port 5004)
└── docker-compose.yml
```

## Microservices

| Service              | Port | Description                        |
|----------------------|------|------------------------------------|
| API Gateway          | 5000 | Routes all requests to services    |
| User Service         | 5001 | Register, Login, Auth (JWT)        |
| Patient Service      | 5002 | Add, view, update patients         |
| Appointment Service  | 5003 | Schedule and view appointments     |
| Notification Service | 5004 | Simple notification logging        |
| Frontend             | 5173 | React + Vite UI                    |

## Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- npm

## Setup & Run

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd hospital-management
```

### 2. Install dependencies for each service

```bash
cd api-gateway && npm install && cd ..
cd user-service && npm install && cd ..
cd patient-service && npm install && cd ..
cd appointment-service && npm install && cd ..
cd notification-service && npm install && cd ..
cd frontend && npm install && cd ..
```

### 3. Configure environment variables

Each service has a `.env` file. Update MongoDB URI and JWT secret as needed.

### 4. Start each service (in separate terminals)

```bash
# Terminal 1
cd D:\hospital-management\user-service
npm install
npm start

# Terminal 2
cd D:\hospital-management\patient-service
npm install
npm start

# Terminal 3
cd D:\hospital-management\notification-service
npm install
npm start

# Terminal 4
cd D:\hospital-management\api-gateway
npm install
npm start

# Terminal 5
cd D:\hospital-management\frontend
npm install
npm run dev


```

### 5. Open browser

```
http://localhost:5173
```

## Default Credentials (after registering)

Register a new account via the UI, then log in.

### final website preview
```
Registor
```
<img width="1919" height="951" alt="Screenshot 2026-05-02 111546" src="https://github.com/user-attachments/assets/2beb2580-9d57-4226-8516-961c9b69a9c4" />

```
staff section
```
<img width="1919" height="725" alt="Screenshot 2026-05-02 111742" src="https://github.com/user-attachments/assets/3f527caf-d993-4b71-9e1d-ec6b82f26bae" />
<img width="1919" height="739" alt="Screenshot 2026-05-02 111704" src="https://github.com/user-attachments/assets/9c939191-0dca-4aa7-bba5-498e9d51f9d4" />
<img width="1919" height="885" alt="Screenshot 2026-05-02 111611" src="https://github.com/user-attachments/assets/8becd0cf-d844-4c28-a39d-7f59d19bae83" />

```
mongodb section
```
<img width="1916" height="944" alt="Screenshot 2026-05-02 112256" src="https://github.com/user-attachments/assets/a6893fde-d301-4c7d-89ee-54baa9724185" />
<img width="1919" height="939" alt="image" src="https://github.com/user-attachments/assets/ab790dca-d292-4aae-95e5-ae0195065d18" />
```
User mongodb
```
<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/897a17ca-582a-4b5a-b3d2-22adfe3ac69d" />

