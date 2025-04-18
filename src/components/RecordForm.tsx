import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { SocialRecord } from '../types';

interface RecordFormProps {
  onSubmit: (record: Omit<SocialRecord, 'id'>) => void;
  initialData?: Omit<SocialRecord, 'id'>;
}

const defaultFormData: Omit<SocialRecord, 'id'> = {
  date: new Date(),
  dogName: '',
  otherDogName: '',
  location: '',
  interactionType: '',
  duration: 0,
  notes: '',
};

export const RecordForm = ({ onSubmit, initialData }: RecordFormProps) => {
  const [formData, setFormData] = useState<Omit<SocialRecord, 'id'>>(initialData || defaultFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="日期"
        type="date"
        value={formData.date.toISOString().split('T')[0]}
        onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="狗狗名字"
        value={formData.dogName}
        onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="對方狗狗名字"
        value={formData.otherDogName}
        onChange={(e) => setFormData({ ...formData, otherDogName: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="地點"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="互動類型"
        select
        value={formData.interactionType}
        onChange={(e) => setFormData({ ...formData, interactionType: e.target.value })}
        margin="normal"
        required
      >
        <MenuItem value="play">玩耍</MenuItem>
        <MenuItem value="walk">散步</MenuItem>
        <MenuItem value="training">訓練</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="持續時間（分鐘）"
        type="number"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
        margin="normal"
        required
        inputProps={{ min: 1 }}
      />
      <TextField
        fullWidth
        label="備註"
        multiline
        rows={4}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        提交
      </Button>
    </form>
  );
}; 