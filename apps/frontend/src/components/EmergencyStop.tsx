import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTranslation } from 'react-i18next';

interface EmergencyStopProps {
  emergencyStopActive: boolean;
  speed: number;
  readyToRestart: boolean;
  onEmergencyStop: () => void;
  onResetEmergencyStop: () => void;
  onRestartTrain: () => void;
  brake: number;
}

const EmergencyStop: React.FC<EmergencyStopProps> = ({
  emergencyStopActive,
  speed,
  readyToRestart,
  onEmergencyStop,
  onResetEmergencyStop,
  onRestartTrain,
   brake,
}) => {
  const { t } = useTranslation();

  return (
    <Box textAlign="center" sx={{ py: 2 }}>
      <Typography variant="subtitle2">{t('Emergency Stop')}</Typography>
      {/* Emergency Stop Button */}
      {!emergencyStopActive && (
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<WarningIcon />}
          sx={{ minWidth: 160, py: 2, fontWeight: 'bold', fontSize: 18, mb: 1 }}
          onClick={onEmergencyStop}
        >
          {t('Emergency Stop')}
        </Button>
      )}
      {/* Reset Emergency Stop */}
      {emergencyStopActive && speed === 0 && !readyToRestart && (
        <Button
          variant="contained"
          color="warning"
          size="large"
          sx={{ minWidth: 160, py: 2, fontWeight: 'bold', fontSize: 18, mb: 1 }}
          onClick={onResetEmergencyStop}
        >
          {t('Reset Emergency Stop')}
        </Button>
      )}
      {/* Restart Train */}
 {readyToRestart && (
  <Button
    variant="contained"
    color="primary"
    size="large"
    startIcon={<PlayArrowIcon />}
    sx={{ minWidth: 160, py: 2, fontWeight: 'bold', fontSize: 18, mb: 1 }}
    onClick={onRestartTrain}
    disabled={brake !== 0} // <-- Add this line
  >
    {t('Restart Train')}
  </Button>
)}
    </Box>
  );
};

export default EmergencyStop;