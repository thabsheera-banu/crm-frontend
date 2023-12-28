import axiosInstance from 'src/axios/Axios';
import React, { useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import { Table, TableHead,TableRow , TableBody, Checkbox ,TableCell } from '@mui/material';

import Popover from '@mui/material/Popover';
import Iconify from 'src/components/iconify/iconify';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Swal from 'sweetalert2';


function LeadTable() {
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [leads, setLeads] = useState([]);


    const [openPopovers, setOpenPopovers] = useState({});

    const handleOpenMenu = (event, leadId) => {
      setOpenPopovers({ ...openPopovers, [leadId]: event.currentTarget });
    };

    const handleCloseMenu = (leadId) => {
      setOpenPopovers({ ...openPopovers, [leadId]: null });
    };



    

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, leads.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);

    };

    const displayedLeads = leads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
    
     

   
//delete function 

    const handleDelete = async(leadId) =>{
      try{

        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {


        await axiosInstance.delete(`http://127.0.0.1:8000/leads/${leadId}/`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
  
          },

        });
        setLeads((prevleads) => prevleads.filter((lead) => lead.id !== leadId));
      }
      }catch(error){
        console.error('Error Fetching delete' , error)
        Swal.fire('Error', 'Failed to delete the item.', 'error');
      }

    }


// changes the label colors

    const getLabelColor = (label) => {
      switch (label) {
        case 'Hot':
          return { backgroundColor: 'red', textColor: 'white' };
        case 'Warm':
          return { backgroundColor: 'blue', textColor: 'white' };
        case 'Cold':
          return { backgroundColor: 'yellow', textColor: 'black' };
        default:
          return ''; 
      }
    };

//convert lead to deal

    const handleConvertToDeal = async (leadId) => {
      try {
        const leadToConvert = leads.find(lead => lead.id === leadId);
    
        await axiosInstance.post(
          'http://127.0.0.1:8000/deals/', 
          {
            contact_person :leadToConvert.contact_person,
            title: leadToConvert.title,
            organization : leadToConvert.organization,
            owner : leadToConvert.owner,
            Expected_close_date : leadToConvert.Expected_close_date,
            value : leadToConvert.value,
            value_mode : leadToConvert.value_mode,
            phone : leadToConvert.phone,
            phone_mode: leadToConvert.phone_mode,
            email:leadToConvert.email,
            email_mode:leadToConvert.email_mode,

          },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
          }
        );

        await axiosInstance.delete(
          `http://127.0.0.1:8000/leads/${leadId}/`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
          }
        );
    
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
      } 
    
      catch (error) {
        console.error('Error converting lead to deal:', error);
      }
    };

// fetch all leads

    useEffect(() => {
      fetchLeads();
    }, []);
  
  return (
    <>
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
          
      {Array.isArray(displayedLeads) && leads.length > 0 ? (
          displayedLeads.map((lead) => (
                      <TableRow  key={lead.id}>
            <TableCell>
              <Checkbox  />
            </TableCell>
            <TableCell>
            <Link to={`/lead/edit/${lead.id}`}  style={{ textDecoration: 'none' ,color:'black'}}>
              {lead.title}
              </Link>
              </TableCell>
            <TableCell>
              <Link to={`/lead/edit/${lead.id}`} style={{ textDecoration: 'none' ,color:'black'}}>
             No Activity        
             </Link>
              </TableCell>
            <TableCell>
            <Link to={`/lead/edit/${lead.id}`}  style={{ textDecoration: 'none',color:'black' }}>
            <span
                  style={{
                    backgroundColor: getLabelColor(lead.labels).backgroundColor,
                    color: getLabelColor(lead.labels).textColor,
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}
                >
                  {lead.labels}
                </span>         
                  </Link>
              </TableCell>
              
            <TableCell >
            <Link to={`/lead/edit/${lead.id}`}  style={{ textDecoration: 'none',color:'black' }}>
              {lead.Expected_close_date}
              </Link>
              </TableCell>

            <TableCell>
              {username}
              </TableCell>
            <TableCell> 
              <IconButton onClick={(event) => handleOpenMenu(event, lead.id)}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          </TableCell>

          <Popover 
       open={!!openPopovers[lead.id]}
       anchorEl={openPopovers[lead.id]}
       onClose={() => handleCloseMenu(lead.id)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleConvertToDeal(lead.id)}>
     
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

    <TablePagination
          page={page}
          component="div"
          count={leads.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
  );
}

export default LeadTable;
