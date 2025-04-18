import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Dialog,
  Typography,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { SocialRecord } from '../types';
import { RecordForm } from './RecordForm';

interface RecordListProps {
  records: SocialRecord[];
  onUpdate: (id: string, record: Omit<SocialRecord, 'id'>) => void;
  onDelete: (id: string) => void;
}

const getGenderLabel = (gender: SocialRecord['gender']) => {
  return gender === 'male' ? '公' : '母';
};

const getNeuteredLabel = (neutered: SocialRecord['neutered']) => {
  switch (neutered) {
    case 'yes':
      return '已結紮';
    case 'no':
      return '未結紮';
    default:
      return '不確定';
  }
};

export const RecordList: React.FC<RecordListProps> = ({ records, onUpdate, onDelete }) => {
  const [editingRecord, setEditingRecord] = useState<SocialRecord | null>(null);

  const handleEdit = (record: SocialRecord) => {
    setEditingRecord(record);
  };

  const handleUpdate = (data: Omit<SocialRecord, 'id'>) => {
    if (editingRecord) {
      onUpdate(editingRecord.id, data);
      setEditingRecord(null);
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
                <Stack direction="row" spacing={0.5}>
                  <IconButton edge="end" onClick={() => handleEdit(record)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(record.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              }
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 2,
              }}
            >
              <Box sx={{ width: '100%', mb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {record.target}
                  </Typography>
                  <Chip
                    size="small"
                    label={getGenderLabel(record.gender)}
                    color={record.gender === 'male' ? 'primary' : 'secondary'}
                  />
                  <Chip
                    size="small"
                    label={getNeuteredLabel(record.neutered)}
                    variant="outlined"
                  />
                  {record.worthMeetingAgain && (
                    <Chip
                      size="small"
                      label="值得再見"
                      color="success"
                    />
                  )}
                </Stack>
              </Box>

              <Stack spacing={0.5} sx={{ width: '100%' }}>
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(record.date), 'yyyy/MM/dd')}
                </Typography>
                {record.age && (
                  <Typography variant="body2" color="text.secondary">
                    年齡：{record.age}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  初始互動：{record.initialInteraction}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  互動結果：{record.interactionResult}
                </Typography>
                {record.notes && (
                  <Typography variant="body2" color="text.secondary">
                    備註：{record.notes}
                  </Typography>
                )}
              </Stack>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog
        open={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        maxWidth="sm"
        fullWidth
        fullScreen
      >
        {editingRecord && (
          <RecordForm
            initialData={editingRecord}
            onSubmit={handleUpdate}
            onCancel={() => setEditingRecord(null)}
          />
        )}
      </Dialog>
    </>
  );
}; 