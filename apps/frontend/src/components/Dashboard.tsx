import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Speedometer from './Speedometer';
import BrakeLever from './BrakeLever';
import SignalLights from './SignalLights';
import EmergencyStop from './EmergencyStop';
import EnginePower from './EnginePower';
import InfoPanel from './InfoPanel';

interface DashboardProps {
  speed: number;
  unit: 'km/h' | 'mph';
  brake: number;
  signal: 'green' | 'yellow' | 'red';
  enginePower: boolean;
  log: string[];
  onBrakeChange?: (value: number) => void;
  onEnginePowerChange?: (enabled: boolean) => void;
  emergencyStopActive: boolean;
  readyToRestart: boolean;
  onEmergencyStop: () => void;
  onResetEmergencyStop: () => void;
  onRestartTrain: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  speed,
  unit,
  brake,
  signal,
  enginePower,
  log,
  onBrakeChange,
  onEnginePowerChange,
  emergencyStopActive,
  readyToRestart,
  onEmergencyStop,
  onResetEmergencyStop,
  onRestartTrain,
}) => (
  <Box
    sx={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 4,
      boxSizing: 'border-box',
    }}
  >
    <Box sx={{ width: '100%', maxWidth: 1200, px: 2 }}>
      {/* Top Controls */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
        }}
      >
        {/* Left */}
        <Paper elevation={3} sx={{ p: 3, flex: '1 1 300px', minHeight: 280 }}>
          <Speedometer speed={speed} unit={unit} />
        </Paper>

        {/* Center */}
        <Box sx={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper elevation={3} sx={{ p: 3, minHeight: 110 }}>
            <BrakeLever value={brake} onChange={onBrakeChange} />
          </Paper>
          <Paper elevation={3} sx={{ p: 3, minHeight: 110 }}>
            <EnginePower enabled={enginePower} onChange={onEnginePowerChange} />
          </Paper>
        </Box>

        {/* Right */}
        <Box sx={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper elevation={3} sx={{ p: 3, minHeight: 110 }}>
            <SignalLights status={signal} />
          </Paper>
          <Paper elevation={3} sx={{ p: 3, minHeight: 110 }}>
            <EmergencyStop
              emergencyStopActive={emergencyStopActive}
              speed={speed}
              readyToRestart={readyToRestart}
              onEmergencyStop={onEmergencyStop}
              onResetEmergencyStop={onResetEmergencyStop}
              onRestartTrain={onRestartTrain}
               brake={brake} 
            />
          </Paper>
        </Box>
      </Box>

      {/* Info Log */}
      <Paper elevation={3} sx={{ p: 3, minHeight: 140 }}>
        <InfoPanel log={log} />
      </Paper>
    </Box>
  </Box>
);

export default Dashboard;