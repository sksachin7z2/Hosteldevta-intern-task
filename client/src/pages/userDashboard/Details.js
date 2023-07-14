import React,{useState,useEffect,useRef} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import Calendar from 'react-calendar'
import axios from 'axios'
import Avatar from 'react-avatar'
import Cookies from 'js-cookie'
import { useUserAuth } from "../../context/auth";
import { Rating } from 'react-simple-star-rating'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import QueryString from 'query-string'
const mapStyles = {
    width: '100%',
    height: '100%',
    
  };
  const containerStyle={
    position:"relative",
    height:"50vh",
    width:"100%",
    
  }
function Details({host,google}) {
    const [rating, setRating] = useState(0)
    const handleRating = (rate) => {
        console.log(rate)
        setRating(rate)
      
        // other logic
      }
    const [modal, setModal] = useState(false)
    const [value, setValue] = useState({});
    const [calendar, setCalendar] = useState(new Date())
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")
    const [helper, setHelper] = useState(false)

    const [helper1, setHelper1] = useState(false)
    const [adults, setAdults] = useState({})
    const [children, setChildren] = useState({})
    const [room, setRoom] = useState({})
    const [bed ,setBed] = useState({})
    const [infant, setInfant] = useState({})
    
    const handleChange=(e,i,ev)=>{
        
        if(i==="adults")
        {
            let obj=adults;
            obj[e]=ev.target.value;
            setAdults(obj)
            
        }
        else if(i==="children")
        {
            let obj=children;
            obj[e]=ev.target.value;
            setChildren(obj)
        }
        else if(i==="infants")
        {
            let obj=infant;
            obj[e]=ev.target.value;
            setInfant(obj)
        }
        else if(i==="beds")
        {
            let obj=bed;
            obj[e]=ev.target.value;
            setBed(obj)
        }
        else 
        {
            let obj=room;
            obj[e]=ev.target.value;
            setRoom(obj)
        }
        setHelper(!helper)
    }

    const handleadults=(e,t)=>{
        let obj=adults;
        if(!obj[e]){
            if(t==="add")
            obj[e]=1
        }
        else{
            if(t=='add')
            {
                obj[e]= parseInt( obj[e])+1
            }
            else{
                if(obj[e]-1>=0)
                obj[e]= parseInt( obj[e])-1


            }
        }
        setAdults(obj)
        setHelper(!helper)
    }
    const handlechildren=(e,t)=>{
        let obj=children;
        if(!obj[e]){
            if(t==="add")
            obj[e]=1
        }
        else{
            if(t=='add')
            {
                obj[e]=obj[e]+1
            }
            else{
                if(obj[e]-1>=0)
                obj[e]=obj[e]-1


            }
        }
        setChildren(obj)
        setHelper(!helper)
    }
    const handleinfants=(e,t)=>{
        let obj=infant;
        if(!obj[e]){
            if(t==="add")
            obj[e]=1
        }
        else{
            if(t=='add')
            {
                obj[e]=obj[e]+1
            }
            else{
                if(obj[e]-1>=0)
                obj[e]=obj[e]-1


            }
        }
        setInfant(obj)
        setHelper(!helper)
    }
    const handleroom=(e,t)=>{
        let obj=room;
        if(!obj[e]){
            if(t==="add")
            obj[e]=1
        }
        else{
            if(t=='add')
            {
                obj[e]=obj[e]+1
            }
            else{
                if(obj[e]-1>=0)
                obj[e]=obj[e]-1


            }
        }
        setRoom(obj)
        setHelper(!helper)
    }
    const handlebed=(e,t)=>{
        let obj=bed;
        if(!obj[e]){
            if(t==="add")
            obj[e]=1
        }
        else{
            if(t=='add')
            {
                obj[e]=obj[e]+1
            }
            else{
                if(obj[e]-1>=0)
                obj[e]=obj[e]-1


            }
        }
        setBed(obj)
        setHelper(!helper)
    }

   const {booking,setBooking}=useUserAuth()
   const [guest, setGuest] = useState({})
    const calendarref = useRef()
    const handlecardinfo=(e,i,f)=>{
        var result = value 
       let cd=Cookies.get('calendarvalue')
     if(i=="guest")
     {
        result[`${e}`]={...result[`${e}`],[i]:f.target.value}
        
     }
     else{
        // result[`${e}`]={checkin:new Date(),checkout:"",guest:0}
        result[`${e}`]={...result[`${e}`],[i]:cd}
     }
        setValue(result)
    setHelper(!helper)
    
        console.log(result)
    }
    const [details, setDetails] = useState({totalbed:{},title:"",description:"",price:{},discount:[],rooms:[{
        nobpd: 0,
        nod: 0
    }],lat:null,lon:null,ammeneties:{wifi:false,TV:false,washingmachine:false,studyplace:false,airconditioning:false,bathrooms:false,mess:false,toilets:false,water:false,gym:false,playarea:false,unisex:false,kitchen:false},photos:[],contact:[{contact:""}],security:{camera:false,animals:false,watchman:false,fireextinguiser:false},bathrooms:0,toilets:0,address:{country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:"",addressl1:"",addressl2:"",neighborhood:""},status:{'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false}})
    let navigate=useNavigate()
    let location=useLocation()
    const [rooms, setRooms] = useState([])
    const [maxRoom, setMaxRoom] = useState([])
    let params=location.pathname.split('/')[2];
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

setMaxRoom(arr1)
                setRooms(Array.from(s))
     setDetails(data?.host)


        } catch (error) {
            console.log(error)
        }
      
      }
      let {bookId}=QueryString.parse(location.search)
      console.log(bookId)
      const getBooking=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/booking/fetchBooking/${bookId}`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data;
            console.log(data)
            
    //  setBooking(data?.host)
    setCheckin(data?.host?.checkin)
    setCheckout(data?.host?.checkout)
    setAdults(data?.host?.adults)
    setChildren(data?.host?.children)
    setInfant(data?.host?.infants)
    setBed(data?.host?.bed)
    setRoom(data?.host?.room)
    setRd(data?.host?.rd)


        } catch (error) {
            console.log(error)
        }
      
      }
      const [hoststar, setHoststar] = useState(0)
      const [reviewinfo, setReviewinfo] = useState([])
      const getreviews=async()=>{
        try {
            const reviews=await axios.post(`${host}/api/reviews/fetchallreviews/${params}`)
        const data=reviews.data
        console.log(data.allreviews.reviews)
        setReviewinfo(data.allreviews.reviews)
        console.log(data.allreviews.reviews.star[0])
        setHoststar(data.allreviews.reviews.star[0])
        // setRating(data.allreviews.reviews.star[0])
        setReviews(data.allreviews.reviews.comments)
        } catch (error) {
console.log(error)
        }
        
  }
      useEffect(() => {
        getdata()
       getroomdata();
       getreviews()
    getBooking()
      }, [])
     const handleChangeCalendar=(e)=>{
        Cookies.set('calendarvalue',e)
        setHelper(!helper)
        let s=Cookies.get('cardstatus')
        console.log(s)
        if(s=="checkin")
        setCheckin(e);
        else
        setCheckout(e)
     }
     const [rd, setRd] = useState({})
    const handleswitchrd=(e,status)=>{
            let obj=rd;
            obj[e]=status
            setRd(obj);
            setHelper(!helper)
    }
      const tileDisabled = ({ activeStartDate, date, view }) => {
        console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 5, new Date().getMinutes() + 30, 0, 0));
        return date <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1, new Date().getHours(), new Date().getMinutes(), 0, 0)
      }
      const tileDisabled1 = ({ activeStartDate, date, view },y) => {
        // console.log(e,yu)
        return date < new Date(checkin)
      }
      const handledropdown=(e)=>{
        let obj=guest
        if(!obj[e])
        obj[e]=true
        else
        obj[e]=!obj[e]
        console.log(obj)
        setGuest(obj)
        setHelper(!helper)
      }
      const [userId, setUserId] = useState("")
      const getdata=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/auth/getuser`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            
               
                setUserId(fetch.data.userId)
                const reviews=await axios.post(`${host}/api/reviews/fetchallreviews/${params}`)
                const data=reviews.data
                console.log(data)
                let s=data.allreviews.reviews.stari.find(e=>e.user===fetch.data.userId).rating
                setRating(s)
        } catch (error) {
            console.log(error)
        }
      
      }
      const handlebooking=async(e)=>{

        let totalbed=0
        console.log(rd)
        let totalprice=0
        let totalbedorrooms={}
        for(var i in rd){
            if(rd[i]=="bed")
            {
                
                totalbedorrooms[i]={...totalbedorrooms[i],['beds']: parseInt( bed[i])}
                
                totalbed= parseInt( bed[i])
                if(totalbed<=details.totalbed[i])
                totalprice=totalprice+(totalbed* parseInt( details.price[i]))
                else
                alert(`number of beds exceeded in ${i} seater dorm`)
            }
            else{
                totalbedorrooms[i]={...totalbedorrooms[i],['rooms']: parseInt( room[i])}
                totalbed=parseInt(room[i])*i
                if(totalbed<=details.totalbed[i])
                totalprice=totalprice+(totalbed* parseInt( details.price[i]))
                else
                alert(`number of beds exceeded in ${i} seater dorm`)
            }
        }
        console.log(totalbedorrooms,totalprice)
        
        let booking={
            checkin:checkin,
            checkout:checkout,
            adults:adults,
            children:children,
            infants:infant,
            price:totalprice*((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)),
            totalbedorrooms:totalbedorrooms,
            reviews:[],
            comments:[],
            bookedon:"",
            bed:bed,
            name:Cookies.get('name'),
            ispaid:false,
            minimumDown:totalprice,
            paymentUpi:"",
            room:room,
            rd:rd,
            pan:"",
            phone:"",
            orderId:"",
            txnToken:"",
         
        }
        
        
        if(checkin!="" && checkout!="" && totalprice!==0){
        console.log(booking)
        setBooking(booking)
        console.log(params)
        try {
            const fetch=await axios.post(`${host}/api/booking/addBooking/${params}`,{...booking},{
                headers:{
                    "auth-token":Cookies.get("dorm--7z2__PMRW")
                }
            })
            const data=fetch.data;
            console.log(data)
            navigate(`/payment/${params}/${data.bookId}`)
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
       
        }
        
        
      }
      const handleupdatebooking=async()=>{
            
        let totalbed=0
        console.log(rd)
        let totalprice=0
        let totalbedorrooms={}
        
        for(var i in rd){
            if(rd[i]=="bed")
            {
                if(parseInt(bed[i])>0){
                totalbedorrooms[i]={...totalbedorrooms[i],['beds']: parseInt( bed[i])}
                
                totalbed= parseInt( bed[i])
                if(totalbed<=details.totalbed[i])
                totalprice=totalprice+(totalbed* parseInt( details.price[i]))
                else{
                alert(`number of beds exceeded in ${i} seater dorm`)
                return
                }
            }
            }
            else{
                if(parseInt(room[i])>0){
                totalbedorrooms[i]={...totalbedorrooms[i],['rooms']: parseInt( room[i])}
                totalbed=parseInt(room[i])*i
                if(totalbed<=details.totalbed[i])
                totalprice=totalprice+(totalbed* parseInt( details.price[i]))
                else{
                alert(`number of beds exceeded in ${i} seater dorm`)
                return
                }
            }
            }
        }
        console.log(totalbedorrooms,totalprice,totalbed)
        
        let booking={
            checkin:checkin,
            checkout:checkout,
            adults:adults,
            children:children,
            infants:infant,
            price:totalprice*((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)),
            totalbedorrooms:totalbedorrooms,
            reviews:[],
            comments:[],
            bookedon:"",
             name:Cookies.get('name'),
             ispaid:false,
             minimumDown:totalprice,
             paymentUpi:"",
            bed:bed,
            room:room,
            rd:rd,
            pan:"",
            phone:"",
            orderId:"",
            txnToken:"",
         
        }
        
        
        if(checkin!="" && checkout!="" && totalprice!==0){
        console.log(booking)
        setBooking(booking)
        console.log(params)
        try {
            const fetch=await axios.put(`${host}/api/booking/updateBooking/${bookId}`,{...booking},{
                headers:{
                    "auth-token":Cookies.get("dorm--7z2__PMRW")
                }
            })
            const data=fetch.data;
            console.log(data)
            navigate(`/payment/${params}/${bookId}`)
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
       
        }
        
      }

      const handlestar=async()=>{
        try {
        //    if(star)
                let arr=reviewinfo.stari;
                let obj=[{
                    user:userId,
                    rating:rating
                }]
                if(arr.length==0){
                const f=await axios.post(`${host}/api/reviews/updatereviews/${params}`,{
                reviews:{comments:reviewinfo.comments,star:[rating,0],stari:obj}
            })
        }

        else{
            let b=arr.find(e=>e.user===userId)
            if(b===undefined)
                {
                    let sumarr=arr.map((e)=>{return e.rating } )
                    let sun=await Promise.all(sumarr)
                    let sum=sun.reduce((a,b)=>{return a+b})
                    let totalstar=Math.floor((sum+rating)/(arr.length+1))
            const f=await axios.post(`${host}/api/reviews/updatereviews/${params}`,{
                reviews:{comments:reviewinfo.comments,star:[totalstar,0],stari:[...arr,{user:userId,rating:rating}]}
            })
        }
        else{
            let arr1=arr.filter(e=>e.user!==userId)
            let sumarr=arr1.map((e)=>{return e.rating } )
            let sun=await Promise.all(sumarr)
            console.log(sun)
            let sum=0
            if(sun.length!==0)
           sum=sun.reduce((a,b)=>{return a+b})
            let totalstar=Math.floor((sum+rating)/(arr.length))
            let ind=arr.findIndex(e=>e.user===userId);
            arr[ind]={user:userId,rating:rating}
            console.log(arr)
    const f=await axios.post(`${host}/api/reviews/updatereviews/${params}`,{
        reviews:{comments:reviewinfo.comments,star:[totalstar,0],stari:[...arr]}
    })  
        }

        }
        getreviews()
        } catch (error) {
            console.log(error)
        }
      }
      const [comment, setComment] = useState("")
      const [reviews, setReviews] = useState([])
      const handleiupdatereviews=async()=>{
        try {
            
            const f=await axios.post(`${host}/api/reviews/updatereviews/${params}`,{
                reviews:{stari:reviewinfo.stari,star:reviewinfo.star,comments:[...reviews,{user:Cookies.get('name'),comment:comment}]}
            })
            getreviews();
        } catch (error) {
            console.log(error)
        }
       
    }
  return (
    <>
    <button onClick={()=>setModal(true)} ref={calendarref}  class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
  Toggle modal
</button>

{modal &&<div  tabindex="-1"  class="backdrop-blur-md flex justify-center items-center  fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
       
        <div class="relative bg-white rounded-lg shadow ">
        
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                   Select a date
                </h3>
                <button onClick={()=>setModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class="p-6 space-y-6">
            <div >
                                        <Calendar tileDisabled={ (Cookies.get('cardstatus')==="checkin")? tileDisabled: (e)=>tileDisabled1(e,Cookies.get('cardstatus'))} className="rounded-b-md w-auto b-none" onChange={(e)=>handleChangeCalendar(e.toLocaleDateString())} value={calendar} />
                                        </div>
            </div>
          
     
        </div>
    </div>
</div>}
    <div className='mt-[15vh] w-[80vw] m-auto'>
        <div className='flex items-center gap-3'>
        <div className='text-[#3F3D56] text-[1.5rem] font-semibold'>
               {details.title}
            </div>
            <div className='flex gap-1 items-center'>
            <div className='text-[#3f3d56] font-bold text-xl'>
                {hoststar}
            </div>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#1C274C"></path> </g></svg>
            </div>
          
        </div>
           
            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}} classname=' flex justify-between w-full'>
                
            <div className='flex gap-2 text-[#3F3D56]'>
                <div>
                    {details.address.locality}
                </div>
                <div>
                {details.address.administrative_area_level_1}
                </div>
                <div>
                {details.address.country}
                </div>
                
                </div>
                <div className='flex gap-2'>
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.7188 27.5C21.7292 27.5 20.888 27.1526 20.1953 26.4579C19.5026 25.7632 19.1562 24.9196 19.1562 23.9272C19.1562 23.7882 19.1719 23.6183 19.2031 23.4174C19.2344 23.2165 19.2812 23.0357 19.3438 22.875L9.875 17.375C9.5625 17.7292 9.17708 18.0156 8.71875 18.2344C8.26042 18.4531 7.79167 18.5625 7.3125 18.5625C6.32292 18.5625 5.48177 18.2161 4.78906 17.5234C4.09635 16.8307 3.75 15.9896 3.75 15C3.75 14.0104 4.09635 13.1693 4.78906 12.4766C5.48177 11.7839 6.32292 11.4375 7.3125 11.4375C7.79167 11.4375 8.25 11.5312 8.6875 11.7188C9.125 11.9062 9.52083 12.1771 9.875 12.5312L19.3438 7.09375C19.2812 6.94644 19.2344 6.7807 19.2031 6.59653C19.1719 6.41238 19.1562 6.23438 19.1562 6.0625C19.1562 5.07292 19.5026 4.23177 20.1953 3.53906C20.888 2.84635 21.7292 2.5 22.7188 2.5C23.7083 2.5 24.5495 2.84635 25.2422 3.53906C25.9349 4.23177 26.2812 5.07292 26.2812 6.0625C26.2812 7.05208 25.9349 7.89323 25.2422 8.58594C24.5495 9.27865 23.7083 9.625 22.7188 9.625C22.2322 9.625 21.7668 9.54688 21.3226 9.39062C20.8784 9.23438 20.5 8.97917 20.1875 8.625L10.7188 13.875C10.7604 14.0417 10.7969 14.2344 10.8281 14.4531C10.8594 14.6719 10.875 14.8567 10.875 15.0075C10.875 15.1584 10.8594 15.3147 10.8281 15.4763C10.7969 15.6379 10.7604 15.8021 10.7188 15.9688L20.1875 21.3438C20.5 21.0521 20.8646 20.8177 21.2812 20.6406C21.6979 20.4635 22.1771 20.375 22.7188 20.375C23.7083 20.375 24.5495 20.7214 25.2422 21.4141C25.9349 22.1068 26.2812 22.9479 26.2812 23.9375C26.2812 24.9271 25.9349 25.7682 25.2422 26.4609C24.5495 27.1536 23.7083 27.5 22.7188 27.5ZM22.7198 7.75C23.1983 7.75 23.599 7.58818 23.9219 7.26453C24.2448 6.94089 24.4062 6.53984 24.4062 6.06141C24.4062 5.58297 24.2444 5.18229 23.9208 4.85938C23.5971 4.53646 23.1961 4.375 22.7177 4.375C22.2392 4.375 21.8385 4.53682 21.5156 4.86047C21.1927 5.18411 21.0312 5.58516 21.0312 6.06359C21.0312 6.54203 21.1931 6.94271 21.5167 7.26562C21.8404 7.58854 22.2414 7.75 22.7198 7.75ZM7.31359 16.6875C7.79203 16.6875 8.19271 16.5257 8.51562 16.202C8.83854 15.8784 9 15.4773 9 14.9989C9 14.5205 8.83818 14.1198 8.51453 13.7969C8.19089 13.474 7.78984 13.3125 7.31141 13.3125C6.83297 13.3125 6.43229 13.4743 6.10938 13.798C5.78646 14.1216 5.625 14.5227 5.625 15.0011C5.625 15.4795 5.78682 15.8802 6.11047 16.2031C6.43411 16.526 6.83516 16.6875 7.31359 16.6875ZM22.7198 25.625C23.1983 25.625 23.599 25.4632 23.9219 25.1395C24.2448 24.8159 24.4062 24.4148 24.4062 23.9364C24.4062 23.458 24.2444 23.0573 23.9208 22.7344C23.5971 22.4115 23.1961 22.25 22.7177 22.25C22.2392 22.25 21.8385 22.4118 21.5156 22.7355C21.1927 23.0591 21.0312 23.4602 21.0312 23.9386C21.0312 24.417 21.1931 24.8177 21.5167 25.1406C21.8404 25.4635 22.2414 25.625 22.7198 25.625Z" fill="#3F3D56"/>
</svg>
<svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.6665 27.9997V5.83301C6.6665 5.29967 6.8665 4.83301 7.2665 4.43301C7.6665 4.03301 8.13317 3.83301 8.6665 3.83301H23.3332C23.8665 3.83301 24.3332 4.03301 24.7332 4.43301C25.1332 4.83301 25.3332 5.29967 25.3332 5.83301V27.9997L15.9998 23.9997L6.6665 27.9997ZM8.6665 24.9663L15.9998 21.8663L23.3332 24.9663V5.83301H8.6665V24.9663Z" fill="#3F3D56"/>
</svg>

                </div>
            </div>
            <section>
                <div className="grid grid-cols-[70%_30%] gap-2 my-4">
                    <div style={{backgroundImage:`url(${details.photos[0]})`,backgroundSize:"cover"}} className='h-[40vh] rounded-md '>

                    </div>
                    <div className='flex flex-col gap-2'>
        <div style={{backgroundImage:`url(${details.photos[1]})`,backgroundSize:"cover"}} className='h-[19.5vh] rounded-md '>

        </div>
        <div style={{backgroundImage:`url(${details.photos[2]})`,backgroundSize:"cover"}} className='h-[19.5vh] rounded-md '>

        </div>
                    </div>
                </div>
                <div className='text-[#3F3D56]'>
                    {details.description}
                </div>
            </section>
   <section>
    <div className='text-[#3F3D56] font-semibold text-[1.5rem] my-5'>
        Facilities at Dormitory
    </div>
        <div>
            {
                     <div className={`  grid md:grid-cols-7 grid-cols-2  gap-3`}>
                     <div className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.wifi?"":"hidden"} `}>
                     <svg className='m-auto' width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_104_68)">
<rect width="48" height="48" fill='white'/>
<path d="M11.6 30.15L8.45 27C10.7833 24.6667 13.225 22.9167 15.775 21.75C18.325 20.5833 21.0667 20 24 20C26.9333 20 29.675 20.5833 32.225 21.75C34.775 22.9167 37.2167 24.6667 39.55 27L36.4 30.15C34.3667 28.1167 32.3167 26.6667 30.25 25.8C28.1833 24.9333 26.1 24.5 24 24.5C21.9 24.5 19.8167 24.9333 17.75 25.8C15.6833 26.6667 13.6333 28.1167 11.6 30.15ZM3.15 21.7L0 18.55C3.1 15.3833 6.70833 12.8333 10.825 10.9C14.9417 8.96667 19.3333 8 24 8C28.6667 8 33.0583 8.96667 37.175 10.9C41.2917 12.8333 44.9 15.3833 48 18.55L44.85 21.7C41.9167 18.9 38.7083 16.6667 35.225 15C31.7417 13.3333 28 12.5 24 12.5C20 12.5 16.2583 13.3333 12.775 15C9.29167 16.6667 6.08333 18.9 3.15 21.7ZM24 42.55L31.4 35.1C30.4333 34.1333 29.325 33.375 28.075 32.825C26.825 32.275 25.4667 32 24 32C22.5333 32 21.175 32.275 19.925 32.825C18.675 33.375 17.5667 34.1333 16.6 35.1L24 42.55Z" fill='#3F3D56'/>
</g>
<defs>
<clipPath id="clip0_104_68">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
<div className='text-center'>Wifi</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.TV?"":"hidden"} `}>
                     <svg className='m-auto' width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill='white'/>
<path d="M16.5 42V38H7C6.2 38 5.5 37.7 4.9 37.1C4.3 36.5 4 35.8 4 35V9C4 8.2 4.3 7.5 4.9 6.9C5.5 6.3 6.2 6 7 6H41C41.8 6 42.5 6.3 43.1 6.9C43.7 7.5 44 8.2 44 9V35C44 35.8 43.7 36.5 43.1 37.1C42.5 37.7 41.8 38 41 38H31.5V42H16.5ZM7 35H41V9H7V35Z" fill='#3F3D56'/>
</svg>
<div className='text-center'>TV</div>
                     </div>
                     <div className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.washingmachine?"":"hidden"} `}>
                     <svg className='m-auto' width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="50" height="50" fill='white'/>
<path d="M9.375 4.6875V45.3125H40.625V4.6875H9.375ZM39.0625 6.25V12.5H10.9375V6.25H39.0625ZM10.9375 43.75V14.0625H39.0625V43.75H10.9375Z" fill='#3F3D56' stroke='#3F3D56'/>
<path d="M15.625 10.9375C16.4879 10.9375 17.1875 10.2379 17.1875 9.375C17.1875 8.51206 16.4879 7.8125 15.625 7.8125C14.7621 7.8125 14.0625 8.51206 14.0625 9.375C14.0625 10.2379 14.7621 10.9375 15.625 10.9375Z" fill='#3F3D56' stroke='#3F3D56'/>
<path d="M21.875 10.9375C22.7379 10.9375 23.4375 10.2379 23.4375 9.375C23.4375 8.51206 22.7379 7.8125 21.875 7.8125C21.0121 7.8125 20.3125 8.51206 20.3125 9.375C20.3125 10.2379 21.0121 10.9375 21.875 10.9375Z" fill='#3F3D56' stroke='#3F3D56'/>
<path d="M28.125 10.9375C28.9879 10.9375 29.6875 10.2379 29.6875 9.375C29.6875 8.51206 28.9879 7.8125 28.125 7.8125C27.2621 7.8125 26.5625 8.51206 26.5625 9.375C26.5625 10.2379 27.2621 10.9375 28.125 10.9375Z" fill='#3F3D56' stroke='#3F3D56'/>
<path d="M34.375 10.9375C35.2379 10.9375 35.9375 10.2379 35.9375 9.375C35.9375 8.51206 35.2379 7.8125 34.375 7.8125C33.5121 7.8125 32.8125 8.51206 32.8125 9.375C32.8125 10.2379 33.5121 10.9375 34.375 10.9375Z" fill='#3F3D56' stroke='#3F3D56'/>
<path d="M25 17.1875C22.8368 17.1875 20.7221 17.829 18.9235 19.0308C17.1248 20.2326 15.7229 21.9408 14.8951 23.9394C14.0672 25.938 13.8506 28.1371 14.2727 30.2588C14.6947 32.3805 15.7364 34.3293 17.266 35.859C18.7957 37.3886 20.7445 38.4303 22.8662 38.8523C24.9879 39.2744 27.187 39.0578 29.1856 38.2299C31.1842 37.4021 32.8924 36.0002 34.0942 34.2016C35.296 32.4029 35.9375 30.2882 35.9375 28.125C35.9375 25.2242 34.7852 22.4422 32.734 20.391C30.6828 18.3398 27.9008 17.1875 25 17.1875ZM25 37.5C23.1458 37.5 21.3332 36.9502 19.7915 35.92C18.2498 34.8899 17.0482 33.4257 16.3386 31.7127C15.6291 29.9996 15.4434 28.1146 15.8051 26.296C16.1669 24.4775 17.0598 22.807 18.3709 21.4959C19.682 20.1848 21.3525 19.2919 23.171 18.9301C24.9896 18.5684 26.8746 18.7541 28.5877 19.4636C30.3007 20.1732 31.7649 21.3748 32.795 22.9165C33.8252 24.4582 34.375 26.2708 34.375 28.125C34.375 30.6114 33.3873 32.996 31.6291 34.7541C29.871 36.5123 27.4864 37.5 25 37.5Z" fill='#3F3D56' stroke='#3F3D56'/>
<path d="M25 21.875C23.7639 21.875 22.5555 22.2416 21.5277 22.9283C20.4999 23.6151 19.6988 24.5912 19.2258 25.7332C18.7527 26.8753 18.6289 28.1319 18.8701 29.3443C19.1113 30.5567 19.7065 31.6703 20.5806 32.5444C21.4547 33.4185 22.5683 34.0138 23.7807 34.2549C24.9931 34.4961 26.2497 34.3723 27.3918 33.8992C28.5338 33.4262 29.5099 32.6251 30.1967 31.5973C30.8834 30.5695 31.25 29.3611 31.25 28.125C31.25 26.4674 30.5915 24.8777 29.4194 23.7056C28.2473 22.5335 26.6576 21.875 25 21.875ZM25 32.8125C24.0729 32.8125 23.1666 32.5376 22.3958 32.0225C21.6249 31.5074 21.0241 30.7754 20.6693 29.9188C20.3145 29.0623 20.2217 28.1198 20.4026 27.2105C20.5834 26.3012 21.0299 25.466 21.6854 24.8104C22.341 24.1549 23.1762 23.7084 24.0855 23.5276C24.9948 23.3467 25.9373 23.4395 26.7938 23.7943C27.6504 24.1491 28.3824 24.7499 28.8975 25.5208C29.4126 26.2916 29.6875 27.1979 29.6875 28.125C29.6875 29.3682 29.1936 30.5605 28.3146 31.4396C27.4355 32.3186 26.2432 32.8125 25 32.8125Z" fill='#3F3D56' stroke='#3F3D56'/>
</svg>

<div className='text-center'>Washing Machine</div>
                     </div>
                     <div className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.airconditioning?"":"hidden"} `}>
                     <svg className='m-auto' width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="50" height="50" rx="10" fill='white'/>
