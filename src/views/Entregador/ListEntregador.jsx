import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false); //controle de exibicao do modal
    const [idRemover, setIdRemover] = useState();

    const [entregador, setEntregador] = useState(); //pra fazer o modal visu
    const [openModal2, setOpenModal2] = useState(false); //pra fazer o modal visu

    useEffect(() => { //função é executada, quando a tela é carregada
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() { // async/await - torna função sincrona

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                console.log('Cliente removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }

    function confirmaVisu(id) {
        axios.get('http://localhost:8080/api/entregador/' + id)
            .then((response) => {
                setEntregador(response.data);
                setOpenModal2(true);
            })
            .catch((error) => {
                console.log('Erro ao carregar os dados do entregador:', error);
            });
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador' //vai pra tela de cliente
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>RG</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell>QTD Entregas Realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entreg => (

                                    <Table.Row key={entreg.id}>
                                        <Table.Cell>{entreg.nome}</Table.Cell>
                                        <Table.Cell>{entreg.cpf}</Table.Cell>
                                        <Table.Cell>{entreg.rg}</Table.Cell>
                                        <Table.Cell>{formatarData(entreg.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entreg.foneCelular}</Table.Cell>
                                        <Table.Cell>{entreg.foneFixo}</Table.Cell>
                                        <Table.Cell>{entreg.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entreg.valorFrete}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para visualizar este entregador'
                                                icon
                                                onClick={e => confirmaVisu(entreg.id)}>
                                                <Icon name='eye' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{ id: entreg.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entreg.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal //compenente do semantic ui - modal delete
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal // modal visualização
                basic
                onClose={() => setOpenModal2(false)}
                onOpen={() => setOpenModal2(true)}
                open={openModal2}
            >
                <h2> Dados do Entregador </h2>
                <Divider />
                {entregador && (
                    <li key={entregador.id} style={{ backgroundColor: 'white', color: 'black', padding: 2, margin: 4, listStyleType: 'none' }}>
                        <ul><strong>Nome:</strong> {entregador.nome}</ul>
                        <ul><strong>CPF:</strong> {entregador.cpf}</ul>
                        <ul><strong>RG:</strong> {entregador.rg}</ul>
                        <ul><strong>Data de Nascimento:</strong> {formatarData(entregador.dataNascimento)}</ul>
                        <ul><strong>Celular:</strong> {entregador.foneCelular}</ul>
                        <ul><strong>Fixo:</strong> {entregador.foneFixo}</ul>
                        <ul><strong>Rua:</strong> {entregador.rua}</ul>
                        <ul><strong>Bairro:</strong> {entregador.bairro}</ul>
                        <ul><strong>Cidade:</strong> {entregador.cidade}</ul>
                        <ul><strong>UF:</strong> {entregador.uf}</ul>
                    </li>
                )}

                <div style={{ backgroundColor: 'white', color: 'black' }}>

                </div>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={() => setOpenModal2(false)}>
                        <Icon name='remove' /> fechar
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}
