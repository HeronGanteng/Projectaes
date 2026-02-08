import { Button, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Projectaes
      </Typography>
      <Typography paragraph>
        Next.js with Material UI is set up and ready to go.
      </Typography>
      <Button variant="contained" color="primary">
        MUI Button
      </Button>
    </Container>
  );
}
