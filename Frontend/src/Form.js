import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      [theme.breakpoints.up('lg')]: {
        width: '35%',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '62.5%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
      height: '50px'
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      [theme.breakpoints.up('lg')]: {
        width: '35%',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '62.5%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
      height: '50px'
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  overflow: "scroll",
  height: '80%', // added scroll
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Function to construct table rows in MUI-compatible format.
function createData(no, description) {
  return { no, description };
}

// Table rows
const rows = [
  createData(0, 'High blood pressure, older crowd, majority female, shortest'),
  createData(1, 'High glucose, high cholesterol, older crowd'),
  createData(2, 'Alcoholics, some smokers; smallest cluster'),
  createData(3, 'Smokers, majority male'),
  createData(4, 'Majority male, tallest'),
  createData(5, 'Almost completely female, shortest, lightest; largest cluster')
];

const Form = ({ handleClose }) => {
  const classes = useStyles();

  // Request (form) state
  const [unconvertedAge, setUncovertedAge] = useState('');
  const [gender, setGender] = useState('');
  const [unconvertedHeight, setUnconvertedHeight] = useState('');
  const [uncovertedWeight, setUnconvertedWeight] = useState('');
  const [ap_hi, setApHi] = useState('');
  const [ap_low, setApLow] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [gluc, setGluc] = useState('');
  const [smoke, setSmoke] = useState('');
  const [alco, setAlco] = useState('');
  const [active, setActive] = useState('');

  // Loading state
  const [loading, setLoading] = useState(false);
  const activateLoading = () => setLoading(true);
  const deactivateLoading = () => setLoading(false);

  // Response state
  const [cluster, setCluster] = useState('');
  const [prediction, setPrediction] = useState('');

  // Modal state
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const BackgroundColor = "#019CAD"

  const handleSubmit = e => {
    e.preventDefault()
    activateLoading() // Show loading icon

    // Conversions
    var age = unconvertedAge * 365 // years -> days
    var height = unconvertedHeight * 2.54 // in -> cm
    var weight = uncovertedWeight / 2.2 // lb -> kg

    const params = { age, gender, height, weight, ap_hi, ap_low, cholesterol, gluc, smoke, alco, active }
    console.log(params)

    console.log('Sending request...')

    // Backend call
    axios
      // .post('https://cardiovascular-api.herokuapp.com/predict', params)
      .post('http://127.0.0.1:8000/predict', params)
      .then((res) => {
        const data = res.data.data

        setCluster(data.cluster)
        setPrediction(data.prediction)

        deactivateLoading() // Hide loading icon
        openModal()
      })
      .catch((error) => alert(`Error: ${error.message}`))
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>


      <div style={{height: "40px"}}></div>

      
      <Typography variant="h4">Please Enter Your Relevant Information</Typography>
      
      <div style={{height: "40px"}}></div>
      <br />

      {/* Form elements */}
      <TextField
        type="Number"
        label="Age"
        variant="filled"
        required
        value={unconvertedAge}
        onChange={e => setUncovertedAge(e.target.value)}
      />

      <FormControl variant="filled">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          required
          value={gender}
          label="Gender"
          onChange={e => setGender(e.target.value)}
        >
          <MenuItem value={2}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
        </Select>
      </FormControl>

      <TextField
        type="Number"
        label="Height (in)"
        variant="filled"
        required
        value={unconvertedHeight}
        onChange={e => setUnconvertedHeight(e.target.value)}
      />

      <TextField
        type="Number"
        label="Weight (lb)"
        variant="filled"
        required
        value={uncovertedWeight}
        onChange={e => setUnconvertedWeight(e.target.value)}
      />

      <TextField
        type="Number"
        label="Systolic Blood Pressure"
        variant="filled"
        required
        value={ap_hi}
        onChange={e => setApHi(e.target.value)}
      />

      <TextField
        type="Number"
        label="Diastolic Blood Pressure"
        variant="filled"
        required
        value={ap_low}
        onChange={e => setApLow(e.target.value)}
      />

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="cholesterol-label">Cholesterol</InputLabel>
        <Select
          labelId="cholesterol-label"
          required
          value={cholesterol}
          label="Cholesterol"
          onChange={e => setCholesterol(e.target.value)}
        >
          <MenuItem value={1}>Normal</MenuItem>
          <MenuItem value={2}>Above Normal</MenuItem>
          <MenuItem value={3}>Well Above Normal</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="glucose-label">Glucose</InputLabel>
        <Select
          labelId="glucose-label"
          required
          value={gluc}
          label="Glucose"
          onChange={e => setGluc(e.target.value)}
        >
          <MenuItem value={1}>Normal</MenuItem>
          <MenuItem value={2}>Above Normal</MenuItem>
          <MenuItem value={3}>Well Above Normal</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="smoke-label">Smoke</InputLabel>
        <Select
          labelId="smoke-label"
          required
          value={smoke}
          label="Smoke"
          onChange={e => setSmoke(e.target.value)}
        >
          <MenuItem value={1}>Smoke</MenuItem>
          <MenuItem value={0}>Do Not Smoke</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="alcohol-label">Alcohol</InputLabel>
        <Select
          labelId="alcohol-label"
          required
          value={alco}
          label="Alcohol"
          onChange={e => setAlco(e.target.value)}
        >
          <MenuItem value={1}>Drink</MenuItem>
          <MenuItem value={0}>Do Not Drink</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="active-label">Active</InputLabel>
        <Select
          labelId="active-label"
          required
          value={active}
          label="Active"
          onChange={e => setActive(e.target.value)}
        >
          <MenuItem value={1}>Active</MenuItem>
          <MenuItem value={0}>Not Active</MenuItem>
        </Select>
      </FormControl>

      <div>
        <Button type="submit" variant="contained" color="primary">
          Predict
        </Button>
      </div>

      <div style={{height: "70px"}}></div>

      {/* </div> */}

      {/* Progress bar */}
      {loading ? <CircularProgress /> : <span />}

      {/* Footer */}
      <br />

      {/* Response modal */}
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cluster Analysis
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Cluster #</b></TableCell>
                  <TableCell align="right"><b>Description</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.no}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ background: row.no === cluster ? '#FAD5A5' : 'white' }}
                  >
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Patient classified as group <b>{cluster}</b>.
          </Typography>
          <br />
          <hr style={{ 'border': '1px dashed' }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Prediction
          </Typography>
          {prediction === 1 ?
            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ color: "#FF0000" }}>
              Patient is at risk of CVD.
            </Typography> :
            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ color: "#007500" }}>
              Patient is safe.
            </Typography>
          }
        </Box>
      </Modal>
    </form>
  );
};

export default Form;
