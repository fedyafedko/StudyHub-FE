import React, { useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, styled, tableCellClasses, TableContainer, Box, Button, tableHeadClasses, makeStyles } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D9D9D9',
    color: '#000000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: '#f0f0f0'
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const rows2 = [
  createData('Froze5n yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const rows3 = [
  createData('Froz1en yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const rows4 = [
  createData('Frodadzen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const MarkTable = () => {
  const [semester, setSemester] = useState(1); // State to track active semester
  const handleSemesterChange = (semester: number) => {
    setSemester(semester);
  };

  const getRowsForSemester = () => {
    switch (semester) {
      case 1:
        return rows;
      case 2:
        return rows2;
      case 3:
        return rows3;
      case 4:
        return rows4;
      default:
        return rows;
    }
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      gap: '20px',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        gap: '10px',
      }}>
        {[1, 2, 3, 4].map((sem) => (
          <Button
            key={sem}
            color='primary'
            variant='contained'
            sx={{
              borderRadius: '24px',
              width: '150px',
              textTransform: 'none',
              backgroundColor: semester === sem ? '#B6165E' : null,
            }}
            onClick={() => handleSemesterChange(sem)}
          >
            {sem}st Semester
          </Button>
        ))}
      </Box>

      <TableContainer component={Paper} sx={{
        borderRadius: '24px',
      }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Course</StyledTableCell>
              <StyledTableCell align="center">Exam 1</StyledTableCell>
              <StyledTableCell align="center">Exam 2</StyledTableCell>
              <StyledTableCell align="center">Exam 3</StyledTableCell>
              <StyledTableCell align="right">Final Grade</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRowsForSemester().map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarkTable;
