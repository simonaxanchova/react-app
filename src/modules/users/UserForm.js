import {
  Alert,
  FormControl,
  FormControlLabel,
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

        <Grid item xs={1}>
          <div>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user?.title}
                label="Title"
                onChange={(e) => handleChangeUserData(e, "title")}
                value={user?.title ? user?.title : null}
              >
                <MenuItem value={"mr"}>Mr</MenuItem>
                <MenuItem value={"ms"}>Ms</MenuItem>
                <MenuItem value={"mrs"}>Mrs</MenuItem>
                <MenuItem value={"miss"}>Miss</MenuItem>
                <MenuItem value={"dr"}>Dr</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={11}></Grid>

        <Grid item xs={6}>
          <TextField
            label="First name"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.firstName ? user?.firstName : ""}
            onChange={(e) => handleChangeUserData(e, "firstName")}
            error={formError?.response?.data?.data?.firstName}
            helperText={formError?.response?.data?.data?.firstName}
          ></TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Last name"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.lastName ? user?.lastName : ""}
            onChange={(e) => handleChangeUserData(e, "lastName")}
            error={formError?.response?.data?.data?.lastName}
            helperText={formError?.response?.data?.data?.lastName}
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
            error={formError?.response?.data?.data?.email}
            helperText={formError?.response?.data?.data?.email}
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
            error={formError?.response?.data?.data?.dateOfBirth}
            helperText={formError?.response?.data?.data?.dateOfBirth}
            value={user?.dateOfBirth ? user?.dateOfBirth : ""}
          ></TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Phone number"
            size="small"
            variant="outlined"
            fullWidth
            value={user?.phone ? user?.phone : ""}
            onChange={(e) => handleChangeUserData(e, "phone")}
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
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