<path d="M40.625 7.8125H9.375C8.34905 7.8125 7.33314 8.01458 6.38529 8.40719C5.43743 8.79981 4.57619 9.37527 3.85073 10.1007C2.3856 11.5659 1.5625 13.553 1.5625 15.625V34.375C1.56235 36.4309 2.37257 38.4039 3.81748 39.8664C5.2624 41.3288 7.22554 42.1628 9.28125 42.1875H40.625C42.697 42.1875 44.6841 41.3644 46.1493 39.8993C47.6144 38.4341 48.4375 36.447 48.4375 34.375V15.625C48.4375 13.553 47.6144 11.5659 46.1493 10.1007C44.6841 8.6356 42.697 7.8125 40.625 7.8125ZM39.0625 39.0625H10.9375V34.375C10.9375 33.9606 11.1021 33.5632 11.3951 33.2701C11.6882 32.9771 12.0856 32.8125 12.5 32.8125H37.5C37.9144 32.8125 38.3118 32.9771 38.6049 33.2701C38.8979 33.5632 39.0625 33.9606 39.0625 34.375V39.0625ZM45.3125 34.375C45.313 35.3448 45.0127 36.2908 44.453 37.0828C43.8933 37.8747 43.1018 38.4736 42.1875 38.7969V34.375C42.1875 33.1318 41.6936 31.9395 40.8146 31.0604C39.9355 30.1814 38.7432 29.6875 37.5 29.6875H12.5C11.2568 29.6875 10.0645 30.1814 9.18544 31.0604C8.30636 31.9395 7.8125 33.1318 7.8125 34.375V38.7656C6.9032 38.4442 6.1152 37.85 5.55595 37.0643C4.9967 36.2786 4.69343 35.3394 4.6875 34.375V15.625C4.6875 14.3818 5.18136 13.1895 6.06044 12.3104C6.93951 11.4314 8.1318 10.9375 9.375 10.9375H40.625C41.8682 10.9375 43.0605 11.4314 43.9396 12.3104C44.8186 13.1895 45.3125 14.3818 45.3125 15.625V34.375Z" fill='#3F3D56'/>
<path d="M40.625 14.0625H34.375C33.9606 14.0625 33.5632 14.2271 33.2701 14.5201C32.9771 14.8132 32.8125 15.2106 32.8125 15.625C32.8125 16.0394 32.9771 16.4368 33.2701 16.7299C33.5632 17.0229 33.9606 17.1875 34.375 17.1875H40.625C41.0394 17.1875 41.4368 17.0229 41.7299 16.7299C42.0229 16.4368 42.1875 16.0394 42.1875 15.625C42.1875 15.2106 42.0229 14.8132 41.7299 14.5201C41.4368 14.2271 41.0394 14.0625 40.625 14.0625Z" fill='#3F3D56'/>
</svg>


