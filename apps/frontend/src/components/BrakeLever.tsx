import React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface BrakeLeverProps {
  value: number; // 0 (released) to 1 (full brake)
  onChange?: (value: number) => void;
  disabled?: boolean; // optional for emergency stop
}

const BrakeLever: React.FC<BrakeLeverProps> = ({ value, onChange, disabled }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2">{t('Brake')}</Typography>
      <Slider
        value={value * 100}
        onChange={(_, v) => onChange && onChange(Number(v) / 100)}
        min={0}
        max={100}
        step={1}
        aria-label="Brake Lever"
        data-testid="brake-lever"
        marks={[
          { value: 0, label: t('Release') },
          { value: 50, label: t('Service') },
          { value: 100, label: t('Full') },
        ]}
        disabled={disabled}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {t('Brake Force')}: {(value * 100).toFixed(0)}%
      </Typography>
    </Box>
  );
};

export default BrakeLever;