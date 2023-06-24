import React, { useState, useEffect } from 'react'

function Roomselector() {
    const [Alltotal, setAlltotal] = useState([{
        nobpd: 0,
        nod: 0
    }])
    // const [Noofbedpd, setNoofbedpd] = useState(0)
    // const [Noofdorms, setNoofdorms] = useState(0)
    const [helper, setHelper] = useState(false)
    const handleaddentry = () => {

        let arr = Alltotal;
        const obj = {
            nobpd: 0,
            nod: 0
        }
        arr.push(obj);
        console.log(arr)
        setAlltotal(arr);
        setHelper(!helper)
    }
    const get1 = (e, i) => {
        let arr = Alltotal;
        return arr[i].nobpd
    }
    const get2 = (e, i) => {
        let arr = Alltotal;
        return arr[i].nod
    }
    const ev1 = (e, i) => {
        let arr = Alltotal;
        // console.log(arr[i])
        arr[i].nobpd = arr[i].nobpd - 1
        setAlltotal(arr)
        setHelper(!helper)
    }
    const ev2 = (e, i) => {
        let arr = Alltotal;
        arr[i].nobpd = arr[i].nobpd + 1
        setAlltotal(arr)
        setHelper(!helper)

    }
    const ev3 = (e, i) => {
        let arr = Alltotal;
        arr[i].nod = arr[i].nod - 1
        setAlltotal(arr)
        setHelper(!helper)

    }
    const ev4 = (e, i) => {
        let arr = Alltotal;
        arr[i].nod = arr[i].nod + 1
        setAlltotal(arr)
        setHelper(!helper)

    }
    const handledelete=(e,i)=>{
            let arr=Alltotal;
            delete arr[i]
let ans=arr.filter((e)=>e!=undefined)
            setAlltotal(ans)
            setHelper(!helper)

    }

    return (
        <div>
            <div className='h-[85vh]'>
                <div className='h-[85vh] ' >
                    <div className='h-[75vh] flex justify-center  mt-[15vh] overflow-y-scroll '>
                        <div className='w-[50vw]'>
                            <div className='text-[2rem] text-[#3F3D56] font-semibold'>
                                Give some lowdown on your cozy abode!
                            </div>
                            <div className='text-[1.2rem] mt-2 mb-6 text-[#3F3D56]'>
                                You can make changes later.
                            </div>
                            <div>
                                {Alltotal.map((e, i) => {
                                    let Noofbedpd = get1(e, i);
                                    let Noofdorms = get2(e, i);
                                    return (
                                        <>
                                        <div className='space-y-3 border p-3 rounded-md mb-3'>
                                            <div className='space-y-2'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='text-[#3F3D56] font-semibold'>

                                                        Number of beds per dorm
                                                    </div>
                                                    <div onClick={()=>handledelete(e,i)}>
                                                    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="Menu / Close_MD">
<path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g></svg>
                                                    </div>
                                                </div>

                                                <div className='my-2 flex gap-3'>
                                                    <div onClick={() => { if ((Noofbedpd - 1) >= 0) ev1(e, i) }}><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#FDFDFD"/>
<circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5"/>
<path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5"/>
</svg>
</div>
                                                    <input className='w-[2rem] text-center' type="number" readOnly value={Noofbedpd} min={0} />
                                                    <div onClick={() => { ev2(e, i) }}><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56"/>
<path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56"/>
</svg></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div  className='space-y-2'>
                                                    <div className='text-[#3F3D56] font-semibold'>Number of Dorm</div>
                                                    <div className='my-2 flex gap-3'>
                                                        <div onClick={() => { if ((Noofdorms - 1) >= 0) ev3(e, i) }}>
                                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#FDFDFD"/>
<circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5"/>
<path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5"/>
</svg>

                                                        </div>
                                                        <input className='w-[2rem] text-center' type="number" min={0} readOnly value={Noofdorms} />
                                                        <div onClick={() => { ev4(e, i) }}><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56"/>
<path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56"/>
</svg></div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    
                                     </>
                                    )
                                })}
                                
                                <div className='mt-5 flex gap-3 cursor-pointer' onClick={handleaddentry}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

<title/>

<g id="Complete">

<g id="add-square">

<g>

<rect data-name="--Rectangle" fill="none" height="20" id="_--Rectangle" rx="2" ry="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"  width="20" x="2" y="2"/>

<line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"  x1="15.5" x2="8.5" y1="12" y2="12"/>

<line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"  x1="12" x2="12" y1="15.5" y2="8.5"/>

</g>

</g>

</g>

</svg><div> Add Entry</div></div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[10vh]'>
                        <div className='h-[10vh] flex justify-between items-center'>
                            <div>
                                <div className='flex'>
                                    <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M28.05 35.9999L16 23.9499L28.05 11.8999L30.2 14.0499L20.3 23.9499L30.2 33.8499L28.05 35.9999Z" fill="#3F3D56" />
                                    </svg>

                                    <button type="button" className="text-[#3F3D56] bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Back</button>
                                </div>

                            </div>
                            <div>
                                <div className='flex'>
                                    <button type="button" className="text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Next</button>
                                    <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.75 35.9999L16.6 33.8499L26.5 23.9499L16.6 14.0499L18.75 11.8999L30.8 23.9499L18.75 35.9999Z" fill="#3F3D56" />
                                    </svg>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roomselector