import React, { FormEvent, useEffect, useState } from 'react'
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


let appId = '30c19f4e549b1f59d990ccc77c60dcbc';
let units = 'metric';


function Footholds() {
    const [footholds, setFootholds] = useState<Foothold[]>([])

    const [city, setCity] = useState('')
    const [lat, setLat] = useState<number>()
    const [long, setLong] = useState<number>()
    const [zoom, setMapZoom] = useState<number>()
    
    useEffect(() => {
        api.get('footholds').then((res) => {
            setFootholds(res.data)
        })
    }, [])
    
    function handleSubmit(event: FormEvent){
        event.preventDefault()
        const cityData = new FormData()
        cityData.append('city', city)
        
        searchCity(city, event)        
    }
    
    function searchCity(searchTerm: string, event: FormEvent) {
        event.preventDefault()
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appId}&lang=pt_br&units=${units}`)
        .then(result => {   
            return result.json();
        })
        .then((result) => {
            setLat(result.coord.lat)
            setLong(result.coord.lon)          
        })
        .then(() => {
            setMapZoom(13)            
        })           
    }
  

    return (
        <div id="page-map">

            <aside>
                <header>
                    <img src={ logoPeq } alt="Acolhe-me"/>

                    <h2>Escolha um dos acolhedores do mapa</h2>
                    <p>Você pode selecionar uma cidade abaixo ou navegar no mapa arrastando-o.</p>
                </header>

                <footer>
                    <form onSubmit={handleSubmit} id="city-select" className="city-select">
                        <fieldset>
                            <div className="input-city"></div>
                            <label htmlFor='city'>Cidade de Destino</label>
                            <input id="city" value={city} onChange={event => setCity(event.target.value)} />

                        </fieldset>

                        <button className="confirm-button" type="submit" >
                            Buscar
                        </button>

                    </form>

                </footer>
            </aside>

            <Map 
                zoom={zoom || 4}
                center={[lat || -25.300, long || -57.600]}
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