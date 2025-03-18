import express, { Application } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import { initializeDatabase } from "./config/dbInitializer";
import routes from "./routes"; // Centralized route handling
import { PORT } from "./env";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { logAllRequests } from "./middleware/logRequests";

dotenv.config();

const app: Application = express();

app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// log all requests
app.use(logAllRequests);

// Routes
app.use("/api", routes);

// Global Error Handling Middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to Leads Management Backend");
});

// Start Server
const startServer = async () => {
  try {
    // await sequelize.authenticate();
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();