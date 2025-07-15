import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExerciseRow from './ExerciseRow';

function ExerciseTable({ exerciseRows, exercises, exerciseRowTextFields, updateCol, deleteRow }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Exercise</TableCell>
          <TableCell>Sets</TableCell>
          <TableCell>Reps</TableCell>
          <TableCell>Weight</TableCell>
          <TableCell>Calories Burned</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {exerciseRows.map((row, index) => (
          <TableRow key={index}>
            <ExerciseRow
              row={row}
              index={index}
              exercises={exercises}
              exerciseRowTextFields={exerciseRowTextFields}
              updateCol={updateCol}
              deleteRow={deleteRow}
              disableDelete={exerciseRows.length <= 1}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExerciseTable;
