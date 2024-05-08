import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HomeHeader from './HomeHeader'; // Import the HomeHeader component
import LeftSidebar from "./Sidebar";
import UserDataFetcher from './UserDataFetcher';
import '../App.css';

function Home() {
  const [user, setUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [selectedLink, setSelectedLink] = useState("/main/home");

  const logout = async () => {
    try {
      const response = await fetch('/api/logout');
      const data = await response.json();
      if (data.status === 'success') {
        window.location.href = '/';
      } else {
        console.log('Logout failed', data.message);
      }
    } catch (error) {
      console.log('error logging out:', error)
    }
  }

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  }

  return (
    <div className="homepage">
      <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
      <HomeHeader user={user} logout={logout} /> {/* Use the HomeHeader component */}
      <div className="main-content">
        <LeftSidebar selectedLink={selectedLink} handleLinkClick={handleLinkClick} isAdmin={isAdmin} />
        <div className="main">
          <div className="main-header">
            <div className="section-tracker"></div>
            <div></div>
            <div className="file-manager-tab"></div>
          </div>
          <Outlet />
        </div>
        <div className="sidebar-right"></div>
      </div>
    </div>
  );
}

export default Home;
