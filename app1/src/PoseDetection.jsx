import React, { useEffect, useRef, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [score, setScore] = useState(100);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedPose, setSelectedPose] = useState("yoga13");

  const lastSpoken = useRef("");

  const speak = (text) => {
    if (!voiceEnabled) return;
    if (lastSpoken.current === text) return;

    lastSpoken.current = text;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const calculateAngle = (a, b, c) => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);

    let angle = Math.abs((radians * 180) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    pose.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = 640;
      canvas.height = 480;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.poseLandmarks) {
        // GREEN SKELETON
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });

        // RED JOINTS
        drawLandmarks(ctx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });

        const lm = results.poseLandmarks;

        const shoulderAngle = calculateAngle(lm[11], lm[13], lm[15]);
        const hipAngle = calculateAngle(lm[23], lm[25], lm[27]);
        const kneeAngle = calculateAngle(lm[24], lm[26], lm[28]);

        let newScore = 100;
        let feedback = [];

        if (shoulderAngle < 160) {
          newScore -= 20;
          feedback.push("Lift your arm higher");
          highlightJoint(ctx, lm[13]);
        }

        if (hipAngle < 150) {
          newScore -= 20;
          feedback.push("Open your hips more");
          highlightJoint(ctx, lm[25]);
        }

        if (kneeAngle < 140) {
          newScore -= 20;
          feedback.push("Bend your knee properly");
          highlightJoint(ctx, lm[26]);
        }

        setScore(newScore);

        // SCORE BOX
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(15, 15, 220, 60);

        ctx.fillStyle = "#00FF00";
        ctx.font = "24px Arial";
        ctx.fillText(`Score: ${newScore}`, 25, 50);

        // COMMAND BOX
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(15, 90, 380, 100);

        ctx.fillStyle = "white";
        ctx.font = "18px Arial";

        if (feedback.length === 0) {
          ctx.fillStyle = "#00FF00";
          ctx.fillText("PERFECT POSE 🔥", 25, 130);
          speak("Perfect pose. Keep holding.");
        } else {
          feedback.forEach((cmd, i) => {
            ctx.fillText(cmd, 25, 125 + i * 25);
          });

          speak(feedback[0]);
        }
      }

      ctx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  }, [voiceEnabled]);

  const highlightJoint = (ctx, landmark) => {
    const x = landmark.x * canvasRef.current.width;
    const y = landmark.y * canvasRef.current.height;

    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>🧘 Gaara AI Yoga Coach</h1>

      {/* Pose Selector */}
      <select
        value={selectedPose}
        onChange={(e) => setSelectedPose(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "8px",
        }}
      >
        <option value="yoga13">Warrior Pose</option>
        <option value="yoga15">Tree Pose</option>
        <option value="yoga19">Plank</option>
        <option value="yoga20">Chair Pose</option>
        <option value="yoga25">Triangle Pose</option>
      </select>

      <br />

      <button
        onClick={() => setVoiceEnabled(true)}
        style={{
          padding: "10px 20px",
          background: "#00c853",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Enable Voice Coaching
      </button>

      <video ref={videoRef} style={{ display: "none" }} />

      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          borderRadius: "20px",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
        }}
      />

      {/* TARGET IMAGE */}
      <img
        src={`/poses/${selectedPose}.jpg`}
        alt="Target Pose"
        onError={(e) => (e.target.style.display = "none")}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "220px",
          borderRadius: "15px",
          border: "4px solid #00FF00",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          zIndex: 999,
        }}
      />
    </div>
  );
};

export default PoseDetection;
