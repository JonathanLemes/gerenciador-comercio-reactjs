import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {apiFirebase} from '../services/apiFirebase';
import ReactLoading from 'react-loading';

import '../styles/pages/login-screen.css';

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (loading) {
        return(
          <div id="page-login">
            <div className="login-box">
                <ReactLoading type={"spin"} color={'#CA1D0D'}/>
            </div>
          </div>
        )
    }

    function submitLogin(event: any) {
        if (event.which === 13) {
            setLoading(true);
            handleLogin();
        }
    }

    const handleLogin = async () => {
        let login = await apiFirebase.login(email, password);
        if(login.result) {
            history.push('/map');
        } else {
            setLoading(false);
            alert(`Erro ao logar!\n\n${login.message}`);
        }
    };

    return(
        <div id="page-login">
            <div className="login-box">
                <h1>Bem-vindo ao seu gerenciador pessoal!</h1>
                <div className="email">
                    <label className="mdl-textfield__label">E-mail</label>
                    <input onKeyPress={submitLogin} onChange={(event) => {
                        setEmail(event.target.value);
                    }} className="mdl-textfield__input" type="text" id="email" />
                </div>
                <div className="password">
                    <label className="mdl-textfield__label">Senha</label>
                    <input onKeyPress={submitLogin} onChange={(event) => {
                        setPassword(event.target.value);
                    }} className="mdl-textfield__input" type="password" id="password" />
                </div>
                <div className="buttons">
                    <Link to="/">
                        <button className="button-voltar">
                            Voltar
                        </button>    
                    </Link>
                    <button className="button-login" onClick={() => {
                        setLoading(true);
                        handleLogin();
                    }}>
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    )
}