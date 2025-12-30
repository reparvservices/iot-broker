import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883",{ 
  username: process.env.MOSQUITTO_USERNAME,
  password: process.env.MOSQUITTO_PASSWROD,
});

client.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");
});

client.on("error", (err) => {
  console.log("MQTT Error:", err);
});

export default client;
