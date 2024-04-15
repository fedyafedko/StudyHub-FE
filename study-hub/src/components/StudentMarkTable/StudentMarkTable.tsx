import React, { useEffect, useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, styled, tableCellClasses, TableContainer, Box, Button, tableHeadClasses, makeStyles, Typography } from "@mui/material";
import { MarksResponse } from '../../api/models/response/MarksResponse';
import Subject from '../../api/Subject';
import styles from './StudentMarkTable.module.css';

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

const StudentMarkTable = () => {
  const [semester, setSemester] = useState(1);
  const [marks, setMarks] = useState<MarksResponse[] | undefined>([]);
  const handleSemesterChange = (semester: number) => {
    setSemester(semester);
  };

  // const getRowsForSemester = () => {
  //   switch (semester) {
  //     case 1:
  //       return marks;
  //     default:
  //       return marks;
  //   }
  // };

  const maxAssignmentMarksCount = Math.max(
    ...(marks?.map(mark => mark.assignmentMarks.length ?? 0) ?? [])
  );

  const examHeaders = Array.from({ length: maxAssignmentMarksCount }, (_, index) => `Exam ${index + 1}`);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await Subject.getMarksForStudent();
        setMarks(response);
        console.log(response);
      } catch (error) {
        console.error(error);
        setMarks(undefined);
      }
    };

    fetchMarks();
  }, []);

  return (
    <>
      {Array.isArray(marks) && marks.length > 0 ? (
        <Box className={styles.tableBox}>
          <Box className={styles.buttonBox}>
            {[1, 2].map((sem) => (
              <Button
                key={sem}
                color='primary'
                variant='contained'
                sx={{ borderRadius: '24px', width: '150px', textTransform: 'none', backgroundColor: semester === sem ? '#B6165E' : undefined }}
                onClick={() => handleSemesterChange(sem)}
              >
                {sem === 1 ? `${sem}st Semester` : `${sem}nd Semester`}
              </Button>
            ))}
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: '24px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Subject</StyledTableCell>
                  {examHeaders.map((examHeader, index) => (
                    <StyledTableCell key={index} align="center">{examHeader}</StyledTableCell>
                  ))}
                  <StyledTableCell align="right">Final Grade</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marks.map((mark) => (
                  <TableRow key={mark.subject.title}>
                    <StyledTableCell component="th" scope="row">
                      {mark.subject.title}
                    </StyledTableCell>
                    {examHeaders.map((_, columnIndex) => (
                      <StyledTableCell key={columnIndex} align="center">
                        {mark.assignmentMarks[columnIndex]?.mark ?? "Not Available"}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="right">
                      <Box
                        className={styles.cellBox}
                        sx={{
                          backgroundColor: mark.subjectMark <= 60 ? '#DEDEDE' : mark.subjectMark >= 90 ? '#FF69AE' : '#F2CDDE',
                          fontWeight: 'bold',
                          borderRadius: '24px',
                          ml: 'auto',
                        }}>
                        {mark.subjectMark}
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant='h6' align='center'>No marks available</Typography>
      )}
    </>
  );
};

export default StudentMarkTable;
