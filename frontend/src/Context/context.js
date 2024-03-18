

import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token');


    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get('/api/getUser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                // Gérer les erreurs ici
                console.error(error);
            }
        };

        if (token) {
            getUserData();
        }
    }, [token]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
