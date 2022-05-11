import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './Components/Home.jsx';
import NewBudget from './Components/NewBudget.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';


function Content() {

  const requestArgs = new URLSearchParams(window.location.search);
  const page = requestArgs.get('page');
  const reset = requestArgs.get('reset');

  if (!page) {
    return (
      <Home reset={ reset ? true : false } />
    );
  }
  else if (page === 'NewBudget') {
    return (
      <NewBudget />
    );
  }
}


function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <Content />
      </Box>
    </ThemeProvider>
  );
}

export default App;