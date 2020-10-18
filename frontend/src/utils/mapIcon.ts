import Leaflet from "leaflet"

import marker from "../images/marker02.png";

const mapIcon = Leaflet.icon({
    iconUrl: marker,
    iconSize: [40, 60],
    iconAnchor: [20, 60],
    popupAnchor: [170, 0]
})

export default mapIcon