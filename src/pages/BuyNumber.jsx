// import {
//   FiRefreshCw,
//   FiCopy,
//   FiTrash2,
//   FiInfo,
//   FiChevronRight,
// } from "react-icons/fi";

// import "../styles/buy-number.css";

// const BuyNumber = () => {
  
//   const smsMessages = [];

//   return (
//     <div className="buy-number-page">
//       {/* HEADER */}
//       <div className="page-header">
//         <h1>Buy Number</h1>
//         <p>
//           Get a temporary number to receive SMS
//           verification codes
//         </p>
//       </div>

//       {/* PURCHASE CARD */}
//       <div className="buy-card">
//         {/* STEPS */}
//         <div className="steps-row">
//           <div className="step-item active">
//             <div className="step-circle">1</div>
//             <div>
//               <h4>Select Service</h4>
//               <p>Choose the platform</p>
//             </div>
//           </div>

//           <div className="step-arrow">
//             <FiChevronRight />
//           </div>

//           <div className="step-item active">
//             <div className="step-circle">2</div>
//             <div>
//               <h4>Select Country</h4>
//               <p>Choose the country</p>
//             </div>
//           </div>

//           <div className="step-arrow">
//             <FiChevronRight />
//           </div>

//           <div className="step-item active">
//             <div className="step-circle">3</div>
//             <div>
//               <h4>Get Number</h4>
//               <p>Receive your number</p>
//             </div>
//           </div>
//         </div>

//         {/* FORM */}
//         <div className="buy-form">
//           <div className="field">
//             <label>Service</label>

//             <div className="select-wrapper">
//               <select>
//                 <option>WhatsApp</option>
//                 <option>Telegram</option>
//                 <option>Google</option>
//                 <option>Facebook</option>
//                 <option>Discord</option>
//               </select>
//             </div>
//           </div>

//           <div className="field">
//             <label>Country</label>

//             <div className="select-wrapper">
//               <select>
//                 <option>Nigeria (+234)</option>
//                 <option>United Kingdom (+44)</option>
//                 <option>United States (+1)</option>
//                 <option>Canada (+1)</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* ACTION */}
//         <div className="action-row">
//           <button className="get-number-btn">
//             Get Number
//           </button>

//           <div className="price-box">
//             <span>Estimated Price</span>
//             <h3>$0.30</h3>
//           </div>
//         </div>

//         <div className="notice">
//           <FiInfo />
//           <span>
//             Number will be reserved for 20 minutes.
//             Receive SMS within the time limit.
//           </span>
//         </div>
//       </div>

//       {/* ASSIGNED NUMBER + SMS */}
//       <div className="assigned-wrapper">
//         <div className="assigned-top">
//           <div className="assigned-title">
//             <h3>Assigned Number</h3>

//             <span className="status-badge">
//               <span className="status-dot"></span>
//               Active
//             </span>
//           </div>

//           <button className="refresh-btn">
//             <FiRefreshCw />
//             Refresh
//           </button>
//         </div>

//         <div className="assigned-grid">
//           {/* NUMBER CARD */}
//           <div className="number-card">
//             <div className="number-header">
//               <h2>+234 901 234 5678</h2>

//               <button type="button">
//                 <FiCopy />
//               </button>
//             </div>

//             <p>
//               Expires in <strong>19:42</strong>
//             </p>

//             <button className="cancel-btn">
//               <FiTrash2 />
//               Cancel Number
//             </button>
//           </div>

//           {/* SMS CARD */}
//           <div className="sms-cards">
//             <h3>SMS Inbox</h3>

//             {smsMessages.length > 0 ? (
//               smsMessages.map((sms, index) => (
//                 <div key={index} className="sms-message">
//                   <h4>Verification Code</h4>
//                   <p>{sms.message}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="sms-empty">
//                 <h4>No messages yet</h4>
//                 <p>Waiting for SMS...</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* HELP CARD */}
//       <div className="help-card">
//         <div>
//           <h4>Need help?</h4>
//           <p>
//             Check our documentation or contact
//             support.
//           </p>
//         </div>

//         <button className="docs-btn">
//           View Docs
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BuyNumber;

import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiRefreshCw,
  FiCopy,
  FiTrash2,
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

import "../styles/buy-number.css";


const API = process.env.REACT_APP_API_URL;


