import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getSingleUser } from '../redux/actions';

export const EditUser = () => {
  const { id } = useParams();
  const { user: currentUser } = useSelector(state => state.users);
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const { name, email, phone, address } = user;

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setUser({ ...currentUser });
    }
  }, [currentUser]);

  const handleInputChange = e => {
    setError('');
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      setError('Please, fill all the fields!');
    } else {
      dispatch(addUser(user));
      history.push('/');
      setError('');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <Button
        style={{ marginBottom: 15 }}
        variant='contained'
        color='secondary'
        onClick={() => history.push('/')}
      >
        Home
      </Button>
      <Box
        onSubmit={handleSubmit}
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='name'
          name='name'
          label='Name'
          variant='standard'
          value={name || ''}
          onChange={handleInputChange}
          type='text'
        />
        <br />
        <TextField
          id='email'
          name='email'
          label='Email'
          variant='standard'
          value={email || ''}
          onChange={handleInputChange}
          type='email'
        />
        <br />
        <TextField
          id='phone'
          name='phone'
          label='Phone'
          variant='standard'
          value={phone || ''}
          onChange={handleInputChange}
          type='tel'
        />
        <br />
        <TextField
          id='address'
          name='address'
          label='Address'
          variant='standard'
          value={address || ''}
          onChange={handleInputChange}
          type='text'
        />
        <br />
        <Button
          variant='contained'
          color='primary'
          type='sumbit'
          style={{ width: 100 }}
        >
          Update
        </Button>
      </Box>
      {error && <p style={{ color: '#ff0000' }}>{error}</p>}
    </div>
  );
};
