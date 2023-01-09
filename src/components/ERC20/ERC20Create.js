import { useState } from 'react'
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'

const ERC20Token = require("./ERC20Token");
const { applyDecimals, web3 } = require('../../utils/ethereumAPI');
const web3Token = new web3.eth.Contract(ERC20Token.abi); //passando come parametro l'ABI, l'istanza del contratto web3 sarà in grado di interagire con lo smart contract

const ERC20Create = ({ importToken }) => {
    const defaultDecimals = "18";
    const defaultInitialSupply = "1000000000000000000"; // 1 => fornitura iniziale di default (18 decimals)
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenInitialSupply, setTokenInitialSupply] = useState(defaultInitialSupply);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onClickAction = async () => {
        if(successMessage) {
            importToken(web3Token.options.address);
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const accounts = await web3.eth.getAccounts();
        try {
            const result = await web3Token
                            .deploy({
                                data: ERC20Token.bytecode,
                                arguments: [tokenName, tokenSymbol, tokenInitialSupply]
                            })
                            .send({ from: accounts[0] });

            web3Token.options.address = result._address;
            setSuccessMessage(`Token successfully deployed at: ${result._address}`);
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
                    Create token
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Name" //nome del token
                    sx={{ m: 1, width: '25ch' }}
                    //appena si verifica un cambiamento sulla variabile inserita, scatta l'evento e viene chiamata la funzione setTokenName
                    onChange={(e) => setTokenName(e.target.value)} /> 
                <TextField
                    label="Symbol" //simbolo del token
                    sx={{ m: 1, width: '25ch' }}
                    onChange={(e) => setTokenSymbol(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Initial supply (raw)" //fornitura iniziale del token
                    sx={{ m: 1, width: '30ch' }}
                    placeholder={defaultInitialSupply}
                    type="number"
                    value={tokenInitialSupply}
                    onChange={(e) => setTokenInitialSupply(e.target.value)}
                />
                <TextField
                    label="Initial supply (adjusted)"
                    sx={{ m: 1, width: '30ch' }}
                    placeholder="1"
                    value={applyDecimals(tokenInitialSupply, defaultDecimals)} //mostriamo il valore di initialSupply in modo più leggibile (non in decimals), utilizzando il codice del file ethereumAPI.js
                    variant="filled"
                />
                <TextField
                    label="Decimals"
                    sx={{ m: 1, width: '10ch' }}
                    value={defaultDecimals}
                    type="number"
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12}>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Button //click sul bottone "Create" => viene eseguita la funzione onClickAction, che crea il token
                //cliccando nuovamente sul bottone, si verrà reindirizzati verso una pagina contenente le info sul token
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => onClickAction()}
                    disabled={loading} //il bottone verrà disabilitato durante l'invio della transazione alla rete Ethereum
                >
                    {successMessage ? "Token info" : (loading ? <CircularProgress size={25} /> : "Create")}
                </Button>
            </Grid>
        </Grid>
    )
}

export default ERC20Create