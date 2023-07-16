import React,{useState} from 'react'

export default function DragDropFile({setFiles,files,photos,setPhotos}) {
 
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
   
    const inputRef = React.useRef(null);
    
    function handleFile(file) {
        let arr=[]
        let arr1=[]
       Array.from(file).map((e,i)=>{
              arr1.push(e);
            var fileName = URL.createObjectURL(file[i]);
            arr.push(fileName)
        })
        setPhotos([...photos,...arr])
        setFiles([...files,...arr1])
        console.log(arr1)
       
      }
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files);
      }
    };
    
  // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };
    const handledelete=(id)=>{
        let arr=photos;
        delete arr[id];
        let ans=arr.filter(e=>e!==undefined)
        setPhotos(ans)

        let arr1=files;
        delete arr1[id];
        let ans1=arr1.filter(e=>e!==undefined)
        setFiles(ans1)

    }
    return (
        <div>
<form className='m-auto' id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
      
          <div>
          <svg className='m-auto' width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4062 16.4062V60.9375C16.4062 62.8023 17.147 64.5907 18.4657 65.9093C19.7843 67.228 21.5727 67.9688 23.4375 67.9688H60.9375C62.8023 67.9688 64.5907 67.228 65.9093 65.9093C67.228 64.5907 67.9688 62.8023 67.9688 60.9375V16.4062H16.4062ZM63.2812 60.9375C63.2812 61.5591 63.0343 62.1552 62.5948 62.5948C62.1552 63.0343 61.5591 63.2812 60.9375 63.2812H23.4375C22.8159 63.2812 22.2198 63.0343 21.7802 62.5948C21.3407 62.1552 21.0938 61.5591 21.0938 60.9375V21.0938H63.2812V60.9375Z" fill="black"/>
<path d="M58.5938 25.7812H25.7812V51.5625H58.5938V25.7812ZM53.9062 30.4688V43.5703L44.5312 34.1953L39.8438 38.8828L37.5 36.5391L30.4688 43.5703V30.4688H53.9062ZM50.6016 46.875H33.7734L37.5 43.1484L39.8438 45.4922L44.5312 40.8047L50.6016 46.875Z" fill="black"/>
<path d="M56.25 7.03125H7.03125V58.5938H11.7188V11.7188H56.25V7.03125Z" fill="black"/>
</svg>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
<div className='grid grid-cols-2 gap-3 mt-7' >
{
    photos.map((e,i)=>{
            return(
                <div key={i} className='rounded-md relative'>
                    <div onClick={()=>handledelete(i)} className='absolute top-0 right-0 backdrop-blur-md p-2 rounded-md'>
                    <svg width='30'height='30' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <img className='w-full rounded-md' src={e} alt="" />
                </div>
            )
    })
}
</div>
        </div>
      
    );
  };