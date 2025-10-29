import express from "express";
import employees from "../db/employees.js";

const router = express.Router();

// Get random employee - MUST come before /:id
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// Get all employees
router.get("/", (req, res) => {
  res.json(employees);
});

// Add new employee
router.post("/", (req, res) => {
  const { name } = req.body;

  // Validate request body
  if (!req.body || !name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  // Create new employee with unique ID
  const newEmployee = {
    id: employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1,
    name: name.trim(),
  };

  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

// Get employee by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(employee);
});

export default router;
