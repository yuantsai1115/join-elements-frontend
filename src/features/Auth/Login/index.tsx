import React, { useState, FC, ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Checkbox,
    Container,
    CssBaseline,
    Fab,
    FormGroup,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AuthService from './../../../services/Auth/auth.service';

const Login: FC = (): ReactElement => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIslogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const checkLogin = () => {
        if (AuthService.isAuthenticated()) {
            navigate('/');
            setIslogin(true);
        }
    };
    useEffect(() => {
        checkLogin();
    }, []);

    const navigate = useNavigate();

    const handleLoginClicked = () => {
        setMessage('');
        setLoading(true);

        AuthService.login(account, password).then(
            () => {
                setIslogin(true);
                navigate('/');
                window.location.reload();
            },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setIslogin(false);
                setLoginError(true);
                setMessage(resMessage);
            },
        );
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: loginError ? red[500] : isLogin ? green[500] : 'secondary.main',
                        }}
                    >
                        {loading ? <LockOpenIcon /> : <LockOutlinedIcon />}
                    </Avatar>
                    {loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="account"
                        label="Account"
                        name="account"
                        autoComplete="account"
                        onChange={e => setAccount(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: 'white' }} onClick={e => handleLoginClicked()}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
export default Login;
