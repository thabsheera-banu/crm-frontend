
import axiosInstance from 'src/axios/Axios';
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify/iconify';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import { Link, useParams } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';



function DealTable() {

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [leads, setLeads] = useState([]);

    const [open, setOpen] = useState(null);

    const userId = localStorage.getItem('userId')

    const username = localStorage.getItem('username');

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, leads.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);

    };

    const displayedLeads = leads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  

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


      const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`http://127.0.0.1:8000/deals/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                },
            });
            setLeads(leads.filter((deal) => deal.id !== id));
        } catch (error) {
            console.error('Error deleting deal:', error);
        }
    };
    
      
 
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

                    

                    <MenuItem onClick={() => handleDelete(deal.id)} sx={{ color: 'error.main' }}>
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
