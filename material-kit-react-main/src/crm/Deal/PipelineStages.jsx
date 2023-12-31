import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    fontSize: '0.8rem',
    color: 'transparent',
    '&:hover': {
      color: 'white',
    },
    backgroundColor: 'gray',
    '&:hover': {
      backgroundColor: 'darkgray',
    },
    height: '25px',
    minWidth: '40px',
  },
  selectedButton: {
    backgroundColor: 'green',
    '&:hover': {
      backgroundColor: 'darkgreen',
    },
  },
});

const handlePipelineStagesChange = (selectedStages) => {
  setFormData({
    ...formData,
    pipeline_status: selectedStages, 
  });
};


const PipelineStages = ({ onPipelineStagesChange  }) => {
  const classes = useStyles();
  const [selectedStages, setSelectedStages] = useState([]); 
  const stages = [
    { id: '1', label: 'Qualified' },
    { id: '2', label: 'Contact Made' },
    { id: '3', label: 'Demo Scheduled' },
    { id: '4', label: 'Proposal Made' },
    { id: '5', label: 'Negotiations Started' },
  ];

  const handleButtonClick = (stageId) => {
    setSelectedStages((prevSelectedStages) => {
      const isStageSelected = prevSelectedStages.includes(stageId);
      const updatedStages = isStageSelected
        ? prevSelectedStages.filter((id) => id !== stageId)
        : [...prevSelectedStages, stageId];

      onPipelineStagesChange(updatedStages); 
      return updatedStages;
    });
  };

  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
      {stages.map((stage) => (
        <Tooltip title={stage.label} key={stage.id}>
          <Button
            variant="outlined"
            className={`${classes.button} ${
              selectedStages.includes(stage.id) ? classes.selectedButton : ''
            }`}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'transparent')}
            onClick={() => handleButtonClick(stage.id)}
          >
            {stage.label}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default PipelineStages;
