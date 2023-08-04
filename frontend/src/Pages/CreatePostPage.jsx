import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './CreatePostPage.css'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; 
import 'react-quill/dist/quill.snow.css';



const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: "",
    coverImage: ""
  });

  const [coverImagePreview, setCoverImagePreview] = useState();
  const [coverImageChange, setCoverImagechange] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

      setFormData((prevData) => ({ ...prevData, [name]: value  }));

  };

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const handleContentChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  // to navigate
  const navigate = useNavigate();
  // state for cover image change
  

  const handleCoverImageChange = async (event) => {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not available');
      return;
    }


    const file = event.target.files[0];
    const formdataImage = new FormData()
    formdataImage.append("images", file)
    setFormData((prevData) => ({ ...prevData, coverImage: file }));
    // make request for image upload endpoint
    const response = await fetch('http://localhost:4000/api/v1/image-upload', {
        method: 'POST',
        headers: {
          mode: 'no-cors',
          Authorization: `Bearer ${token}`,
      },
      body: formdataImage ,
    })
    const CoverImageChange = await response.json();
    setCoverImagechange(CoverImageChange.url[0]);

    const previewURL = URL.createObjectURL(file);
    setCoverImagePreview(previewURL);
    

  };
  const handleRemoveCoverImage = () => {
    setFormData((prevData) => ({ ...prevData, coverImage: null }));
    setCoverImagePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not available');
      return;
    }

    console.log(formData)
    const obj = {
      title: formData.title,
      tags: formData.tags.split(" "),
      imageUrl: coverImageChange
    }

    console.log(obj)

  const formDataWithImage = new FormData();
  // formDataWithImage.append('title', formData.title);
  formDataWithImage.append('content', formData.content);
  // formDataWithImage.append('tags', formData.tags);
  // formDataWithImage.append("imageUrl",formData.coverImage)  
  formDataWithImage.append("data", JSON.stringify(obj) )


  

    try {
      const response = await fetch('http://localhost:4000/api/v1/post', {
        method: 'POST',
        headers: {
          mode: 'no-cors',
          Authorization: `Bearer ${token}`,
        },
        body: formDataWithImage,
      });

      if (response.ok) {
        
        console.log('Post created successfully');
        
        const data = await response.json()
        console.log(data)
        alert('Blog Post created')
        
      } else {
        const errorData = await response.json()
        console.error('Failed to create post:', errorData.message);
        
      }
    } catch (error) {
     
      console.error('Error creating post:', error.message);
     
    }
  };

  //  handling of clicking publish post

  


  return (

    
    <Container maxWidth="100vw" sx={{marginTop : '70px' }} >
        <AppBar position="static"  sx= { { bgcolor: 'lightgray' }}>
            <Toolbar>
            <Typography variant="h7">
                Create Post
            </Typography>
            <Grid container justifyContent="center"  color={'black'}   >
                <Button  variant='text' color="inherit" sx={{marginRight : '25px' }}>Edit</Button>
                <Button variant='text' color="inherit">Preview</Button>
            </Grid> 
            <IconButton color="error" size='large' >
                <CloseIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={80}>
          <Paper elevation={1} sx={{ p: 3 } } >
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    fullWidth
                    label="New Post Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }} 
                />
                <label htmlFor="cover-image-input">
                    <AddPhotoAlternateIcon color="inherit" sx={{ mt: 2, fontSize: 40, cursor: 'pointer' }} />
                    <input
                        accept="image/*"
                        id="cover-image-input"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleCoverImageChange}
                    />
                    {coverImagePreview && (
                        <div style={{ maxWidth: '300px', margin: '10px 0', position: 'relative' }}>
                        <img
                          src={coverImagePreview}
                          alt="Cover Image Preview"
                          style={{ width: '100%', height: 'auto' }}
                        />
                        <IconButton
                          color="warning"
                          onClick={handleRemoveCoverImage}
                          sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </div>
                    )}   </label>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Add your tags here"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                {/* Editor Toolbar */}
                <ReactQuill
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="Write your content here..."
                    modules={{
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ color: [] }, { background: [] }],
                        ['link', 'image',],
                        ['clean'],
                    ],
                    }}
                    formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'color',
                    'background',
                    'link',
                    'image',
                    
                    ]}
                    theme="snow"   
                />
                <Button type="submit" variant="contained" color="inherit" sx={{ mr: 2, mt:5 }}>
                    Publish
                </Button>
                <Button type="Subit" variant="text" color="inherit" sx={{ mt: 5 }}>
                    Save Draft
                </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatePostPage;