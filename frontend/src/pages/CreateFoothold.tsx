import React, { FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-foothold.css';


export default function CreateFoothold() {
  const [position, setPosition] = useState(({ latitude: 0, longitude: 0}))

  const [owner, setOwner] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState(true)
  const [city, setCity] = useState('')
  const [day_max, setDayMax] = useState('')
  const [cost, setCost] = useState('')
  const [energy, setEnergy] = useState(false)
  const [water, setWater] = useState(false)
  const [bathroom, setBathroom] = useState(false)
  const [shower, setShower] = useState(false)
  const [extra_info, setExtraInfo] = useState('')


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    
    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    console.log(
      owner,
      name,
      latitude,
      longitude,
      phone,
      energy,
      shower,
      extra_info,
    )
  }

  return (
    <div id="page-create-foothold">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-foothold-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={12}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />

              {position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.latitude,
                    position.longitude
                  ]} 
                />
              )}

            </Map> 

            <div className="input-block">
              <label htmlFor="name">Nome do Espaço<span>Um nome legal para o seu cantinho...</span></label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="owner">Nome do Proprietário<span>Primeiro nome ou apelido</span></label>
              <input id="owner" value={owner} onChange={event => setOwner(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="phone">Telefone<span></span></label>
              <input id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Este telefone tem WhatsApp?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={whatsapp ? 'active' : ''}
                  onClick={() => setWhatsapp(true)}
                >
                    Sim
                </button>
                <button 
                  type="button"
                  className={!whatsapp ? 'active' : ''}
                  onClick={() => setWhatsapp(false)}
                >
                  Não
                </button>
              </div>

            </div>

            <div className="input-block">
              <label htmlFor="city">Cidade<span></span></label>
              <input id="city" value={city} onChange={event => setCity(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="day_max">Máximo de dias de hospedagem<span>Deixe 0 (zero) se desejar combinar com os visitantes.</span></label>
              <input id="day_max" value={day_max} onChange={event => setDayMax(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="cost">Valor diário sugerido<span></span></label>
              <input id="cost" value={cost} onChange={event => setCost(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Tem energia disponível para os visitantes?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={energy ? 'active' : ''}
                  onClick={() => setEnergy(true)}
                >
                    Sim
                </button>
                <button 
                  type="button"
                  className={!energy ? 'active' : ''}
                  onClick={() => setEnergy(false)}
                >
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="water">Tem água disponível para os visitantes?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={water ? 'active' : ''}
                  onClick={() => setWater(true)}
                >
                    Sim
                </button>
                <button 
                  type="button"
                  className={!water ? 'active' : ''}
                  onClick={() => setWater(false)}
                >
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="bathroom">Tem banheiro disponível?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={bathroom ? 'active' : ''}
                  onClick={() => setBathroom(true)}
                >
                    Sim
                </button>
                <button 
                  type="button"
                  className={!bathroom ? 'active' : ''}
                  onClick={() => setBathroom(false)}
                >
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="shower">Chuveiro disponível?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={shower ? 'active' : ''}
                  onClick={() => setShower(true)}
                >
                    Sim
                </button>
                <button 
                  type="button"
                  className={!shower ? 'active' : ''}
                  onClick={() => setShower(false)}
                >
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="extra_info">Regras da Casa<span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={extra_info}
                onChange={event => setExtraInfo(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          {/* <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset> */}

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
