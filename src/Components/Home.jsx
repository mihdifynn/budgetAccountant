import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


function Home(props) {

  const newBudget = () => {
    window.location.href = '/budgetAccountant/?page=NewBudget';
  }

  const budget = localStorage.getItem('budget');
  const used = localStorage.getItem('used');
  const usedToday = localStorage.getItem('usedToday');
  const dateObj = new Date();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const savedDay = localStorage.getItem('today');

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const remainingThisMonth = +budget - +used;
  const totalDaysInMonth = daysInMonth[month];
  const remainingDays = totalDaysInMonth - day;
  let budgetToday = localStorage.getItem('budgetToday');
  const totalPerDay = (remainingThisMonth - +budgetToday) / remainingDays;
  let remainingToday = localStorage.getItem('remainingToday');
  const budgetTomorrow = remainingThisMonth / remainingDays;

  const reset = ()=> {
    localStorage.setItem('today', day);
    localStorage.setItem('usedToday', 0);
    localStorage.setItem('remainingToday', totalPerDay);
    localStorage.setItem('budgetToday', remainingThisMonth / (remainingDays + 1));
    window.location.href = '/budgetAccountant/';
  }

  if (day !== +savedDay) {
    reset();
  }

  const [addUsedToday, setAddUsedToday] = useState('');

  const addUsed = ()=> {
    const newUsedToday = +usedToday + +addUsedToday;
    const newUsed = +used + +addUsedToday;
    localStorage.setItem('usedToday', newUsedToday);
    localStorage.setItem('used', newUsed);
    window.location.reload();
  }

  if (props.reset) reset();

  const round = num => {
    const number = Math.floor(num);
    let numStr = '';
    if (number > 999) {
      const numberString = number.toString();
      for (let i = 0; i < numberString.length; i++) {
        numStr += numberString[i];
        if ((i + 1) === (numberString.length - 3) || (i + 1) === (numberString.length - 6)) numStr += ',';
      }
    } else {
      return number;
    }
    return numStr;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ p: 2 }}>
          <Button onClick={newBudget} variant="contained">New Budget</Button>
        </Box>
        <Typography sx={{ p: 1 }} variant="subtitle1">
          Total This Month:<br />
          <b>Rp. {round(budget)}</b>
        </Typography>
        <Typography sx={{ p: 1 }} variant="subtitle1">
          Remaining This Month:<br />
          <b>Rp. {round(remainingThisMonth)}</b>
        </Typography>
        <Typography sx={{ p: 1 }} variant="subtitle1">
          Budget Tomorrow:<br />
          <b>Rp. {round(budgetTomorrow)}</b>
        </Typography>
        <Typography sx={{ p: 1 }} variant="subtitle1">
          Used Today:<br />
          <b>Rp. {round(usedToday)}</b>
        </Typography>
        <Typography sx={{ p: 1 }} variant="subtitle1">
          Remaining Today:<br />
          <b>Rp. {round(remainingToday-usedToday)}</b>
        </Typography>
        <Box sx={{ p: 1 }}>
          <TextField fullWidth type="number" value={addUsedToday} onChange={e => setAddUsedToday(e.target.value)} label="Add used today" />
        </Box>
        <Box sx={{ p: 1 }}>
          <Button onClick={addUsed} variant="contained">Add</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;