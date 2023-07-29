import React, { useState } from 'react';
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



const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    coverImage: null,
  });

  const [coverImagePreview, setCoverImagePreview] = useState(null);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({ ...prevData, coverImage: file }));
  
    const previewURL = URL.createObjectURL(file);
    setCoverImagePreview(previewURL);

  };
  const handleRemoveCoverImage = () => {
    setFormData((prevData) => ({ ...prevData, coverImage: null }));
    setCoverImagePreview(null);
  };

  return (

    
    <Container maxWidth="80%">
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
                        ['link', 'image', 'video'],
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
                    'video',
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
