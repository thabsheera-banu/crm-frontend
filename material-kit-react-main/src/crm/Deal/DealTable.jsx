import React, { useState, useEffect } from 'react';

import axiosInstance from 'src/axios/Axios';

import IconButton from '@mui/material/IconButton';

import { Table, TableHead, TableRow,TableBody, Checkbox , TableCell } from '@mui/material';

import Popover from '@mui/material/Popover';
import Iconify from 'src/components/iconify/iconify';

import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';

import Swal from 'sweetalert2';



function DealTable() {

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [leads, setLeads] = useState([]);


    const userId = localStorage.getItem('userId')

    const username = localStorage.getItem('username');

    const [openPopovers,setOpenPopovers] = useState({});

    const handleOpenMenu = (event, dealId) =>{
      setOpenPopovers({...openPopovers,[dealId]:event.currentTarget });
    };

    const handleCloseMenu = (dealId) =>{
      setOpenPopovers({...openPopovers,  [dealId]: null });
    }


    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);

    };

    const displayedLeads = leads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  

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

        await axiosInstance.delete(`http://127.0.0.1:8000/deals/${dealId}/`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
  
          },

        });
        setLeads((prevleads) => prevleads.filter((lead) => lead.id !== dealId));
      }
      }catch(error){
        console.error('Error Fetching delete' , error)
        Swal.fire('Error', 'Failed to delete the item.', 'error');
      }

    }
    
      
 
  return (
    <>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Checkbox/></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Organization</TableCell>
          <TableCell>Contact Person</TableCell>
          <TableCell>Expected closing date</TableCell>

          <TableCell>Next Activity</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>
         
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {Array.isArray(displayedLeads) && leads.length > 0 ? (
            displayedLeads.map((deal) =>(

         
          <TableRow key={deal.id} >
            <TableCell>
              <Checkbox  />
            </TableCell>
            
            <TableCell>
            <Link to={`/deal/titledesc/${deal.id}`} style={{ textDecoration: 'none' ,color:'black' }}>
              {deal.title}
              </Link>
              </TableCell>
            <TableCell>
            <Link to={`/deal/titledesc/${deal.id}`} style={{ textDecoration: 'none' ,color:'black' }}>
              Rs :{deal.value}
              </Link>
               </TableCell>
            <TableCell>
            <Link to={`/deal/titledesc/${deal.id}`} style={{ textDecoration: 'none'  ,color:'black'}}>
               {deal.organization}
               </Link>
               </TableCell>
            <TableCell> 
            <Link to={`/deal/titledesc/${deal.id}`} style={{ textDecoration: 'none',color:'black' }}>
              {deal.contact_person}
              </Link>
              </TableCell>
            <TableCell>
            <Link to={`/deal/titledesc/${deal.id}`} style={{ textDecoration: 'none',color:'black' }}>
               {deal.Expected_close_date}
               </Link>
               </TableCell>
            <TableCell>
            <Link to={`/deal/titledesc/${deal.id}`} style={{ textDecoration: 'none',color:'black' }}>
              Activity
              </Link>
              </TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>
            <IconButton onClick={(event) => handleOpenMenu(event, deal.id)}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          </TableCell>
                    <Popover
                    open={!!openPopovers[deal.id]}
                    anchorEl={openPopovers[deal.id]}
                    onClose={() => handleCloseMenu(deal.id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                    sx: { width: 140 },
                    }}
                >
                   
                    <MenuItem onClick={() => handleDelete(deal.id)}  sx={{ color: 'error.main' }}>
                    <Iconify  icon="eva:trash-2-outline" sx={{ mr: 2 }} />
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

export default DealTable;
