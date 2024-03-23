import { Box, Typography } from '@mui/material';
import notFound from '../../img/NotFound.png';

const NotFoundPage = () => {
    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: '100vh',
            gap: '150px'
        }}>
            <img src={notFound} alt="NotFound" style={{ width: '35%', height:'auto' }} />
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '30px',
            }}>
                <Typography
                sx={{
                    fontSize: '150px',
                    fontWeight: 'bolder',
                    color: '#46B3B0'
                }}>Oops!</Typography>
                <Typography
                sx={{
                    fontSize: '50px',
                    width: '550px',
                    color: '#46B3B0'
                }}>The page you are looking for can't be found. </Typography>
            </Box>
        </Box>
    );
};

export default NotFoundPage;