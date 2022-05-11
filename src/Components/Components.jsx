import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';


export function Header() {

  return (
    <Box>
      <AppBar color="primary" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexBox: 1, display: { xs: 'flex', md: 'none' } }}>
              NOn
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}