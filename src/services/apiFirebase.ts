import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import { firebaseConfig } from './firebaseConfig';

firebaseConfig.apiKey = process.env.REACT_APP_FIREBASE_API_KEY || '';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

interface Produto {
	nome: string,
	preco: number,
	amount: number
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

export const apiFirebase = {
    login: async (email: string, password: string) => {
        let message = {
            result: false,
            message: ''
        };
        await firebaseApp.auth().signInWithEmailAndPassword(email, password).then((result) => {
            message = {
                result: true,
                message: JSON.stringify(result)
            }
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            message = {
                result: false, 
                message: `Error: ${errorCode} - ${errorMessage}`
            }
        });

        return message;
    },

    getClients: async () => {
        let res = null;
        await db.collection('Clientes').get()
        .then((snapshot) => {
            res = snapshot;
        })
        .catch((err) => {
            res = `Error getting documents ${err}`;
        });

        return res;
    },

    getProducts: async () => {
        let res = null;
        await db.collection('Produtos').get()
        .then((snapshot) => {
            res = snapshot;
        })
        .catch((err) => {
            res = `Error getting documents ${err}`;
        });

        return res;
    },

    createOrder: async (order: Pedido, dataEntrega: string) => {
        let res = null;
        res = await db.collection('Pedidos').doc(`${dataEntrega}`).set(order);

        return res;
    },

    getOrders: async () => {
        let res = null;
        await db.collection('Pedidos').get()
        .then((snapshot) => {
            res = snapshot;
        })
        .catch((err) => {
            res = `Error getting documents ${err}`;
        });

        return res;
    },

    addClient: async (telefone: string, data: Cliente) => {
        let res = await db.collection('Clientes').doc(telefone).set(data);

        return res;
    }
}