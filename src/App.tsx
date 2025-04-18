import { Container, Typography, Button, Stack, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecordForm } from './components/RecordForm';
import { RecordList } from './components/RecordList';
import { SocialRecordProvider, useSocialRecords } from './context/SocialRecordContext';

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginBottom: '8px',
        },
      },
    },
  },
});

const MainContent = () => {
  const { records, addRecord, updateRecord, deleteRecord, exportData } = useSocialRecords();

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h1">
            🐕 狗狗社交日記
          </Typography>
          <Button variant="outlined" onClick={exportData} size="small">
            匯出
          </Button>
        </Box>

        <Typography variant="h6" component="h2">
          新增記錄
        </Typography>
        <RecordForm onSubmit={addRecord} />

        <Typography variant="h6" component="h2">
          所有記錄
        </Typography>
        <RecordList
          records={records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
          onUpdate={updateRecord}
          onDelete={deleteRecord}
        />
      </Stack>
    </Container>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SocialRecordProvider>
          <MainContent />
        </SocialRecordProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 