<div className='text-center '>Air Conditioner</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.studyplace?"":"hidden"} `}>
                     <svg width="30" height="30" className='m-auto' viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="10" fill='white'/>
<path d="M12 57H6V61H12V57Z" fill='#3F3D56'/>
<path d="M58 57H52V61H58V57Z" fill='#3F3D56'/>
<path d="M47 43H59V51H43V47C43 45.9391 43.4214 44.9217 44.1716 44.1716C44.9217 43.4214 45.9391 43 47 43Z" fill='#3F3D56'/>
<path d="M35.34 31.1099L22.62 18.3799L32 13.6899C32.5648 13.4077 33.2042 13.3109 33.8273 13.4132C34.4503 13.5156 35.0252 13.8119 35.47 14.2599L39.47 18.2599C39.9115 18.7094 40.2003 19.2865 40.2955 19.9093C40.3906 20.5322 40.2872 21.1692 40 21.7299L35.34 31.1099Z" fill='#3F3D56'/>
<path d="M26.8528 22.6201L31.0955 26.8628L30.3884 27.5699C29.8258 28.1325 29.0627 28.4485 28.2671 28.4485C27.4714 28.4485 26.7083 28.1325 26.1457 27.5699C25.5831 27.0073 25.2671 26.2442 25.2671 25.4485C25.2671 24.6529 25.5831 23.8898 26.1457 23.3272L26.8528 22.6201Z" fill='#3F3D56'/>
<path d="M43.39 7.51L36.05 14.85L38.88 17.68L46.22 10.33C47.0768 9.48073 48.2336 9.00294 49.44 9C50.6494 9 51.8092 9.48043 52.6644 10.3356C53.5196 11.1908 54 12.3506 54 13.56V43H58V13.56C58 11.2897 57.0981 9.11248 55.4928 7.50717C53.8875 5.90185 51.7102 5 49.44 5C48.3161 5.0002 47.2032 5.22199 46.1651 5.65268C45.127 6.08337 44.184 6.71451 43.39 7.51Z" fill='#3F3D56'/>
<path d="M14.71 47.9001L7 50.0001V51.0001H23V50.0001L20.93 48.7601C20.0062 48.2014 18.9781 47.8369 17.9086 47.6891C16.8392 47.5412 15.7508 47.613 14.71 47.9001Z" fill='#3F3D56'/>
<path d="M25.07 48.7601L23 50.0001V51.0001H39V50.0001L31.29 47.9001C30.2492 47.613 29.1608 47.5412 28.0914 47.6891C27.0219 47.8369 25.9938 48.2014 25.07 48.7601Z" fill='#3F3D56'/>
<path d="M7 51H3V57H61V54H10C9.20435 54 8.44129 53.6839 7.87868 53.1213C7.31607 52.5587 7 51.7956 7 51Z" fill='#3F3D56'/>
<path d="M3 52.0001H61C61.2652 52.0001 61.5196 51.8947 61.7071 51.7072C61.8946 51.5196 62 51.2653 62 51.0001C62 50.7349 61.8946 50.4805 61.7071 50.293C61.5196 50.1054 61.2652 50.0001 61 50.0001H60V43.0001C60 42.7349 59.8946 42.4805 59.7071 42.293C59.5196 42.1054 59.2652 42.0001 59 42.0001V13.5601C58.9974 11.0254 57.9893 8.59532 56.197 6.80305C54.4047 5.01078 51.9747 4.00271 49.44 4.00007C48.1853 3.99532 46.9423 4.24046 45.7834 4.7212C44.6245 5.20193 43.5729 5.90863 42.69 6.80007L36 13.4401C35.4044 12.8914 34.6562 12.5365 33.8545 12.4222C33.0527 12.3079 32.2352 12.4397 31.51 12.8001L22.13 17.4901C21.9888 17.5605 21.8662 17.6634 21.7724 17.7902C21.6785 17.9171 21.616 18.0644 21.59 18.2201C21.5642 18.3769 21.5761 18.5376 21.6248 18.6889C21.6735 18.8402 21.7575 18.9777 21.87 19.0901L25.4 22.6301C24.6822 23.3869 24.2884 24.3943 24.3027 25.4373C24.3169 26.4804 24.7381 27.4766 25.4764 28.2136C26.2146 28.9505 27.2116 29.3699 28.2547 29.3823C29.2977 29.3948 30.3044 28.9992 31.06 28.2801L34.6 31.8201C34.7863 32.0048 35.0377 32.109 35.3 32.1101H35.46C35.6174 32.0855 35.7668 32.0237 35.8955 31.9298C36.0242 31.8359 36.1286 31.7125 36.2 31.5701L40.89 22.1901C41.2491 21.4639 41.3792 20.6458 41.2631 19.844C41.1471 19.0422 40.7903 18.2946 40.24 17.7001L46.93 11.0001C47.2619 10.6763 47.6545 10.4213 48.0852 10.2497C48.516 10.078 48.9764 9.99322 49.44 10.0001C50.3834 10.0027 51.2873 10.3786 51.9544 11.0457C52.6214 11.7127 52.9974 12.6167 53 13.5601V42.0001H49V41.0001C49 40.7349 48.8946 40.4805 48.7071 40.293C48.5196 40.1054 48.2652 40.0001 48 40.0001C47.7348 40.0001 47.4804 40.1054 47.2929 40.293C47.1054 40.4805 47 40.7349 47 41.0001V42.0001C45.6739 42.0001 44.4021 42.5269 43.4645 43.4645C42.5268 44.4022 42 45.674 42 47.0001V50.0001H40V47.0001C40.0077 46.7743 39.9388 46.5526 39.8044 46.371C39.6701 46.1894 39.4782 46.0587 39.26 46.0001L31.56 43.8901C30.3861 43.5755 29.1607 43.5019 27.9577 43.6738C26.7546 43.8457 25.5988 44.2594 24.56 44.8901L23 45.8301L21.44 44.9001C20.4012 44.2694 19.2454 43.8557 18.0423 43.6838C16.8393 43.5119 15.6139 43.5855 14.44 43.9001L6.74 46.0001C6.52184 46.0587 6.32994 46.1894 6.19557 46.371C6.0612 46.5526 5.99227 46.7743 6 47.0001V50.0001H3C2.73478 50.0001 2.48043 50.1054 2.29289 50.293C2.10536 50.4805 2 50.7349 2 51.0001C2 51.2653 2.10536 51.5196 2.29289 51.7072C2.48043 51.8947 2.73478 52.0001 3 52.0001ZM26.86 26.8701C26.674 26.6843 26.5265 26.4637 26.4259 26.2209C26.3252 25.9782 26.2734 25.7179 26.2734 25.4551C26.2734 25.1922 26.3252 24.932 26.4259 24.6892C26.5265 24.4464 26.674 24.2258 26.86 24.0401L28.27 25.4601L29.69 26.8701C29.5043 27.056 29.2837 27.2035 29.0409 27.3042C28.7981 27.4048 28.5378 27.4566 28.275 27.4566C28.0122 27.4566 27.7519 27.4048 27.5091 27.3042C27.2663 27.2035 27.0457 27.056 26.86 26.8701ZM39.14 21.2901L35.07 29.4201L24.3 18.6601L32.44 14.5901C32.8151 14.4014 33.2401 14.3357 33.6547 14.4021C34.0693 14.4685 34.4525 14.6637 34.75 14.9601L35.34 15.5501L36.76 17.0001L38.76 19.0001C39.0537 19.2948 39.2481 19.6738 39.3162 20.0843C39.3843 20.4948 39.3227 20.9163 39.14 21.2901ZM49.44 8.00007C48.7098 7.99882 47.9865 8.14222 47.312 8.42199C46.6374 8.70176 46.025 9.11235 45.51 9.63007L38.88 16.2601L38.17 15.5601L37.46 14.8501L44.1 8.21007C45.1578 7.15449 46.5048 6.43611 47.9707 6.14567C49.4366 5.85523 50.9558 6.00576 52.3362 6.57826C53.7166 7.15075 54.8963 8.11952 55.7264 9.36218C56.5565 10.6048 56.9997 12.0657 57 13.5601V42.0001H55V13.5601C55 12.8299 54.8562 12.1069 54.5768 11.4323C54.2974 10.7578 53.8878 10.1448 53.3715 9.62855C52.8552 9.11226 52.2423 8.70271 51.5677 8.4233C50.8931 8.14388 50.1701 8.00007 49.44 8.00007ZM44 47.0001C44 46.2044 44.3161 45.4414 44.8787 44.8787C45.4413 44.3161 46.2043 44.0001 47 44.0001H58V50.0001H44V47.0001ZM25.59 46.6101C26.3955 46.1289 27.2895 45.8145 28.2188 45.6857C29.1482 45.5568 30.094 45.6161 31 45.8601L38 47.7601V50.0001H24V47.5701L25.59 46.6101ZM8 47.7601L15 45.8601C15.9105 45.6119 16.8618 45.5505 17.7966 45.6793C18.7315 45.8082 19.6306 46.1248 20.44 46.6101L22.03 47.6101V50.0001H8V47.7601Z" fill='#3F3D56'/>
<path d="M61 56H3C2.73478 56 2.48043 56.1054 2.29289 56.2929C2.10536 56.4804 2 56.7348 2 57C2 57.2652 2.10536 57.5196 2.29289 57.7071C2.48043 57.8946 2.73478 58 3 58H5V61C5 61.2652 5.10536 61.5196 5.29289 61.7071C5.48043 61.8946 5.73478 62 6 62C6.26522 62 6.51957 61.8946 6.70711 61.7071C6.89464 61.5196 7 61.2652 7 61V58H11V61C11 61.2652 11.1054 61.5196 11.2929 61.7071C11.4804 61.8946 11.7348 62 12 62C12.2652 62 12.5196 61.8946 12.7071 61.7071C12.8946 61.5196 13 61.2652 13 61V58H51V61C51 61.2652 51.1054 61.5196 51.2929 61.7071C51.4804 61.8946 51.7348 62 52 62C52.2652 62 52.5196 61.8946 52.7071 61.7071C52.8946 61.5196 53 61.2652 53 61V58H57V61C57 61.2652 57.1054 61.5196 57.2929 61.7071C57.4804 61.8946 57.7348 62 58 62C58.2652 62 58.5196 61.8946 58.7071 61.7071C58.8946 61.5196 59 61.2652 59 61V58H61C61.2652 58 61.5196 57.8946 61.7071 57.7071C61.8946 57.5196 62 57.2652 62 57C62 56.7348 61.8946 56.4804 61.7071 56.2929C61.5196 56.1054 61.2652 56 61 56Z" fill='#3F3D56'/>
</svg>


<div className='text-center'>Study Space</div>
                     </div>
                     <div className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.unisex?"":"hidden"} `}>
                     <svg className='m-auto' fill='#3F3D56' width='30' height='30' viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="22.875" cy="4.625" r="4.125"></circle><path d="M22 10h-3c-2.82 0-5 1.719-5 4.587v12.413c0 2 3 2 3 0v-12h1v32c0 1.233.768 2 2 2 1.235 0 2-.767 2-2v-37zm13 15l-4.017-10.357c-.349-2.321-2.693-4.643-5.368-4.643h-2.615v23.783c.5.002 1 .075 1 .217v13c0 1.04.917 2 2 2 1.086 0 2-.961 2-2v-13h3.869c.362 0 1.044-.654 1.044-1 0-.08.029-.931 0-1l-5.909-16.237-.034-.167c0-.237.199-.429.447-.429.211 0 .388.141.435.329l4.017 10.504c.267.601 1.365 1 2.087 1 .965 0 1.065-1.895 1.044-2z"></path></g></svg>
