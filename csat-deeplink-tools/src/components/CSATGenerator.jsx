import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import { ContentCopy, Star, SentimentSatisfied } from '@mui/icons-material';

const countries = [
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Costa%20Rica', label: 'Costa Rica' },
  { value: 'Dominican%20Republic', label: 'Dominican Republic' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'El%20Salvador', label: 'El Salvador' },
  { value: 'Gulf', label: 'Gulf' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'India', label: 'India' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Panama', label: 'Panama' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Saudi%20Arabia', label: 'Saudi Arabia' },
  { value: 'Trinidad%20and%20Tobago', label: 'Trinidad and Tobago' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Venezuela', label: 'Venezuela' }
];

const CSATGenerator = () => {
  const [formData, setFormData] = useState({
    channel: '',
    country: '',
    group: '',
    contentLabId: '',
    therapyArea: '',
    brand: '',
    specialty: '',
    emNa: ''
  });

  const [generatedUrls, setGeneratedUrls] = useState({
    smiley: '',
    star: ''
  });

  const [showResult, setShowResult] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    setShowResult(false); // Hide results when form changes
  };

  const replaceSpecialChars = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '%20');
  };

  const generateURL = () => {
    // Validation
    const requiredFields = ['channel', 'country', 'group'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert('Please fill in all required fields: ' + missingFields.join(', '));
      return;
    }

    // Base URL from original
    const baseUrl = 'https://gsk.qualtrics.com/jfe/form/SV_8jBXbvdpv4zkrvo';

    // Build query parameters
    const params = new URLSearchParams();

    // Add all form fields as parameters
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        // Replace special characters for certain fields
        const processedValue = ['therapyArea', 'brand', 'specialty'].includes(key) 
          ? replaceSpecialChars(value) 
          : value;
        params.append(key, processedValue);
      }
    });

    // Generate both smiley and star versions
    const smileyParams = new URLSearchParams(params);
    smileyParams.append('surveyType', 'smiley');

    const starParams = new URLSearchParams(params);
    starParams.append('surveyType', 'star');

    setGeneratedUrls({
      smiley: `${baseUrl}?${smileyParams.toString()}`,
      star: `${baseUrl}?${starParams.toString()}`
    });

    setShowResult(true);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      // Could add a toast notification here
      console.log('URL copied to clipboard');
    });
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, background: 'white' }}>
        <Typography variant="h4" component="h1" sx={{ 
          color: 'primary.main', 
          textAlign: 'center', 
          mb: 3,
          fontWeight: 'bold'
        }}>
          CSAT Survey URL Generator
        </Typography>

        <Grid container spacing={3}>
          {/* Channel */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth required>
              <InputLabel>Channel</InputLabel>
              <Select
                value={formData.channel}
                onChange={handleChange('channel')}
                label="Channel"
              >
                <MenuItem value="1:1Email">1:1Email</MenuItem>
                <MenuItem value="MassEmail">MassEmail</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Country */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth required>
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.country}
                onChange={handleChange('country')}
                label="Country"
              >
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Group */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth required>
              <InputLabel>Group</InputLabel>
              <Select
                value={formData.group}
                onChange={handleChange('group')}
                label="Group"
              >
                <MenuItem value="Commercial">Commercial</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Both">Both</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* ContentLab ID */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="ContentLab Id"
              value={formData.contentLabId}
              onChange={handleChange('contentLabId')}
              variant="outlined"
            />
          </Grid>

          {/* Therapy Area */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Therapy Area"
              value={formData.therapyArea}
              onChange={handleChange('therapyArea')}
              variant="outlined"
            />
          </Grid>

          {/* Brand */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Brand"
              value={formData.brand}
              onChange={handleChange('brand')}
              variant="outlined"
            />
          </Grid>

          {/* Specialty */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Specialty"
              value={formData.specialty}
              onChange={handleChange('specialty')}
              variant="outlined"
            />
          </Grid>

          {/* EM NA */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="EM NA"
              value={formData.emNa}
              onChange={handleChange('emNa')}
              variant="outlined"
            />
          </Grid>

          {/* Generate Button */}
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={generateURL}
                sx={{ 
                  minWidth: 200,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #fe6633 30%, #ff8a65 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00a54d 30%, #4caf50 90%)',
                  }
                }}
              >
                Generate URLs
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      {showResult && (
        <Paper elevation={3} sx={{ mt: 3, p: 3, background: '#f9f9f9' }}>
          <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 'bold' }}>
            Generated URLs
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SentimentSatisfied sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Smiley Survey
                  </Typography>
                </Box>
                <Paper sx={{ p: 2, background: 'white' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      wordBreak: 'break-all', 
                      mb: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.85rem'
                    }}
                  >
                    {generatedUrls.smiley}
                  </Typography>
                  <Button
                    startIcon={<ContentCopy />}
                    onClick={() => copyToClipboard(generatedUrls.smiley)}
                    size="small"
                    variant="outlined"
                  >
                    Copy URL
                  </Button>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Star sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Star Survey
                  </Typography>
                </Box>
                <Paper sx={{ p: 2, background: 'white' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      wordBreak: 'break-all', 
                      mb: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.85rem'
                    }}
                  >
                    {generatedUrls.star}
                  </Typography>
                  <Button
                    startIcon={<ContentCopy />}
                    onClick={() => copyToClipboard(generatedUrls.star)}
                    size="small"
                    variant="outlined"
                  >
                    Copy URL
                  </Button>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default CSATGenerator;
