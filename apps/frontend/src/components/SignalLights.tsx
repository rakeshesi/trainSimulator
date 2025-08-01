import React from 'react';
import { Box, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useTranslation } from 'react-i18next';

type Signal = 'green' | 'yellow' | 'red';

interface SignalLightsProps {
  status: Signal;
}

const signalColors = {
  green: '#43a047',
  yellow: '#fbc02d',
  red: '#e53935',
};

const SignalLights: React.FC<SignalLightsProps> = ({ status }) => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center" sx={{ py: 2 }}>
      <Typography variant="subtitle2">{t('Signal')}</Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        {(['green', 'yellow', 'red'] as Signal[]).map((s) => (
          <FiberManualRecordIcon
            key={s}
            sx={{
              color: signalColors[s],
              opacity: status === s ? 1 : 0.3,
              fontSize: 40,
            }}
            titleAccess={t(s)}
          />
        ))}
      </Box>
      <Typography variant="body2">{t(status)}</Typography>
    </Box>
  );
};

export default SignalLights;