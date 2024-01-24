import { createContext, useState, useEffect } from 'react';

import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    //It will run whatever you return when it unmounts

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(18, user); //it will log user whenever the Auth state changes
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