<div className='text-center'>Unisex</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.bathrooms?"":"hidden"} `}>
                     <svg className='m-auto' fill='#3F3D56' height="30" width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 211.667 211.667" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M211.667,98.551c0,2.209-1.791,4-4,4H201v26.448c0,13.403-7.085,25.178-17.702,31.792l7.999,14.878 c1.046,1.946,0.317,4.371-1.629,5.418c-0.603,0.323-1.251,0.478-1.891,0.478c-1.425,0-2.804-0.764-3.526-2.106l-8.164-15.186 c-3.918,1.395-8.131,2.161-12.522,2.161H48.102c-3.755,0-7.38-0.562-10.802-1.595l-7.86,14.62c-0.722,1.343-2.102,2.106-3.526,2.106 c-0.64,0-1.288-0.154-1.891-0.478c-1.946-1.047-2.675-3.472-1.629-5.418l7.512-13.972c-11.465-6.406-19.239-18.659-19.239-32.699 v-26.448H4c-2.209,0-4-1.791-4-4s1.791-4,4-4h10.667H197h10.667C209.876,94.551,211.667,96.342,211.667,98.551z M4,60.814h43.083 c3.584,0,6.5,2.916,6.5,6.5v8.5c0,2.209,1.791,4,4,4s4-1.791,4-4v-8.5c0-7.995-6.505-14.5-14.5-14.5H4c-2.209,0-4,1.791-4,4 S1.791,60.814,4,60.814z M9.25,48.602h6.833c2.209,0,4-1.791,4-4v-10.5c0-2.209-1.791-4-4-4H9.25c-5.101,0-9.25,4.149-9.25,9.25 S4.149,48.602,9.25,48.602z"></path> </g></svg>
<div className='text-center'>Bathroom</div>
                     </div>
                     <div className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.toilets?"":"hidden"} `}>
                     <svg className='m-auto' fill='#3F3D56' height='30' width='30' viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M25 0C17.28125 0 11 7.625 11 17C11 19.980469 11.632813 22.820313 12.84375 25.375C13.167969 25.144531 13.574219 25 14 25L17 25C18.101563 25 19 25.898438 19 27L25 27C21.132813 27 18 22.523438 18 17C18 11.476563 21.132813 7 25 7C28.867188 7 32 11.476563 32 17C32 22.523438 28.867188 27 25 27L31 27C31 25.898438 31.898438 25 33 25L36 25C36.425781 25 36.832031 25.144531 37.15625 25.375C38.367188 22.820313 39 19.980469 39 17C39 7.625 32.71875 0 25 0 Z M 14 26C13.449219 26 13 26.445313 13 27L18 27C18 26.445313 17.550781 26 17 26 Z M 33 26C32.445313 26 32 26.445313 32 27L37 27C37 26.445313 36.554688 26 36 26 Z M 11 28C9.347656 28 8 29.347656 8 31C8 32.652344 9.347656 34 11 34L39 34C40.652344 34 42 32.652344 42 31C42 29.347656 40.652344 28 39 28 Z M 10.03125 34.875C10.476563 40.53125 15.230469 45 21 45L29 45C34.769531 45 39.523438 40.53125 39.96875 34.875C39.660156 34.949219 39.332031 35 39 35L11 35C10.667969 35 10.339844 34.949219 10.03125 34.875 Z M 15.9375 44.875C15.429688 45.789063 15 47.113281 15 49C15 49.554688 15.449219 50 16 50L34 50C34.007813 50 34.027344 50 34.03125 50C34.585938 50 35.03125 49.554688 35.03125 49C35.03125 48.929688 35.015625 48.847656 35 48.78125C34.96875 47.003906 34.550781 45.757813 34.0625 44.875C32.523438 45.59375 30.808594 46 29 46L21 46C19.191406 46 17.476563 45.59375 15.9375 44.875Z"></path></g></svg>
