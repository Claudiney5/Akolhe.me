import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import logoPeq from '../images/logo_p.png'

import '../styles/components/sidebar.css'

export default function Sidebar() {
    const { goBack } = useHistory()

    return (
        <aside className="app-sidebar">
            <img src={ logoPeq } alt="Acolhe-me"/>

            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
        </aside>
    )
}