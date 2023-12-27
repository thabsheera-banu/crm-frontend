import axiosInstance from 'src/axios/Axios';
import React, { useEffect, useState } from 'react';
import { Button, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditAllDeal from './EditAllDeal';
import Pipeline from './Pipeline';

function TitleDescription() {
  const { id } = useParams();

  const buttonStyle = { marginRight: '10px' };

  const [dealStatus, setDealStatus] = useState({});

  const [pipelineStages, setPipelineStages] = useState([]); 
  const [selectedStages, setSelectedStages] = useState([]); 

  const handleSweetAlert = () => {
    Swal.fire({
      title: 'Congratulations!',
      text: 'Deal status updated to "Won"',
      icon: 'success',
      confirmButtonText: 'Great!',
    });
  };

        useEffect(() => {
          const storedStatus = JSON.parse(localStorage.getItem(`dealStatus_${id}`));
          if (storedStatus) {
            setDealStatus(storedStatus);
          } else {
            axiosInstance.get(`http://127.0.0.1:8000/deals/${id}/`)
              .then(response => {
                setDealStatus(response.data);
                localStorage.setItem(`dealStatus_${id}`, JSON.stringify(response.data));
              })
              .catch(error => {
                console.error('Error fetching deal status:', error);
              });
          }
        }, [id]);

        const handleReopenClick = () => {
          setDealStatus({ won: false, lost: false });
        };

        const updateDealStatus = (status) => {
          if (status === 'Won') {
            setDealStatus({ won: true, lost: false });
          } else if (status === 'Lost') {
            setDealStatus({ won: false, lost: true });
          }
          axiosInstance.patch(`http://127.0.0.1:8000/deals/${id}/`, { won: status === 'Won', lost: status === 'Lost' })
            .then(response => {
              setDealStatus(response.data);
              localStorage.setItem(`dealStatus_${id}`, JSON.stringify(response.data));
            })
            .catch(error => {
              console.error('Error updating deal status:', error);
            });
        };

        useEffect(() => {
          axiosInstance.get(`http://127.0.0.1:8000/deal/pipeline/${id}/`)
              .then(response => {
                  setDealStatus(response.data.deal);
                  setPipelineStages(response.data.pipeline_status);
                  setSelectedStages(response.data.deal.pipeline_status);
                  localStorage.setItem(`dealStatus_${id}`, JSON.stringify(response.data.deal));
              })
              .catch(error => {
                  console.error('Error fetching deal status:', error);
              });
      }, [id]);

 
  return (
    <>
       
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', paddingRight: '20px' }}>
        {dealStatus.won && !dealStatus.lost && (
          <>
            <Button
              variant="contained"
              style={{ backgroundColor: 'green', ...buttonStyle }}
              onClick={() => {updateDealStatus('Won')

              handleSweetAlert();}

            }
              
            >
              Won
            </Button>
            <Button
              variant="contained"
              style={{
                ...buttonStyle,
                border: '1px solid rgba(0, 0, 0, 0.23)',
                backgroundColor: 'transparent',
                color: 'black',
              }}
              onClick={handleReopenClick}            >
              Reopen
            </Button>
          </>
        )}

        {!dealStatus.won && dealStatus.lost && (
          <>
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', ...buttonStyle }}
              onClick={() => updateDealStatus('Lost')}
            >
              Lost
            </Button>
            <Button
              variant="contained"
              style={{
                ...buttonStyle,
                border: '1px solid rgba(0, 0, 0, 0.23)',
                backgroundColor: 'transparent',
                color: 'black',
              }}
              onClick={handleReopenClick}>
              Reopen
            </Button>
          </>
        )}

        {!dealStatus.won && !dealStatus.lost && (
          <>
            <Button
              variant="contained"
              style={{ backgroundColor: 'green', ...buttonStyle }}
              onClick={() => {updateDealStatus('Won')
              handleSweetAlert();

              }}
            >
              Won
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', ...buttonStyle }}
              onClick={() => updateDealStatus('Lost')}
            >
              Lost
            </Button>
            
          </>
        )}
        <Avatar alt="Avatar" src="/path/to/avatar.jpg" />
      </div>
      {/* pipeline stages */}

      <Pipeline  pipelineStages={pipelineStages} selectedStages={selectedStages}/>
      
      <div style={{marginTop:'100px'}}>
        <EditAllDeal/>
      </div>
    </>
  );
} 

export default TitleDescription;
