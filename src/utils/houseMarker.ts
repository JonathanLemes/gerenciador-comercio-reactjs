import L from 'leaflet';
import houseMarkerImg from '../images/house-marker.png';

const mapIcon = L.icon({
    iconUrl: houseMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [176, -2]
});

export default mapIcon;