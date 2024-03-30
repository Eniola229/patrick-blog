import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {storage} from "../auth/Firebase";
import {useParams, useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { ref } from "firebase/storage";
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { db } from "../auth/Firebase";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Swal from 'sweetalert2';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(160, 0, 0, 1)', //darked
    },
    secondary: {
      main: 'rgba(240, 0, 0, 1)', //light 
    },
  },
});
    
const initialState = {
  description: "",
  link: "",
  category: ""
}

const Ads = () => {

  const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const {description, link, category } = data;
  const navigate = useNavigate();
  const [addSwitch, setAddSwitch] = useState(false);

  //for the image uploading
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;

        default:
          break;
        }
      }, (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({...prev, media: downloadURL}))
        });
      }
      );
    };

    file && uploadFile()
  }, [file]);

  const handleSwitchChange = () => {
    setAddSwitch(!addSwitch);
  };

  //for errors

  const validate= () => {
    let errors = {};
    if(!description) {
      errors.description = "Intro is Required";
    }
     if(!link) {
      errors.link = "link is Required";
    }
    if(!category) {
      errors.link = "Category is Required";
    }
    
    return errors;
  };

  //for handling our form data

 const handleSubmit = async(e) => {
    e.preventDefault();

    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    setIsSubmit(true);
    await addDoc(collection(db, "ads"), {
      ...data,
      timestamp: serverTimestamp()
    })
   {/*This show if post is succesfully*/}
        Swal.fire({
          title: 'Ads Uploaded Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
         navigate("/getads");
  }

  const handleChange= (e) => {
    setData({...data, [e.target.name]: e.target.value });
  };

 

  return (
    <ThemeProvider theme={theme}>
    {isSubmit ? <CircularProgress sx={{justifyContent:"center"}} color="success" />:(
       <Container component="main" sx={{width:"100%"}} >
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography component="h3" variant="h4" align="center" color="secondary.main">
            For Ads
          </Typography>
          <form  onSubmit={handleSubmit}>
            <Grid sx={{display:"flex", flex:"flexWrap", gap:"5px"}} container spacing={3}>
              <Grid item xs={16}>
                <TextField
                 sx={{
                  border:"1px solid green",
                  color:"green",
                }}
                  multiline
                  rows={4}
                  label="Description"
                  value={description}
                  name="description"
                  error={errors.description ? {content: errors.description} : null}
                  onChange={handleChange}
                  fullWidth
                />
             
              </Grid>
              <Grid item xs={12}>
                <TextField
                 sx={{
                  border:"1px solid green",
                  color:"green"
                }}
                  label="Link"
                  name="link"
                  error={errors.link ? {content: errors.link} : null}
                  value={link}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
               <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Category
                </InputLabel>
                <NativeSelect
                  
                  inputProps={{
                    name: 'category',
                    id: 'uncontrolled-native',
                  }}
                  value={category}
                  error={errors.category ? {content: errors.category} : null}
                  label="Category"
                  onChange={handleChange}
                >
                  <option value="None">None</option>
                  <option value="ads">Ads 1</option>
                  <option value="adstwo">Ads2</option>
                </NativeSelect>
              </FormControl>
             
              </Grid>
              <Grid item xs={12} sx={{ backgroundColor: 'darkred', display:"flex", color: 'white', padding: 1, borderRadius: 5 }}>
                
                <input
                  type="file"
                  id="image-input"
                   onChange={(e)=> setFile(e.target.files[0])}
                  endAdornment={<InsertPhotoIcon position="end" />}
                  sx={{ display: 'none' }}
                /><InsertPhotoIcon position="end" />
              </Grid>
              
            </Grid>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={progress !== null && progress < 100}
                sx={{
                  background:"darkred",
                  '&:hover': {
                    backgroundColor: 'red', 
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      )}
    </ThemeProvider>
  );
};

export default Ads;
