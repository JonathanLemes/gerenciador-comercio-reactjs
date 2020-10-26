import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { FiPrinter } from "react-icons/fi";
import { PDFViewer } from '@react-pdf/renderer';


import '../styles/pages/view-order.css';

import { apiFirebase } from "../services/apiFirebase";
import { CreatePDF } from '../components/CreatePDF';

interface OrderParams {
	id: string
}

export default function ViewOrder() {
	const params = useParams<OrderParams>();
	const [pdf, setPDF] = useState<any>();

	useEffect(() => {
        apiFirebase.getOrders().then(async (res: any) => {
            for (var i = 0; i < res.docs.length; i++) {
                if (res.docs[i].id === params.id) {
                    setPDF(CreatePDF.getDocument([res.docs[i].data()]));
                }
            }
        });
	}, [params.id]);

	if (!pdf || !params.id) {
		return (
			<div id="page-client">
				<Sidebar />

				<div className="loading">
					<ReactLoading type={"spin"} color={'#CA1D0D'}/>
				</div>
			</div>
		)
	}

	return (
		<div id="page-client">
            <Sidebar />

            <div className="loading">
                <h1 className="pdf-title"><FiPrinter />Pedido: </h1>
                <PDFViewer className="pdf">
                    {pdf}
                </PDFViewer>
            </div>
        </div>
	);
}