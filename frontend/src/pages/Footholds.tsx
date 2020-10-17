import React from 'react'
import { Link } from 'react-router-dom'
import { GiCampingTent, GiExitDoor } from 'react-icons/gi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'

import '../styles/pages/footholds.css'

import logoPeq from '../images/logo_p.png'
import marker from '../images/marker02.png'

const mapIcon = Leaflet.icon({
    iconUrl: marker,
    iconSize: [40, 60],
    iconAnchor: [20, 60],
    popupAnchor: [170, 0]
})


function Footholds() {
    return (
        <div id="page-map">

            <aside>
                <header>
                    <img src={ logoPeq } alt="Acolhe-me"/>

                    <h2>Escolha um dos acolhedores do mapa</h2>
                    <p>Você pode selcionar outra cidade ou navegar no mapa arrastando-o.</p>
                </header>

                <footer>
                    <strong> cidade escolhida </strong>
                    <span>estado</span>
                </footer>
            </aside>

            <Map 
                center={[-27.5961766,-48.5714132]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
                <Marker 
                    icon={mapIcon}
                    position={[-27.5961766,-48.5714132]}
                >
                    <Popup  closeButton={false} className="map-popup" minWidth={240} maxWidth={240} >
                        Nome do Ponto do Apoio
                        <Link to="">
                            <GiExitDoor size={20} color="#fff" />
                        </Link>
                    </Popup>
                </Marker>
            
            </Map>


            <Link to="" className="create-foothold">
                <GiCampingTent size='1.42rem' color="rgba(0, 0, 0, 0.6)"></GiCampingTent>
            </Link>

        </div>
    )

}

export default Footholds