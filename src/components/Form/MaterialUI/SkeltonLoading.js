import React from "react";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import FormWrapper from "../formErrors";

function SkeltonLoading() {
  return (
    <FormWrapper>
      <Grid container spacing={5}>
        <Grid item xs>
          <Typography key={"h3"} variant={"h3"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs>
          <Typography key={"h3"} variant={"h3"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={9}>
          <Typography key={"body1"} variant={"body1"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography key={"caption"} variant={"caption"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography key={"caption"} variant={"caption"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography key={"caption"} variant={"caption"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography key={"caption"} variant={"caption"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography key={"caption"} variant={"caption"}>
            <Skeleton variant={"rect"} animation={"wave"} />
          </Typography>
        </Grid>
      </Grid>
    </FormWrapper>
  );
}

export default SkeltonLoading;
