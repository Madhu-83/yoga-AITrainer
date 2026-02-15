import React, { useState } from "react";
import Home from "./Pages/Home/Home";
import PoseDetection from "./PoseDetection";

function App() {
  const [selectedPose, setSelectedPose] = useState(null);

  if (selectedPose) {
    return <PoseDetection pose={selectedPose} />;
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1>🧘 Gaara AI Yoga Trainer</h1>
      <p>Select your pose to begin training</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
        
        <div onClick={() => setSelectedPose("yoga13")} style={cardStyle}>
          <img src="/poses/warrior.jpg" width="200" />
          <h3>Warrior</h3>
        </div>

        <div onClick={() => setSelectedPose("yoga19")} style={cardStyle}>
          <img src="/poses/tree.jpg" width="200" />
          <h3>Tree</h3>
        </div>

        <div onClick={() => setSelectedPose("yoga15")} style={cardStyle}>
          <img src="/poses/plank.jpg" width="200" />
          <h3>Plank</h3>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  cursor: "pointer",
  border: "2px solid #eee",
  padding: "10px",
  borderRadius: "12px",
  transition: "0.3s",
};

export default App;
