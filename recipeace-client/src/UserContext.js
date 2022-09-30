import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
        const user = JSON.parse(localStorage.getItem('user'));
        
		useEffect(() => {
			setUserDetails(user);
		}, [user]);

    const [userDetails, setUserDetails] = useState(user);

    return (
        <UserContext.Provider value={{userDetails}}>
            {children}
        </UserContext.Provider>
    )
}
