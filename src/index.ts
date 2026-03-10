import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";


import authRoutes from "./routes/auth";
import doctorRoutes from "./routes/doctors";
import appointmentRoutes from "./routes/appointments";
import symptomRoutes from "./routes/symptoms";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/users";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// маршрути
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// тестовий маршрут
app.get("/", (req, res) => {
  res.json({ message: "Clinic API працює!" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});