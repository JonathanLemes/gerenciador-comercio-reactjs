import React, { useEffect, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { FiMinus, FiPlus, FiEdit3, FiCheckCircle } from "react-icons/fi";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { PDFViewer } from '@react-pdf/renderer';


import '../styles/pages/add-order.css';
import '../declarations/declarations.d.ts';

import mapIcon from '../utils/mapIcon';
import houseMarker from '../utils/houseMarker';
import { apiFirebase } from "../services/apiFirebase";
import { CreatePDF } from '../components/CreatePDF';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
	}),
);

interface Cliente {
	telefone: string,
	nome: string,
	rua: string,
	numero: number,
	bairro: string,
	cidade: string,
	uf: string,
	latitude: number,
	longitude: number
}

interface ClientParams {
	id: string
}

interface Produto {
	nome: string,
	preco: number,
	amount: number
}

export default function AddOrder() {
	const params = useParams<ClientParams>();
	const [client, setClient] = useState<Cliente>();
	const [products, setProducts] = useState<Produto[]>([]);
	const [productAmount, setProductAmount] = useState<Array<number>>([]);
	const [totalPrice, setTotalPrice] = useState(5);
	const [taxaEntrega, setTaxaEntrega] = useState(true);
	const [pedidoString, setPedidoString] = useState('');
	const [openSubmit, setOpenSubmit] = React.useState(false);
	const [pdf, setPDF] = useState<any>();
	const classes = useStyles();
	const [date, setDate] = React.useState<number>(new Date().getTime());

	const handleSubmit = async () => {
		let produtos = [];
		for (let i = 0; i < productAmount.length; i++) {
			if (productAmount[i] > 0) {
				produtos.push({
					nome: products[i].nome,
					preco: products[i].preco,
					amount: productAmount[i]
				});
			}
		}
		if (client && params.id) {
			let order = [{
				clienteNome: client.nome,
				clienteTelefone: String(params.id),
				clienteEndereco: `${client.rua}, ${client.numero}. ${client.bairro}. ${client.cidade} - ${client.uf}`,
				clienteLatitude: client.latitude,
				clienteLongitude: client.longitude,
				produtos: produtos,
				precoTotal: totalPrice,
				dataHoraRegistro: `${new Date()}`,
				dataHoraEntrega: `${new Date(date)}`,
				taxaEntrega
			}];

			await apiFirebase.createOrder(order[0], String(new Date(order[0].dataHoraRegistro).getTime()));
			setPDF(CreatePDF.getDocument(order));
		}
	};

	const handleCloseSubmit = () => {
		setOpenSubmit(false);
	};

	const changeDate = (event: any) => {
		if (event) setDate(new Date(event.target.value).getTime());
	}

	useEffect(() => {
		let aux = "";
		for (let i = 0; i < productAmount.length; i++) {
			if (productAmount[i] > 0) {
				aux += `${productAmount[i]} * ${products[i].nome}; `;
			}
		}
		setPedidoString(aux.substring(0, aux.length - 2));
	}, [totalPrice, productAmount, products]);

	useEffect(() => {
		apiFirebase.getClients().then(async (res: any) => {
			for (var i = 0; i < res.docs.length; i++) {
				if (res.docs[i].id === params.id) {
					setClient({
						telefone: params.id,
						nome: res.docs[i].data().nome,
						rua: res.docs[i].data().rua,
						numero: res.docs[i].data().numero,
						bairro: res.docs[i].data().bairro,
						cidade: res.docs[i].data().cidade,
						uf: res.docs[i].data().uf,
						latitude: res.docs[i].data().latitude,
						longitude: res.docs[i].data().longitude
					});
				}
			}
		});

		let productArray: Produto[] = [];
		apiFirebase.getProducts().then(async (res: any) => {
			for (var i = 0; i < res.docs.length; i++) {
				productArray.push({
					nome: res.docs[i].id,
					preco: res.docs[i].data().price,
					amount: 0
				});
				const productAmountAux = productAmount;
				productAmountAux.push(0);
				setProductAmount(productAmountAux);
			}
			setProducts(productArray);
		});
	}, [params.id, productAmount]);

	if (pdf) {
		return (
			<div id="page-client">
				<Sidebar />

				<div className="loading">
					<h1 className="pdf-title">Pedido Anotado! <FiCheckCircle /></h1>
					<PDFViewer className="pdf">
						{pdf}
					</PDFViewer>
				</div>
			</div>
		)
	}

	if (!client || !products) {
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
			<Dialog
				open={openSubmit}
				onClose={handleCloseSubmit}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Deseja anotar o pedido?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Você está anotando um pedido para {client.nome}, no valor de R$ {totalPrice.toFixed(2)} ({pedidoString}).
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseSubmit} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleSubmit} color="primary" autoFocus>
						Anotar
					</Button>
				</DialogActions>
			</Dialog>

			<Sidebar />

			<main>
				<div className="client-details">

					<div className="client-details-content">
						<h1>Pedido de {client.nome}</h1>

						<h2>Detalhes do pedido</h2>
						<p>Produtos:</p>
						<table className="product-list">
							<tbody>
								{products.map((product: Produto, index: number) => {
									return (
										<tr key={index}>
											<td>{product.nome}</td>
											<td>{`R$ ${product.preco.toFixed(2)}`}</td>
											<td className="remove-item" onClick={async () => {
												if (productAmount[index] > 0) {
													let productAmountAux = productAmount;
													productAmountAux[index]--;
													setProductAmount(productAmountAux);
													setTotalPrice(totalPrice - product.preco);
												}
											}}><FiMinus size={16} color="#FFFFFF" /></td>
											<td className="amount">{productAmount[index]}</td>
											<td id={`add-item-${product.nome}`} className="add-item" onClick={() => {
												let productAmountAux = productAmount;
												productAmountAux[index]++;
												setProductAmount(productAmountAux);
												setTotalPrice(totalPrice +  product.preco);
											}}><FiPlus size={16} color="#FFFFFF" /></td>
										</tr>
									)
									})
								}
							</tbody>
						</table>
						<p className="total-price">Total: R$ {totalPrice.toFixed(2)}</p>

						<div className="reserve-date">
							<form className={classes.container} noValidate>
								<TextField
									id="datetime-local"
									label="Reservar para:"
									type="datetime-local"
          							onChange={changeDate}
									className={classes.textField}
									InputLabelProps={{
									shrink: true,
									}}
								/>
							</form>
						</div>

						<div className="input-block">
							<label htmlFor="taxa_entrega" className="taxa-entrega-title">Inserir taxa de entrega?</label>

							<div className="button-select">
								<button type="button" className={taxaEntrega ? 'active' : ''} onClick={() => {
									if (!taxaEntrega) {
										setTaxaEntrega(true);
										setTotalPrice(totalPrice + 5);
									}
								}}>Sim</button>
								<button type="button" className={!taxaEntrega ? 'active' : ''} onClick={() => {
									if (taxaEntrega) {
										setTaxaEntrega(false);
										setTotalPrice(totalPrice - 5);
									}
								}}>Não</button>
							</div>
						</div>

						<hr/>

						<p>Endereço: {`${client.rua}, ${client.numero}. ${client.bairro}. ${client.cidade} - ${client.uf}`}</p>
						<div className="map-container">
							<Map 
								center={[client.latitude, client.longitude]}
								zoom={15} 
								style={{ width: '100%', height: 280 }}
							>
								<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
								<Marker interactive={false} icon={mapIcon} position={[client.latitude, client.longitude]} />
								<Marker icon={houseMarker} position={[-22.779180, -45.206178]}>
									Esquina do Frango
								</Marker>
							</Map>

							<footer>
								<a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${client.latitude},${client.longitude}`}>Ver rotas no Google Maps</a>
							</footer>
						</div>

						<hr />

						<div className="footer-buttons">
							<button className="submit-order" onClick={() => {
								if (totalPrice > 0) setOpenSubmit(true);
							}}>Anotar pedido <FiEdit3 size={20} color="#FFF" /></button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}