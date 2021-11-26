import React from "react";
import { Grid, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header({}) {
  return (
    <>
      <Container
        style={{
          backgroundColor: "#ecf0f1",
          marginTop: "30px",
          padding: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button>
                <strong>Simple Users App</strong>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <Button size="small" variant="contained">
                Users
              </Button>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link to="/users/create" style={{ textDecoration: "none" }}>
              <Button size="small" variant="outlined">
                Create
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
