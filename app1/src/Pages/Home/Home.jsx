import React from "react";

const poses = [
  { name: "Warrior Pose", image: "/poses/yoga13.jpg", id: "yoga13" },
  { name: "Tree Pose", image: "/poses/yoga15.jpg", id: "yoga15" },
  { name: "Plank Pose", image: "/poses/yoga19.jpg", id: "yoga19" },
  { name: "Side Plank", image: "/poses/yoga20.jpg", id: "yoga20" },
  { name: "Dolphin Pose", image: "/poses/yoga25.jpg", id: "yoga25" },
  { name: "Downward Dog", image: "/poses/yoga232.png", id: "yoga232" },
];

const Home = ({ onSelectPose }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧘 Gaara AI Yoga Trainer</h1>
      <p style={styles.subtitle}>Select your pose to begin training</p>

      <div style={styles.grid}>
        {poses.map((pose) => (
          <div key={pose.id} style={styles.card}>
            <img
              src={pose.image}
              alt={pose.name}
              style={styles.image}
            />

            <h2>{pose.name}</h2>

            <button
              onClick={() => onSelectPose(pose.id)}
              style={styles.button}
            >
              Start Pose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    padding: "60px 40px",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "50px",
    fontSize: "18px",
    opacity: 0.9,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
    gap: "40px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    color: "black",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "15px",
  },
  button: {
    marginTop: "15px",
    padding: "10px 25px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
