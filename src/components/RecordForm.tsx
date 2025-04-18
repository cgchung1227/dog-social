import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
  Stack,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { SocialRecord } from '../types';

interface RecordFormProps {
  onSubmit: (record: Omit<SocialRecord, 'id'>) => void;
  initialData?: Omit<SocialRecord, 'id'>;
}

const defaultFormData: Omit<SocialRecord, 'id'> = {
  date: new Date(),
  otherDogName: '',
  otherDogGender: 'male',
  otherDogAge: '',
  location: '',
  interactionType: '',
  duration: 0,
  result: '',
  meetAgain: true,
  moodBefore: '',
  moodAfter: '',
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
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="日期"
          type="date"
          value={formData.date.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="對方狗狗名字"
          value={formData.otherDogName}
          onChange={(e) => setFormData({ ...formData, otherDogName: e.target.value })}
          required
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">對方狗狗性別</FormLabel>
          <RadioGroup
            row
            value={formData.otherDogGender}
            onChange={(e) => setFormData({ ...formData, otherDogGender: e.target.value as 'male' | 'female' })}
          >
            <FormControlLabel value="male" control={<Radio />} label="公" />
            <FormControlLabel value="female" control={<Radio />} label="母" />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          label="對方狗狗年齡"
          value={formData.otherDogAge}
          onChange={(e) => setFormData({ ...formData, otherDogAge: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="地點"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="互動類型"
          select
          value={formData.interactionType}
          onChange={(e) => setFormData({ ...formData, interactionType: e.target.value })}
          required
        >
          <MenuItem value="good">良好互動（玩耍）</MenuItem>
          <MenuItem value="normal">正常互動（互聞）</MenuItem>
          <MenuItem value="none">無互動</MenuItem>
          <MenuItem value="aggressive">激烈互動（吠叫、兇）</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="持續時間（分鐘）"
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          required
          inputProps={{ min: 1 }}
        />
        <TextField
          fullWidth
          label="互動結果"
          select
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
          required
        >
          <MenuItem value="happy">玩得開心</MenuItem>
          <MenuItem value="explosive">爆炸</MenuItem>
          <MenuItem value="frozen">定住</MenuItem>
          <MenuItem value="neutral">普通</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Switch
              checked={formData.meetAgain}
              onChange={(e) => setFormData({ ...formData, meetAgain: e.target.checked })}
            />
          }
          label="值得再見"
        />
        <TextField
          fullWidth
          label="斗宅情緒（互動前）"
          value={formData.moodBefore}
          onChange={(e) => setFormData({ ...formData, moodBefore: e.target.value })}
        />
        <TextField
          fullWidth
          label="斗宅情緒（互動後）"
          value={formData.moodAfter}
          onChange={(e) => setFormData({ ...formData, moodAfter: e.target.value })}
        />
        <TextField
          fullWidth
          label="備註"
          multiline
          rows={4}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">
          提交
        </Button>
      </Stack>
    </form>
  );
}; 