import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
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
  extra_info: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface FootholdParams {
  id: string;
}


export default function Foothold() {
  const params = useParams<FootholdParams>()
  const [foothold, setFoothold] = useState<Foothold>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

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
          <img src={foothold.images[activeImageIndex].url} alt={foothold.name} />

          <div className="images">
            {foothold.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? "active" : ""} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index)
                  }}
                >
                  <img src={image.url} alt={foothold.name} />
                </button>
              )
            })}
          </div>
          
          <div className="foothold-details-content">
            <h1>{ foothold.name }</h1>
            <p>Fale com { foothold.owner }</p>

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
                <a  target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${foothold.latitude}, ${foothold.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Informações importantes</h2>
            <p>{ foothold.extra_info }</p>

            <div className="informations">
              <div className="rules">
                <h3>Importante!</h3>
                <p>Respeite sempre as regras da casa!</p>
                <p>Seja cuidadoso com sons altos.</p>
                <p>Na dúvida, pergunte ao proprietário.</p>
                <p>Deixe o local mais limpo e conservado de que quando chegou!</p>
              </div>

              <div className="conforts">
                
                {foothold.water === true ? ( <p><i className="fas fa-faucet icon"></i> água disponível</p>) 
                  : (<p><i className="fas fa-faucet transparent-icon"></i> água indisponível</p>)
                }
                {foothold.energy ? ( <p><i className="fas fa-plug icon"></i> energia disponível</p>) 
                  : (<p><i className="fas fa-plug transparent-icon"></i> energia indisponível</p>)
                }
                {foothold.bathroom === true ? ( <p><i className="fas fa-toilet icon"></i> sanitário disponível</p>) 
                  : (<p><i className="fas fa-toilet transparent-icon"></i> sanitário indisponível</p>)
                }
                {foothold.shower === true ? ( <p><i className="fas fa-shower icon"></i> chuveiro disponível</p>) 
                  : (<p><i className="fas fa-shower transparent-icon"></i> chuveiro indisponível</p>)
                }
                
                <p><i className="fas fa-calendar-day icon"></i>
                Máximo de { foothold.day_max} dias</p>
                
                <p><i className="fas fa-hand-holding-usd icon"></i>
                  Sugestão: R$ { foothold.cost },00/dia</p>
                
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