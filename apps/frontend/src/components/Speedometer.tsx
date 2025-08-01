import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SpeedometerProps {
  speed: number;
  unit: 'km/h' | 'mph';
  maxSpeed?: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ speed, unit, maxSpeed = 200 }) => {
  const { t } = useTranslation();
  const percent = Math.min(100, (speed / maxSpeed) * 100);

  return (
    <Box textAlign="center" sx={{ py: 2 }}>
      <CircularProgress
        variant="determinate"
        value={percent}
        thickness={6}
        size={120}
        sx={{ color: percent > 80 ? 'error.main' : 'primary.main' }}
      />
      <Typography variant="h4" sx={{ mt: 2 }}>
        {speed.toFixed(1)} {t(unit)}
      </Typography>
      <Typography variant="subtitle2">{t('Speedometer')}</Typography>
    </Box>
  );
};

export default Speedometer;