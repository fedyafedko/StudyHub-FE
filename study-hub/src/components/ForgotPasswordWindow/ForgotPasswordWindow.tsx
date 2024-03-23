import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ForgotPasswordWindow.module.css';
import useNotification from '../../hooks/useNotification';
import { useForm } from 'react-hook-form';
import ForgotPasswordFormValidation from '../../validation/ForgotPasswordFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import Auth from '../../api/Auth';

export interface ForgotPasswordForm {
    email: string;
}

const ForgotPasswordWindow = () => {
    const [open, setOpen] = React.useState(false);
    const { notifyError, notifySuccess, Notification } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordForm>({
        resolver: yupResolver(ForgotPasswordFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleForgotPassword = async (data: ForgotPasswordForm) => {
        const response = await Auth.forgotPassword(data.email);
        if (response === undefined) {
            setOpen(false);
            notifySuccess('Password reset email sent');
        }
        else {
            notifyError(response);
        }
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className={styles.fradeBox}>
                        <CloseIcon onClick={handleClose} className={styles.closeIcon} />
                        <Typography id="transition-modal-title" variant="h5" component="h2"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                            Forgot<br />Your Password?
                        </Typography>
                        <Box className={styles.formBox}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message || ' '}
                                sx={{
                                    width: '300px',
                                }} />
                            <Button 
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(handleForgotPassword)}
                            sx={{
                                borderRadius: '24px',
                                width: '300px',
                            }}>
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Button
                onClick={handleOpen}
                sx={{
                    display: 'flex',
                    color: '#000000',
                    alignSelf: 'flex-end',
                    padding: '0px',
                    textTransform: 'none',
                    ":hover": {
                        backgroundColor: 'transparent',
                        color: '#D41A6D',
                        textDecoration: 'underline',
                    }
                }}>
                Forgot password?
            </Button>
            <Notification/>
        </>
    );
}

export default ForgotPasswordWindow;