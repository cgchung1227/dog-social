import React, { useState } from 'react';
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
  Stack,
  Box,
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
    case 'play':
      return '玩耍';
    case 'walk':
      return '散步';
    case 'training':
      return '訓練';
    default:
      return type;
  }
};

const getDurationLabel = (duration: number) => {
  return `${duration} 分鐘`;
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
                    {record.dogName} 與 {record.otherDogName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(record.date), 'yyyy-MM-dd')} - {record.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    互動類型: {getInteractionTypeLabel(record.interactionType)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    持續時間: {getDurationLabel(record.duration)}
                  </Typography>
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
                label="狗狗名字"
                value={editFormData.dogName}
                onChange={(e) => setEditFormData({ ...editFormData, dogName: e.target.value })}
                fullWidth
              />
              <TextField
                label="對方狗狗名字"
                value={editFormData.otherDogName}
                onChange={(e) => setEditFormData({ ...editFormData, otherDogName: e.target.value })}
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
                <MenuItem value="play">玩耍</MenuItem>
                <MenuItem value="walk">散步</MenuItem>
                <MenuItem value="training">訓練</MenuItem>
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