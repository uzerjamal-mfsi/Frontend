import React from 'react';
import { TableCell, TextField, IconButton, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ExerciseRow({
  row,
  index,
  exercises,
  exerciseRowTextFields,
  updateCol,
  deleteRow,
  disableDelete,
}) {
  return (
    <>
      <TableCell>
        <Autocomplete
          options={exercises.map((exercise) => `${exercise.name} (${exercise.muscleGroup})`)}
          size="small"
          sx={{ minWidth: 250 }}
          value={row.exercise || ''}
          onChange={(_, newValue) => updateCol(index, 'exercise', newValue)}
          renderInput={(params) => <TextField {...params} label="Exercise" />}
        />
      </TableCell>
      {exerciseRowTextFields.map(({ field }) => (
        <TableCell key={field}>
          <TextField
            type="number"
            value={row[field] || ''}
            size="small"
            onChange={(e) => updateCol(index, field, e.target.value)}
          />
        </TableCell>
      ))}
      <TableCell>
        <IconButton disabled={disableDelete} onClick={() => deleteRow(index)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </>
  );
}

export default ExerciseRow;
