import express from "express";
import employees from "./db/employees.js";
import employeesRouter from "./routes/employees.js";

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

// Use employees router
app.use("/employees", employeesRouter);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
