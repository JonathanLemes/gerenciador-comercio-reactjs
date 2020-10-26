import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from 'react-router-dom';

import blackfexLogo from '../images/BlackFex Logo.png';
import '../styles/components/sidebar.css';

export default function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
        <img src={blackfexLogo} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}