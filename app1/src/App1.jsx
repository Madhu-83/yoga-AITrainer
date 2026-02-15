import React, { useState } from "react";
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

      <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "40px" }}>
        
        <div onClick={() => setSelectedPose("warrior")} style={cardStyle}>
          <img src="/poses/warrior.jpg" width="200" />
          <h3>Warrior</h3>
        </div>

        <div onClick={() => setSelectedPose("tree")} style={cardStyle}>
          <img src="/poses/tree.jpg" width="200" />
          <h3>Tree</h3>
        </div>

        <div onClick={() => setSelectedPose("plank")} style={cardStyle}>
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
  transition: "0.3s"
};

export default App;
