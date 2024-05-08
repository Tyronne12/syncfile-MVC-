import React, {useEffect, useState} from 'react';
import Logo from '../Assets/Images/synclogo2.png';
import DisplayPic from '../Assets/Images/profileman.png';
import UserDataFetcher from './UserDataFetcher';
import "../App.css";

function HomeHeader({ user, logout }) {

  const [url, setURL] = useState(DisplayPic);

  useEffect(() => {
    if (user) {
        const fileUrl = `http://localhost:3001/${user.profile_filepath}`;
        setURL(fileUrl);
    }
}, [user]);

  return (
    <div className="home-header">
      <div className="left-header">
        <div className="syncfile-logo-con">
          <img className="syncfile-logo" src={Logo} alt="SyncFile Logo" />
        </div>
        <h3 className="logo-text">SyncFile</h3>
      </div>
      <div className="middle-header"></div>
      <div className="right-header">
        <div className="home-icon"></div>
        <div className="profile-name">
          <h4 className="user-name">{user ? user.first_name : 'User'}</h4>
        </div>
        <img className="profile-pic" src={url} alt="User Profile" />
        <div className="sign-out-btn" onClick={logout}>Sign Out</div>
      </div>
    </div>
  );
}

export default HomeHeader;
