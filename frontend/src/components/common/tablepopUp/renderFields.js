import { useSelector } from "react-redux";
import ToggleSwitch from "../buttons/toggleButton";
import ApprovalComponent from "./ApprovalComponent";
import TypeComponent from "./TypeComponent";
import SendToComponent from "./SendToComponent";

const ADDeditableVIEWEDITnoneditable = (key, value,currentData,setCurrentData, action) => 
(key==="Address")?
  ((action==="add")?
    (<textarea
      value={currentData[key]}
      onChange={(e) => {
        const sanitizedValue = e.target.value.replace(/\n/g, " ");
        setCurrentData((prev) => ({ ...prev, [key]: sanitizedValue }));
      }}
      placeholder={`Enter ${key}`}
      className="border border-gray-300 rounded-md"
      style={{
        padding: "0.5rem",
        width: "90%",
        height: "8rem",
        resize: "none",
      }}
    />
    ) :
    (action==="view")?
      (<div 
        className="mt-4 break-words border border-red-700 rounded-md p-2 max-h-[150px] overflow-y-auto">
        {value}
      </div>) :
      (<div 
        className="mt-4 break-words border border-red-700 rounded-md p-2 max-h-[150px] overflow-y-auto">
        {value}
      </div>)
  ):
  (action==="add"?
     (key==="Age")?
        (<input
          value={currentData[key]}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setCurrentData((prev) => ({ ...prev, [key]: value }));
            }
          }}
          type="number"
          placeholder={`Enter ${key}`}
          className="ml-5 border border-gray-300 p-1 rounded-md"
        />
        ) :
        (<input
          value={currentData[key]}
          onChange={(e)=>(setCurrentData((prev)=>({...prev,[key]:e.target.value})))}
          type="text"
          defaultValue={""}
          placeholder={`Enter ${key}`}
          className="ml-5 border border-gray-300 p-1 rounded-md"
        />) :
      action==="view"?
      (<span className="ml-4 break-words">
          {value}
        </span>) :
      (<span className="ml-4 break-words">
        {value}
      </span>)
    );




const ADDEDITeditableVIEWnoneditable = (key, value,currentData,setCurrentData, action) =>
(action==="add"?
    (<input
      value={currentData[key]}
      onChange={(e)=>(setCurrentData((prev)=>({...prev,[key]:e.target.value})))}
      type="text"
      defaultValue={""}
      placeholder={`Enter ${key}`}
      className="ml-5 border border-gray-300 p-1 rounded-md"
    />) :
    action==="view"?
    (<span className="ml-4 break-words">
        {value}
      </span>) :
    (<input
        value={currentData[key]}
        onChange={(e)=>(setCurrentData((prev)=>({...prev,[key]:e.target.value})))}
        type="text"
        defaultValue={value}
        placeholder={`Enter ${key}`}
        className="ml-5 border border-gray-300 p-1 rounded-md"
      />)
  );

const EDITeditableVIEWADDnoneditable = (key, value,currentData,setCurrentData, action) =>
(key==="Status")?
  (action==="add"?
    (<ToggleSwitch field={key} setCurrentData={setCurrentData} toggleValue={true} isToggleAllowed={false}/>):
    action==="view"?
      (<ToggleSwitch field={key} setCurrentData={setCurrentData} toggleValue={(value==="Active")? true:false} isToggleAllowed={false}/>):
      (<ToggleSwitch field={key} setCurrentData={setCurrentData} toggleValue={(value==="Active")? true:false} isToggleAllowed={true}/>)
  ):
  (action==="add"?  
      (<span className="ml-4 break-words">
          {value}
        </span>) :
      action==="view"?
      (<span className="ml-4 break-words">
          {value}
        </span>) :
      (<input
          value={currentData[key]}
          onChange={(e)=>(setCurrentData((prev)=>({...prev,[key]:e.target.value})))}
          type="text"
          defaultValue={value}
          placeholder={`Enter ${key}`}
          className="ml-5 border border-gray-300 p-1 rounded-md"
        />)
    );

const ADDVIEWEDITnoneditable = (key, value,currentData,setCurrentData, action) =>
(key==="Approval")?
  (<span className={`ml-4 break-words ${value === "Verified" ? "text-green-500" : "text-red-500"}`}>
    {value}
  </span>):
  (action==="add"?
      (key==="Type")?
      (<span className="ml-4 break-words">
        {value}
      </span>):
      (<span className="ml-4 break-words">
          {value}
        </span>) :
      (action==="view")?
        (key==="Message")?
        <div className="mt-4 break-words border border-red-700 rounded-md p-2 max-h-[150px] overflow-y-auto">{value}</div>:
          (<span className="ml-4 break-words">
            {value}
          </span>) :
        (<span className="ml-4 break-words">
          {value}
        </span>)
    );

  
  
const MessageComponent = (key, value,currentData,setCurrentData, action) => (
  (((action==="add") || (action==="edit"))?
    (<textarea
      value={currentData[key]}
      onChange={(e) => {
        const sanitizedValue = e.target.value.replace(/\n/g, " ");
        setCurrentData((prev) => ({ ...prev, [key]: sanitizedValue }));
      }}
      placeholder={`Enter ${key}`}
      className="border-2 border-red-500 rounded-md"
      style={{
        padding: "0.5rem",
        width: "90%",
        height: "8rem",
        resize: "none",
      }}
    />
    ):
    (<div 
      className="mt-4 break-words border border-red-700 rounded-md p-2 max-h-[150px] overflow-y-auto">
      {value}
    </div>)
  )
);




export const renderField = (key,value,currentData,setCurrentData,action,currentTab) => {

    switch (key) {
      case "Sender":
        return (ADDVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Date":
        return (ADDVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Message":
        if(currentTab==="Notifications"){
          return (MessageComponent(key, value,currentData,setCurrentData, action));
        }else{
          return (ADDVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
        }
      case "Name":
        return (ADDeditableVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Email":
        return (ADDeditableVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Password":
        return (ADDeditableVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "JoiningDate":
        return (ADDeditableVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Age":
        return (ADDeditableVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Address":
        return (ADDeditableVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Type":
        return (ADDVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      case "Status":
        return (EDITeditableVIEWADDnoneditable(key, value,currentData,setCurrentData, action));
      case "Approval":
        if(currentTab==="Gym"){
          return (ApprovalComponent(key, value,currentData,setCurrentData, action));
        }else{
          return (ADDVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
        }
      case "Gyms":
        return (ADDVIEWEDITnoneditable(key, value,currentData,setCurrentData, action));
      default:    
        return null;
    }
  };
