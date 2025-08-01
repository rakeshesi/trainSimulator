import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const getTrainStatus = async () => (await axios.get(`${BASE_URL}/train/status`)).data;
export const postTrainControl = async (data: any) => (await axios.post(`${BASE_URL}/train/control`, data)).data;
export const putTrainSettings = async (data: any) => (await axios.put(`${BASE_URL}/train/settings`, data)).data;

// WebSocket for realtime updates
export const subscribeTrainStatus = (callback: (data: any) => void) => {
  const ws = new WebSocket('ws://localhost:4000');
  ws.onmessage = event => callback(JSON.parse(event.data));
  return ws;
};