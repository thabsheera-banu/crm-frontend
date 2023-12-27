import React from 'react'
import EditDeal from './EditDeal'
import EditActivity from './EditActivity'
import Grid from '@mui/material/Grid';


function EditAllDeal() {
  return (
<div>
      <Grid container spacing={2}>
        <Grid item xs={6} >
            <EditDeal/>
        </Grid>
        <Grid item xs={6}>
            <EditActivity/>
        </Grid>
      </Grid>

    
    </div> 
     )
}

export default EditAllDeal