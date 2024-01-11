import {
	MQTT_IP,
	MQTT_OPTIONS
} from './mqtt_config.js'
  var mqtt = require('mqtt/dist/mqtt.js')

function connectMQTTServer() {

	const client = mqtt.connect(MQTT_IP, MQTT_OPTIONS);
	console.log(client);
	return client;
}

export {
	connectMQTTServer,
}