import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

export default function AppHeader() {
  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AccountBalance sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            Personal Expense Tracker
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
