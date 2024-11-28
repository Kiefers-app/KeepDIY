import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

const LiveMapPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const [merchant, setMerchant] = useState('');
  const [rider, setRider] = useState(null);
  const [userCoords, setUserCoords] = useState({ lat: null, lng: null });
  const [merchantCoords, setMerchantCoords] = useState({ lat: 0, lng: 0 });
  const [riderCoords, setRiderCoords] = useState({ lat: 0, lng: 0 });
  const [track, setTrack] = useState('');
  const [route, setRoute] = useState([]);

  const centerLat = 9.755569056998596;
  const centerLng = 118.7480596523905;
  const previousCoordinatesRef = useRef({}); // Store previous coordinates for each user
  const animationFrameIdRef = useRef(null); // Store animation frame ID

  const location = useLocation();

  const addCMarker = useCallback((coordinates, imageUrl, id) => {
    const map = mapRef.current;
    if (!map) return;

    const existingMarker = markersRef.current.find(marker => marker.id === id);
    if (existingMarker) {
      existingMarker.marker.remove();
      markersRef.current = markersRef.current.filter(marker => marker.id !== id);
    }

    const el = document.createElement('div');
    el.className = 'custom-marker';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.borderRadius = '50%';

    el.appendChild(img);

    const marker = new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
    markersRef.current.push({ id, marker });
  }, []);
  
  

  const drawRoute = useCallback((coordinates) => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getSource('polyline')) {
      map.removeLayer('polyline');
      map.removeSource('polyline');
    }

    map.addSource('polyline', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      },
    });

    map.addLayer({
      id: 'polyline',
      type: 'line',
      source: 'polyline',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ff1616',
        'line-width': 5,
      },
    });
  }, []);

  const fetchOrder = async (bookingId) => {
    try {
      const { data } = await axios.get(`https://kiapifers-dlver.cloud/booking/getbooking/nod.php?BookingID=${bookingId}`);
      const userLocation = JSON.parse(data.booking.Location);

      setMerchant(data.booking.MerchantID);
      setRider(data.booking.Rider);
      setUserCoords({ lat: userLocation.latitude, lng: userLocation.longitude });
      addCMarker([userLocation.longitude, userLocation.latitude], `https://kiefers-app.com/assets/app/customer.png?v=${userLocation.longitude}`, 1545);

      fetchMerchant(data.booking.MerchantID, userLocation.longitude, userLocation.latitude);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMerchant = async (merchantId, userLng, userLat) => {
    try {
      const { data } = await axios.get(`https://kiapifers-dlver.cloud/merchant/getmerchant/nod.php?MerchantID=${merchantId}`);
      const [lat, lng] = data.booking.Coordinates.split(',').map(coord => parseFloat(coord.trim()));

      if (lat && lng) {
        addCMarker([lng, lat], `https://kiefers-app.com/assets/app/shop-marker.png?v=${lat}`, 2);
        setMerchantCoords({ lat, lng });
       //startCompute(userLng, userLat, lng, lat);
      }
    } catch (error) {
      console.error(error);
    }
  };


const [polyline,setPolyline] = useState([]);
const [cameraView,setCameraView] = useState(null)

  const startCompute = async (userLng, userLat, merchantLng, merchantLat) => {
    try {
      const { data } = await axios.get(`https://kiefers-app.com/gen-polly/nod.php?to=${userLat},${userLng}&from=${merchantLat},${merchantLng}`);
      setRoute(data.data.route);
      setPolyline(data.data.route)
      drawRoute(data.data.route)
    } catch (error) {
      console.error(error);
    }
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

    map.on('load', () => {
      const params = new URLSearchParams(location.search);
      const trackParam = params.get('track');
      if (trackParam) {
        setTrack(trackParam);
        fetchOrder(trackParam);
      }
      const watermark = document.querySelector('.mapboxgl-control-container');
      if (watermark) {
        watermark.remove();
      }
    });

    return () => map.remove();
  }, [location, centerLat, centerLng]);

  const removeMarkerById = useCallback((id) => {
    const existingMarker = markersRef.current.find(markerObj => markerObj.id === id);
    if (existingMarker) {
      existingMarker.marker.remove();
      markersRef.current = markersRef.current.filter(markerObj => markerObj.id !== id);
    }
  }, []);
  
  
  

const moveMarkerSmoothlyOM = (newCoordinates, id) => {
  // Initialize previousCoordinates for this user if not already set
  if (!previousCoordinatesRef.current[id]) {
    previousCoordinatesRef.current[id] = newCoordinates; // Set the initial coordinates
  }

  const duration = 2000; // Animation duration (in ms)
  const startTime = performance.now();
  const startCoordinates = previousCoordinatesRef.current[id];

  const animateMarker = (time) => {
    const elapsedTime = time - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Clamp progress between 0 and 1

    // Linear interpolation for the marker position
    const currentLng = startCoordinates[0] + (newCoordinates[0] - startCoordinates[0]) * progress;
    const currentLat = startCoordinates[1] + (newCoordinates[1] - startCoordinates[1]) * progress;

    // Update the marker position with interpolated values
    addCMarker([currentLng, currentLat], `https://kiefers-app.com/assets/app/rider-marker.png?v=${id}`, 2561);

    // Log for debugging
    console.log('Animating marker:', id, 'to', [currentLng, currentLat], 'Progress:', progress);

    // Continue animation if not yet completed
    if (progress < 1) {
      animationFrameIdRef.current = requestAnimationFrame(animateMarker);
    } else {
      previousCoordinatesRef.current[id] = newCoordinates; // Save the new position for the next move
    }
  };

  // Stop any previous animation for this user
  if (animationFrameIdRef.current) {
    cancelAnimationFrame(animationFrameIdRef.current);
  }

  // Start the new animation
  animationFrameIdRef.current = requestAnimationFrame(animateMarker);
};




//   useEffect(() => {
//     if (!rider) return;

//     const onMerchantRef = ref(database, `/KEEP/onmerchant/${rider}/${track}/`);
//     const unsubscribe = onValue(onMerchantRef, (snapshot) => {
//       const data = snapshot.val();
//       removeMarkerById(2561);
//       if (data) {
//         setRiderCoords({ lat: data.lat, lng: data.lng });
//         // addCMarker([data.lng, data.lat], `https://kiefers-app.com/assets/app/rider-marker.png?v=${rider}`, 2561);
         
//       //alert("HALLO");merchantCoords
       
//         if(data.lat && data.lng){
//           // Smooth camera animation
//           moveMarkerSmoothlyOM([data.lng, data.lat],rider)
//           startCompute(merchantCoords.lng, merchantCoords.lat, data.lng, data.lat);
//           const offSetMerchant =  0.004;
//             mapRef.current.flyTo({
//               center: [data.lng, data.lat - offSetMerchant],
//               zoom: 15,
//               speed: 1.2, // make the flying slow (1 is default, higher is faster)
//               curve: 1, // change the speed at which it zooms out
//               easing: function (t) {
//                 return t * (2 - t); // easeOutQuint-like easing function
//               }
//             });
//         }
//           // Continue animation if not yet completed
//       }
//     });

//       // Clean up the listener on unmount
//     return () => {
//       unsubscribe();
//       if (animationFrameIdRef.current) {
//         cancelAnimationFrame(animationFrameIdRef.current); // Cancel any ongoing animations on unmount
//       }
//     };
//   }, [rider, removeMarkerById,track, addCMarker]);
  
  
  function isValidCoordinate(lat, lng) {
  // Check if lat and lng are numbers
  if (typeof lat !== "number" || typeof lng !== "number") {
    return false;
  }
  
  // Check if lat and lng fall within valid ranges
  const isLatValid = lat >= -90 && lat <= 90;
  const isLngValid = lng >= -180 && lng <= 180;

  return isLatValid && isLngValid;
}
  
  

 useEffect(() => {
    if (!rider) return;

    const onTheWayRef = ref(database, `/KEEP/ontheway/${rider}/`);
    const unsubscribe = onValue(onTheWayRef, (snapshot) => {
      const data = snapshot.val();
      removeMarkerById(6550);
      if (data) {
        
        //addCMarker([data.lng, data.lat], "https://kiefers-app.com/assets/app/rider-marker.png?v=65", 6550);
        
        if(data.lng && data.lat){
            setRiderCoords({ lat: data.lat, lng: data.lng });
            moveMarkerSmoothlyOM([data.lng, data.lat],rider)
        startCompute(userCoords.lng, userCoords.lat, data.lng, data.lat);
          // Smooth camera animation
        //   const offSetMerchant =  0.005;
        //     mapRef.current.flyTo({
        //       center: [data.lng, data.lat - offSetMerchant],
        //       zoom: 15,
        //       speed: 1.2, // make the flying slow (1 is default, higher is faster)
        //       curve: 1, // change the speed at which it zooms out
        //       easing: function (t) {
        //         return t * (2 - t); // easeOutQuint-like easing function
        //       }
        //     });
        }
      }
    });

    return () => unsubscribe();
  }, [rider, addCMarker]);


useEffect(() => {
  const onlineRef = ref(database, `/ORDER/status/${track}`);
  const unsubscribe = onValue(onlineRef, (snapshot) => {
      const data = snapshot.val();
      if(data == "TM"){
         //removeMarkerById(2561);
         //fetchOrder(track); 
      }else if(data == "Completed"){
          removeMarkerById(6550);
          const map = mapRef.current;
           if (map.getSource('polyline')) {
            map.removeLayer('polyline');
            map.removeSource('polyline');
        }
      }
        
  });
  return () => {
      unsubscribe();
  };
}, [database,track,mapRef]);


  return (
    <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }}></div>
  );
};

export default LiveMapPage;
