---
## **Project Requirements: MERN Task Management Application (Tasko)**

### **1. Project Overview** 📝

The goal is to build a full-stack web application using the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to manage their tasks effectively. The application will be a Single Page Application (SPA) providing a fast, responsive, and intuitive user experience. Users will be able to register, log in, create projects, and manage tasks within those projects.

* **Project Name:** TaskFlow (or a name of your choice)
* **Objective:** To provide a simple yet powerful platform for individual and team task management.
* **Target Audience:** Individuals, students, and small teams needing to organize their work and track progress.
---

### **2. Core Features (Functional Requirements)**

These are the key functionalities the application must have.

#### **User Authentication & Profile Management**

- **User Registration:** Users must be able to create a new account using a name, email, and password. Passwords must be securely hashed before being stored in the database.
- **User Login:** Registered users must be able to log in using their email and password.
- **Session Management:** The system will use **JSON Web Tokens (JWT)** for secure authentication and to keep users logged in across sessions.
- **User Logout:** Users must have a clear option to log out.
- **Profile:** Users should be able to view and (optionally) update their basic profile information (e.g., name).

#### **Project / Board Management**

- **Create Project:** Authenticated users can create "Projects" or "Boards" to group related tasks (e.g., "University Project," "Marketing Campaign").
- **View Projects:** Users can see a list of all projects they have created or are a part of.
- **Update/Delete Project:** Users can rename or delete their projects. Deleting a project will also delete all associated tasks.

#### **Task Management (CRUD Operations)**

- **Create Task:** Within a project, users can create a new task. Each task will have the following properties:
  - `title` (String, Required)
  - `description` (String, Optional)
  - `status` (Enum: 'To-Do', 'In Progress', 'Done' - with 'To-Do' as default)
  - `priority` (Enum: 'Low', 'Medium', 'High' - with 'Medium' as default)
  - `dueDate` (Date, Optional)
- **Read/View Tasks:** Users can view all tasks within a selected project, typically organized by their `status` in columns (like a Kanban board).
- **Update Task:** Users can edit any property of a task. A key feature will be the ability to **drag and drop** tasks between status columns (e.g., from 'To-Do' to 'In Progress').
- **Delete Task:** Users can delete tasks they no longer need.

#### **Search and Filtering**

- **Search:** A search bar to find tasks by their `title` or `description`.
- **Filter:** Options to filter tasks within a project based on `priority` or `dueDate`.

---

### **3. Technical Requirements (Non-Functional)**

This section defines the technical stack and system-wide standards.

#### **Technology Stack**

- **Frontend:** **React** (using Hooks and functional components).
  - **State Management:** React Context API or Redux Toolkit.
  - **Routing:** React Router.
  - **HTTP Client:** Axios for making API calls.
  - **UI/Styling:** A component library like **Material-UI** or a utility-first CSS framework like **Tailwind CSS**.
- **Backend:** **Node.js** with the **Express.js** framework.
  - **API:** A well-structured **RESTful API** will be created to handle all client-server communication.
  - **Authentication:** `jsonwebtoken` for creating/verifying JWTs and `bcrypt.js` for password hashing.
- **Database:** **MongoDB** (NoSQL database).
  - **ODM:** **Mongoose** to define schemas and interact with the MongoDB database.
- **Deployment (Optional):** Heroku, Vercel (for frontend), or a cloud provider like AWS/DigitalOcean.

#### **System Qualities** 🔐

- **Security:** Implement validation on both client and server sides. Protect API routes to ensure only authenticated users can access their data.
- **Usability:** The application must have a clean, intuitive, and **responsive design** that works well on both desktop and mobile devices.
- **Performance:** The application should load quickly and respond smoothly to user interactions. API responses should be fast and efficient.

---

### **4. Project Phases & MVP (Minimum Viable Product)** 🚀

To manage development, the project can be broken down into phases.

#### **Phase 1: The MVP**

The goal of the MVP is to have a core, working product as quickly as possible.

1.  **Backend Setup:** Set up Node.js/Express server, connect to MongoDB, and create Mongoose schemas for Users and Tasks.
2.  **User Authentication:** Implement Register, Login (with JWT), and Logout API endpoints.
3.  **Basic Task CRUD:** Create API endpoints for creating, reading, updating, and deleting tasks (without projects for now).
4.  **Frontend Setup:** Set up a basic React application.
5.  **Core UI:** Create pages for Login, Register, and a main Task Dashboard. Implement basic task creation and display functionality.

#### **Phase 2: Adding Core Features**

Once the MVP is stable, add the next layer of key features.

1.  **Project/Board Functionality:** Implement the Project model and associated API endpoints.
2.  **UI for Projects:** Allow users to create and switch between different project boards.
3.  **Kanban View:** Display tasks in columns based on their status ('To-Do', 'In Progress', 'Done').
4.  **Drag and Drop:** Implement drag-and-drop functionality to change a task's status.
5.  **Refine UI:** Improve the overall look and feel of the application.

#### **Phase 3: Future Enhancements (Post-MVP)**

These are features to consider for future versions.

- **Collaboration:** Allow users to invite others to their projects.
- **Task Assignment:** Assign tasks to specific users within a project.
- **Comments:** Add a comment section to each task.
- **Notifications:** Implement real-time notifications (e.g., when a task is assigned to you or a due date is approaching).
- **File Attachments:** Allow users to attach files to tasks.
