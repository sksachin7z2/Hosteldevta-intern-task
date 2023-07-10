import { createContext, useContext, useEffect, useState } from "react";

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
const [booking, setBooking] = useState({})
const [paymentStatus, setPaymentStatus] = useState({orderId:"",txnToken:"",amount:"",upi:""})

    return (
        <userAuthContext.Provider
          value={{booking,setBooking,paymentStatus,setPaymentStatus}}
        >
          {children}
        </userAuthContext.Provider>
      );
    }

    export function useUserAuth() {
        return useContext(userAuthContext);
      }