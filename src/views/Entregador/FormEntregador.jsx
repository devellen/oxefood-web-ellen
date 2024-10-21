import React from "react";
import { Button, Container, Divider, Form, Icon, Radio } from 'semantic-ui-react';
import InputMask from 'react-input-mask';

export default function FormEntregador() {

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
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={4}>
                                    <InputMask
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={4}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    placeholder='Ex: 20/03/1985'>
                                    <InputMask 
                                        mask="99/99/9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'>
                                    <InputMask 
                                        mask="(99) 99999-9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'>
                                    <InputMask 
                                        mask="(99) 9999-9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    type='number'
                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    type='number'
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
                                    value='sim'
                                    name='radioGroup'
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Não'
                                    value='nao'
                                    name='radioGroup'
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
