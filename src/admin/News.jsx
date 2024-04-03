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
import { messaging } from '../auth/Firebase';

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
  intro: "",
  body: "",
  source: "",
  category: "",
}

const News = () => {

  const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const {intro, body, source, category } = data;
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
          setData((prev) => ({...prev, img: downloadURL}))
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
    if(!intro) {
      errors.intro = "Intro is Required";
    }
     if(!body) {
      errors.body = "Body is Required";
    }
     if(!source) {
      errors.source = "Source is Required";
    }
     if(!category) {
      errors.category = "Category is Required";
    }
    
    return errors;
  };

  //for handling our form data

 const handleSubmit = async(e) => {
    e.preventDefault();

    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    setIsSubmit(true);
    await addDoc(collection(db, "news"), {
      ...data,
      timestamp: serverTimestamp()
    })
    const postId = addDoc.id;
    const message = {
      notification: {
        title: "New Post Added",
        body: "Check out the latest news!",
      },
      data: {
        postId: postId, 
      },
      topic: intro, 
    };

    // Send the push notification using Firebase Cloud Messaging
    await messaging.send(message);


   {/*This show if post is succesfully*/}
        Swal.fire({
          title: 'Posts Uploaded Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
         navigate("/posts");
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
            For Posts
          </Typography>
          <form  onSubmit={handleSubmit}>
            <Grid sx={{display:"flex", flex:"flexWrap", gap:"5px"}} container spacing={3}>
              <Grid item xs={12}>
                <TextField
                sx={{
                  border:"1px solid green",
                  color:"green"
                }}
                  label="Intro"
                  value={intro}
                  name="intro"
                  error={errors.intro ? {content: errors.intro} : null}
                  onChange={handleChange}
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={16}>
                <TextField
                 sx={{
                  border:"1px solid green",
                  color:"green",
                }}
                  multiline
                  rows={4}
                  label="Body"
                  value={body}
                  name="body"
                  error={errors.body ? {content: errors.body} : null}
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
                  label="Source"
                  name="source"
                  error={errors.source ? {content: errors.source} : null}
                  value={source}
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
                  <option value="Headline">Headline</option>
                  <option value="More">More</option>
                  <option value="Popular">Popular</option>
                  <option value="Featured">Featured</option>
                  <option value="News">News</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bussiness">Bussiness</option>
                  <option value="Sport">Sports</option>
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

export default News;
