const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let trainStatus = {
  speed: 70,
  brake: 0.5,
  signal: 'green',         // "green": go, "yellow": caution/ready, "red": stop
  enginePower: true,
  log: ["System initialized"],
  emergencyStopActive: false,
  readyToRestart: false
};

let settings = {
  units: 'km/h',
  thresholds: { warning: 120, critical: 160 },
  language: 'en'
};

app.get('/train/status', (req, res) => res.json(trainStatus));

app.post('/train/control', (req, res) => {
  // Emergency Stop logic
  if (req.body.emergencyStop && !trainStatus.emergencyStopActive) {
    trainStatus.emergencyStopActive = true;
    trainStatus.enginePower = false;
    trainStatus.signal = 'red'; // Must stop
    trainStatus.readyToRestart = false;
    trainStatus.log.push('Emergency stop triggered.');
  }

  // Reset emergency stop (can only reset when train is stopped)
  if (req.body.resetEmergencyStop && trainStatus.emergencyStopActive) {
    if (trainStatus.speed === 0) {
      trainStatus.readyToRestart = true;
      trainStatus.signal = 'yellow'; // Inspection/recharge done, ready to restart
      trainStatus.log.push('Emergency stop reset. Train ready for restart.');
    } else {
      trainStatus.log.push('Cannot reset emergency stop until train has fully stopped.');
    }
  }

  // Restart train (only if reset is complete)
  if (req.body.restartTrain && trainStatus.readyToRestart) {
    if (trainStatus.brake === 0) {
      trainStatus.emergencyStopActive = false;
      trainStatus.enginePower = true;
      trainStatus.readyToRestart = false;
      trainStatus.signal = 'green'; // Back to normal operation
      trainStatus.log.push('Train restarted after emergency stop.');
    } else {
      trainStatus.log.push('Cannot restart train: Brake lever must be fully released.');
    }
  } else if (req.body.restartTrain && !trainStatus.readyToRestart) {
    trainStatus.log.push('Cannot restart train until emergency reset is completed.');
  }

  // Allow changing other controls except signal and enginePower (which are managed by logic above)
  // You may allow brake or other simple controls here if needed:
  if (req.body.brake !== undefined) trainStatus.brake = req.body.brake;

  trainStatus.log.push(`Control changed: ${JSON.stringify(req.body)}`);
  res.json({ success: true, status: trainStatus });
});

app.put('/train/settings', (req, res) => {
  Object.assign(settings, req.body);
  trainStatus.log.push(`Settings changed: ${JSON.stringify(req.body)}`);
  res.json({ success: true, settings });
});

// --- WebSocket for real-time updates ---
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

setInterval(() => {
  const maxSpeed = settings.thresholds.critical || 300;
  const warningSpeed = settings.thresholds.warning || 120;

  // 1. Emergency stop: decelerate rapidly, engine off, signal red
  if (trainStatus.emergencyStopActive) {
    if (trainStatus.speed > 0) {
      trainStatus.speed = Math.max(0, trainStatus.speed - 6); // rapid deceleration
    }
    trainStatus.enginePower = false;
    trainStatus.signal = 'red';
  }
  // 2. Ready to restart after emergency stop: signal yellow
  else if (trainStatus.readyToRestart) {
    trainStatus.signal = 'yellow'; // Inspection/recharge done, ready to restart
  }
  // 3. Engine off (not emergency): signal yellow
  else if (!trainStatus.enginePower) {
    if (trainStatus.speed > 0) {
      trainStatus.speed = Math.max(0, trainStatus.speed - 1);
    }
    trainStatus.signal = 'yellow'; // caution, train is coasting to stop
  }
  // 4. Brake applied and train moving: signal yellow if brake is significant
  else if (trainStatus.brake >= 0.3 && trainStatus.speed > 0) { // threshold for realistic caution
    // Apply brake force if brake lever is used and speed > 0
    const brakeForce = trainStatus.brake * 4; // '4' can be tuned for realism
    trainStatus.speed = Math.max(0, trainStatus.speed - brakeForce);
    trainStatus.signal = 'yellow'; // show caution signal when braking
  }
  // 5. Normal operation: signal green
  else if (trainStatus.enginePower && trainStatus.speed >= 0) {
    trainStatus.signal = 'green';
    // Accelerate, but clamp to maximum allowed speed
    const accel = Math.random() * 1.5;
    trainStatus.speed = Math.min(maxSpeed, trainStatus.speed + accel);

    // Warnings and critical log
    if (trainStatus.speed > warningSpeed && trainStatus.speed <= maxSpeed) {
      trainStatus.log.push(`Warning: Train speed high (${trainStatus.speed.toFixed(1)} ${settings.units})`);
    }
    if (trainStatus.speed > maxSpeed) {
      trainStatus.log.push(`Critical: Train speed exceeded safe limit! (${trainStatus.speed.toFixed(1)} ${settings.units})`);
    }
  }

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(trainStatus));
    }
  });
}, 1000);

server.listen(4000, () => console.log('Mock backend running on http://localhost:4000'));