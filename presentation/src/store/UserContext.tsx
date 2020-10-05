import React, {useContext, useEffect, useState, ReactElement} from 'react';

import {User} from './datamodels/General';

export type UserContextValue = {
   user: User;
   setUser: (user: User) => void;
};

export const UserContext = React.createContext<UserContextValue>({
   user: null,
   setUser: () => {},
});

type Props = {
   children: React.ReactNode;
};

export const UserContextProvider = ({children}: Props): ReactElement => {
   const [user, setCurrentUser] = useState<User>(null);

   const setUser = (user: User) => {
      setCurrentUser(user);

      localStorage.setItem('User', JSON.stringify(user));
   };

   useEffect(() => {
      if (localStorage.getItem('User')) {
         const user: User = JSON.parse(localStorage.getItem('User') as string);

         setCurrentUser(user);
      }
   }, []);

   return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextValue => {
   const context = useContext(UserContext);
   return context;
};
