# 1) Create project folders

mkdir react-nodejs
cd react-nodejs
mkdir backend
mkdir frontend

# 2) Backend Setup (Node.js + Express)

react-nodejs/backend/index.js

cd backend
npm init -y
npm install express cors

3. Frontend Setup (ReactJS)

Create React App

cd ../frontend
npx create-react-app .

Update App.js (with current code)

4. Run the App

Terminal 1: Start Backend
cd backend
node index.js

Terminal 2: Start Frontend

cd frontend
npm start

The app will be available at http://localhost:3000, and the backend at http://localhost:5000.