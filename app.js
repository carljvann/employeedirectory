import express from "express";
import employees from "./db/employees.js";

const app = express();

// Middleware
app.use(express.json());

// Routes

// Root route
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// Get random employee - MUST come before /employees/:id
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// Get employee by ID
app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(employee);
});

export default app;
