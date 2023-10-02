import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import TextWatermark from './TextWatermark';
import ImageWatermark from './ImageWatermark';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit', 
        marginRight: '30px', 
      };
    
  return (
   <Router>
    <AppBar position="static" sx={{ backgroundColor: '#080b0f' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Link to="/textwatermark" style={linkStyle}>
            <Typography >Text Watermark</Typography>
          </Link>
          <Link to="/imagewatermark" style={linkStyle}>
            <Typography >Image Watermark</Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>

    <img id="content" src="https://media.licdn.com/dms/image/D4D12AQFjUcr_bcZuqA/article-cover_image-shrink_720_1280/0/1665604565563?e=2147483647&v=beta&t=tdEYAbCFHzJal_59USHAEnlURnB9HJIKJZkqIRwaX3E" alt="img" height="200" width="400"></img>
    <Routes>
        <Route path='/textwatermark' element={<TextWatermark/>}/>
        <Route path='/imagewatermark' element={<ImageWatermark/>}/>
    </Routes>
   </Router>
  );
}
export default App;