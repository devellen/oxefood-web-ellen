import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormProduto() {

    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
    const { state } = useLocation();
    const [idProd, setIdProd] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    setIdProd(response.data.id)
                    setTitulo(response.data.titulo)
                    setCodigo(response.data.codigo)
                    setDescricao(response.data.descricao)
                    setValorUnitario(response.data.valorUnitario)
                    setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
                    setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
                })
        }
    }, [state])

    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        if (idProd != null) { //Alteração:
            axios.put("http://localhost:8080/api/produto/" + idProd, produtoRequest)
                .then((response) => { console.log('produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => { console.log('produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
    }

    return (
        <div>

            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idProd === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idProd != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    placeholder='Informe o título do produto'
                                    maxLength="100"
                                    width={12}
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder='Informe o código do produto'
                                    width={4}
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </Form.Group>

                            <Form.TextArea
                                label='Descrição'
                                placeholder='Informe a descrição do produto'
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />

                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    type='number'
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder='30'
                                    type='number'
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder='40'
                                    type='number'
                                    value={tempoEntregaMaximo}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
