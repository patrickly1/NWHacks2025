import React, { useState, useEffect } from "react";
import axios from "axios";

const SharkDashboard = () => {
  const [pitchers, setPitchers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPitchers = async () => {
      try {
        const res = await axios.get("/api/shark/pitchers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPitchers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPitchers();
  }, [token]);

  const swipeLeft = () => {
    // Just go to the next pitcher
    setCurrentIndex((prev) => (prev + 1) % pitchers.length);
  };

  const swipeRight = async (pitcherId) => {
    // Potentially open a modal to “Send Message or Bookmark”
    // For now, just automatically bookmark the pitcher:
    try {
      await axios.post(`/api/shark/bookmark/${pitcherId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bookmarked!");
      // Move on to the next pitcher
      setCurrentIndex((prev) => (prev + 1) % pitchers.length);
    } catch (error) {
      console.error(error);
    }
  };

  if (pitchers.length === 0) {
    return <div>No pitchers found.</div>;
  }

  const currentPitcher = pitchers[currentIndex];

  return (
    <div>
      <h2>Shark Dashboard</h2>
      <div>
        <h3>{currentPitcher.companyName || "Unknown Company"}</h3>
        <p>{currentPitcher.companyDescription}</p>
        {currentPitcher.pitchVideoUrl && (
          <video
            width="400"
            controls
            src={currentPitcher.pitchVideoUrl}
          />
        )}

        <div>
          <button onClick={swipeLeft}>Swipe Left (Not Interested)</button>
          <button onClick={() => swipeRight(currentPitcher._id)}>Swipe Right (Interested)</button>
        </div>
      </div>
    </div>
  );
};

export default SharkDashboard;