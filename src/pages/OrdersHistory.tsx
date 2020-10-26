import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import ReactLoading from 'react-loading';
import { MDBDataTable } from 'mdbreact';

import '../styles/pages/orders-history.css';

import { apiFirebase } from "../services/apiFirebase";
import { RiHistoryLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

interface Pedido {
    clienteNome: string,
    clienteTelefone: string,
    dataHoraRegistro: string,
    dataHoraEntrega: string
}

export default function OrdersHistory() {
    const history = useHistory();
    const [orders, setOrders] = useState<Pedido[]>([]);

	useEffect(() => {
        apiFirebase.getOrders().then(async (res: any) => {
            let ordersArray: any = [];
            for (var i = 0; i < res.docs.length; i++) {
                let registro = new Date(res.docs[i].data().dataHoraRegistro);
                let entrega = new Date(res.docs[i].data().dataHoraEntrega);

                let dataRegistro = `${registro.getDate()}/${registro.getMonth() + 1}/${registro.getFullYear()} às ${registro.getHours()}:${registro.getMinutes()}`;
                let dataEntrega = `${entrega.getDate()}/${entrega.getMonth() + 1}/${entrega.getFullYear()} às ${entrega.getHours()}:${entrega.getMinutes()}`;
                
                ordersArray.push({
                    clienteNome: `${res.docs[i].data().clienteNome}‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ `,
                    clienteTelefone: `${res.docs[i].data().clienteTelefone}‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ `,
                    dataHoraRegistro: `${dataRegistro}‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ `,
                    dataHoraEntrega: `${dataEntrega}‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ `,
                    clickEvent: () => history.push(`/view-order/${registro.getTime()}`)
                });
            }
            setOrders(ordersArray);
        });
	}, [history]);

	if (!orders) {
		return (
			<div id="page-client">
				<Sidebar />

				<div className="order">
					<ReactLoading type={"spin"} color={'#CA1D0D'}/>
				</div>
			</div>
		)
	}

	return (
		<div id="page-client">
            <Sidebar />

            <div className="order">
                <h1 className="orders-title"><RiHistoryLine />Pedidos: </h1>
                <MDBDataTable
                    className="orders-table"
                    searchLabel="Procurar"
                    paging={false}
                    info={false}
                    striped
                    entries={25}
                    bordered
                    hover
                    entriesLabel="Dados por página:"
                    data={{
                        columns: [
                            {
                                label: 'Data de entrega',
                                field: 'dataHoraEntrega',
                                sort: 'asc',
                                width: 300
                            },
                            {
                                label: 'Telefone',
                                field: 'clienteTelefone',
                                sort: 'asc',
                                width: 300
                            },
                            {
                                label: 'Nome',
                                field: 'clienteNome',
                                sort: 'asc',
                                width: 800
                            },
                            {
                                label: 'Data de registro',
                                field: 'dataHoraRegistro',
                                sort: 'asc',
                                width: 300
                            }
                        ],
                        rows: orders
                    }}
                />
            </div>
        </div>
	);
}