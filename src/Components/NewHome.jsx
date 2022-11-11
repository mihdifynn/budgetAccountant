import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { useState, useEffect, useCallback } from 'react';


function Home() {
  // Main
  const [openNewMain, setOpenNewMain] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [usedAmount, setUsedAmount] = useState('');

  const handleNewMain = () => {
    localStorage.setItem('mainBudget', newAmount);
    localStorage.setItem('mainUsed', 0);
    localStorage.setItem('today', day);
    localStorage.setItem('usedToday', 0);
    localStorage.setItem('budgetToday', newAmount / (remainingDays + 1));
    setReRender(prev => !prev);
    setOpenNewMain(false);
  }

  const handleAdd = () => {
    localStorage.setItem('usedToday', +values.usedToday + +usedAmount);
    localStorage.setItem('mainUsed', +values.mainUsed + +usedAmount)
    setUsedAmount('');
    setReRender(prev => !prev)
  }

  // Extra
  const [openNewExtra, setOpenNewExtra] = useState(false);
  const [newExtraAmount, setNewExtraAmount] = useState('');
  const [usedExtra, setUsedExtra] = useState('');

  const handleNewExtra = () => {
    localStorage.setItem('extraBudget', newExtraAmount);
    localStorage.setItem('extraUsed', 0);
    setReRender(prev => !prev);
    setOpenNewExtra(false);
  }

  const handleAddExtra = () => {
    localStorage.setItem('extraUsed', +values.extraUsed + +usedExtra);
    setUsedExtra('');
    setReRender(prev => !prev);
  }

  // App
  const [values, setValues] = useState({
    mainBudget: 0,
    mainUsed: 0,
    usedToday: 0,
    // remainingToday: 0,
    budgetToday: 0,

    extraBudget: 0,
    extraUsed: 0
  }),
  [reRender, setReRender] = useState(false),
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  dateObj = new Date(),
  month = dateObj.getMonth(),
  day = dateObj.getDate()
  
  const myRound = num => {
    const number = Math.floor(num);
    let myString = '';
    if (number < 1000) return number

    const intStr = `${number}`;
    for (const i in intStr) {
      myString += intStr[+i];
      if ((intStr.length - (+i+1)) % 3 === 0 && (+i+1 !== intStr.length)) myString += ','
    }
    return myString
  }

  // Values
  const mainRemaining = +values.mainBudget - +values.mainUsed,
  remainingDays = daysInMonth[month] - day,
  budgetTomorrow = mainRemaining / remainingDays,
  remainingToday = values.budgetToday - values.usedToday

  const newDay = useCallback(() => {
    localStorage.setItem('today', day);
    localStorage.setItem('usedToday', 0);
    localStorage.setItem('budgetToday', +mainRemaining / (remainingDays + 1));
  }, [day, mainRemaining, remainingDays]);

  useEffect(() => {
    const mainBudget = localStorage.getItem('mainBudget'),
    mainUsed = localStorage.getItem('mainUsed'),
    usedToday = localStorage.getItem('usedToday'),
    budgetToday = localStorage.getItem('budgetToday'),
    today = localStorage.getItem('today');

    const extraBudget = localStorage.getItem('extraBudget');
    const extraUsed = localStorage.getItem('extraUsed');

    if (+today !== day) newDay();

    setValues({
      mainBudget: mainBudget || 0,
      mainUsed: mainUsed || 0,
      usedToday: usedToday || 0,
      // remainingToday: remainingToday || 0,
      budgetToday: budgetToday || 0,

      extraBudget: extraBudget || 0,
      extraUsed: extraUsed || 0
    })
  }, [reRender, day, newDay])

  // Styles
  const styles = {
    container: {
      display: 'flex'
    },
    boxes: {
      width: '50%',
      minHeight: '100vh',
      p: 2
    },
    title: {
      py: 2
    },
    block: {
      mt: 1
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={styles.container}
    >
      <Box sx={styles.boxes}>
        <Typography
          sx={styles.title}
          variant="h5"
        >
          Main
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenNewMain(true)}
        >
          New
        </Button>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Budget:<br />

          <b>Rp. {myRound(values.mainBudget)}</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Remaining:<br />

          <b>Rp. {myRound(mainRemaining)}</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Tomorrow:<br />

          <b>Rp. {myRound(budgetTomorrow)}</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Used:<br />

          <b>Rp. {myRound(values.usedToday)}</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Remaining Today:<br />

          <b>Rp. {myRound(remainingToday)}</b>
        </Typography>

        <Box>
          <TextField
            type="tel"
            margin="normal"
            label="Used"
            variant="standard"
            value={usedAmount}
            onChange={e => setUsedAmount(e.target.value)}
            InputProps={{
              endAdornment: usedAmount
              ? (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </InputAdornment>
              )
              : null
            }}
            fullWidth
          />
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
      />

      <Box sx={styles.boxes}>
        <Typography
          sx={styles.title}
          variant="h5"
        >
          Extra
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenNewExtra(true)}
        >
          New
        </Button>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Budget:<br />

          <b>Rp. {myRound(values.extraBudget)}</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Used:<br />

          <b>Rp. {myRound(values.extraUsed)}</b>
        </Typography>

        <Typography
          variant="subtitle1"
          sx={styles.block}
        >
          Remaining:<br />

          <b>Rp. {myRound(+values.extraBudget - +values.extraUsed)}</b>
        </Typography>

        <TextField
          type="tel"
          margin="normal"
          label="Used"
          variant="standard"
          value={usedExtra}
          onChange={e => setUsedExtra(e.target.value)}
          InputProps={{
            endAdornment: usedExtra
            ? (
              <InputAdornment position="end">
                <Button
                  size="small"
                  onClick={handleAddExtra}
                >
                  Add
                </Button>
              </InputAdornment>
            )
            : null
          }}
          fullWidth
        />
      </Box>

      <Dialog
        open={openNewMain}
        onClose={() => setOpenNewMain(false)}
      >
        <DialogTitle>
          New Main
        </DialogTitle>

        <DialogContent>
          <TextField
            variant="standard"
            placeholder="Amount"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  Rp.
                </InputAdornment>
              )
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenNewMain(false)}>
            Cancel
          </Button>

          <Button onClick={handleNewMain}>
            Set
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNewExtra}
        onClose={() => setOpenNewExtra(false)}
      >
        <DialogTitle>
          New Extra
        </DialogTitle>
        
        <DialogContent>
          <TextField
            variant="standard"
            placeholder="Amount"
            value={newExtraAmount}
            onChange={e => setNewExtraAmount(e.target.value)}
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  Rp.
                </InputAdornment>
              )
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenNewExtra(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleNewExtra}>
            Set
          </Button>
        </DialogActions>    
      </Dialog>
    </Container>
  )
}

export default Home;