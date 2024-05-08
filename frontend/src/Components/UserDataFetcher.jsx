import React, { useState, useEffect } from "react";

function UserDataFetcher({ setUser, setAdmin }) {
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
            setUser(data.user);
            if (data.user && data.user.is_admin === 1) {
                console.log(data.user);
                setAdmin(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return null; 
}

export default UserDataFetcher;