<div className='text-center'>Toilet</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.water?"":"hidden"} `}>
                     <svg className='m-auto' width='30' height='30' viewBox="0 0 1024 1024" fill='#3F3D56'  version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M906.895 675.529c0-164.007-45.881-287.583-136.353-367.23-107.742-94.929-237.319-90.326-270.497-87.343h-58.548c-6.849-22.867-29.053-39.805-55.675-39.805h-29.127c-26.622 0-48.826 16.9-55.749 39.805h-205.874v174.466h203.518v17.307c0 30.009 26.107 54.461 58.106 54.461h29.127c32.073 0 58.106-24.413 58.106-54.461v-17.307h60.572l4.676 0.11 5.45-0.699c0.848-0.11 82.335-8.027 141.914 45.55 50.41 45.292 75.891 124.386 75.891 235.148h174.466zM268.173 156.147h210.993c24.985-0.020 45.233-20.27 45.255-45.253v-23.31c-0.020-24.985-20.27-45.233-45.253-45.255h-210.994c0 0 0 0 0 0-25.002 0-45.27 20.257-45.292 45.253v23.346c0.041 24.982 20.304 45.219 45.292 45.219 0 0 0 0 0 0zM852.73 720.157l-29.347-33.249-29.347 33.249c-21.872 24.781-93.271 110.135-93.271 166.659 0 67.606 55.012 122.62 122.62 122.62s122.62-55.012 122.62-122.62c0-56.523-71.325-141.875-93.271-166.659zM823.381 931.187c-24.502-0.041-44.35-19.903-44.371-44.405 0.074-12.117 19.148-44.889 44.371-78.729 25.334 33.767 44.223 66.539 44.371 78.726 0 24.524-19.847 44.407-44.371 44.407z"></path></g></svg>
<div className='text-center'>Water</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.gym?"":"hidden"} `}>
                     <svg  className='m-auto' width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.5 43.8002L25.4 41.7002L32.5 34.6002L13.4 15.5002L6.30001 22.6002L4.20001 20.5002L7.00001 17.6002L4.20001 14.8002L8.45001 10.5502L6.35001 8.4502L8.45001 6.3502L10.6 8.4002L14.8 4.2002L17.6 7.0002L20.5 4.2002L22.6 6.3002L15.5 13.4002L34.6 32.5002L41.7 25.4002L43.8 27.5002L41 30.4002L43.8 33.2002L39.5 37.5002L41.6 39.6002L39.5 41.7002L37.4 39.6002L33.2 43.8002L30.4 41.0002L27.5 43.8002Z" fill='#3F3D56'/>
