import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { LeafletMouseEvent } from 'leaflet'

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-foothold.css';


export default function FoodholdsMap() {
  const history = useHistory()

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

  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([]) 


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    
    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedImagesPreview)
  }

  // !!!!            CRIAR FUNÇÃO E BOTÃO PARA DELETAR IMAGENS DO PREVIEW E DO setImages

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()
    
    data.append('owner', owner)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('name', name)
    data.append('phone', phone)
    data.append('whatsapp', String(whatsapp))
    data.append('city', city)
    data.append('day_max', day_max)
    data.append('cost', cost)
    data.append('energy', String(energy))
    data.append('water', String(water))
    data.append('bathroom', String(bathroom))
    data.append('shower', String(shower))
    data.append('extra_info', extra_info)

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('footholds', data)

    alert('Bem vindo ao Akolhe.me! Cadastro realizado com sucesso.')

    history.push('/app')
  }


  return (
    <div id="page-create-foothold">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-foothold-form">
          <fieldset>
            <legend>Cadastro de Ponto de Apoio</legend>
            
            <Map 
              center={[-25.600, -53.00]} 
              style={{ width: '100%', height: 280 }}
              zoom={6}
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
            <label htmlFor='name'> 
              <span>Clique no mapa no endereço do ponto de apoio que você deseja criar.</span>
            </label>
            </div>

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

{/* ------------------ IMAGES UPLOAD ---------------- */}

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image =>{
                  return (
                    <img key={image} src={image} alt={name} /> 
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>                 
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
