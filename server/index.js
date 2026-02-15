const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();

// ✅ Railway dynamic port
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Yoga AI Trainer Backend Running 🚀" });
});

// 🔥 Reusable function to run python file
function runPythonFile(fileName, res) {
  const pythonProcess = spawn("python3", [fileName]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.status(200).json({
        success: true,
        message: `${fileName} executed successfully`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `${fileName} failed`,
      });
    }
  });
}

// API Routes
app.post("/api/mediapipe/yog1", (req, res) => {
  runPythonFile("main1.py", res);
});

app.post("/api/mediapipe/yog2", (req, res) => {
  runPythonFile("main2.py", res);
});

app.post("/api/mediapipe/yog3", (req, res) => {
  runPythonFile("main3.py", res);
});

app.post("/api/mediapipe/yog4", (req, res) => {
  runPythonFile("main4.py", res);
});

app.post("/api/mediapipe/yog5", (req, res) => {
  runPythonFile("main5.py", res);
});

app.post("/api/mediapipe/yog6", (req, res) => {
  runPythonFile("main6.py", res);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
