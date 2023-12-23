import React, { useState } from 'react';
import { Tabs, Tab, TextField, Typography, Box, Button } from '@mui/material';

function Activities() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSave = () => {
    console.log('Notes saved!');
  };

  const handleCancel = () => {
    console.log('Edits canceled!');
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <div>
            <TextField
              label="Notes"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box mt={2} display="flex" >
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Box ml={2}>
                <Button variant="contained" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </div>
        );
      case 1:
        return (
          <TextField
            label="Activity"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        );
      case 2:
        return (
          <TextField
            label="Call"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Notes" />
        <Tab label="Activity" />
        <Tab label="Call" />
      </Tabs>
      <Box mt={2}>
        {renderTabContent()}
      </Box>
    </div>
  );
}

export default Activities;
