import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Lottie from 'react-lottie';
import animationMarker from '../assets/marker.json';
import axios, { all } from 'axios';
import { MapIcon,DragIcon } from '../components/icons';


const Button1 = (props) =>{
    return (
        <button onClick={props.click} className="my-2 text-center w-full bg-red-500 p-2.5 text-white hover:bg-red-600 rounded-xl shadow-md">{props.text}</button>
    )
}

const Button2 = (props) =>{
    return (
        <button onClick={props.click} className="my-2 text-center w-full bg-gray-200 p-2.5 text-gray-800 hover:bg-gray-100 rounded-xl">{props.text}</button>
    )
}


const MapCard = (props) => {
    return (
<div className="bg-red-50 p-2.5 rounded-xl m-1.5 flex justify-start items-center space-x-2.5">
    <MapIcon c="#ef4444" h="30" w="30" />
    <div className="w-64">
    <p className="font-medium text-red-900 truncate">{props.location}</p>
    <div className="flex justify-start items-center space-x-1.5">
    <p className="font-normal text-sm text-gray-500">Drag to edit</p>
    <DragIcon c="#6b7280" h="12" w="12" />
    </div>
    
    </div>
</div>
    )
}



const SetMapPage = () => {
 // const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const lottieRef = useRef(null);
  const [showBottom,setBottomSheet] = useState(true);
  const [fromApp,setMessage] = useState("Drag to pin");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [toastMessage,setToastMessage] = useState("Please wait");
  
  var centerLat = 9.755569056998596;
  var centerLng = 118.7480596523905;



  const closeScreen = () => {
     var AppMessage = {
        type: "GO_BACK",
        path: "home"
    };
    var messageString = JSON.stringify(AppMessage);
    window.ReactNativeWebView.postMessage(messageString);
  }
  
  const getLoc = () =>{

      var AppMessage = {
        type: "LISTEN",
        path: "home"
    };
    var messageString = JSON.stringify(AppMessage);
    window.ReactNativeWebView.postMessage(messageString);
  }
  
  
  const [load,setPayApp] = useState([]);
  const saveAddress = ()=> {
    var MapMessage = {
        type: "MAPBOX",
        path: load
    };
    var messageStringMap = JSON.stringify(MapMessage);
    window.ReactNativeWebView.postMessage(messageStringMap);
  }

  const defaultOptions = {
    animationData: animationMarker,
    autoplay: false, // Prevent autoplay
    loop:false,
    speed: 1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  

  const CenterStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    paddingBottom: 43,
    transform: 'translate(-50%, -50%)',
  };




  

  useEffect(() => {
    const mapboxToken = 'pk.eyJ1IjoibWFyaWExMDIwMjQiLCJhIjoiY20yd29uN3gxMDljNTJqcHdreHBuaXJrbyJ9.t2UfftJcFzJNjyhBZL3bnw';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [centerLng, centerLat],
      zoom: 15,
      accessToken: mapboxToken,
    });

    mapRef.current = map;


  const removeLayer = () => {
    if (map.getLayer('circle')) {
      map.removeLayer('circle');
    }

    if (map.getSource('points')) {
      map.removeSource('points');
    }
  };

     // Detect scroll on the map
    const detectScroll = () => {
        removeLayer();
        setMessage("Please wait");
      setBottomSheet(false);
      if (lottieRef.current) {
        lottieRef.current.anim.goToAndStop(8, true); 
      }
    };


    async function getAddressFromCoordinates(lat, lng) {
      const accessToken = mapboxToken;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;
    
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          return data.features[0].place_name;
        } else {
          throw new Error('No address found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        return null;
      }
    }



    const handleScrollEnd = async () => {
      setBottomSheet(true);
      const set = map.getCenter();
      centerLat = set.lat;
      centerLng = set.lng;
      var leak = null;
      getAddressFromCoordinates(centerLat, centerLng).then(address => {
          setMessage(address);
        if(address){
            
         var leak = [
          {
            name: address,
            lat:centerLat,
            lng:centerLng
          }
          ];
      
       setPayApp(leak);
        }
      });
     // saveAddress(leak);
     
      if (lottieRef.current) {
        lottieRef.current.anim.goToAndStop(58, true);
        map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [centerLng, centerLat]
            }
          }]
        }
      });
      
      
          map.addLayer({
            'id': 'circle',
            'type': 'circle',
            'source': 'points',
            'paint': {
                'circle-color': '#facc15',
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });
      }
      
     
    };

    map.on('move', detectScroll);
    map.on('moveend', handleScrollEnd);


    // Change map style based on state
    map.on('style.load', () => {
      const newStyle = "mapbox://styles/mapbox/streets-v12";
      map.setStyle(newStyle);
           getLoc();
     
    });

    
    const removeWatermark = () => {
      const mapboxWatermark = document.querySelector('.mapboxgl-control-container');
      if (mapboxWatermark) {
        mapboxWatermark.remove();
      }
      const mapboxAttribution = document.querySelector('.mapboxgl-control-container');
      if (mapboxAttribution) {
        mapboxAttribution.remove();
      }
    };

    map.on('load', () => {
      removeWatermark();
    });

  }, [centerLat,centerLng,setPayApp]);


