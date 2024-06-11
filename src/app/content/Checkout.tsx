'use client'

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardMedia, PaletteMode } from '@mui/material';
import { styled } from '@mui/system';
import OutlinedInput from '@mui/material/OutlinedInput';
import getCheckoutTheme from './getCheckoutTheme';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


export default function Checkout() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [inputH, setInputH] = React.useState(0);
  const [inputN, setInputN] = React.useState(0);
  const [inputW, setInputW] = React.useState(0);
  const [path, setPath] = React.useState('');
  const [rawNumber, setRawNumber] = useState(0);
  function handleButtonClick() {
    console.log(inputH);
    console.log(inputW);
    console.log([inputW, inputH]);
    if (isSizeValid(inputW, inputH)){
  
      setPath(inputW.toString() + '_' + inputH.toString() + '_imgs');
    }
  }

  function isSizeValid(width: number, height: number){
    return validSizes[width.toString() + ',' + height.toString()];
  };
  
  function getImageSrc(index: number){

    return path + '/' + index.toString() + 'raw_.png';
  }

  function handleCardClick(index: number){

    setRawNumber(index);
  }

  const handleDataClick = () => {
    const fileName = `${inputW.toString()}_${inputH.toString()}.json`;
    window.location.href = `/${fileName}`;
  };


  function getImageSrcDiv(index: number){

    return path + '/' + rawNumber.toString() + 'diverse_' + index.toString() + '.png';
  }
  
  const [validSizes, setValidSizes] = useState<{ [key: string]: boolean }>({
    '225,300': true,
    '256,256': true,
    '613,719': true,
    '1920,1080': true,
    '2560,1080': true,
    '3840,2160': true
  });

  const handleWNumberChange = (event: { target: { value: any; }; }) => {
    setInputW(Number(event.target.value));
  };

  const handleHNumberChange = (event: { target: { value: any; }; }) => {
    setInputH(Number(event.target.value));
  };

  const handleNNumberChange = (event: { target: { value: any; }; }) => {
    setInputN(Number(event.target.value));
  };

  const checkoutTheme = createTheme(getCheckoutTheme(mode));

  return (
    <ThemeProvider theme={checkoutTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', height: 'auto' }}>

        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 0 }}>
            W:
          </Typography>
          <Box ml={2}>
            <OutlinedInput
              id="w-number"
              name="w-number"
              type="number"
              required
              value={inputW}
              onChange={handleWNumberChange}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 0 }}>
            H:
          </Typography>
          <Box ml={2}>
            <OutlinedInput
              id="h-number"
              name="h-number"
              type="number"
              required
              value={inputH}
              onChange={handleHNumberChange}
            />
          </Box>
        </Box>

        </Box>
        <Button
            variant="outlined"
            onClick={handleButtonClick}
            fullWidth
          >
            Generate Layout
        </Button>
        {path !== '' && (
          <Button
            variant="outlined"
            onClick={handleDataClick}
            fullWidth
          >
            All Data
          </Button>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: 500,
          }}
        >

          {path !== '' && rawNumber != 0 && (
            Array.from({ length: 2 }, (_, index) => index + 1).map((index) => (
              <Card
                key={index}
                style={{ cursor: 'pointer' }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={getImageSrcDiv(index)}
                  alt={`Image ${index}`}
                  style={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Diverse {index} 
                  </Typography>
                </CardContent>
              </Card>
              ))
            )}

        </Box>
        </Grid>
        
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
        <Typography variant="h6" component="h6"         sx={{
          gridColumn: '1 / -1', // 占据所有列
          display: 'flex',
          justifyContent: 'center', // 水平居中
          alignItems: 'center', // 垂直居中
          width: '100%', // 宽度填满
        }}>
          Layout Result
        </Typography>
        
          {path !== '' && (
            Array.from({ length: 8 }, (_, index) => index + 1).map((index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  
                  image={getImageSrc(index)}
                  alt={`Image ${index}`}
                  style={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Layout {index} 
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
