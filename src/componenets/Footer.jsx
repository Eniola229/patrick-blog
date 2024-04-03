import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background:"linear-gradient(90deg, rgba(180, 0, 14, 1) 0%, rgba(103, 0, 2, 1) 50%, rgba(103, 0, 18, 1) 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={10} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
             NomadicNarratives
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Lagos Nigeria
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Email: info@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Phone: +234 000 000 0000
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="https://www.facebook.com/" sx={{ color: "white" }}>
                <Facebook />
              </Link>
              <Link href="https://www.instagram.com/" sx={{ ml: 1, color: "white" }}>
                <Instagram />
              </Link>
              <Link href="https://www.twitter.com/" sx={{ ml: 1, color: "white" }}>
                <Twitter />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center" sx={{ color: "white" }}>
            {"Copyright © "}
            <Link color="inherit" href="/">
             NomadicNarratives
            </Link> {" "}
            {new Date().getFullYear()}
            {"."}
             <Link color="inherit" href="/">
             | Developed By AfricTech
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