const [nativelog,setNativeLogs] = useState('Init..');


useEffect(() => {
    
     const handleCustomMessage = (event) => {
         setNativeLogs('Listening');
      // Check the type of the message
      if (event.detail.type === 'geo' ) {
          setNativeLogs('Shoot');
         
        var nativeLocation = JSON.stringify(event.detail.data);
                // Parse the JSON string
        const parsedData = JSON.parse(nativeLocation );
        
   
        const latitude = parsedData[0].latitude;
        const longitude = parsedData[0].longitude;   
        setNativeLogs(latitude);
        
        
        centerLat = latitude;
        centerLng = longitude;
        
           // Smooth camera animation
            mapRef.current.flyTo({
              center: [centerLng, centerLat],
              zoom: 15,
              speed: 1.2, // make the flying slow (1 is default, higher is faster)
              curve: 1, // change the speed at which it zooms out
              easing: function (t) {
                return t * (2 - t); // easeOutQuint-like easing function
              }
            });
      }
    };

    window.addEventListener('customMessage', handleCustomMessage);

    return () => {
      
      window.removeEventListener('customMessage', handleCustomMessage);
    };
  
  }, []);



    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showSeacrk,setShowSel]  = useState(false)

    useEffect(()=>{

        const fetchLocation = async () => {
            try {
                const response = await axios.post("https://kiefers-app.com/gen-polly/puerto.php", {
                  access:null
                });
              
                const alLocation = response.data.data;
                setLocations(alLocation);
                setFilteredLocations(alLocation);
        
              }catch(e){
              console.log(e);
              }
        }
        
        fetchLocation();
        
        
        },[]);
        
        
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
          setFilteredLocations(locations);
          setShowSel(false)
        } else {
          const filtered = locations.filter(location =>
            location.Locations.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setFilteredLocations(filtered);
          setShowSel(true)
        }
      };
      
       const chooseLocation = (loc) =>{
        setSearchTerm(loc.Locations)
        setShowSel(false);
        mapRef.current.flyTo({
              center: [loc.Lng, loc.Lat],
              zoom: 15,
              speed: 1.2, // make the flying slow (1 is default, higher is faster)
              curve: 1, // change the speed at which it zooms out
              easing: function (t) {
                return t * (2 - t); // easeOutQuint-like easing function
              }
            });
       }

  return (
    <div className='relative'>

<div className="absolute z-50 p-1.5 w-full">
<div className="w-full">
<div className="border border-gray-300 rounded-xl bg-white">
<label for="search" className='hidden text-blue-500 font-medium'>Powered by OTW</label>
<input id="search" placeholder="Search location nearest landmark.." value={searchTerm} onChange={handleSearch} name="search" autoComplete='off' type='name' className="w-full p-2.5  outline-none rounded-xl"  ></input>

{
    showSeacrk && (
    <div className='absolute left-0 right-0 mx-auto z-40 my-2.5 px-4 w-auto '>
    <div className="border border-gray-300 bg-white shadow-xl p-2.5 rounded-lg h-48 overflow-y-auto">
<ul className="w-auto ">
{filteredLocations.map((location, index) => (
<li key={index}  onClick={()=>chooseLocation(location)} className='w-full bg-white px-2.5 cursor-pointer py-1.5 border-b border-gray-300'>
<p className='font-medium text-gray-800'>{location.Locations}</p>
<p className='text-xs text-gray-600'>{location.Lat},{location.Lng}</p>
</li>
))}
</ul>
</div>
</div>
    )
}


</div>





</div>
</div>

      <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />

      
      
      <div style={CenterStyle}>
      <Lottie 
      ref={lottieRef}
	    options={defaultOptions}
        height={70}
        width={70}
      />
    </div>
    

    <div className='select-none bg-white border-t rounded-t-3xl border-gray-200 absolute z-40 w-full h-56 bottom-0'>
    <div className='p-2.5'>
    <p className="hidden">{nativelog}</p>
   <MapCard location={fromApp} />
    <div>
    {
  showBottom ? (
   <Button1 click={saveAddress} text="Save Address" />
  ):(
  <Button1 text="Where to?" />
  )
    }
    
     
     <Button2 click={closeScreen} text="Close" />
    </div>
    </div>
   </div>
 
    </div>
  );
};

export default SetMapPage;
