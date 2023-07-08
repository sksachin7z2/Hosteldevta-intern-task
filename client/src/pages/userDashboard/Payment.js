import React,{useState,useEffect,useRef,useMemo} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import Calendar from 'react-calendar'
import axios from 'axios'
import { Suspense, lazy } from 'react';
import Cookies from 'js-cookie'

import { useUserAuth } from "../../context/auth";

function Payment({host}) {
    let navigate=useNavigate()
    let location=useLocation()
   const [rooms, setRooms] = useState([])
    let params=location.pathname.split('/')[2];
    const [details, setDetails] = useState({totalbed:{},title:"",description:"",price:{},discount:[],rooms:[{
        nobpd: 0,
        nod: 0
    }],lat:null,lon:null,ammeneties:{wifi:false,TV:false,washingmachine:false,studyplace:false,airconditioning:false,bathrooms:false,mess:false,toilets:false,water:false,gym:false,playarea:false,unisex:false,kitchen:false},photos:[],contact:[{contact:""}],security:{camera:false,animals:false,watchman:false,fireextinguiser:false},bathrooms:0,toilets:0,address:{country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:"",addressl1:"",addressl2:"",neighborhood:""},status:{'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false}})
    const getroomdata=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/hosting/fetchHosting/${params}`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data;
            console.log(data)
            let arr=data.host.rooms.map((e)=>{
                return e.nobpd
               })
            let arr1=data.host.rooms.map((e)=>{
                return e.nod
               })
               let s=new Set(arr)
               console.log(Array.from(s),data.host.price)


                setRooms(Array.from(s))
     setDetails(data?.host)


        } catch (error) {
            console.log(error)
        }
      
      }
      let bookId=location.pathname.split('/')[3]
      const [bookingdetails, setBookingdetails] = useState({})
    const getBooking=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/booking/fetchBooking/${bookId}`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data;
            console.log(data)
            setBooking(data?.host)
            setPancard(data?.host?.pan)
            setPhone(data?.host?.phone)


        } catch (error) {
            console.log(error)
        }
      
      }
      const [pancard, setPancard] = useState("")
      const [phone, setPhone] = useState("")
      const handleconfirmandpay=async()=>{
        if (!pancard || !phone)
        {
            alert('both pan card and phone are required')
            return
        }

        try {
            const fetch=await axios.put(`${host}/api/booking/updateBooking/${bookId}`,{pan:pancard,phone:phone,bookedon:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), 0, 0)},{
                headers:{
                    "auth-token":Cookies.get("dorm--7z2__PMRW")
                }
            })
            const data=fetch.data;
            console.log(data)
            // navigate(`/dashboard`)
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
      }
      useEffect(() => {
       getroomdata();
        getBooking()
    console.log((booking))
      }, [])
      const {booking,setBooking}=useUserAuth()
      const BookingCard = useMemo(()=>React.lazy(() => import('../../components/BookingCard')),[]) 
      const Dorminfo = useMemo(()=>React.lazy(() => import('../../components/Dorminfo')),[]) 
     
  return (
    <div className='mt-[15vh] w-[90vw] m-auto'>
        <div className='grid md:grid-cols-[50%_50%] grid-rows-1 gap-7'>
        <div>
        <div onClick={()=>navigate(`/detail/${params}?bookId=${bookId}`)} className='flex items-center gap-5'>
<div >
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0002 26.6663L5.3335 15.9997L16.0002 5.33301L17.4002 6.73301L9.1335 14.9997H26.6668V16.9997H9.1335L17.4002 25.2663L16.0002 26.6663Z" fill="#3F3D56" stroke="#3F3D56"/>
</svg>

</div>
<div className='text-[#3f3d56] text-[1.5rem] font-semibold'>
    <div className='flex items-center gap-5'>
<div>Select your dorm room</div>
<svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" fill="#FDFDFD"/>
<path d="M5.625 24.3754H7L20.8438 10.5317L19.4688 9.15669L5.625 23.0004V24.3754ZM24.8125 9.18794L20.8125 5.18794L22.1195 3.88097C22.4773 3.52312 22.9219 3.3494 23.4531 3.35982C23.9844 3.37023 24.4271 3.55253 24.7812 3.90669L26.125 5.25044C26.4792 5.60461 26.6562 6.04211 26.6562 6.56294C26.6562 7.08378 26.4796 7.52089 26.1262 7.87429L24.8125 9.18794ZM4.69772 26.2504C4.4292 26.2504 4.20411 26.1597 4.02247 25.9781C3.84082 25.7966 3.75 25.5716 3.75 25.3032V22.6274C3.75 22.5011 3.77083 22.3859 3.8125 22.2817C3.85417 22.1775 3.92708 22.0734 4.03125 21.9692L19.5 6.50044L23.5 10.5004L8.03125 25.9692C7.92708 26.0734 7.82066 26.1463 7.71197 26.1879C7.60326 26.2296 7.49094 26.2504 7.375 26.2504H4.69772ZM20.1562 9.84419L19.4688 9.15669L20.8438 10.5317L20.1562 9.84419Z" fill="#3F3D56"/>
</svg>

    </div>

</div>
        </div>
      
<div>
<Suspense fallback={<div>Loading...</div>}>
<Dorminfo booking={booking} rooms={rooms}/>
</Suspense>
<div>
{/* <div>
    <div className='grid grid-cols-2'>
        <div>
        Payment Information
        </div>
        <div className='flex gap-2 items-center'>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.6738 11.4828C20.0927 11.2711 19.4785 11.1648 18.8601 11.1691C16.8601 11.1691 15.4476 12.1766 15.4376 13.6228C15.4251 14.6853 16.4413 15.2841 17.2101 15.6391C17.9988 16.0041 18.2626 16.2341 18.2601 16.5603C18.2551 17.0566 17.6301 17.2816 17.0488 17.2816C16.2501 17.2816 15.8138 17.1703 15.1426 16.8916L14.8938 16.7753L14.6101 18.4403C15.0963 18.6428 15.9726 18.8166 16.8776 18.8316C19.0038 18.8316 20.3938 17.8303 20.4101 16.2916C20.4276 15.4428 19.8776 14.8016 18.7201 14.2716C18.0163 13.9278 17.5801 13.6978 17.5801 13.3491C17.5801 13.0403 17.9538 12.7103 18.7351 12.7103C19.255 12.6977 19.7717 12.7953 20.2513 12.9966L20.4388 13.0803L20.7226 11.4716L20.6738 11.4828ZM25.8638 11.3041H24.3013C23.8151 11.3041 23.4488 11.4378 23.2363 11.9203L20.2313 18.7278H22.3576L22.7826 17.6116L25.3776 17.6141C25.4388 17.8753 25.6263 18.7278 25.6263 18.7278H27.5013L25.8638 11.3041ZM12.5613 11.2416H14.5876L13.3201 18.6691H11.2963L12.5613 11.2391V11.2416ZM7.41756 15.3353L7.62756 16.3666L9.60756 11.3041H11.7538L8.56506 18.7178H6.42381L4.67381 12.4403C4.64547 12.3368 4.5789 12.2479 4.48756 12.1916C3.85681 11.8657 3.18849 11.6185 2.49756 11.4553L2.52506 11.2991H5.78631C6.22881 11.3166 6.58506 11.4553 6.70381 11.9278L7.41631 15.3391L7.41756 15.3353ZM23.3638 16.0928L24.1713 14.0153C24.1613 14.0378 24.3376 13.5866 24.4401 13.3078L24.5788 13.9491L25.0476 16.0916H23.3626L23.3638 16.0928Z" fill="#364591"/>
</svg>
<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_333_144)">
<path d="M19.6059 14.7969V14.8354H19.6432C19.6502 14.8355 19.6572 14.8339 19.6632 14.8305C19.6657 14.8289 19.6676 14.8266 19.6689 14.8241C19.6703 14.8215 19.6709 14.8186 19.6707 14.8158C19.6709 14.813 19.6702 14.8102 19.6689 14.8077C19.6676 14.8051 19.6657 14.803 19.6632 14.8014C19.6572 14.7979 19.6503 14.7962 19.6432 14.7965H19.6059V14.7969ZM19.6436 14.7696C19.6596 14.7687 19.6755 14.7731 19.6884 14.7821C19.6936 14.7862 19.6978 14.7915 19.7005 14.7974C19.7032 14.8033 19.7045 14.8098 19.7041 14.8163C19.7044 14.8218 19.7034 14.8274 19.7012 14.8326C19.699 14.8377 19.6957 14.8424 19.6915 14.8462C19.6815 14.8546 19.669 14.8597 19.6557 14.8606L19.7057 14.9155H19.6672L19.6212 14.861H19.6063V14.9155H19.5741V14.7697H19.6441L19.6436 14.7696ZM19.6336 14.9659C19.6505 14.966 19.6673 14.9627 19.6827 14.9562C19.6977 14.95 19.7112 14.9412 19.7227 14.9301C19.7343 14.9191 19.7435 14.906 19.7498 14.8915C19.763 14.861 19.763 14.8267 19.7498 14.7961C19.7434 14.7817 19.7342 14.7687 19.7227 14.7575C19.7112 14.7465 19.6977 14.7376 19.6827 14.7314C19.6672 14.7253 19.6505 14.7222 19.6336 14.7224C19.6165 14.7222 19.5995 14.7253 19.5836 14.7314C19.5684 14.7375 19.5545 14.7464 19.5427 14.7575C19.5251 14.775 19.5131 14.7972 19.5083 14.8212C19.5036 14.8452 19.5063 14.87 19.516 14.8925C19.5221 14.907 19.5312 14.9201 19.5427 14.9311C19.5545 14.9422 19.5684 14.9511 19.5836 14.9572C19.5994 14.9637 19.6165 14.967 19.6336 14.9668M19.6336 14.6873C19.6776 14.6872 19.7198 14.7038 19.7511 14.7335C19.7663 14.7478 19.7783 14.7648 19.7865 14.7836C19.7951 14.8028 19.7995 14.8236 19.7995 14.8446C19.7995 14.8655 19.7951 14.8863 19.7865 14.9055C19.7781 14.9242 19.7661 14.9412 19.7511 14.9556C19.7358 14.9697 19.718 14.9812 19.6984 14.9893C19.678 14.9977 19.6559 15.002 19.6336 15.0018C19.6111 15.002 19.5888 14.9977 19.568 14.9893C19.5483 14.9814 19.5303 14.9699 19.5149 14.9556C19.5 14.9406 19.4882 14.9231 19.48 14.9039C19.4715 14.8846 19.4671 14.8639 19.4671 14.8429C19.4671 14.822 19.4715 14.8012 19.48 14.7819C19.4883 14.7632 19.5003 14.7462 19.5154 14.7319C19.5306 14.7173 19.5487 14.7058 19.5685 14.6982C19.5893 14.6897 19.6116 14.6855 19.6341 14.6856M4.32164 14.124C4.32164 13.8459 4.51064 13.6174 4.81954 13.6174C5.11474 13.6174 5.31395 13.8361 5.31395 14.124C5.31395 14.412 5.11474 14.6306 4.81954 14.6306C4.51064 14.6306 4.32164 14.4021 4.32164 14.124ZM5.65044 14.124V13.3325H5.29354V13.5254C5.18034 13.3829 5.00864 13.2935 4.77514 13.2935C4.31514 13.2935 3.95414 13.6413 3.95414 14.1244C3.95414 14.6075 4.31494 14.9553 4.77514 14.9553C5.00854 14.9553 5.18034 14.8658 5.29354 14.7234V14.9155H5.65004V14.124H5.65044ZM17.7096 14.124C17.7096 13.8459 17.8986 13.6174 18.2076 13.6174C18.5031 13.6174 18.702 13.8361 18.702 14.124C18.702 14.412 18.5031 14.6306 18.2076 14.6306C17.8987 14.6306 17.7096 14.4021 17.7096 14.124ZM19.0388 14.124V12.6973H18.6816V13.5254C18.5684 13.3829 18.3967 13.2935 18.1632 13.2935C17.7032 13.2935 17.3422 13.6413 17.3422 14.1244C17.3422 14.6075 17.703 14.9553 18.1632 14.9553C18.3967 14.9553 18.5684 14.8658 18.6816 14.7234V14.9155H19.0388V14.124ZM10.08 13.6011C10.31 13.6011 10.4577 13.7401 10.4954 13.9849H9.64385C9.68195 13.7564 9.82585 13.6011 10.0801 13.6011M10.0872 13.2926C9.60624 13.2926 9.26974 13.63 9.26974 14.1235C9.26974 14.6266 9.61975 14.9544 10.1111 14.9544C10.3583 14.9544 10.5847 14.8949 10.7839 14.7327L10.609 14.4777C10.4714 14.5837 10.2962 14.6432 10.1315 14.6432C9.90155 14.6432 9.69215 14.5405 9.64065 14.2557H10.8593C10.8628 14.2129 10.8664 14.1697 10.8664 14.1234C10.8628 13.6301 10.5464 13.2925 10.087 13.2925M14.396 14.1234C14.396 13.8453 14.585 13.6168 14.8939 13.6168C15.1891 13.6168 15.3883 13.8355 15.3883 14.1234C15.3883 14.4114 15.1891 14.63 14.8939 14.63C14.585 14.63 14.3959 14.4015 14.3959 14.1234M15.7247 14.1234V13.3325H15.368V13.5254C15.2544 13.3829 15.0831 13.2935 14.8496 13.2935C14.3896 13.2935 14.0286 13.6413 14.0286 14.1244C14.0286 14.6075 14.3894 14.9553 14.8496 14.9553C15.0831 14.9553 15.2544 14.8658 15.368 14.7234V14.9155H15.7248V14.124L15.7247 14.1234ZM12.3805 14.1234C12.3805 14.6034 12.7271 14.9543 13.2561 14.9543C13.5033 14.9543 13.668 14.9013 13.8461 14.7656L13.6747 14.4875C13.5407 14.5804 13.4 14.63 13.2447 14.63C12.9598 14.6266 12.7503 14.4281 12.7503 14.1234C12.7503 13.8188 12.9598 13.6203 13.2447 13.6168C13.3996 13.6168 13.5403 13.6665 13.6747 13.7593L13.8461 13.4812C13.6677 13.3456 13.503 13.2925 13.2561 13.2925C12.7271 13.2925 12.3805 13.6433 12.3805 14.1234ZM16.9815 13.2925C16.7756 13.2925 16.6415 13.3854 16.5488 13.5244V13.3325H16.1951V14.9147H16.5524V14.0278C16.5524 13.766 16.6691 13.6205 16.9024 13.6205C16.9788 13.6194 17.0547 13.633 17.1256 13.6603L17.2356 13.336C17.1566 13.306 17.0536 13.2928 16.9813 13.2928M7.41494 13.4584C7.24324 13.3492 7.00664 13.2928 6.74564 13.2928C6.32984 13.2928 6.06215 13.485 6.06215 13.7993C6.06215 14.0573 6.26145 14.2164 6.62845 14.2661L6.79705 14.2892C6.99275 14.3157 7.08515 14.3654 7.08515 14.4548C7.08515 14.5771 6.95514 14.6469 6.71104 14.6469C6.46384 14.6469 6.28545 14.5707 6.16515 14.4814L5.99744 14.7496C6.19314 14.8887 6.44034 14.955 6.70804 14.955C7.18204 14.955 7.45674 14.7398 7.45674 14.4386C7.45674 14.1604 7.24055 14.015 6.88335 13.9653L6.71515 13.9418C6.56065 13.9225 6.43684 13.8925 6.43684 13.7865C6.43684 13.6708 6.55354 13.6012 6.74934 13.6012C6.95884 13.6012 7.16164 13.6774 7.26104 13.7369L7.41554 13.4587L7.41494 13.4584ZM12.02 13.2931C11.8141 13.2931 11.68 13.386 11.5877 13.525V13.3325H11.234V14.9147H11.5909V14.0278C11.5909 13.766 11.7076 13.6205 11.9409 13.6205C12.0173 13.6194 12.0932 13.633 12.1641 13.6603L12.2741 13.336C12.1951 13.306 12.0921 13.2928 12.0198 13.2928M8.97445 13.3325H8.39085V12.8526H8.03005V13.3325H7.69715V13.647H8.03005V14.3688C8.03005 14.7359 8.17785 14.9545 8.60005 14.9545C8.75495 14.9545 8.93335 14.9082 9.04655 14.8322L8.94345 14.5376C8.83695 14.597 8.72024 14.627 8.62744 14.627C8.44904 14.627 8.39085 14.521 8.39085 14.3622V13.6473H8.97445V13.3325ZM3.63854 14.9151V13.9221C3.63854 13.5482 3.39134 13.2966 2.99284 13.2932C2.78334 13.2898 2.56724 13.3527 2.41594 13.5747C2.30274 13.3993 2.12434 13.2932 1.87354 13.2932C1.69824 13.2932 1.52694 13.3429 1.39284 13.5281V13.3325H1.03564V14.9147H1.39564V14.0374C1.39564 13.7628 1.55364 13.6168 1.79764 13.6168C2.03464 13.6168 2.15454 13.7658 2.15454 14.034V14.9145H2.51534V14.0372C2.51534 13.7626 2.68004 13.6166 2.91694 13.6166C3.16064 13.6166 3.27694 13.7656 3.27694 14.0338V14.9143L3.63854 14.9151Z" fill="#231F20"/>
<path d="M19.8095 9.65226V9.4209H19.747L19.6747 9.57967L19.6028 9.4209H19.5401V9.65226H19.5845V9.47797L19.6521 9.62835H19.6981L19.7657 9.47758V9.65226H19.8097H19.8095ZM19.413 9.65226V9.46052H19.493V9.42148H19.2886V9.46052H19.3686V9.65226H19.4126H19.413Z" fill="#F79410"/>
<path d="M12.7055 10.6446H7.29688V1.27441H12.7056L12.7055 10.6446Z" fill="#FF5F00"/>
<path d="M7.64 5.95923C7.64 4.05849 8.5632 2.3653 10.0008 1.27414C8.91261 0.446967 7.56669 -0.00196742 6.1809 6.48149e-06C2.7672 6.48149e-06 0 2.668 0 5.95923C0 9.25046 2.7672 11.9185 6.1809 11.9185C7.56672 11.9204 8.91268 11.4715 10.0009 10.6443C8.5634 9.55335 7.64 7.86006 7.64 5.95923Z" fill="#EB001B"/>
<path d="M20.0024 5.95923C20.0024 9.25046 17.2352 11.9184 13.8215 11.9184C12.4355 11.9204 11.0894 11.4715 10.001 10.6443C11.439 9.55315 12.3622 7.86006 12.3622 5.95923C12.3622 4.05839 11.439 2.3653 10.001 1.27414C11.0894 0.446992 12.4354 -0.00193282 13.8214 6.25542e-06C17.2351 6.25542e-06 20.0023 2.668 20.0023 5.95923" fill="#F79E1B"/>
</g>
<defs>
<clipPath id="clip0_333_144">
<rect width="20" height="15" fill="white"/>
</clipPath>
</defs>
</svg>
<svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.8926 14.2998L36.6666 9.94479L34.4052 5.43945L31.8926 14.2998Z" fill="#097939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.2847 14.2998L35.0587 9.94479L32.7973 5.43945L30.2847 14.2998Z" fill="#ED752E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.46979 5.4898L5.45979 12.6481L12.5955 12.6981L14.5555 5.4898H16.3645L14.0145 13.8698C13.9245 14.1898 13.5818 14.4498 13.2495 14.4498H4.10312C3.54845 14.4498 3.21979 14.0165 3.36979 13.4831L5.61112 5.4898H7.46979ZM29.5305 5.4398H31.3395L28.8268 14.4498H26.9668L29.5305 5.4398ZM16.5658 9.1938L25.6111 9.1438L26.2145 7.24146H17.0178L17.5705 5.48946L27.3705 5.39946C27.9805 5.3938 28.3438 5.86613 28.1831 6.45513L27.2598 9.8298C27.0988 10.4185 26.4731 10.8955 25.8631 10.8955H17.7718L16.8178 14.5998H15.0578L16.5658 9.1938Z" fill="#747474"/>
</svg>

        </div>
    </div>
    <div></div>
</div> */}
<div>
    <div className='text-[#3f3d56] font-semibold text-[1.5rem] my-6'>
        Information required for stay
    </div>
    <div>
    <div className="relative my-5">
                                    <input value={pancard}  onChange={(e)=>{setPancard(e.target.value)}} className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-[50%] text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="" id="" placeholder=''/>
                                    <label  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4  ">Permanent Account Number</label>
                                    </div>
    <div className="relative my-5">
                                    <input value={phone}  onChange={(e)=>{setPhone(e.target.value)}} className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-[50%] text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="number" name="" id="" placeholder=''/>
                                    <label  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4  ">Contact Number</label>
                                    </div>
    </div>
    <hr className='bg-[#3f3d56] h-[2px] my-6'/>
    <div>
        <div className='text-[#3f3d56] font-semibold text-[1.5rem] my-3'>
            Cancellation Policy
        </div>
        <div className='text-[#3f3d56] text-sm'>
        Free cancellation for 72 hours after booking.
        </div>
    </div>
    <hr className='bg-[#3f3d56] h-[2px] my-6'/>
    <div className='text-[#3f3d56] text-sm'>
    By selecting the button below, I agree to the terms and conditions of DormInn.
        </div>
    <div className='my-4'>
    <button onClick={handleconfirmandpay} type="button" className="text-white bg-[#3f3d56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 ">Confirm and Pay</button>
    </div>
</div>

</div>

</div>
        </div>
        <div>
        <Suspense fallback={<div>Loading...</div>}>
            <BookingCard rooms={rooms} details={details} booking={booking} />
            </Suspense>
        </div>
        </div>

    </div>
  )
}

export default Payment