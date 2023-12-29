import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axiosInstance from 'src/axios/Axios';

function Pipeline({ pipelineStages, dealStatus, dealId }) {
    const buttonStyle = { marginRight: '10px' };
  
      
  
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex', marginTop: '20px', paddingRight: '20px' }}>
          {pipelineStages.map((stage, index) => (
            <Button
              key={index}
              name='pipeline_status'
              variant="contained"
              style={{
                ...buttonStyle,
                height: '30px',
                width: '250px',
                backgroundColor:
                  (dealStatus.won && stage.selected) ? 'green' :
                  (dealStatus.lost && stage.selected) ? 'red' :
                  stage.selected ? 'green' : 'gray',
              }}
              onClick={() => updatePipelineStatus(stage.id)}
            >
              {stage.title}
            </Button>
          ))}
        </div>
      </div>
    );
  }
  
  export default Pipeline;
  