const BuyNumber = () => {


const [services, setServices] = useState([]);

const [service, setService] = useState("");

const [countries, setCountries] = useState([]);

const [country, setCountry] = useState("nigeria");


const [order, setOrder] = useState(null);


const [loading, setLoading] = useState(false);

const [refreshing, setRefreshing] = useState(false);


const [smsMessages, setSmsMessages] = useState([]);





/*
=========================
AUTH CONFIG
=========================
*/

const getAuthConfig = () => ({

    headers:{
        Authorization:
        `Bearer ${localStorage.getItem("token")}`
    }

});







/*
=========================
FETCH COUNTRIES
=========================
*/

useEffect(()=>{


const fetchCountries = async()=>{


try{


const res = await axios.get(

`${API}/api/5sim/countries`,

getAuthConfig()

);



setCountries(
res.data.countries || []
);



}catch(err){


console.log(
err.response?.data || err.message
);


}



};


fetchCountries();


},[]);









/*
=========================
FETCH SERVICES
=========================
*/

useEffect(()=>{


if(!country) return;



const fetchServices = async()=>{


try{


const res = await axios.get(

`${API}/api/5sim/services?country=${country}`,

getAuthConfig()

);



setServices(
res.data.services || []
);



setService("");



}catch(err){


console.log(
err.response?.data || err.message
);



}


};



fetchServices();



},[country]);












/*
=========================
BUY NUMBER
=========================
*/

const buyNumber = async()=>{


try{


setLoading(true);



const res = await axios.post(

`${API}/api/5sim/buy`,

{
service,
country
},

getAuthConfig()

);



setOrder(
res.data.order
);



setSmsMessages([]);



}catch(err){


alert(

err.response?.data?.message ||

"Unable to buy number"

);



}

finally{


setLoading(false);


}


};

  /*
=========================
REFRESH SMS
=========================
*/

const refreshSMS = async()=>{


if(!order) return;



try{


setRefreshing(true);



const res = await axios.get(

`${API}/api/5sim/refresh/${order._id}`,

getAuthConfig()

);



setSmsMessages(

res.data.sms || []

);



setOrder(

res.data.order

);



}catch(err){


console.log(

err.response?.data || err.message

);



}

finally{


setRefreshing(false);


}


};









/*
=========================
CANCEL NUMBER
=========================
*/

const cancelNumber = async()=>{


if(!order) return;



try{


await axios.post(

`${API}/api/5sim/cancel/${order._id}`,

{},

getAuthConfig()

);



setOrder(null);

setSmsMessages([]);



}catch(err){


alert(

err.response?.data?.message ||

"Unable to cancel"

);



}


};









return (

<div className="buy-page">





{/* HEADER */}


<div className="buy-header">


<h1>
Buy Number
</h1>


<p>
Get a temporary number to receive SMS
verification codes
</p>


</div>









{/* PURCHASE CARD */}



<div className="buy-card">







{/* STEPS */}



<div className="steps-row">



<div className="step-item active">


<div className="step-circle">
1
</div>



<div>

<h4>
Select Service
</h4>


<p>
Choose the platform
</p>


</div>



</div>





<div className="step-arrow">

<FiChevronRight />

</div>







<div className="step-item active">


<div className="step-circle">
2
</div>



<div>

<h4>
Select Country
</h4>


<p>
Choose the country
</p>


</div>



</div>







<div className="step-arrow">

<FiChevronRight />

</div>







<div className="step-item active">


<div className="step-circle">
3
</div>



<div>

<h4>
Get Number
</h4>


<p>
Receive your number
</p>


</div>



</div>





</div>









{/* FORM */}



<div className="buy-form">



<div className="field">


<label>
Service
</label>



<div className="select-wrapper">


<select

value={service}

onChange={(e)=>setService(e.target.value)}

>


<option value="">
Select service
</option>



{

services.map((item)=>(


<option

key={item.name}

value={item.name}

>

{item.name}

</option>


))


}



</select>


</div>



</div>









<div className="field">


<label>
Country
</label>



<div className="select-wrapper">


<select

value={country}

onChange={(e)=>{

setCountry(e.target.value);

}}

>


<option value="">
Select country
</option>



{

countries.map((item)=>(


<option

key={item.code}

value={item.code}

>

{item.name}

</option>


))


}



</select>


</div>



</div>





</div>









<div className="action-row">



<button

className="get-number-btn"

onClick={buyNumber}

disabled={
loading || !service
}

>


{

loading

?

"Getting..."

:

"Get Number"

}



</button>






<div className="price-box">


<span>
Estimated Price
</span>



<h3>


{

services.find(
x=>x.name===service
)?.price || "0"

}



</h3>



</div>



</div>









<div className="notice">


<FiInfo />


<span>

Number will be reserved for 20 minutes.
Receive SMS within the time limit.

</span>



</div>

  
</div>









{/* ASSIGNED NUMBER + SMS */}



<div className="assigned-wrapper">





<div className="assigned-top">





<div className="assigned-title">


<h3>
Assigned Number
</h3>




<span className="status-badge">


<span className="status-dot"></span>



{

order

?

order.status

:

"Inactive"

}



</span>



</div>







<button

className="refresh-btn"

onClick={refreshSMS}

disabled={!order}

>



<FiRefreshCw />



{

refreshing

?

"Refreshing"

:

"Refresh"

}



</button>






</div>












<div className="assigned-grid">









{/* NUMBER CARD */}



<div className="number-card">





<div className="number-header">



<h2>


{

order?.phone ||

"No number"

}



</h2>





<button type="button">


<FiCopy />

</button>




</div>







<p>


Expires in



<strong>


{

order?.expires

?

new Date(order.expires)
.toLocaleTimeString()

:

"--"

}



</strong>



</p>







<button

className="cancel-btn"

onClick={cancelNumber}

disabled={!order}

>



<FiTrash2 />


Cancel Number



</button>





</div>














{/* SMS CARD */}



<div className="sms-cards">


<h3>
SMS Inbox
</h3>





{

smsMessages.length > 0


?


smsMessages.map((sms,index)=>(



<div

key={index}

className="sms-message"

>


<h4>
Verification Code
</h4>



<p>
{sms.code}
</p>



</div>



))



:


<div className="sms-empty">


<h4>
No messages yet
</h4>



<p>
Waiting for SMS...
</p>



</div>



}




</div>











</div>









</div>












{/* HELP CARD */}



<div className="help-card">



<div>



<h4>
Need help?
</h4>




<p>

Check our documentation or contact
support.

</p>



</div>





<button className="docs-btn">


View Docs


</button>




</div>









</div>


);


};


export default BuyNumber;
