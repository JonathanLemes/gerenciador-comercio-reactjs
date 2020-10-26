import React, { FormEvent, useState } from "react";
import InputMask from 'react-input-mask';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import '../styles/pages/add-client.css';
import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcon";
import { apiFirebase } from "../services/apiFirebase";

interface Cliente {
	nome: string,
	rua: string,
	numero: number,
	bairro: string,
	cidade: string,
	uf: string,
	latitude: number,
	longitude: number
}

export default function AddClient() {
    const history = useHistory();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0});
    const [telefone, setTelefone] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('SP');

    function handleMapClick(event: LeafletMouseEvent) {
        const {
            lat,
            lng
        } = event.latlng;

        setPosition({ latitude: lat, longitude: lng });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { latitude, longitude } = position;

        if (!bairro || !cidade || !nome || !numero || !rua || !uf) {
            alert('ERRO: Cadastre todos os dados!');
            return
        }

        if (!latitude || !longitude) {
            alert('ERRO: Selecione o local no mapa!');
            return
        }

        const data: Cliente = {
            bairro,
            cidade,
            latitude,
            longitude,
            nome,
            numero: parseInt(numero),
            rua,
            uf
        };

        console.log(data);

        apiFirebase.addClient(telefone, data).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/map');
        }).catch((err) => {
            alert(`Erro ao cadastrar: ${err.message}`);
        });
    }

    return (
        <div id="page-create-client">
        <Sidebar />

        <main>
            <form onSubmit={handleSubmit} className="create-client-form">
            <fieldset>
                <legend>Cliente</legend>

                <div className="input-block">
                    <label htmlFor="numero">Telefone</label>
                    <InputMask mask="(99) 999999999" onChange={(event) => {
                        setTelefone(event.target.value);
                    }} alwaysShowMask={false} maskChar={null} />
                </div>

                <div className="input-block">
                    <label htmlFor="name">Nome</label>
                    <input id="name" value={nome} onChange={(event) => {
                        setNome(event.target.value);
                    }} />
                </div>

            </fieldset>

            <fieldset>
                <legend>Entrega</legend>

                <label htmlFor="name">Selecione seu local no mapa:</label>
                <Map
                    className="map"
                    center={[-22.808307736549587, -45.18951416015625]}
                    zoom={13}
                    style={{ width: '100%', height: 280 }}
                    onClick={handleMapClick}
                >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                { position.latitude !== 0 && (<Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />) }
                </Map>

                <div className="input-block" id="rua-numero">
                    <div className="rua">
                        <label htmlFor="rua">Rua</label>
                        <input id="rua" value={rua} onChange={(event) => {
                            setRua(event.target.value);
                        }} />
                    </div>
                    <div className="numero">
                        <label htmlFor="numero">Nº</label>
                        <input id="numero" value={numero} onChange={(event) => {
                            setNumero(event.target.value);
                        }} />
                    </div>
                </div>

                <div className="input-block">
                    <label htmlFor="bairro">Bairro</label>
                    <input id="bairro" value={bairro} onChange={(event) => {
                        setBairro(event.target.value);
                    }} />
                </div>

                <div className="input-block" id="cidade-uf">
                    <div className="cidade">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="cidade" value={cidade} onChange={(event) => {
                            setCidade(event.target.value);
                        }} />
                    </div>
                    <div className="uf">
                        <label htmlFor="uf">UF</label>
                        <input id="uf" value={uf} onChange={(event) => {
                            setUf(event.target.value);
                        }} />
                    </div>
                </div>

            </fieldset>

            <button className="confirm-button" type="submit">
                Cadastrar
            </button>
            </form>
        </main>
        </div>
    );
}