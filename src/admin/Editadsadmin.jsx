import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../auth/Firebase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();
const Editadsadmin = () => {
  const { id } = useParams();
  const [ads, setAds] = useState({ description: '', link: ''});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const adsDoc = await getDoc(doc(db, 'ads', id));
        if (adsDoc.exists()) {
          setAds({ id, ...adsDoc.data() });
        } else {
          console.error('ads not found');
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'ads', id), { ...ads });
      alert('Ads updated successfully!');
    } catch (error) {
      console.error('Error updating Posts:', error);
    }
  };

  return (
  <ThemeProvider theme={defaultTheme}>
    <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
    }}>
    <form style={{display:"column", justifyContent:"space-around", width:"80%", gap:"10px"}}>
      <h2>Update Ads</h2>
      {/*input fields for updating product details */}
      <TextField
      sx={{
        width:"100%",
        display:"flex",
        justifyContent:'center',
        margin:"auto"
      }}
        name="Decription"
        multiline
        rows={4}
        value={ads.description}
        onChange={(e) => setAds({ ...ads, description: parseFloat(e.target.value) })}
      /><br/>
      <TextField
      sx={{
        width:"100%",
        display:"flex",
        justifyContent:'center',
        margin:"auto",
        gap:"3px"
      }}
        name="Link"
        type="link"
        value={ads.link}
        onChange={(e) => setAds({ ...ads, link: parseFloat(e.target.value) })}
      /><br/>
      <button 
       onClick={handleUpdate}
       style={{
        width:"100%",
        color:"white",
        height:'7vh',
        border:"none",
        backgroundColor:"darkred",
        cursor:"pointer"
       }}
       >Update Posts</button>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default Editadsadmin;
