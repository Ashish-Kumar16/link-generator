import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Tabs, 
  Tab, 
  Box, 
  Container 
} from '@mui/material';
import { Survey, Link } from '@mui/icons-material';
import CSATGenerator from './components/CSATGenerator';
import DeepLinkConverter from './components/DeepLinkConverter';

// Create theme matching the original design
const theme = createTheme({
  palette: {
    primary: {
      main: '#fe6633', // Orange from original design
    },
    secondary: {
      main: '#00a54d', // Green from original design
    },
    background: {
      default: '#f8f6f5', // Light background from original
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, #f36633, #fe6633)' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              GSK Tools Suite
            </Typography>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ 
                '& .MuiTab-root': { color: 'white', minWidth: 120 },
                '& .Mui-selected': { color: 'white !important' },
                '& .MuiTabs-indicator': { backgroundColor: 'white' }
              }}
            >
              <Tab 
                icon={<Survey />} 
                label="CSAT Generator" 
                id="tab-0"
                aria-controls="tabpanel-0"
                sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
              />
              <Tab 
                icon={<Link />} 
                label="Deep Link Converter" 
                id="tab-1"
                aria-controls="tabpanel-1"
                sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
              />
            </Tabs>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <TabPanel value={tabValue} index={0}>
            <CSATGenerator />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <DeepLinkConverter />
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
