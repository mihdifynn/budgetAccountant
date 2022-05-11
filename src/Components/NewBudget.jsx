import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


function NewBudget() {

  const [budget, setBudget] = useState('');

  const done = ()=> {
    localStorage.setItem('budget', budget);
    localStorage.setItem('used', 0);
    window.location.href = '/budgetAccountant/?reset=true';
  }

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="md">
        <Typography sx={{ textAlign: 'center', p: 2 }} variant="h5">
          <b>New Budget</b>
        </Typography>
        <Box sx={{ p: 2 }}>
          <TextField onChange={e => setBudget(e.target.value)} value={budget} type="number" fullWidth label="Budget this month" />
        </Box>
        <Box sx={{ p: 2 }}>
          <Button onClick={done} fullWidth variant="contained">Done</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NewBudget;