import React, { useState } from 'react';

import { List,Tab,ListItem, Tabs,Box,  TextField,  Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import axiosInstance from 'src/axios/Axios';

function Activities() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [activityContent, setActivityContent] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`http://127.0.0.1:8000/leads/${id}/`, {
        [getActivityField(selectedTab)]: activityContent,
      });
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const getActivityField = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return 'notes';
      case 1:
        return 'activity';
      case 2:
        return 'call';
      default:
        return '';
    }
  };

  const renderTabContent = () => {
    return (
      <div>
        <TextField
          label={getActivityField(selectedTab).charAt(0).toUpperCase() + getActivityField(selectedTab).slice(1)}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ backgroundColor: '#FFC0CB' }}
          value={activityContent}
          onChange={(e) => setActivityContent(e.target.value)}
        />
        <Box mt={2} display="flex">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Box ml={2}>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  return (
    <>
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Notes" />
        <Tab label="Activity" />
        <Tab label="Call" />
      </Tabs>
      <Box mt={2}>{renderTabContent()}</Box>
    </div>

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem></ListItem>
      <ListItem></ListItem>


    </List>

   
    </>

  );
}

export default Activities;
