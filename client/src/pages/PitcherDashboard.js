import React, { useState, useEffect } from "react";
import axios from "axios";

const PitcherDashboard = () => {
  const [profile, setProfile] = useState({
    companyName: "",
    companyDescription: "",
    pitchVideoUrl: ""
  });
  const [inbox, setInbox] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch existing profile
    const fetchProfile = async () => {
      try {
        // In your real code, you’d have an endpoint to get the current pitcher's data
        // For simplicity, we can use an update-like call or separate GET endpoint if implemented
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch messages
    const fetchInbox = async () => {
      try {
        const res = await axios.get("/api/pitcher/inbox", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInbox(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
    fetchInbox();
  }, [token]);

  const onChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value });
  };

  const onSaveProfile = async () => {
    try {
      const res = await axios.put("/api/pitcher/update", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      alert("Profile updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const onRespond = async (messageId, action) => {
    try {
      await axios.post(
        `/api/pitcher/respond/${messageId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh the inbox
      const res = await axios.get("/api/pitcher/inbox", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInbox(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Pitcher Dashboard</h2>
      <div>
        <h3>Update Company Profile</h3>
        <input name="companyName" value={profile.companyName} placeholder="Company Name" onChange={onChange} />
        <textarea name="companyDescription" value={profile.companyDescription} placeholder="Description" onChange={onChange} />
        <input name="pitchVideoUrl" value={profile.pitchVideoUrl} placeholder="Video URL" onChange={onChange} />
        <button onClick={onSaveProfile}>Save</button>
      </div>

      <div>
        <h3>Inbox</h3>
        {inbox.map(msg => (
          <div key={msg._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>From: {msg.senderId.username}</p>
            <p>Content: {msg.content}</p>
            <p>Status: {msg.status}</p>
            {msg.status === "pending" && (
              <div>
                <button onClick={() => onRespond(msg._id, "accept")}>Accept</button>
                <button onClick={() => onRespond(msg._id, "delete")}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitcherDashboard;