import e from "express";
import cors from "cors";
import { eventRoute } from "./routes/event.js";

const app = e();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(e.json());
app.use("/api/v1/event", eventRoute);

app.listen(7000, () => console.log("AI server is running on 7000 port"));
