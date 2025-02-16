# **Article Management System**  

A **full-stack** application for managing articles, built with **Flask (backend)** and **React (frontend)**.

---

## **Backend (Flask)**
The backend is built using **Flask** with **SQLAlchemy** for database management. It provides APIs for **creating, updating, deleting, and retrieving articles**.

### **Setup Instructions**
#### **1. Create the Database**
Make sure **MySQL** is installed and running. Create a database named `posts`:  

```sql
CREATE DATABASE posts;
```

#### **2. Configure Database Credentials**
Update the **database configuration** in `config.py` with your **MySQL username, password, host, and port**:

```python
DB_USERNAME = "your_username"
DB_PASSWORD = "your_password"
DB_HOST = "localhost"  # Change if needed
DB_NAME = "posts"
DB_PORT = 3306  # Default MySQL port
```

#### **3. Create a Virtual Environment**
Navigate to the backend folder and create a virtual environment:

```sh
python -m venv venv
```

Activate the virtual environment:  
- **Windows:**  
  ```sh
  venv\Scripts\activate
  ```
- **macOS/Linux:**  
  ```sh
  source venv/bin/activate
  ```

#### **4. Install Dependencies**
Install all required Python packages from `requirements.txt`:

```sh
pip install -r requirements.txt
```

#### **5. Migrate Database**
Run this command to create all the tables in database:

```sh
flask db upgrade
```

#### **6. Start the Flask Server**
Run the backend server on port **3000**:

```sh
flask run -p 3000
```

---

## **Frontend (React)**
The frontend is built with **React (Vite)** and **Material UI** for styling.

### **Setup Instructions**
#### **1. Install Dependencies**
Navigate to the frontend folder and install all required npm packages:

```sh
npm install
```

#### **2. Start the Development Server**
Run the frontend on port **5173**:

```sh
npm run dev
```

#### **3. Access the Application**
Once both the backend and frontend are running, open your browser and go to:

```
http://localhost:5173
```

---

## **Project Structure**
```
/backend        # Flask backend
  ├── app.py    # Main Flask app
  ├── config.py # Database config
  ├── models.py # SQLAlchemy models
  ├── routes.py # API routes
  ├── venv/     # Virtual environment (ignored in git)
  ├── migrations/ # Alembic migrations
  └── requirements.txt # Dependencies

/frontend       # React frontend
  ├── src/
  │   ├── components/ # UI components
  │   ├── pages/      # Page views
  │   ├── api/        # API functions
  │   ├── App.jsx     # Main React app
  │   ├── main.jsx    # Entry point
  ├── public/         # Static assets
  ├── package.json    # Dependencies
  └── vite.config.js  # Vite configuration
```