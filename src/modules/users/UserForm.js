import {
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";

export const UserForm = ({
  user,
  formFieldErrors,
  handleSubmit,
  handleChangeUserData,
  formError,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {formError && (
          <Grid item xs={12}>
            <Alert severity="error">{formError?.response?.data?.error}</Alert>
          </Grid>
        )}

        <Grid item xs={6} md={1}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user?.title}
              label="Title"
              onChange={(e) => handleChangeUserData(e, "title")}
              value={user?.title ? user?.title : ""}
            >
              <MenuItem value={"mr"}>Mr</MenuItem>
              <MenuItem value={"ms"}>Ms</MenuItem>
              <MenuItem value={"mrs"}>Mrs</MenuItem>
              <MenuItem value={"miss"}>Miss</MenuItem>
              <MenuItem value={"dr"}>Dr</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={11}></Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="First name"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.firstName ? user?.firstName : ""}
            onChange={(e) => handleChangeUserData(e, "firstName")}
            error={formFieldErrors?.firstName}
            helperText={formFieldErrors?.firstName}
          ></TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Last name"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.lastName ? user?.lastName : ""}
            onChange={(e) => handleChangeUserData(e, "lastName")}
            error={formFieldErrors?.lastName}
            helperText={formFieldErrors?.lastName}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.email ? user?.email : ""}
            onChange={(e) => handleChangeUserData(e, "email")}
            error={formFieldErrors?.email}
            helperText={formFieldErrors?.email}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Date of Birth"
            type="date"
            size="small"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeUserData(e, "dateOfBirth")}
            error={formFieldErrors?.dateOfBirth}
            helperText={formFieldErrors?.dateOfBirth}
            //value={user?.dateOfBirth ? user?.dateOfBirth : ""}
            value={user?.dateOfBirth}
          ></TextField>
        </Grid>

        <Grid item xs={6} md={1}>
          <TextField
            label="Phone number"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.phone ? user?.phone : ""}
            onChange={(e) => {
              if (!e.target.value.includes("-"))
                handleChangeUserData(e, "phone");
            }}
            error={formFieldErrors?.phone}
            helperText={formFieldErrors?.phone}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              onChange={(e) => handleChangeUserData(e, "gender")}
              error={formFieldErrors?.gender}
              value={user?.gender ? user?.gender : null}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormHelperText>{formFieldErrors?.gender}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
