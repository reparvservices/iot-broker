import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883",{ 
  username: "backend_user",
  password: "reparv01",
});

client.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");
});

client.on("error", (err) => {
  console.log("MQTT Error:", err);
});

export default client;
