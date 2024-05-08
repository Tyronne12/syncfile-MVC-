// Dashboard.jsx
import React, { useState, useEffect } from "react";
import FolderList from "./FolderList"; // Import FolderList component
import { Outlet } from "react-router-dom";
import FolderListComponent from "./FolderListComponent";

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/folders")
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="hometab">
      <FolderListComponent folders={folders} />
    </div>
  );
}

export default Dashboard;
