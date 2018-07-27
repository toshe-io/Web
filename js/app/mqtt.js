var publicClientID = "TOSHE" + parseInt(Math.random() * 100, 10);
var publicBroker = "broker.mqttdashboard.com";
var publicBrokerPort = 8000;
var publicClient = new Paho.MQTT.Client(publicBroker, publicBrokerPort, publicClientID);

//Connect Options
var options = {
	timeout: 3,
	//Gets Called if the connection has sucessfully been established
	onSuccess: function () {
		publicOnConnected();
	},
	//Gets Called if the connection could not be established
	onFailure: function (message) {
		publicOnDisconnected(message.errorMessage);
	}
};

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
publicClient.onConnectionLost = function (message) {
	publicOnDisconnected(message.errorMessage);
};

//Gets called whenever you receive a message for your subscriptions
publicClient.onMessageArrived = function (message) {
	publicOnMessageArrived(message);
};

publicClient.connect(options);