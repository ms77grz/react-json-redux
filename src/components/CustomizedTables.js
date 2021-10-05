import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, deleteUser } from '../redux/actions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Button
        style={{ marginBottom: 15 }}
        variant='contained'
        color='primary'
        onClick={() => history.push('/addUser')}
      >
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='center'>Email</StyledTableCell>
              <StyledTableCell align='center'>Phone</StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map(user => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component='th' scope='row'>
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{user.email}</StyledTableCell>
                  <StyledTableCell align='center'>{user.phone}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <ButtonGroup
                      variant='contained'
                      aria-label='outlined primary button group'
                    >
                      <Button
                        style={{ marginRight: 2 }}
                        color='primary'
                        onClick={() => history.push(`/editUser/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        color='secondary'
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
