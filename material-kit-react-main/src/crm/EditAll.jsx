import React, { useState } from 'react';
import EditLead from './EditLead';
import Activities from './Activities';
import Grid from '@mui/material/Grid';

function EditAll() {

 

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <EditLead />
        </Grid>
        <Grid item xs={6}>
          <Activities />
        </Grid>
      </Grid>

    
    </div>
  );
}

export default EditAll;
