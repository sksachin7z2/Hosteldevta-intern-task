import React from "react";

 const Alert = (props) => {
//   const capitalize=(word)=>{
//     if(word==="danger")
//     {
//       word="error";
//     }
//     const lower=word.toLowerCase();
//     return lower.charAt(0).toUpperCase()+lower.slice(1);
// }
return (
<div class="bg-orange-100 border-l-4 absolute top-[15vh] z- border-orange-500 text-orange-700 p-4" role="alert">
  <p class="font-bold">Warning</p>
  <p>{props.msg}</p>
</div>
)
}
export default Alert;