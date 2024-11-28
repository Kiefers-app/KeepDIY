import { MapIcon,EditIcon,HistoryIcon,CloseIcon,ArrowHeadLeft,EyeOpen } from "./icons"
import { Button1,ButtonWithIconGray} from "./button"
import { NavLink } from 'react-router-dom';

export const MapCard = (props) => {
    return (
<div className="bg-red-50 p-2.5 rounded-xl m-1.5 flex justify-start items-center space-x-2.5">
    <MapIcon c="#ef4444" h="30" w="30" />
    <div className="w-64">
    <p className="font-medium text-red-900 truncate">{props.location}</p>
    <div className="flex justify-start items-center space-x-1.5">
    <p className="font-normal text-sm text-gray-500">Click to edit</p>
    <EditIcon c="#6b7280" h="12" w="12" />
    </div>
    
    </div>
</div>
    )
}

export const Historycard = (props) => {
    return (
        <div className="bg-white p-1.5 rounded-lg hover:bg-gray-100 my-1.5 flex justify-between items-center">
            <div className="flex justify-start items-center space-x-2.5">
        <HistoryIcon c="#9ca3af" h="18" w="18" />
        <p className="text-gray-400">{props.text}</p>
        </div>
        <button>
        <CloseIcon c="#1f2937" h="23" w="23" />
        </button>
        </div>
    )
}

