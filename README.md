# My Swedish Wordle Game
I have developed a Wordle game in Swedish with a React and TypeScript frontend. The backend is built with Node.js and Express, also written in TypeScript. By utilizing the TSX module, the server is transpiled and executed on the fly, eliminating the need for a separate manual transpilation step with `tsc` during development.

This project is part of the "JavaScript - Fullstack" course within the "System Developer - JavaScript - Java" program at Lernia YH in Piteå.

### Tech Stack
* **Frontend:** Built with React, TypeScript, and Sass, using Vite as the development server. Production-ready code is bundled and transpiled using `vite build`.

*  **Backend:** Powered by Node.js and Express, using EJS as the template engine and Mongoose for MongoDB database management.

* **Architecture:** The word list and core backend logic (testing and word selection) are maintained in separate Git submodules. 

### MongoDB

This project uses MongoDB as its database.

### Installation & Setup
To clone this repository along with its dependencies, use the following command:

*Since this project uses Git submodules for the word list and core logic, you need to include the `--recursive` flag:*  

```bash
git clone --recursive  https://github.com/anteman-swe/wordle-fullstack.git
```
**Note for Forking:** If you fork this repository, remember to clone it using the `--recursive` flag to include the submodules. If you've already cloned without it, you can initialize and fetch them by running: 
```bash
git submodule update --init --recursive  
```
You can install MongoDB locally or use MongoDB Atlas for a cloud-based solution. Once set up, add your connection string to your `.env` file.

##### Environment Variables (`.env`)
To ensure security and flexibility, use environment variables to store sensitive information like your connection string. Create a `.env` file (refer to `.env_example` for guidance) and add:

```code
MONGODB_URI=mongodb://localhost:27017/your-database-name
```
Note: *Always ensure* `.env` *is included in your* `.gitignore` *to prevent sensitive data from being pushed to your repository.*

### Development, Frontend and Backend
Install the necessary dependencies:
```bash
npm install
```
To run both the backend and frontend simultaneously during development:
```bash
npm run dev
```
To start the backend server only:
```bash
npm run backend
```
To start the Vite development server for the frontend only:
```bash
npm run frontend
```

---

 