</svg>


<div className='text-center'>Gym</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.playarea?"":"hidden"} `}>
                     <svg className='m-auto' width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_105_83)">
<path d="M47.9167 12.5002H13.5417L5 0.416897C4.79167 0.000230709 3.95833 -0.208103 3.54167 0.208564C3.125 0.625231 2.91667 1.25023 3.33333 1.6669L11.0417 12.5002H2.08333C0.833333 12.5002 0 13.3336 0 14.5836V47.9169C0 49.1669 0.833333 50.0002 2.08333 50.0002H47.9167C49.1667 50.0002 50 49.1669 50 47.9169V14.5836C50 13.3336 49.1667 12.5002 47.9167 12.5002ZM45.8333 16.6669V18.7502C44.5833 18.7502 43.75 17.9169 43.75 16.6669H45.8333ZM27.0833 16.6669C27.0833 17.9169 26.25 18.7502 25 18.7502C23.75 18.7502 22.9167 17.9169 22.9167 16.6669H27.0833ZM4.16667 16.6669H6.25C6.25 17.9169 5.41667 18.7502 4.16667 18.7502V16.6669ZM4.16667 45.8336V43.7502C5.41667 43.7502 6.25 44.5836 6.25 45.8336H4.16667ZM22.9167 45.8336C22.9167 44.5836 23.75 43.7502 25 43.7502C26.25 43.7502 27.0833 44.5836 27.0833 45.8336H22.9167ZM29.1667 45.8336C29.1667 43.5419 27.2917 41.6669 25 41.6669C22.7083 41.6669 20.8333 43.5419 20.8333 45.8336H8.33333C8.33333 43.5419 6.45833 41.6669 4.16667 41.6669V20.8336C6.45833 20.8336 8.33333 18.9586 8.33333 16.6669H13.9583L23.75 30.4169C24.1667 30.8336 24.7917 31.0419 25.2083 30.6252C25.625 30.2086 25.8333 29.5836 25.4167 29.1669L16.6667 16.6669H20.8333C20.8333 18.9586 22.7083 20.8336 25 20.8336C27.2917 20.8336 29.1667 18.9586 29.1667 16.6669H41.6667C41.6667 18.9586 43.5417 20.8336 45.8333 20.8336V41.6669C43.5417 41.6669 41.6667 43.5419 41.6667 45.8336H29.1667ZM43.75 45.8336C43.75 44.5836 44.5833 43.7502 45.8333 43.7502V45.8336H43.75Z" fill='#3F3D56'/>
<path d="M29.1667 37.5002C30.3173 37.5002 31.25 36.5674 31.25 35.4168C31.25 34.2662 30.3173 33.3335 29.1667 33.3335C28.0161 33.3335 27.0834 34.2662 27.0834 35.4168C27.0834 36.5674 28.0161 37.5002 29.1667 37.5002Z" fill='#3F3D56'/>
</g>
<defs>
<clipPath id="clip0_105_83">
<rect width="50" height="50" fill="white"/>
</clipPath>
</defs>
</svg>



<div className='text-center'>Play Area</div>
                     </div>
                     <div className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.kitchen?"":"hidden"} `}>
                     <svg className='m-auto' width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.375 43.75C8.54167 43.75 7.8125 43.4375 7.1875 42.8125C6.5625 42.1875 6.25 41.4583 6.25 40.625V9.375C6.25 8.54167 6.5625 7.8125 7.1875 7.1875C7.8125 6.5625 8.54167 6.25 9.375 6.25H40.625C41.4583 6.25 42.1875 6.5625 42.8125 7.1875C43.4375 7.8125 43.75 8.54167 43.75 9.375V40.625C43.75 41.4583 43.4375 42.1875 42.8125 42.8125C42.1875 43.4375 41.4583 43.75 40.625 43.75H9.375ZM9.375 24.4792V40.625H40.625V24.4792H34.8958V34.8958H15.1042V24.4792H9.375ZM18.2292 31.7708H31.7708V24.4792H18.2292V31.7708ZM9.375 21.3542H40.625V9.375H9.375V21.3542ZM16.6576 16.1458C16.2122 16.1458 15.842 15.9952 15.5469 15.694C15.2517 15.3928 15.1042 15.0195 15.1042 14.5742C15.1042 14.1289 15.2548 13.7587 15.556 13.4635C15.8572 13.1684 16.2305 13.0208 16.6758 13.0208C17.1211 13.0208 17.4913 13.1714 17.7865 13.4727C18.0816 13.7739 18.2292 14.1472 18.2292 14.5924C18.2292 15.0378 18.0786 15.408 17.7773 15.7031C17.4761 15.9983 17.1028 16.1458 16.6576 16.1458ZM24.9909 16.1458C24.5456 16.1458 24.1753 15.9952 23.8802 15.694C23.5851 15.3928 23.4375 15.0195 23.4375 14.5742C23.4375 14.1289 23.5881 13.7587 23.8893 13.4635C24.1906 13.1684 24.5638 13.0208 25.0091 13.0208C25.4544 13.0208 25.8247 13.1714 26.1198 13.4727C26.4149 13.7739 26.5625 14.1472 26.5625 14.5924C26.5625 15.0378 26.4119 15.408 26.1107 15.7031C25.8094 15.9983 25.4362 16.1458 24.9909 16.1458ZM33.3242 16.1458C32.8789 16.1458 32.5087 15.9952 32.2135 15.694C31.9184 15.3928 31.7708 15.0195 31.7708 14.5742C31.7708 14.1289 31.9214 13.7587 32.2227 13.4635C32.5239 13.1684 32.8972 13.0208 33.3424 13.0208C33.7878 13.0208 34.158 13.1714 34.4531 13.4727C34.7483 13.7739 34.8958 14.1472 34.8958 14.5924C34.8958 15.0378 34.7452 15.408 34.444 15.7031C34.1428 15.9983 33.7695 16.1458 33.3242 16.1458Z" fill='#3F3D56'/>
