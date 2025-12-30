import mqttClient from "../config/mqtt.js";

export const turnOn = (req, res) => {
  mqttClient.publish("home/device1", "ON");
  res.json({ message: "Device turned ON" });
};

export const turnOff = (req, res) => {
  mqttClient.publish("home/device1", "OFF");
  res.json({ message: "Device turned OFF" });
};
