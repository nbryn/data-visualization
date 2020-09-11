import React, {useState, useContext} from 'react';

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

export const UserContextProvider = ({children}: Props) => {
   const [user, setCurrentUser] = useState<User>(null);

   const setUser = (user: User) => {
      setCurrentUser(user);
   };

   return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
   const context = useContext(UserContext);
   return context;
};
