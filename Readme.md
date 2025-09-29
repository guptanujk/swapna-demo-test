# 🚀 Q-Insurance App — Local Deployment Guide

This project includes:

- **Frontend**: React/Vite app served via `serve`  
- **Backend**: Express + Swagger API with PBKDF2 authentication  
- **Database**: MySQL 8.0.33  

---

## 📦 Tech Stack

| Component     | Version   | Description                          |
|--------------|-----------|--------------------------------------|
| Node.js      | 22.12.0    | Used in both frontend & backend      |
| MySQL        | 8.0.33     | Dockerized with persistent volume    |
| Frontend Port| 80         | Accessible via browser               |
| Backend Port | 3001       | API base URL: http://localhost:3001  |
| MySQL Port   | 3306       | Internal DB access only              |

---

## 🔐 MySQL Credentials

```env
MYSQLHOST=mysql-db
MYSQLUSER=teduser
MYSQLPASSWORD=TedQ!ntelli!2022
MYSQLPORT=3306
MYSQLDATABASE=accelq_q_insurance
📧 SMTP Configuration
env
SMTPHOST=smtp.office365.com
SMTPPORT=587
SMTPUSERNAME=donotreply@qentelli.io
SMTPPASSWORD="H7G##w(8aQdH@$%1qASb"
🔐 Backend Environment Variables
env
PORT=3001
BASEURL=http://localhost:3001
FEBASEURL=http://localhost:5173
NODE_PORT=3001
NODE_ENV=development

ALLOWED_ORIGINS=http://localhost:5173
JWTSECRETKEY=qentelli12345678
ENCRYPTION_KEY=testqaencryption
ENABLECOOKIE=true
COOKIE_DOMAIN=localhost
🌐 Frontend Environment Variable
env
VITE_API_BASE_URL=http://backend-container:3001
Make sure this is set before building the frontend.

🐳 Docker Setup
Step 1: Install Docker & Docker Compose
bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
Verify installation:

bash
docker --version
docker-compose --version
Step 2: Clone and Navigate
bash
git clone https://github.com/your-username/q-insurance-app.git
cd q-insurance-app
Step 3: Launch the App
bash
docker-compose up --build -d
This will:

Build frontend and backend images

Start MySQL with seeded schema

Serve frontend on port 80

Expose backend API on port 3001

✅ Access Points
Frontend: http://localhost

Backend Health Check: http://localhost:3001/healthCheck

Login API: POST /api/user/login

Forgot Password API: POST /api/user/forgotpassword (if implemented)

🧪 Troubleshooting
If backend fails to connect to MySQL, wait a few seconds — it retries automatically

If frontend shows blank or fails to fetch, check VITE_API_BASE_URL and rebuild

Use docker logs backend-container to inspect backend errors

📁 Repo Structure
Code
project-root/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── .env
├── frontend/
│   └── Dockerfile
├── threetierapp/
🛡️ Notes
Make sure .env files are present before building

Sensitive credentials should be rotated before production deployment

Use HTTPS and domain-based CORS in production

Code

Paste this directly into your `README.md` file — it’ll render perfectly with table
