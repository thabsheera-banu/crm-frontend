// import axios from 'axios';
// import React, { useState } from 'react';

// import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';

// function AddStudent() {
//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         date_of_birth: '',
//         email: '',
//         username: '',
//         password: '',
//         street: '',
//         city: '',
//         state: '',
//         country: '',
//         pincode: '',
//         p_fname: '',
//         p_lname: '',
//         image : '',
//       });
    
//       const handleFormChange = (e) => {
//         if (e.target.files) {
//           setFormData({
//             ...formData,
//             image: e.target.files[0], 
//           });
//         } else {
//           const { name, value } = e.target;
//           setFormData({
//             ...formData,
//             [name]: value,
//           });
//         }
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const formDataToSend = new FormData();
//           for (const key in formData) {
//             formDataToSend.append(key, formData[key]);
//           }
//           const response = await axios.post('http://127.0.0.1:8000/students/', formDataToSend, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           console.log('Student enrolled:', response.data);
//           setFormData({
//             first_name: '',
//             last_name: '',
//             date_of_birth: '',
//             email: '',
//             username: '',
//             password: '',
//             street: '',
//             city: '',
//             state: '',
//             country: '',
//             pincode: '',
//             p_fname: '',
//             p_lname: '',
//             image: '',
//           });
//         } catch (error) {
//           console.error('Error enrolling student:', error);
//         }
//       };
      
 
//   return (
//     <Card variant="outlined">
//       <CardContent>
//         <Typography  variant="h5" component="div"  style={{ textAlign: 'center' }} gutterBottom>
//           Student Admission & Enrollment
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//           <Grid item xs={12} sm={12}>
//               <Avatar
//                 alt="Student Avatar"
//                 sx={{ width: 120, height: 120 }}
//               />
//               <TextField
//                 type="file"
//                 inputProps={{ accept: 'image/*' }}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="First Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='first_name'
//                 value={formData.first_name}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Last Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='last_name'
//                 value={formData.last_name}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 type="date"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='date_of_birth'
//                 value={formData.date_of_birth}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='email'
//                 value={formData.email}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Username"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='username'
//                 value={formData.username}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                  label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='password'
//                 value={formData.password}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h5" component="div" gutterBottom>
//                 Address
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Street Address"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='street'
//                 value={formData.street}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="City"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='city'
//                 value={formData.city}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="State"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='state'
//                 value={formData.state}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Country"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='country'
//                 value={formData.country}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Pin Code"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='pincode'
//                 value={formData.pincode}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h5" component="div" gutterBottom>
//                 Parent Information
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Parent First Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='p_fname'
//                 value={formData.p_fname}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Parent Last Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 name='p_lname'
//                 value={formData.p_lname}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//           </Grid>
//           <Button variant="contained" type="submit" color="primary">
//             Enroll Student
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// export default AddStudent;
