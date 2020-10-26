import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/BlackFex Logo.png';
import logoEscrita from '../images/BlackFex Escrita Logo.png';

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <div id="logo">
                    <img src={logoImg} alt="Esquina do frango" className="logoImg"/>
                    <img src={logoEscrita} alt="Esquina do frango" className="logoEscrita"/>
                </div>

                <main>
                    <h1>Esquina do Frango</h1>
                    <p>Feito por: Jonathan Fillipe Lemes</p>
                </main>

                <div className="location">
                    <strong>Guaratinguetá</strong>
                    <span>São Paulo</span>
                </div>

                <Link to="/login" className="enter-app">
                    <FiArrowRight size={26} color="rgba(255, 255, 255, 1)" />
                </Link>
            </div>
        </div>
    )
}

export default Landing;