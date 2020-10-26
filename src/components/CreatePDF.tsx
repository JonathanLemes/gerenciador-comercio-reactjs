import React from 'react';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import '../declarations/declarations.d.ts';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  section: {
    margin: 10,
    padding: 10,
    paddingLeft: 50,
    flexGrow: 1,
    width: 350,
    maxWidth: 350
  }
});

const Heading = styled.Text`
  font-size: 13px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 15px;
`;
const Divisor = styled.Text`
  font-size: 13px;
`;

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
    dataHoraEntrega: string,
    taxaEntrega: boolean
}

export const CreatePDF = {
    getDocument: (orders: Pedido[]) => {
        let document: any = [];
        orders.forEach((order, index) => {
            let taxaEntregaString = '';
            if (!order.taxaEntrega) taxaEntregaString = order.precoTotal.toFixed(2);
            else taxaEntregaString = `${order.precoTotal.toFixed(2)} (R$ ${(order.precoTotal - 5).toFixed(2)} + R$ 5.00 de taxa de entrega)`
            document.push(
                <Page size="A5" style={styles.page} key={index}>
                    <View style={styles.section}>
                        <Heading><Title>Esquina do Frango</Title> (Guaratinguetá - SP)</Heading>
                        <Divisor>======================================</Divisor>
                        <Heading><Title>Cliente:</Title> {order.clienteNome}</Heading>
                        <Heading><Title>Telefone:</Title> {order.clienteTelefone}</Heading>
                        <Heading><Title>Endereço:</Title> {order.clienteEndereco}</Heading>
                        <Divisor>======================================</Divisor>
                        <Title>Produtos:</Title>
                        {order.produtos.map((produto, indexProduto) => {
                            return (
                                <Heading key={indexProduto}><Title>{indexProduto + 1}:</Title> {produto.amount}x {produto.nome} | R$ {produto.preco.toFixed(2)} (unid.) </Heading>
                            )
                        })}
                        <Divisor>======================================</Divisor>
                        <Heading><Title>Total:</Title> R$ {taxaEntregaString}</Heading>
                        <Divisor>======================================</Divisor>
                        <Heading><Title>Data e Hora:</Title> {order.dataHoraEntrega}</Heading>
                        <Heading></Heading>
                        <Heading><Title>Processamento em:</Title> {order.dataHoraRegistro}</Heading>
                    </View>
                </Page>
            )
        });

        return (
            <Document>
                {document.map((html: any) => {
                    return html
                })}
            </Document>
        )
    }
}