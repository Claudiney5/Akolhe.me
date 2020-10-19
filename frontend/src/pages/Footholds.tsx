import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GiCampingTent, GiExitDoor } from 'react-icons/gi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapIcon from '../utils/mapIcon'
import logoPeq from '../images/logo_p.png'
import api from '../services/api'

import '../styles/pages/footholds.css'


interface Foothold {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


function Footholds() {
    const [footholds, setFootholds] = useState<Foothold[]>([])

    useEffect(() => {
        api.get('footholds').then((res) => {
            setFootholds(res.data)
        })
    }, [])

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
            
                {footholds.map(foothold => {
                    return(
                        <Marker 
                            icon={mapIcon}
                            position={[foothold.latitude, foothold.longitude]}
                            key={foothold.id}
                        >
                            <Popup  closeButton={false} className="map-popup" minWidth={240} maxWidth={240} >
                                {foothold.name}
                                <Link to={`/footholds/${foothold.id}`}>
                                    <GiExitDoor size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            
            </Map>


            <Link to="/footholds/create" className="create-foothold">
                <GiCampingTent size='1.42rem' color="rgba(0, 0, 0, 0.6)"></GiCampingTent>
            </Link>

        </div>
    )

}

export default Footholds