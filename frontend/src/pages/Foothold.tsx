import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/foothold.css';


interface Foothold {
  id: number;
  owner: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: number;
  day_max: number;
  cost: number;
  energy: boolean;
  water: boolean;
  bathroom: boolean;
  shower: boolean;
  extra_info: string;
  images: Array<{
    url: string;
  }>;
}

interface FootholdParams {
  id: string;
}

export default function Foothold() {
  const params = useParams<FootholdParams>()
  const [foothold, setFoothold] = useState<Foothold>()

  useEffect(() => {
      api.get(`footholds/${params.id}`).then((res) => {
          setFoothold(res.data)
      })
  }, [params.id])

  if (!foothold)     {
    return <p>carregando...</p>
  }

  return (
    <div id="page-foothold">
      
      <Sidebar />

      <main>
        <div className="foothold-details">
          <img src={foothold.images[0].url} alt={foothold.name} />

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
          </div>
          
          <div className="foothold-details-content">
            <h1>{ foothold.name }</h1>
            <p>`Fale com ${ foothold.owner }`</p>

            <div className="map-container">
              <Map 
                center={[foothold.latitude, foothold.longitude]} 
                zoom={15} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                <Marker interactive={false} icon={mapIcon} position={[foothold.latitude, foothold.longitude]} />
              </Map>

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Informações importantes</h2>
            <p>{ foothold.extra_info }</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}