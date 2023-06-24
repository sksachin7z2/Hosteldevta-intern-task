import { createContext, useContext, useEffect, useState } from "react";

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {

    return (
        <userAuthContext.Provider
        //   value={}
        >
          {children}
        </userAuthContext.Provider>
      );
    }

    export function useUserAuth() {
        return useContext(userAuthContext);
      }