import sequelize from "./database";

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    await sequelize.sync({ alter: true }); // Safely updates the schema
    console.log("🔄 Database synced successfully.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error; // Ensure the server does not start if DB fails
  }
};
