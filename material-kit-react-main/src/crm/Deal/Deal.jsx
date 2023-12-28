import React, { useState } from 'react';
import axiosInstance from 'src/axios/Axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import DealTable from './DealTable';
import PipelineStages from './PipelineStages';

function Deal() {
  const [open, setOpen] = useState(false);

  const userId = localStorage.getItem('userId')

  const username = localStorage.getItem('username');

  const [formData, setFormData] = useState({
    contact_person: '',
    organization: '',
    title:'',
    value: '',
    value_mode:'',
    pipeline:'',
    pipeline_status:[],
    labels: '',
    owner:'',
    Expected_close_date:'',
    phone: '',
    phone_mode:'',
    email: '',
    email_mode:''
  });

  const labelChoices = ['Hot', 'Warm', 'Cold']; 
  const valueChoices = ['Indian Rupee' ,'USD'];
  const Choices = ['Work' ,'Home']
  const pipelinechoice = ['pipeline']

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'organization') {
      setFormData({
        ...formData,
        [name]: value,
        title: `${value} deal`,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePipelineStagesChange = (selectedStages) => {
    setFormData({
      ...formData,
      pipeline_status: selectedStages, 
    });
  };

  const handleSubmit = async () => {
    try {
          axiosInstance.post(`http://127.0.0.1:8000/deals/`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    });
    handleClose();
  } catch (error) {
    console.error('Error adding lead:', error);
  }
};


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


 
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        + &nbsp; Deal
      </Button>
      <DealTable/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Deal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Left Side - Half Page */}
            <Grid item xs={6}>
              <TextField onChange={handleInputChange} value={formData.contact_person} name='contact_person' label="Contact Person" fullWidth style={{ marginBottom: '10px' }}/>
              <TextField onChange={handleInputChange} value={formData.organization} name='organization' label="Organization" fullWidth  />
              <TextField onChange={handleInputChange} value={formData.title} name='title' label="Title" fullWidth style={{ marginBottom: '10px' }}/>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField onChange={handleInputChange} value={formData.value} name='value' label="Value" fullWidth style={{ marginBottom: '10px' }}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField onChange={handleInputChange} value={formData.value_mode} name='value_mode' label="" fullWidth select>
                  {valueChoices.map((choice) => (
                  <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>
                ))}
                  </TextField>
                </Grid>
              </Grid>
              <TextField
                  onChange={handleInputChange}
                  value={formData.pipeline}
                  name='pipeline'
                  label="Pipeline"
                  fullWidth
                  select
                >
                  {pipelinechoice.map((choice) => (
                    <MenuItem key={choice} value={choice}>
                      {choice}
                    </MenuItem>
                  ))}
                </TextField>

              <PipelineStages onPipelineStagesChange={handlePipelineStagesChange}/>
              <TextField
                  onChange={handleInputChange}
                  value={formData.labels}
                  name='labels'
                  label="Labels"
                  fullWidth
                  select
                 
                >
                  {labelChoices.map((choice) => (
                    <MenuItem key={choice} value={choice}>
                      {choice}
                    </MenuItem>
                  ))}
                </TextField>
              <TextField  label="Owner"  onChange={handleInputChange}
                  value={formData.owner}
                  name='owner' fullWidth select>
                <MenuItem value={userId}>{username}</MenuItem>
              </TextField>
              <TextField onChange={handleInputChange} value={formData.Expected_close_date}  name='Expected_close_date' label="" fullWidth type="date" />
              {/* <TextField onChange={handleInputChange} label="visible to" fullWidth select>
                <MenuItem value="label1">Label 1</MenuItem>
                <MenuItem value="label2">Label 2</MenuItem>
              </TextField> */}
            </Grid>
            {/* Right Side - Half Page */}
            <Grid item xs={6}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField onChange={handleInputChange} value={formData.phone} name='phone' label="Phone" fullWidth style={{ marginBottom: '10px' }}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField onChange={handleInputChange} label="" value={formData.phone_mode} name='phone_mode' fullWidth select>
                  {Choices.map((choice) => (
                  <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>
                ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField onChange={handleInputChange} value={formData.email} name='email' label="Email" fullWidth style={{ marginBottom: '10px' }}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField onChange={handleInputChange} value={formData.email_mode} name='email_mode' label="" fullWidth select>
                  {Choices.map((choice) => (
                  <MenuItem  key={choice} value={choice}   onChange={handleInputChange}>
                    {choice}
                  </MenuItem>
                ))}
                  </TextField>
                </Grid>
              </Grid>
           </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

     
    </div>
  );
}
export default Deal;