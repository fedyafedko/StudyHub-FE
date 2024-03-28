import { Box } from "@mui/material";

const Field = (props: { label: string, content: string}) => {
  return (
    props.content !== '' ? (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ fontSize: '12px', color: '#858585'}}>{props.label}</Box>
        <Box sx={{ fontSize: '15px', fontWeight: 'bold' }}>{props.content}</Box>
        <Box sx={{ borderBottom: '1px solid #858585', width: '100%' }} />
      </Box>
    ) : null
  );
}

export default Field;
