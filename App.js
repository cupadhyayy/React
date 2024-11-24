import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import './App.css'; 

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 

    
    if (!name || !age || !file) {
      setError('Please fill out all fields and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('There was an error!', error);
      setError('An error occurred while submitting the form. Please try again.');
    }
  };

 
  const ageOptions = [];
  for (let i = 1; i <= 120; i++) {
    ageOptions.push(i);
  }

  return (
    <div className="container">
      <h1>Healthcare Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Age</InputLabel>
            <Select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              label="Age"
            >
              {ageOptions.map((ageValue) => (
                <MenuItem key={ageValue} value={ageValue}>
                  {ageValue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
        </Box>

        
        {error && <div className="error">{error}</div>}

        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default App;
