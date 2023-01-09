import { CssBaseline, Typography, Toolbar, Box } from '@mui/material';
import ERC20App from './ERC20/ERC20App';

const AppAuthenticated = () => {    
    //<ERC20App => viene ottenuto il contenuto di ERCApp.js
    return (
        <Box>
            <CssBaseline />
                <Toolbar>
                    <Typography variant="h5" >
                        IoT Based Smart Systems - ERC20 demo
                    </Typography>
                </Toolbar>
            <Box component="main" sx={{p:3}}>
                <ERC20App/>
            </Box> 
        </Box>
    )
}

export default AppAuthenticated