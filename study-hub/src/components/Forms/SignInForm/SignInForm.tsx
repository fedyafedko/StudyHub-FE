import { Box, Button, Card, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, TextField } from "@mui/material";
import google from '../../../img/google.png';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form"
import Auth from "../../../api/Auth";
import SignInRequest from "../../../api/models/request/Auth/SignInRequest";
import { useGoogleLogin } from "@react-oauth/google";
import styles from './SignInForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import signInFormValidation from '../../../validation/SignInFormValidation';
import useNotification from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import ForgotPasswordWindow from "../../ForgotPasswordWindow/ForgotPasswordWindow";
import User from "../../../api/User";

export interface SignIn {
    email: string;
    password: string;
}

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { notifyError, Notification } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignIn>({
        resolver: yupResolver(signInFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleSignIn = async (data: SignIn) => {
        const response = await Auth.signIn(data as SignInRequest);
        const user = await User.me();

        if (response === undefined) {
            navigate(`/${user?.role.toLowerCase()}/dashboard`);
        }
        else {
            notifyError(response);
        }
    };

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (codeResp: any) => {
            var myHeaders = new Headers();
            myHeaders.append("accept", "*/*");
            myHeaders.append("Authorization-Code", codeResp.code);

            const response = await Auth.signInGoogle(codeResp.code);
            if (response === undefined) {
                navigate('/');
            }
            else {
                notifyError(response);
            }
        },
        flow: 'auth-code',
    });


    return (
        <>
            <Card
                component="form"
                className={styles.formCard}
                sx={{
                    borderRadius: '24px',
                    '& > :not(style)': {
                        m: 1, width: '300px'
                    }
                }}
                noValidate
                autoComplete="off"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message || ' '}
                    />
                    <Box className={styles.passwordContainer}>
                        <TextField
                            id="password"
                            label="Password"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message || ' '}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <ForgotPasswordWindow />
                    </Box>
                </Box>
                <Box className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(handleSignIn)}
                        sx={{
                            backgroundColor: '#D41A6D',
                            borderRadius: '24px',
                            textTransform: 'none',
                            padding: '10px',
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleGoogleSignIn}
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '24px',
                            textTransform: 'none',
                            padding: '10px',
                            color: '#000000',
                            ":hover": {
                                color: '#ffffff',
                            }
                        }}
                    >
                        <img src={google} alt="Google" style={{ width: '25px', height: '25px', margin: '0 10px' }} />
                        Continue with Google
                    </Button>
                </Box>
            </Card>
            <Notification />
        </>
    );
}

export default SignInForm;