</svg>



<div className='text-center'>Kitchen</div>
                     </div>
                     <div  className={`bg-white text-[#3F3D56] border rounded p-[2rem] ${details.ammeneties.mess?"":"hidden"} `}>
                     <svg className='m-auto' width='30' height='30' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" enable-background="new 0 0 32 32"  fill='#3F3D56'><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line fill="none" stroke='#3F3D56' stroke-width="2" stroke-miterlimit="10" x1="5" y1="27" x2="13.5" y2="18.5"></line> <line fill="none" stroke='#3F3D56' stroke-width="2" stroke-miterlimit="10" x1="16" y1="16" x2="25.2" y2="6.8"></line> <line fill="none" stroke='#3F3D56' stroke-width="2" stroke-miterlimit="10" x1="27" y1="27" x2="14" y2="14"></line> <path fill="none" stroke='#3F3D56' stroke-width="2" stroke-miterlimit="10" d="M17.9,17.9l-2.5,2.5l-8.9-8.9c-1.4-1.4-1.4-3.6,0-5 l0,0L17.9,17.9z"></path> <path fill="none" stroke='#3F3D56'stroke-width="2" stroke-miterlimit="10" d="M27.3,8.9l-4.6,4.6c-0.8,0.8-2,0.8-2.8,0l-1.4-1.4 c-0.8-0.8-0.8-2,0-2.8l4.6-4.6"></path> </g></svg>



