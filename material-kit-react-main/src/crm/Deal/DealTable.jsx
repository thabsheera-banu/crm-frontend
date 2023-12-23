
import axiosInstance from 'src/axios/Axios';
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify/iconify';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import { Link, useParams } from 'react-router-dom';


function DealTable() {
   

    const [leads, setLeads] = useState([]);

    const [open, setOpen] = useState(null);

    const userId = localStorage.getItem('userId')

    const username = localStorage.getItem('username');

    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };

    const fetchDeals = async () => {
        try {
          const response = await axiosInstance.get(`http://127.0.0.1:8000/deals/?user_id=${userId}`
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
        fetchDeals();
      }, []);

      const handleDelete = async(dealId) =>{
        try{
  
          await axiosInstance.delete(`http://127.0.0.1:8000/deals/${dealId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
    
            },
  
          });
          setLeads((prevleads) => prevleads.filter((deal) => deal.id !== dealId));
  
        }catch(error){
          console.error('Error Fetching delete' , error)
        }
  
      }

 
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Checkbox/></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Organization</TableCell>
          <TableCell>Contact Person</TableCell>
          <TableCell>Expected closing dste</TableCell>

          <TableCell>Next Activity</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>
         
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {Array.isArray(leads) && leads.length > 0 ? (
            leads.map((deal) =>(

         
          <TableRow key={deal.id} >
            <TableCell>
              <Checkbox  />
            </TableCell>
            <Link to={`/deal/titledesc/${deal.id}`}>
            <TableCell  >{deal.title}</TableCell>
            </Link>
            <TableCell>Rs :{deal.value} </TableCell>
            <TableCell> {deal.organization}</TableCell>
            <TableCell> {deal.contact_person}</TableCell>
            <TableCell> {deal.Expected_close_date}</TableCell>
            <TableCell>Activity</TableCell>
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
                    <MenuItem onClick={handleCloseMenu}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                    </MenuItem>

                    <MenuItem onClick={()=>handleDelete(deal.id)} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                    </MenuItem>
                </Popover>
          
          </TableRow>
   ))
   ) : (
    <TableCell colspan={6}>No Leads Available </TableCell>
   )}
     
      </TableBody>
    </Table>
  );
}

export default DealTable;
