import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export const AddUser = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const { name, email, phone, address } = user;

  return (
    <div>
      <h2>Add User</h2>
      <Button
        style={{ marginBottom: 15 }}
        variant='contained'
        color='secondary'
        onClick={() => history.push('/')}
      >
        Home
      </Button>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='name'
          label='Name'
          variant='standard'
          value={name}
          type='text'
        />
        <br />
        <TextField
          id='email'
          label='Email'
          variant='standard'
          value={email}
          type='email'
        />
        <br />
        <TextField
          id='phone'
          label='Phone'
          variant='standard'
          value={phone}
          type='tel'
        />
        <br />
        <TextField
          id='address'
          label='Address'
          variant='standard'
          value={address}
          type='text'
        />
        <br />
        <Button
          variant='contained'
          color='primary'
          type='sumbit'
          style={{ width: 100 }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};