<div className='text-center'>Mess</div>
                     </div>
                 </div>
            }
        </div>
   </section>
   <section>
        <div className='my-3 text-[#3F3D56] text-[1.5rem] font-semibold'>Select Your dorm room</div>
        <div className='flex my-3'>
                                    <div className="relative">
                                    <input value={checkin}  onClick={()=>{calendarref.current.click();Cookies.set('cardstatus',"checkin")}} className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="" id="" placeholder='checkin'/>
                                    <label  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4  ">Checkin</label>
                                    </div>
                                    <div className="relative">
                                    <input value={checkout} onClick={()=>{calendarref.current.click();Cookies.set('cardstatus',"checkout")}} className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer' type="text" name="" id="" placeholder='checkout'/>
                                    <label  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4  ">Checkout</label>
                                    </div>
                                </div>
        <div className='grid grid-cols-2 gap-2 my-5'>
              { rooms.map((e,i)=>{

                return (
                        <>  <div className='p-5 border border-[#3F3D56] rounded-md'>
                    <div className='text-[#3F3D56] font-semibold text-[1.2rem] mb-3'>{e} seater dorm room</div>
                            <div className='flex items-center gap-2'>
                                <div>
                                <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </div>
                                <div>
                                    {
                                      details.price[e]
                                    }
                                </div>
                            </div>
                                <div className='text-sm'>
                                    Total before taxes
                                </div>
                                
                                <div className='w-full'>
                                    <div className="relative">
                                
                                    
                                    <button onClick={()=>handledropdown(e)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-[#3f3d56] border border-[#3f3d56] my-2 px-2  font-medium rounded-lg text-sm w-full py-1 text-center inline-flex items-center " type="button">Guests<svg class="w-2.5 h-2.5 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>

{ guest[e] && <div className="absolute p-3 bg-white rounded-md w-[100%] md:w-[70%]">
                      <div>
                        <div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Adults</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => { handleadults(e,"sub") }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input onChange={(ev)=>handleChange(e,"adults",ev)} className='w-[2.5rem] text-center' type="number"  value={adults[e]?adults[e]:0} min={0} />
                            <div onClick={ ()=> handleadults(e,"add")}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Children-age 13+</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => { handlechildren(e,"sub")}}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input  onChange={(ev)=>handleChange(e,"children",ev)} className='w-[2.5rem] text-center' type="number"  value={children[e]?children[e]:0} min={0} />
                            <div onClick={() => {handlechildren(e,"add")}}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Infants</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => { handleinfants(e,"sub") }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input onChange={(ev)=>handleChange(e,"infants",ev)} className='w-[2.5rem] text-center' type="number"  value={infant[e]?infant[e]:0} min={0} />
                            <div onClick={() => { handleinfants(e,"add")}}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                        <div className='my-1 text-[#3f3d56]'>
                            Select one of following
                        </div>
                        <div className='flex justify-center gap-5'>
                            <div onClick={()=>handleswitchrd(e,"room")} >Room</div>
                            <div>--OR--</div>
                            <div  onClick={()=>handleswitchrd(e,"bed")}  >Bed</div>
                        </div>
                        { rd[e]==="bed"?<div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Beds</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => {handlebed(e,"sub")}}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input onChange={(ev)=>handleChange(e,"beds",ev)} className='w-[2.5rem] text-center' type="number"  value={bed[e]?bed[e]:0} min={0} />
                            <div onClick={() => { handlebed(e,"add") }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                        :( rd[e]==="room")?<div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Rooms</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => {handleroom(e,"sub")}}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input  onChange={(ev)=>handleChange(e,"rooms",ev)} className='w-[2.5rem] text-center' type="number"  value={room[e]?room[e]:0} min={0} />
                            <div onClick={() => { handleroom(e,"add") }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>: <div></div> }
                      </div>

                    </div>}


                              
                                    </div>
                                   <div className='text-[#3f3d56] text-sm'>
                                  
                                   <div> beds available : {details.totalbed[e]}</div>
                                   </div>
                                </div>
                              
                </div>
                </>
                )
              }) }
        </div>
                {!bookId?<div className='my-3 text-center'>
                                    <button onClick={()=>{handlebooking()}} className=' bg-[#3F3D56] py-1 px-[20vw] text-white rounded-md'>Book</button>
                                </div>:<div className='my-3 text-center'>
                                    <button onClick={()=>{handleupdatebooking()}} className=' bg-[#3F3D56] py-1 px-[20vw] text-white rounded-md'>Update Booking</button>
                                </div>}
   </section>
   <section>
    <div  className='text-[#3F3D56] text-[1.5rem] font-semibold'>
        Reviews
    </div>
  
    <div>
        <div className='my-3 text-[#3f3d56] text-lg'>Rate Us</div>
        <Rating 
        initialValue={rating}
        onClick={handleRating}
       
        /* Available Props */
      />
        <div className='my-2'>
        <button onClick={()=>{handlestar()}} className='py-1 rounded px-2 bg-[#3f3d56] text-white'>submit</button>
        </div>
      <div className='text-[#3f3d56] text-lg my-4'>Comments</div>
      <div className='my-3'>
        <input className='py-1 px-2 border border-[#3f3d56] rounded' type="text" name="comments" id="comments" value={comment} onChange={(e)=>setComment(e.target.value)} />
      </div>
      <div>
        <button onClick={()=>{handleiupdatereviews()}} className='py-1 rounded px-2 bg-[#3f3d56] text-white'>add comment</button>
      </div>
      <div className='my-3 h-[30vh] w-[30vw] overflow-scroll'>
{
    reviews.map((e)=>{
        if(e==="")
        return <div></div>
        return(
            <div className='my-2'>
            <div className='grid grid-cols-[20%_80%] gap-3 '>
                <div>
                <div > <Avatar round={true} size={30} name={e.user}/> 
               </div>
                </div>
                <div>
                <div className='text-sm font-semibold flex items-center'>
                  <div> {e.user}</div> 
                    </div>
                
                </div>
              
                
            </div>
            <div className='grid grid-cols-[20%_80%] gap-3'>
                    <div>

                    </div>
                    <div className='text-sm text-[#3f3d56]'>{e.comment}</div>
                </div>
            </div>
        )
    })
}
      </div>
    </div>
   </section>
   <section>
   <div  className='text-[#3F3D56] text-[1.5rem] font-semibold'>
       Location
    </div>
    <div className='  my-4'>
    <Map
       center={{
        lat: details.lat,
        lng: details.lon
      }}
       
       containerStyle={containerStyle}
        google={google}
        zoom={14}
        style={mapStyles}
        
        initialCenter={{
          lat: details.lat,
          lng: details.lon
        }}
       
      >
        
        <Marker 
                name={'Current location'}
                // draggable={true}
               
                position={{lat: details.lat, lng: details.lon}}
                 />
             
      </Map>
    </div>
   </section>
    </div>
    </>
  )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBRPX04XfjCp7A7_14Vw-Np9m5EiCawsQE'
  })(Details);