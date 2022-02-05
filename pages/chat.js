import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    var [listaDeMensagens, setListaDeMensagem ] = React.useState([]);
    const _supabase = createClient("https://iddtqnafdzcwcccksxsa.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzg1Nzk0MSwiZXhwIjoxOTU5NDMzOTQxfQ.U8ZQWilSHuAhnbwRFha7yaS4pk-anVGQC3VWbvFdpHg");

    const mensagens = _supabase
        .from('mensagens')
        .select('*')
        .then((dados) => {
            console.log('Supabase Instance: ', dados)
        })
    

    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            id: listaDeMensagens.length,
            texto: novaMensagem,
            de: 'andreattamatheus'
        };

        const inserirMensagem = _supabase
            .from('mensagens')
            .insert([
                {
                    texto: novaMensagem,
                    de: 'andreattamatheus'
                }
            ])
        // console.log(inserirMensagem);
        setListaDeMensagem([
            mensagem,
            ...listaDeMensagens
        ]);

        setMensagem('');
    }
    function handleRemoverMensagem(messagesRemoves){
        setListaDeMensagem([
            messagesRemoves,
            ...listaDeMensagens
        ]);
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '50%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} handleRemoverMensagem={handleRemoverMensagem}/>
           

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(e) => {
                                const texto = e.target.value;
                                setMensagem(texto);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function excluirMensagem(mensagens, idMensagem){
    const array = mensagens.filter((mensagem) => {
        return mensagem.id !== idMensagem
    }); 
    return array;
}


function MessageList(props) {
        return (
            <Box
                tag="ul"
                styleSheet={{
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    flex: 1,
                    color: appConfig.theme.colors.neutrals["000"],
                    marginBottom: '16px',
                }}
            >
                {props.mensagens.map((mensagem) => {
                        return(
                            <Text
                                key={mensagem.id}
                                tag="li"
                                styleSheet={{
                                    borderRadius: '5px',
                                    padding: '6px',
                                    marginBottom: '12px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[700],
                                    }
                                }}
                            >
                                <Box
                                    styleSheet={{
                                        marginBottom: '8px',
                                    }}
                                >
                                    <Image
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                        src={`https://github.com/andreattamatheus.png`}
                                    />
                                    <Text tag="strong">
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                    <Text
                                        onClick={() => {
                                            const mensagemRemoved = excluirMensagem(props.mensagens, mensagem.id);
                                            props.handleRemoverMensagem(mensagemRemoved);
                                        }}
                                        styleSheet={{
                                            fontSize: '10px',
                                            fontWeight: '800',
                                            margin: '8px',
                                            padding: '5px 8px',
                                            color: appConfig.theme.colors.neutrals[parseInt('000')],
                                            cursor: 'pointer',
                                            border: '1px solid',
                                            borderColor: 'red',
                                            borderRadius: '25px',
                                            float: 'right'

                                            
                                        }}
                                        tag="span"
                                    >
                                        X
                                    </Text>
                                </Box>
                                {mensagem.texto}
                            </Text>
                        );
                    })
                }

            </Box>
        )

}