import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Divider, Form, Icon, Radio } from 'semantic-ui-react';
import InputMask from 'react-input-mask';

export default function FormEntregador() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [ativo, setAtivo] = useState(null);

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            ativo: ativo
        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um entregador.')
            })
    }

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Entregador &nbsp;<Icon name='angle double right' size="small" />
                        </span>
                        Cadastro
                    </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    width={8}
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={4}>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={4}
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    placeholder='Ex: 20/03/1985'>
                                    <InputMask
                                        mask="99/99/9999"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    type='number'
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    type='number'
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={12}
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}>
                                    <InputMask
                                        mask="99999-999"
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Input
                                fluid
                                label='UF'
                                placeholder='Selecione'>
                                <select>
                                    <option value=''>Selecione</option>
                                    <option value='PE'>PE</option>
                                    <option value='SP'>SP</option>
                                    <option value='RJ'>RJ</option>
                                </select>
                            </Form.Input>

                            <Form.Input
                                fluid
                                label='Complemento'
                            />

                            <Form.Group inline>
                                <label>Ativo:</label>
                                <Form.Field
                                    control={Radio}
                                    label='Sim'
                                    name='radioGroup'
                                    value={true}
                                    checked={ativo === true}
                                    onChange={() => setAtivo(true)}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Não'
                                    name='radioGroup'
                                    value={false}
                                    checked={ativo === false}
                                    onChange={() => setAtivo(false)}
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
                                Voltar
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
