
import React from 'react';
import { Button } from '@mui/material';

function Pipeline({ pipelineStages }) {
    const buttonStyle = { marginRight: '10px' };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex', marginTop: '20px', paddingRight: '20px' }}>
                {pipelineStages.map((stage, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        style={{
                            ...buttonStyle,
                            height: '30px',
                            width: '250px',
                            backgroundColor: stage.selected ? 'green' : 'gray'
                        }}
                    >
                        {stage.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Pipeline;
