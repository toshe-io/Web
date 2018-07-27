/* VARS */
var icon_publicBroker = "#broker-status-icon";

var vote_window = ".vote-window";

var topic_chat = "toshe/chat";

var chart_power = "#chart-power";

var getTimestamp = function() {
	return Math.floor(new Date().getTime()/1000);
}

var getTime = function(timestamp) {
	var date = new Date(timestamp*1000);

	return date.getHours() + ":" + date.getMinutes();
}

/* CHAT */

// TODO: Clean: chat-window, move to document ready
/*
 var chatSendMessage = function (id, action, text) {
	var payload = {"id": id, "action": action, "text": text, "time": getTimestamp()};
	
	var message = new Paho.MQTT.Message(JSON.stringify(payload));
	message.destinationName = topic_chat;
	message.qos = 0;
	message.retained = true;
	
	publicClient.send(message);
 }

var chatScrollBottom = function() {
	var chat = document.querySelector(".chat-window");
	chat.scroll({ top: chat.scrollHeight, left: 0, behavior: 'smooth' });
}

var chatAddMessage = function(clientID, text, time) {
	$(chat_window).append( createChatItem(clientID, text, time ) );
}

var chatReceivedMessage = function(json) {
	var clientID = json["id"];
	var action = json["action"];
	var text = json["text"];
	var time = getTime(json["time"]);
	
	if (action == "connected") {
		chatAddMessage(clientID, "Joined the chat", time);
	}
	else if (action == "disconnected") {
		chatAddMessage(clientID, "Left the chat", time);
	}
	else if (action == "text") {
		chatAddMessage(clientID, text, time);
	}
}

var chatSendMessageFromInput = function() {
	if ($(chat_inputText).val().length > 0) {
		chatSendMessage(publicClientID, "text", $(chat_inputText).val());
		$(chat_inputText).val("");
	}
}

$(document).on('keypress', chat_inputText, function (e) {
	if (e.keyCode === 13) {
		chatSendMessageFromInput();
	}
});

$(document).on('click', chat_inputSendBtn, function (e) {
	chatSendMessageFromInput();
});
*/

/* CHARTS */
var chartAdd = function(chartID, value) {
	var chart = $(chartID).highcharts();
	
	chart.series[0].addPoint([new Date().getTime(), x]);
}

/* VOTE */
var voteAdd = function(text, link, likes, budget) {
	$(vote_window).append( createVoteItem(text, link, likes, budget) );
}

var voteSeparator = function(text) {
	$(vote_window).append( createVoteSeparator(text) );
}