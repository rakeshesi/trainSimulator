import React from 'react';
import { Paper, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface InfoPanelProps {
  log: string[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ log }) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ p: 2, minHeight: 120 }}>
      <Typography variant="subtitle2" gutterBottom>
        {t('Info Log')}
      </Typography>
      <Box sx={{ maxHeight: 100, overflowY: 'auto' }}>
        <List dense>
          {log.slice(-6).reverse().map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default InfoPanel;