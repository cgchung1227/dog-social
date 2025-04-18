import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { SocialRecord } from '../types';

interface RecordListProps {
  records: SocialRecord[];
  onUpdate: (id: string, updatedRecord: SocialRecord) => void;
  onDelete: (id: string) => void;
}

const getInteractionTypeLabel = (type: string) => {
  switch (type) {
    case 'good':
      return '良好互動（玩耍）';
    case 'normal':
      return '正常互動（互聞）';
    case 'none':
      return '無互動';
    case 'aggressive':
      return '激烈互動（吠叫、兇）';
    default:
      return type;
  }
};

const getResultLabel = (result: string) => {
  switch (result) {
    case 'happy':
      return '玩得開心';
    case 'explosive':
      return '爆炸';
    case 'frozen':
      return '定住';
    case 'neutral':
      return '普通';
    default:
      return result;
  }
};

const getDurationLabel = (duration: number) => {
  return `${duration} 分鐘`;
};

const getGenderLabel = (gender: 'male' | 'female') => {
  return gender === 'male' ? '公' : '母';
};

export const RecordList = ({ records, onUpdate, onDelete }: RecordListProps) => {
  const [editingRecord, setEditingRecord] = useState<SocialRecord | null>(null);
  const [editFormData, setEditFormData] = useState<SocialRecord | null>(null);

  const handleEditClick = (record: SocialRecord) => {
    setEditingRecord(record);
    setEditFormData({ ...record });
  };

  const handleEditSubmit = () => {
    if (editFormData && editingRecord) {
      onUpdate(editingRecord.id, editFormData);
      setEditingRecord(null);
      setEditFormData(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('確定要刪除這筆記錄嗎？')) {
      onDelete(id);
    }
  };

  return (
    <>
      <Paper>
        <List>
          {records.map((record) => (
            <ListItem
              key={record.id}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => handleEditClick(record)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteClick(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">
                    與 {record.otherDogName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(record.date), 'yyyy-MM-dd')} - {record.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    對方狗狗: {record.otherDogName} ({getGenderLabel(record.otherDogGender)}, {record.otherDogAge})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    互動類型: {getInteractionTypeLabel(record.interactionType)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    持續時間: {getDurationLabel(record.duration)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    互動結果: {getResultLabel(record.result)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    值得再見: {record.meetAgain ? '是' : '否'}
                  </Typography>
                  {record.moodBefore && (
                    <Typography variant="body2" color="text.secondary">
                      斗宅情緒（前）: {record.moodBefore}
                    </Typography>
                  )}
                  {record.moodAfter && (
                    <Typography variant="body2" color="text.secondary">
                      斗宅情緒（後）: {record.moodAfter}
                    </Typography>
                  )}
                  {record.notes && (
                    <Typography variant="body2" color="text.secondary">
                      備註: {record.notes}
                    </Typography>
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={!!editingRecord} onClose={() => setEditingRecord(null)}>
        <DialogTitle>編輯記錄</DialogTitle>
        <DialogContent>
          {editFormData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="日期"
                type="date"
                value={editFormData.date.toISOString().split('T')[0]}
                onChange={(e) => setEditFormData({ ...editFormData, date: new Date(e.target.value) })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="對方狗狗名字"
                value={editFormData.otherDogName}
                onChange={(e) => setEditFormData({ ...editFormData, otherDogName: e.target.value })}
                fullWidth
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">對方狗狗性別</FormLabel>
                <RadioGroup
                  row
                  value={editFormData.otherDogGender}
                  onChange={(e) => setEditFormData({ ...editFormData, otherDogGender: e.target.value as 'male' | 'female' })}
                >
                  <FormControlLabel value="male" control={<Radio />} label="公" />
                  <FormControlLabel value="female" control={<Radio />} label="母" />
                </RadioGroup>
              </FormControl>
              <TextField
                label="對方狗狗年齡"
                value={editFormData.otherDogAge}
                onChange={(e) => setEditFormData({ ...editFormData, otherDogAge: e.target.value })}
                fullWidth
              />
              <TextField
                label="地點"
                value={editFormData.location}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                fullWidth
              />
              <TextField
                label="互動類型"
                select
                value={editFormData.interactionType}
                onChange={(e) => setEditFormData({ ...editFormData, interactionType: e.target.value })}
                fullWidth
              >
                <MenuItem value="good">良好互動（玩耍）</MenuItem>
                <MenuItem value="normal">正常互動（互聞）</MenuItem>
                <MenuItem value="none">無互動</MenuItem>
                <MenuItem value="aggressive">激烈互動（吠叫、兇）</MenuItem>
              </TextField>
              <TextField
                label="持續時間（分鐘）"
                type="number"
                value={editFormData.duration}
                onChange={(e) => setEditFormData({ ...editFormData, duration: Number(e.target.value) })}
                fullWidth
                inputProps={{ min: 1 }}
              />
              <TextField
                label="互動結果"
                select
                value={editFormData.result}
                onChange={(e) => setEditFormData({ ...editFormData, result: e.target.value })}
                fullWidth
              >
                <MenuItem value="happy">玩得開心</MenuItem>
                <MenuItem value="explosive">爆炸</MenuItem>
                <MenuItem value="frozen">定住</MenuItem>
                <MenuItem value="neutral">普通</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Switch
                    checked={editFormData.meetAgain}
                    onChange={(e) => setEditFormData({ ...editFormData, meetAgain: e.target.checked })}
                  />
                }
                label="值得再見"
              />
              <TextField
                label="斗宅情緒（互動前）"
                value={editFormData.moodBefore}
                onChange={(e) => setEditFormData({ ...editFormData, moodBefore: e.target.value })}
                fullWidth
              />
              <TextField
                label="斗宅情緒（互動後）"
                value={editFormData.moodAfter}
                onChange={(e) => setEditFormData({ ...editFormData, moodAfter: e.target.value })}
                fullWidth
              />
              <TextField
                label="備註"
                multiline
                rows={4}
                value={editFormData.notes}
                onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingRecord(null)}>取消</Button>
          <Button onClick={handleEditSubmit} variant="contained">儲存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 