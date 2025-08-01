import React, { useState } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { putTrainSettings } from '../api';

const unitsOptions = [
  { value: 'km/h', label: 'km/h' },
  { value: 'mph', label: 'mph' },
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
];

interface Settings {
  units: 'km/h' | 'mph';
  warning: number;
  critical: number;
  language: 'en' | 'de';
}

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState<Settings>({
    units: 'km/h',
    warning: 120,
    critical: 160,
    language: i18n.language as 'en' | 'de',
  });

  const handleChange = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (key === 'language') i18n.changeLanguage(value);
  };

  const handleSave = async () => {
    await putTrainSettings({
      units: settings.units,
      thresholds: { warning: settings.warning, critical: settings.critical },
      language: settings.language,
    });
    // Optionally show toast/snackbar
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>{t('Settings')}</Typography>
      <Box my={2}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t('Units')}</InputLabel>
          <Select
            value={settings.units}
            label={t('Units')}
            onChange={(e) => handleChange('units', e.target.value)}
          >
            {unitsOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label={t('Warning Threshold')}
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={settings.warning}
          onChange={(e) => handleChange('warning', Number(e.target.value))}
        />
        <TextField
          label={t('Critical Threshold')}
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={settings.critical}
          onChange={(e) => handleChange('critical', Number(e.target.value))}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t('Language')}</InputLabel>
          <Select
            value={settings.language}
            label={t('Language')}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            {languageOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {t('Save')}
        </Button>
      </Box>
    </Paper>
  );
};

export default SettingsPage;