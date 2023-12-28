import React, { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';

import { TextField, Button, IconButton } from '@mui/material';

import axiosInstance from 'src/axios/Axios';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';

function EditDeal() {
  const [leadData, setLeadData] = useState({});

  const [editingField, setEditingField] = useState(null);

  const { id } = useParams();

  const handleSweetAlert = () => {
    Swal.fire({
      title: 'Congratulations!',
      text: 'updated successfully',
      icon: 'success',
      confirmButtonText: 'Great!',
    });
  };



  const handleFieldChange = (fieldName, value) => {
    setLeadData({ ...leadData, [fieldName]: value });
  };

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleSaveField = () => {
    const dataToUpdate = {  
      value: leadData.value,
      Expected_close_date : leadData.Expected_close_date,
      contact_person : leadData.contact_person,
      email : leadData.email,
      phone : leadData.phone,
      organization : leadData.organization
     };
    axiosInstance.put(`http://127.0.0.1:8000/deals/${id}/`, dataToUpdate) 
      .then(response => {
        console.log(`Field ${editingField} updated:`, response.data);
        setEditingField(null);
        handleSweetAlert()

      
      })
      .catch(error => {
        console.error(`Error updating field :`, error);
      });
  };

  return (
    <div>
      <h3> details</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField label="value" variant="outlined" sx={{ width: '350px' ,mr: '10px' }} 
         value={editingField === 'value' ? leadData.value || '' : leadData.value || ''}
         onChange={(e) => handleFieldChange('value', e.target.value)}
         />
       {editingField !== 'value' && (
        <IconButton aria-label="edit" onClick={() => handleEditField('value')}>
          <EditIcon />
        </IconButton>
      )}
      {editingField === 'value' && (
        <Button onClick={handleSaveField}>Save</Button>
      )}

      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField type='date' label="" variant="outlined" sx={{ width: '350px' ,mr: '10px' }} 
         value={editingField === 'Expected_close_date' ? leadData.Expected_close_date || '' : leadData.Expected_close_date || ''}
         onChange={(e) => handleFieldChange('Expected_close_date', e.target.value)}
         />
       {editingField !== 'Expected_close_date' && (
        <IconButton aria-label="edit" onClick={() => handleEditField('Expected_close_date')}>
          <EditIcon />
        </IconButton>
      )}
      {editingField === 'Expected_close_date' && (
        <Button onClick={handleSaveField}>Save</Button>
      )}

      </div>

      <h3>Person</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField  label="contact_person" variant="outlined" sx={{ width: '350px' ,mr: '10px' }} 
         value={editingField === 'contact_person' ? leadData.contact_person || '' : leadData.contact_person || ''}
         onChange={(e) => handleFieldChange('contact_person', e.target.value)}
         />
       {editingField !== 'contact_person' && (
        <IconButton aria-label="edit" onClick={() => handleEditField('contact_person')}>
          <EditIcon />
        </IconButton>
      )}
      {editingField === 'contact_person' && (
        <Button onClick={handleSaveField}>Save</Button>
      )}
      </div>

       <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField type='Email' label="Email" variant="outlined" sx={{ width: '350px' ,mr: '10px' }} 
         value={editingField === 'email' ? leadData.email || '' : leadData.email || ''}
         onChange={(e) => handleFieldChange('email', e.target.value)}
         />
       {editingField !== 'email' && (
        <IconButton aria-label="edit" onClick={() => handleEditField('email')}>
          <EditIcon />
        </IconButton>
      )}
      {editingField === 'email' && (
        <Button onClick={handleSaveField}>Save</Button>
      )}

      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField  label="Phone" variant="outlined" sx={{ width: '350px' ,mr: '10px' }} 
         value={editingField === 'phone' ? leadData.phone || '' : leadData.phone || ''}
         onChange={(e) => handleFieldChange('phone', e.target.value)}
         />
       {editingField !== 'phone' && (
        <IconButton aria-label="edit" onClick={() => handleEditField('phone')}>
          <EditIcon />
        </IconButton>
      )}
      {editingField === 'phone' && (
        <Button onClick={handleSaveField}>Save</Button>
      )}

      </div>
      <h3>Organization</h3>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField  label="organization" variant="outlined" sx={{ width: '350px' ,mr: '10px' }} 
         value={editingField === 'organization' ? leadData.organization || '' : leadData.organization || ''}
         onChange={(e) => handleFieldChange('organization', e.target.value)}
         />
       {editingField !== 'organization' && (
        <IconButton aria-label="edit" onClick={() => handleEditField('organization')}>
          <EditIcon />
        </IconButton>
      )}
      {editingField === 'organization' && (
        <Button onClick={handleSaveField}>Save</Button>
      )}

      </div>
    </div>
  );
}

export default EditDeal;
