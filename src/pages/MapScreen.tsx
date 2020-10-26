import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { FiPlus, FiUserPlus, FiPrinter } from 'react-icons/fi';
import { RiHistoryLine } from 'react-icons/ri';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/map-screen.css';
import 'leaflet/dist/leaflet.css';

import mapIcon from '../utils/mapIcon';
import houseMarker from '../utils/houseMarker';
import { apiFirebase } from '../services/apiFirebase';

interface Cliente {
    telefone: string,
    nome: string,
    latitude: number,
    longitude: number
}

interface Pedido {
    clienteNome: string,
    clienteTelefone: string,
    clienteEndereco: string,
    produtos: Produto[],
    precoTotal: number,
    dataHoraRegistro: string,
    dataHoraEntrega: string
}

interface Produto {
	nome: string,
	preco: number,
	amount: number
}

interface MarkerPedido {
    clienteNome: string,
    clienteTelefone: string,
    latitude: number,
    longitude: number
}

export default function MapScreen() {
    const [phone, setPhone] = useState('');
    const [clients, setClients] = useState<Cliente[]>([]);
    const [orders, setOrders] = useState<Pedido[]>([]);
    const [futureOrders, setFutureOrders] = useState<Pedido[]>([]);
    const [clientsFound, setClientsFound] = useState<Cliente[]>([]);

    useEffect(() => {
        apiFirebase.getClients().then(async (res: any) => {
            let clientsArray: Cliente[] = [];
            for (var i = 0; i < res.docs.length; i++) {
                clientsArray.push({
                    telefone: res.docs[i].id,
                    nome: res.docs[i].data().nome,
                    latitude: res.docs[i].data().latitude,
                    longitude: res.docs[i].data().longitude
                });
            }
            setClients(clientsArray);
        });
        apiFirebase.getOrders().then(async (res: any) => {
            let ordersArray: Pedido[] = [];
            for (var i = 0; i < res.docs.length; i++) {
                ordersArray.push({
                    clienteNome: res.docs[i].data().clienteNome,
                    clienteTelefone: res.docs[i].data().clienteTelefone,
                    clienteEndereco: res.docs[i].data().clienteEndereco,
                    produtos: res.docs[i].data().produtos,
                    precoTotal: res.docs[i].data().precoTotal,
                    dataHoraRegistro: res.docs[i].data().dataHoraRegistro,
                    dataHoraEntrega: res.docs[i].data().dataHoraEntrega
                });
            }
            setOrders(ordersArray);
            getFutureOrders(ordersArray);
        });
    }, []);

    useEffect(() => {
        let clientFounding: Cliente[] = [];

        clients.forEach((client) => {
            if (client.telefone.substring(1).includes(phone.substring(1)) && phone.substring(1) !== '') {
                clientFounding.push(client);
            }
        });
        setClientsFound(clientFounding);

        console.log(orders);
    }, [phone, clients, orders]);

    const getFutureOrders = (orders: Pedido[]) => {
        let futureOrdersArray: Pedido[] = [];
        orders.forEach((order) => {
            if ((new Date(order.dataHoraEntrega).getTime()) - (new Date().getTime()) >= 0) {
                futureOrdersArray.push(order);
            }
        });
        setFutureOrders(futureOrdersArray);
    }

    return (
        <div id="page-map">
            <aside>
                <header>
                    <h2>Chegou um novo pedido?</h2>
                    <p>Digite o número do cliente:</p>
                </header>
                <div className="middle-section">
                    <InputMask mask="(99) 999999999" onChange={(event) => {
                        setPhone(event.target.value);
                    }} alwaysShowMask={false} maskChar={null} />
                    <table>
                        <tbody>
                            {clientsFound.map((client: Cliente) => {
                                return (
                                    <tr key={client.telefone}>
                                        <td>{client.telefone}</td>
                                        <td>{client.nome}</td>
                                        <td className="new-order"><Link to={`/add-order/${client.telefone}`}><FiPlus size={16} color="#FFFFFF" /></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <table className="table-orders">
                        <thead>
                            <tr>
                                <th colSpan={3}>{futureOrders.length > 0 && 'Próximas entregas:'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {futureOrders.map((order: Pedido, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.clienteNome}</td>
                                        <td>{`${new Date(order.dataHoraEntrega).getDate()}/${(new Date(order.dataHoraEntrega).getMonth()) + 1} às ${new Date(order.dataHoraEntrega).getHours()}h ${new Date(order.dataHoraEntrega).getMinutes()}m`}</td>
                                        <td><Link to={`/view-order/${new Date(order.dataHoraRegistro).getTime()}`} className="view-order"><FiPrinter size={16} color="#FFFFFF" /></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <footer>
                    <strong>Guaratinguetá</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map 
                center={[-22.808307736549587, -45.18951416015625]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {clients.map((client, index) => {
                    return (
                        <Marker key={index} icon={mapIcon} position={[client.latitude, client.longitude]}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {client.nome}
                            </Popup>
                        </Marker>
                    );
                })}
                <Marker icon={houseMarker} position={[-22.779180, -45.206178]}>
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        Esquina do Frango
                    </Popup>
                </Marker>
            </Map>

            <Link title="Adicionar cliente" to="/clients/add" className="add-client">
                <FiUserPlus size={32} color="#FFFFFF" /> 
            </Link>
            <Link title="Pedidos anteriores" to="/orders/" className="view-orders">
                <RiHistoryLine size={32} color="#FFFFFF" /> 
            </Link>
        </div>
    )
}