export const ProductCard1 = (props) =>{
    return (
        <div>
            <div className="rounded-lg bg-white hover:bg-gray-50 flex justify-start items-center space-x-2 my-1.5 p-1.5">
                <img src={props.image} alt="" className="w-auto h-16 rounded-2xl"/>
                <div className="w-auto max-w-48">
                    <p className="font-medium truncate">{props.title}</p>
                    <p className="text-gray-500 truncate">{props.subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export const FeaturedServicesCard = (props) =>{
    return (
        <div className="relative bg-white border border-gray-200 shadow-sm rounded-xl p-2.5 h-28 w-full">
    <div>
    <p className="text-lg font-medium">{props.title}</p>
    <p className="text-gray-600 text-xs">{props.subtitle}</p>
    </div>
    <div className="z-30 bottom-0 top-3 absolute right-0 flex justify-end">
    <img src={props.image} alt="" className="w-auto h-36 object-cover -mr-7" />
    </div>
    
        </div>
    )
}

export const FeaturedServicesCard2 = (props) =>{
    return (
        <div className="overflow-hidden relative bg-white border border-gray-200 shadow-sm rounded-xl p-2.5 h-36 w-full">
    <div className="absolute z-20">
    <p className="text-lg font-medium">{props.title}</p>
    <p className="text-gray-600 text-xs">{props.subtitle}</p>
    </div>
    <div className="h-full">
    <img src={props.image} alt="" className="z-10 w-auto h-36 object-cover absolute bottom-0 top-10 -right-8" />
    </div>
    
        </div>
    )
}

export const ExtraServicesCard = (props) => {
    return (
        <div className="overflow-hidden relative bg-white border border-gray-200 shadow-sm rounded-xl p-2.5 h-16 w-full">
<div className="absolute z-20">
    <p className="text-md font-medium">{props.title}</p>
    <p className="text-gray-600 text-xs">{props.subtitle}</p>
    </div>
    <img src={props.image} alt="" className="z-10 w-auto h-28 object-cover absolute bottom-0 -top-4 -right-10" />
        </div>
    )
}

export const ExtraServicesCardComing = (props) => {
    return (
        <div className="overflow-hidden relative bg-white border border-gray-200 shadow-sm rounded-xl p-2.5 h-16 w-full">
<div className="absolute z-20">
    <p className="text-md font-medium text-gray-800">{props.title}</p>
    <p className="text-gray-300 text-xs font-medium">{props.subtitle}</p>
    </div>
    <img src={props.image} alt="" className="z-10 w-auto h-24 object-cover absolute bottom-0 top-0 -right-4" />
        </div>
    )
}


export const ExtraServicesCardComingA = (props) => {
    return (
        <div className="overflow-hidden relative bg-white border border-gray-200 shadow-sm rounded-xl p-2.5 h-16 w-full">
<div className="absolute z-20">
    <p className="text-md font-medium text-gray-800">{props.title}</p>
    <p className="text-gray-300 text-xs font-medium">{props.subtitle}</p>
    </div>
    <img src={props.image} alt="" className="z-10 w-auto h-16 object-center absolute bottom-0 -top-0 -right-2" />
        </div>
    )
}


export const HighlightCard = (props) => {
    return (
        <div className="bg-white rounded-xl shadow-md px-2.5 flex justify-between items-center w-auto">
           <div>
           <p className="font-medium text-lg">{props.title}</p>
           <p className="font-normal text-gray-500 text-xs">{props.subtitle}</p>
           <button className="font-medium bg-[#ff1616] shadow-xl rounded-lg my-1.5 text-red-50 text-sm px-2.5 py-1">Join Waitlist</button>
           </div>
           <div>
            <img src={props.image} alt="" className="w-auto h-24"/>
           </div>
        </div>
    )
}

export const PerformanceCard2 = (props) =>{
    return (
<div onClick={props.click} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 my-2 px-2">
<div className="cursor-default py-2.5 px-4 rounded-lg bg-white border border-gray-200 hover:border-red-500 shadow-sm hover:shadow-xl">
<p className="text-gray-500 text-sm my-2">{props.sub}</p>
<h1 className="text-2xl font-bold text-gray-800">{props.title}</h1>
   

<div className="p-2.5">
<div className="flex justify-start items-center space-x-2">
    <div className="flex justify-center items-center bg-[#ff1616] h-8 w-8 rounded-full">
   {props.children}
</div>
<h1 className="font-bold text-3xl text-gray-800">{props.data}</h1>
</div>



</div>
<div className="flex justify-end items-center">
<NavLink to={props.link}>
    <div className="flex justify-start items-center space-x-2">
        <p className="text-red-500 font-medium">{props.control}</p>
        <ArrowHeadLeft w="20" h="20" c="#ef4444" />
    </div>
    </NavLink>
</div>
</div>
</div>
    );
}


export const PerformanceCard = (props) =>{
    return (
<div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 my-2 px-2">
<div className="cursor-default py-2.5 px-4 rounded-lg bg-white border border-gray-200 hover:border-red-500 shadow-sm hover:shadow-xl">
<p className="text-gray-300 text-sm my-2">{props.sub}</p>
<h1 className="text-2xl font-bold text-gray-300">{props.title}</h1>
   

<div className="p-2.5">
<div className="flex justify-start items-center space-x-2">
    <div className="flex justify-center items-center bg-gray-300 h-8 w-8 rounded-full">
   {props.children}
</div>
<h1 className="font-bold text-3xl text-gray-300">{props.data}</h1>
</div>



</div>
<div className="flex justify-end items-center">
    <div className="flex justify-start items-center space-x-2">
        <p className="text-red-300 font-medium">{props.control}</p>
        <ArrowHeadLeft w="20" h="20" c="#d1d5db" />
    </div>
</div>
</div>
</div>
    );
}

export const InboxCard = (props) =>{

    return (
        <div onClick={props.press} key={props.email} className="m-1.5 cursor-pointer bg-white hover:bg-slate-100 hover:rounded-xl hover:border-none border-t border-gray-300 p-2.5">
<div className="flex justify-between items-center">


<div  className="flex justify-start space-x-2 items-center">

<div className="flex justify-center items-center bg-[#ff1616] text-white w-12 h-12 text-center rounded-full">
    <h1 className="text-xl">{props.email[0].toUpperCase()}</h1>
</div> 

{
     props.whoChat == props.email ? (
<div>
    <h1 className="font-medium text-gray-800">{props.email}</h1>
    <p className="truncate text-gray-800 text-sm font-medium w-96"><span className="font-medium text-gray-400">{props.role.toUpperCase()}</span>: {props.message}</p>
</div>
     ):(
<div>
    <h1 className="font-medium">{props.email}</h1>
    <p className="truncate text-gray-500 text-sm w-96"><span className="font-medium">{props.role.toUpperCase()}</span>: {props.message}</p>
</div>
     )
}

</div>



<div className="w-auto flex justify-start items-center space-x-4">


{
    props.extra.status == true && (
        <div className="flex justify-start items-center space-x-2.5">
    <p className="bg-slate-100 px-2.5 py-1.5 rounded-lg text-gray-600 text-sm">Assigned</p>
   <img src={props.extra.image} alt={props.extra.face} className="w-12 h-12 rounded-full border border-gray-300" />
</div>
    )
}


    {
         props.extra.status == true ? (
        <div className="text-green-100 text-center bg-gray-900 px-2.5 py-1.5 rounded-lg w-28">
        <p>Active</p>
        </div>
        ):(
            <div className="text-center bg-gray-100 px-2.5 py-1.5 rounded-lg w-28">
        <p>View</p>
    </div>
        )
    }
    
</div>



</div>
</div>
    )
}

export const InboxCard2 = (props) =>{
    return (
        <div onClick={props.press} key={props.id} className="m-1.5 cursor-pointer bg-white hover:bg-slate-100 hover:rounded-xl hover:border-none border-t border-gray-300 p-2.5">
<div className="flex justify-between items-center">


<div className="flex justify-start space-x-4 items-center  ">

<div className="flex overflow-hidden px-2 py-2.5 relative -space-x-4">
<div className="border-white border-2 flex justify-center items-center bg-yellow-500 text-red-100 w-12 h-12 text-center rounded-full">
    <h1 className="text-xl">{props.email[0].toUpperCase()}</h1>
</div> 

<div className="border-white border-2 flex justify-center items-center bg-[#ff1616] text-white w-12 h-12 text-center rounded-full">
    <h1 className="text-xl">{props.email[0].toUpperCase()}</h1>
</div> 
</div>

<div className="ml-4">
    <h1 className="font-medium">{props.email}</h1>
    <p className="text-gray-500 text-sm">{props.message}</p>
</div>
</div>



<div className="w-auto flex justify-start items-center space-x-4">
  
    {
        props.status ? (
            <div className="text-red-100 text-center bg-yellow-500 px-2.5 py-1.5 rounded-lg w-28">
        <p>Active</p>
        </div>
        ):(
            <div className="text-center bg-gray-100 px-2.5 py-1.5 rounded-lg w-28">
        <p>Inactive</p>
    </div>
        )
    }
    
</div>



</div>
</div>
    )
}