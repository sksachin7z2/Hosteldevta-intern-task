import { createContext, useContext, useEffect, useState } from "react";

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
const [booking, setBooking] = useState({})
    return (
        <userAuthContext.Provider
          value={{booking,setBooking}}
        >
          {children}
        </userAuthContext.Provider>
      );
    }

    export function useUserAuth() {
        return useContext(userAuthContext);
      }