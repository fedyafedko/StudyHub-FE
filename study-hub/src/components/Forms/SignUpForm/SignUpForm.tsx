import { Box, Button, Card, IconButton, InputAdornment, TextField } from "@mui/material";
import google from '../../../img/google.png';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form"
import Auth from "../../../api/Auth";
import { useGoogleLogin } from "@react-oauth/google";
import styles from './SignUpForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import signUpFormValidation from '../../../validation/SignUpFormValidation';
import useNotification from "../../../hooks/useNotification";
import { useNavigate, useParams } from "react-router-dom";
import SignUpRequest from "../../../api/models/request/Auth/SignUpRequest";

export interface SignUp {
    fullName: string;
    email: string;
    password: string;
}

const SignUpForm = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const { notifyError, Notification } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUp>({
        resolver: yupResolver(signUpFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSignUp = async (form: SignUp) => {
        const data = form as SignUpRequest;
        data.token = token == undefined ? '' : encodeURIComponent(token);
        console.log(data);
        const response = await Auth.signUp(data);
        if (response === undefined) {
            navigate('/'); 
        }
        else {
            notifyError(response);
        }
    };

    const handleGoogleSignUp = useGoogleLogin({
        onSuccess: async (codeResp: any) => {
            var myHeaders = new Headers();
            myHeaders.append("accept", "*/*");
            myHeaders.append("Authorization-Code", codeResp.code);

            const response = await Auth.signUpGoogle(codeResp.code, token == undefined ? '' : token);
            if (response === undefined) {
                navigate('/dashboard'); 
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
                        id="fullName"
                        label="Full Name"
                        variant="standard"
                        {...register('fullName')}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message || ' '}
                    />
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
                    </Box>
                </Box>
                <Box className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(handleSignUp)}
                        sx={{
                            backgroundColor: '#D41A6D',
                            borderRadius: '24px',
                            textTransform: 'none',
                            padding: '10px',
                        }}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleGoogleSignUp}
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

export default SignUpForm;
