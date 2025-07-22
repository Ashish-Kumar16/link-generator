import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Alert,
  Grid,
  Divider
} from '@mui/material';
import { Transform, ContentCopy, Link as LinkIcon } from '@mui/icons-material';

const DeepLinkConverter = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [outputType, setOutputType] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);

  const displayError = (message) => {
    setError(message);
    setOutputUrl('');
    setShowResult(false);
  };

  const convertUrl = () => {
    setError('');

    if (!inputUrl) {
      displayError('Please enter a URL to convert.');
      return;
    }

    if (!businessUnit) {
      displayError('Please select a Business Unit.');
      return;
    }

    if (!outputType) {
      displayError('Please select an Output Type.');
      return;
    }

    try {
      // Split URL and query parameters
      const [baseUrl, query] = inputUrl.includes('/?') 
        ? inputUrl.split('/?') 
        : inputUrl.includes('?') 
        ? inputUrl.split('?') 
        : [inputUrl, ''];

      if (!query) {
        displayError('Invalid URL. No query parameters found.');
        return;
      }

      // Parse existing query parameters
      const params = new URLSearchParams(query);

      // Add business unit parameter
      if (businessUnit === 'Pharma') {
        params.set('business_unit', 'pharma');
      } else if (businessUnit === 'ViiV') {
        params.set('business_unit', 'viiv');
      }

      // Add output type parameter
      if (outputType === 'Mass') {
        params.set('output_type', 'mass');
      } else if (outputType === 'Veeva') {
        params.set('output_type', 'veeva');
      }

      // Additional processing based on output type
      if (outputType === 'Veeva') {
        // Add Veeva-specific parameters
        params.set('veeva_format', 'true');
        params.set('platform', 'veeva_clm');
      }

      if (outputType === 'Mass') {
        // Add Mass email specific parameters
        params.set('mass_email', 'true');
        params.set('distribution', 'mass');
      }

      // Reconstruct the URL
      const separator = inputUrl.includes('/?') ? '/?' : '?';
      const convertedUrl = `${baseUrl}${separator}${params.toString()}`;

      setOutputUrl(convertedUrl);
      setShowResult(true);

    } catch (err) {
      displayError('Error processing URL: ' + err.message);
    }
  };

  const copyToClipboard = () => {
    if (outputUrl) {
      navigator.clipboard.writeText(outputUrl).then(() => {
        console.log('URL copied to clipboard');
        // Could add toast notification here
      });
    }
  };

  const handleReset = () => {
    setInputUrl('');
    setBusinessUnit('');
    setOutputType('');
    setOutputUrl('');
    setError('');
    setShowResult(false);
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
          Deep Link URL Converter
        </Typography>

        <Typography variant="body1" sx={{ 
          textAlign: 'center', 
          mb: 4, 
          color: 'text.secondary',
          fontStyle: 'italic' 
        }}>
          Convert URLs for different business units and output types
        </Typography>

        <Grid container spacing={3}>
          {/* Input URL */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Input URL"
              placeholder="Enter the URL to convert..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Business Unit */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Business Unit</InputLabel>
              <Select
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                label="Business Unit"
              >
                <MenuItem value="Pharma">Pharma</MenuItem>
                <MenuItem value="ViiV">ViiV</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Output Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Output Type</InputLabel>
              <Select
                value={outputType}
                onChange={(e) => setOutputType(e.target.value)}
                label="Output Type"
              >
                <MenuItem value="Mass">Mass</MenuItem>
                <MenuItem value="Veeva">Veeva</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Transform />}
                onClick={convertUrl}
                sx={{ 
                  minWidth: 150,
                  mr: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #f36633 30%, #fe6633 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d95527 30%, #e55529 90%)',
                  }
                }}
              >
                Convert
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleReset}
                sx={{ 
                  minWidth: 100,
                  py: 1.5,
                }}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {showResult && outputUrl && (
        <Paper elevation={3} sx={{ mt: 3, p: 3, background: '#f9f9f9' }}>
          <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 'bold' }}>
            Converted URL
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LinkIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Output
              </Typography>
            </Box>

            <Paper sx={{ p: 3, background: 'white', border: '1px solid #e0e0e0' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  wordBreak: 'break-all', 
                  mb: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  backgroundColor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid #ddd'
                }}
              >
                {outputUrl}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  startIcon={<ContentCopy />}
                  onClick={copyToClipboard}
                  variant="contained"
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #00a54d 30%, #4caf50 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00832d 30%, #388e3c 90%)',
                    }
                  }}
                >
                  Copy URL
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Conversion Summary */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
            Conversion Summary:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ 
              backgroundColor: 'primary.main', 
              color: 'white', 
              px: 2, 
              py: 0.5, 
              borderRadius: 1,
              fontSize: '0.8rem'
            }}>
              Business Unit: {businessUnit}
            </Typography>
            <Typography variant="body2" sx={{ 
              backgroundColor: 'secondary.main', 
              color: 'white', 
              px: 2, 
              py: 0.5, 
              borderRadius: 1,
              fontSize: '0.8rem'
            }}>
              Output Type: {outputType}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DeepLinkConverter;
