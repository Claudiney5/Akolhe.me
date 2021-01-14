import React from 'react'
import {FiMap} from 'react-icons/fi'
import { Link } from 'react-router-dom'


import '../styles/pages/landing.css'

import  logoImg from '../images/logo.png'

function Landing() {
    return (
    <div id="page-landing">
        <div className="content-wrapper">

            <img src={logoImg} alt="Acolhe-me"/>

            <main>
                <h1>Acolha e seja acolhido</h1>
                <p>Lugares para estacionar sua kombihome, fazer novas amizades e conhecer aventuras.</p>
            </main>

            <div className="info-extra">
                <p>Veja locais de aconhimento, pontos de parada interessantes ou cadastre seu ponto de apoio.</p>
            </div>

            <Link to="/app" className="enter-app">
                <FiMap size='1.42rem' color="rgba(0, 0, 0, 0.6)"></FiMap>
            </Link>

        </div>
    </div>
    )
}

export default Landing