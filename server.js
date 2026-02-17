import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


// ================= DATABASE =================
connectDB();


// ================= SECURITY =================
app.use(helmet({ hidePoweredBy: true }));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10000,
});
app.use(limiter);


// ================= CORS (Single Source) =================
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "http://localhost:5173",
      "http://localhost:3000",
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);


// ================= BODY PARSING =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  })
);


// ================= STATIC =================
app.use(express.static("public"));


// ================= ROUTES =================
app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running." });
});


// ================= ERROR HANDLER =================
app.use(errorHandler);


// ================= START SERVER =================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
