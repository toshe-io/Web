/* VARS */
var icon_publicBroker = "#broker-status-icon";

var vote_window = ".vote-window";

var topic_chat = "toshe/chat";

var chart_power = "#chart-power";

const monthNameShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var getTimestamp = function() {
	return Math.floor(new Date().getTime()/1000);
}

var getTime = function(timestamp) {
	var currentTime = new Date().getTime()/1000;
	
	// Show full date if bigger than 24H
	if (currentTime > (timestamp + 60 * 60 * 24) ) {
		return moment.unix(timestamp).format("MMM DD, HH:mm");
	}

	return moment.unix(timestamp).format("HH:mm");
}

/* CHARTS */
var chartAdd = function(chartID, value) {
	var chart = $(chartID).highcharts();
	
	chart.series[0].addPoint([new Date().getTime(), x]);
}