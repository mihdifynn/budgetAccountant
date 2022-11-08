import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState, Fragment } from 'react';


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
  const [notes, setNotes] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const add1 = localStorage.getItem('add1');
  const add2 = localStorage.getItem('add2');
  const add3 = localStorage.getItem('add3');
  const notes1 = localStorage.getItem('notes1');
  const notes2 = localStorage.getItem('notes2');
  const notes3 = localStorage.getItem('notes3');

  const addUsed = ()=> {
    if (!addUsedToday) return;
    const newUsedToday = +usedToday + +addUsedToday;
    const newUsed = +used + +addUsedToday;
    localStorage.setItem('usedToday', newUsedToday);
    localStorage.setItem('used', newUsed);
    localStorage.setItem('add3', add2 ? add2 : '');
    localStorage.setItem('notes3', notes2 ? notes2 : '');
    localStorage.setItem('add2', add1 ? add1 : '');
    localStorage.setItem('notes2', notes1 ? notes1 : '');
    localStorage.setItem('add1', addUsedToday);
    localStorage.setItem('notes1', notes);
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

  const history = [
    add1 && [add1, notes1 ? notes1 : ''],
    add2 && [add2, notes2 ? notes2 : ''],
    add3 && [add3, notes3 ? notes3 : '']
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ py: 2, px: 1 }}>
          <Button
            onClick={newBudget}
            variant="contained"
          >
            New Budget
          </Button>
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

        <Box sx={{ px: 1, pt: 3, textAlign: 'right' }}>
          <Button
            sx={{ float: 'left' }}
            variant="outlined"
            onClick={() => setAddNew(true)}
          >
            Update
          </Button>

          <Button
            variant="outlined"
            onClick={() => setShowHistory(true)}
          >
            History
          </Button>
        </Box>
      </Container>

      <Dialog
        onClose={() => setAddNew(false)}
        open={addNew}>
        <DialogTitle>Update</DialogTitle>

        <DialogContent>
          <Box sx={{ p: 1 }}>
            <TextField
              fullWidth
              type="number"
              value={addUsedToday}
              onChange={e => setAddUsedToday(e.target.value)}
              label="Add used today"
            />
          </Box>

          <Box sx={{ p: 1 }}>
            <TextField fullWidth type="text" value={notes} onChange={e => setNotes(e.target.value)} label="Notes" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddNew(false)} variant="text">Cancel</Button>

          <Button onClick={addUsed} variant="text">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={() => setShowHistory(false)}
        open={showHistory}
      >
        <DialogTitle>Last Added</DialogTitle>

        <DialogContent>
          <Typography sx={{ ml: -4 }} variant="subtitle1">
            <ul>
              {history.map((item, i) => (
                <Fragment key={i}>
                {item
                  ? (
                    <li>
                      <b>Rp. {round(item[0])}</b><br />
                      <i>{item[1] && item[1]}</i>
                    </li>
                  )
                  : i === 0 && 'No history yet'}
                </Fragment>
                ))}
            </ul>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setShowHistory(false)}
            variant="text"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;