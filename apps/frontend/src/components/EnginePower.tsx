import React from 'react';
import { Switch, Box, Typography } from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import { useTranslation } from 'react-i18next';

interface EnginePowerProps {
  enabled: boolean;
  onChange?: (state: boolean) => void;
}

const EnginePower: React.FC<EnginePowerProps> = ({ enabled, onChange }) => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center" sx={{ py: 2 }}>
      <Typography variant="subtitle2">
        <PowerIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        {t('Engine Power')}
      </Typography>
      <Switch
        checked={enabled}
        onChange={(_, checked) => onChange && onChange(checked)}
        color="primary"
        inputProps={{ 'aria-label': 'engine power toggle' }}
      />
      <Typography variant="body2">{enabled ? t('On') : t('Off')}</Typography>
    </Box>
  );
};

export default EnginePower;