import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import EmergencyStop from "../components/EmergencyStop";
import { getTrainStatus, subscribeTrainStatus, postTrainControl } from "../api";

interface TrainStatus {
  speed: number;
  unit: "km/h" | "mph";
  brake: number;
  signal: "green" | "yellow" | "red";
  enginePower: boolean;
  log: string[];
  emergencyStopActive: boolean;
  readyToRestart: boolean;
}

const DashboardPage: React.FC = () => {
  const [status, setStatus] = useState<TrainStatus | null>(null);

  useEffect(() => {
    getTrainStatus().then(setStatus);
    const ws = subscribeTrainStatus(setStatus);
    return () => ws.close();
  }, []);

  const handleBrake = async (value: number) => {
    await postTrainControl({ brake: value });
  };

  const handleEnginePower = async (enabled: boolean) => {
    await postTrainControl({ enginePower: enabled });
  };

  const handleEmergencyStop = async () => {
    await postTrainControl({ emergencyStop: true });
  };

  const handleResetEmergencyStop = async () => {
    await postTrainControl({ resetEmergencyStop: true });
  };

  const handleRestartTrain = async () => {
    await postTrainControl({ restartTrain: true });
  };

  if (!status) return <div>Loading...</div>;

  return (
    <div>
      <Dashboard
        speed={status.speed}
        unit={status.unit || "km/h"}
        brake={status.brake}
        signal={status.signal}
        enginePower={status.enginePower}
        log={status.log}
        onBrakeChange={handleBrake}
        onEnginePowerChange={handleEnginePower}
        emergencyStopActive={status.emergencyStopActive}
        readyToRestart={status.readyToRestart}
        onEmergencyStop={handleEmergencyStop}
        onResetEmergencyStop={handleResetEmergencyStop}
        onRestartTrain={handleRestartTrain}
      />
      {/* <EmergencyStop
        emergencyStopActive={status.emergencyStopActive}
        speed={status.speed}
        readyToRestart={status.readyToRestart}
        onEmergencyStop={handleEmergencyStop}
        onResetEmergencyStop={handleResetEmergencyStop}
        onRestartTrain={handleRestartTrain}
      /> */}
    </div>
  );
};

export default DashboardPage;
