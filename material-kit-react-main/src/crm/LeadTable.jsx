import axiosInstance from 'src/axios/Axios';
import React, { useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import { Table, TableHead,TableRow , TableBody, Checkbox ,TableCell } from '@mui/material';

import Popover from '@mui/material/Popover';
import Iconify from 'src/components/iconify/iconify';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';


function LeadTable() {
    const [leads, setLeads] = useState([]);

    const [deals,setDeals] = useState([])

    const [open, setOpen] = useState(null);

    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
      setOpenDrawer(!openDrawer);
    };

    const userId = localStorage.getItem('userId')

    const username = localStorage.getItem('username');

    //Show all details

    const fetchLeads = async () => {
        try {
          const response = await axiosInstance.get(`http://127.0.0.1:8000/leads/?user_id=${userId}`
          ,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
    
            },
          }
          );
          setLeads(response.data);
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      };
    
      useEffect(() => {
        fetchLeads();
      }, []);

    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
      setOpenDrawer(true);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };
    
    //delete function 

    const handleDelete = async(leadId) =>{
      try{

        await axiosInstance.delete(`http://127.0.0.1:8000/leads/${leadId}/`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
  
          },

        });
        setLeads((prevleads) => prevleads.filter((lead) => lead.id !== leadId));

      }catch(error){
        console.error('Error Fetching delete' , error)
      }

    }

    const convertToDeal = (leadData) => {
      setDeals([...deals, leadData]);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadData.id));
    };
 
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Checkbox/></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Next Activity</TableCell>
          <TableCell>labels </TableCell>
          <TableCell>Lead Created</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          
      {Array.isArray(leads) && leads.length > 0 ? (
          leads.map((lead) => (
                      <TableRow  key={lead.id}>
            <TableCell>
              <Checkbox  />
            </TableCell>
            <Link to={`/lead/edit/${lead.id}`}>
            <TableCell>{lead.title}</TableCell>
            </Link>
            <TableCell>No Activity</TableCell>
            <TableCell>{lead.labels}</TableCell>

            <TableCell >{lead.Expected_close_date}</TableCell>

            <TableCell>{username}</TableCell>
            <TableCell> <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          </TableCell>

          <Popover 
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => convertToDeal(lead)}>
          {/* <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit */}
          Convert To Deal
        </MenuItem>

        <MenuItem onClick={() => handleDelete(lead.id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

          
          </TableRow>

        
  ))
  ) : (
    <TableRow>
      <TableCell colSpan={6}>No leads available</TableCell>
    </TableRow>
  )}    
      </TableBody>
    </Table>
  );
}

export default LeadTable;
