import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SocialRecord, Gender, NeuteredStatus } from '../types';

interface RecordFormProps {
  initialData?: Omit<SocialRecord, 'id'>;
  onSubmit: (data: Omit<SocialRecord, 'id'>) => void;
  onCancel?: () => void;
}

const defaultFormData: Omit<SocialRecord, 'id'> = {
  date: new Date(),
  target: '',
  gender: 'male',
  age: '',
  neutered: 'unknown',
  initialInteraction: '',
  interactionResult: '',
  worthMeetingAgain: false,
  notes: '',
};

export const RecordForm: React.FC<RecordFormProps> = ({
  initialData = defaultFormData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="日期"
              value={formData.date}
              onChange={(newDate) => newDate && setFormData({ ...formData, date: newDate })}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>

          <TextField
            label="對象"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            required
            fullWidth
            size="small"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>性別</InputLabel>
              <Select
                value={formData.gender}
                label="性別"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
              >
                <MenuItem value="male">公</MenuItem>
                <MenuItem value="female">母</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>結紮</InputLabel>
              <Select
                value={formData.neutered}
                label="結紮"
                onChange={(e) => setFormData({ ...formData, neutered: e.target.value as NeuteredStatus })}
              >
                <MenuItem value="yes">是</MenuItem>
                <MenuItem value="no">否</MenuItem>
                <MenuItem value="unknown">不確定</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="年齡"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            fullWidth
            size="small"
          />

          <TextField
            label="初始互動"
            value={formData.initialInteraction}
            onChange={(e) => setFormData({ ...formData, initialInteraction: e.target.value })}
            multiline
            rows={2}
            fullWidth
            size="small"
          />

          <TextField
            label="互動結果"
            value={formData.interactionResult}
            onChange={(e) => setFormData({ ...formData, interactionResult: e.target.value })}
            multiline
            rows={2}
            fullWidth
            size="small"
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.worthMeetingAgain}
                onChange={(e) => setFormData({ ...formData, worthMeetingAgain: e.target.checked })}
              />
            }
            label="是否值得再見"
          />

          <TextField
            label="備註"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            multiline
            rows={3}
            fullWidth
            size="small"
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {onCancel && (
              <Button onClick={onCancel} variant="outlined" size="small">
                取消
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary" size="small">
              儲存
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}; 