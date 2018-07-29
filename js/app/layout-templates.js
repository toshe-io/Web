// TODO: Merge hightcharts single and multi into one method
var createHighchartsMulti = function( id, title, titleSeries1, titleSeries2, colorSeries1, colorSeries2, w, h ) {
	var elem = $( '<div style="" class="stats-highchart" id="' + id + '"></div>' );
	
	Highcharts.chart({
		chart: {
			backgroundColor: null,
			width: w,
			height: h,
			renderTo: elem[0],
			type: 'line',
			animation: Highcharts.svg, // don't animate in old IE
			events: {

			}
		},
		title: {
			text: title,
			style: {
				color: '#e2e3e4'
			}
		},
		xAxis: {
			visible: false
		},
		yAxis: {
			gridLineColor: null,
			title: {
				text: null
			},
			labels: {
				style: {
					color: "#4e5969",
				}
			},
		},
		tooltip: {
			pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.y} W<br/>',
			valueDecimals: 2,
			split: true
		},
		legend: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		plotOptions: {
			line: {
				marker: {
					enabled: false
				}
			}
		},
		series: [{
			color: colorSeries1,
			name: titleSeries1,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: Math.floor(Math.random() * 1000)
					});
				}
				return data;
			}())
		},
		{
			color: colorSeries2,
			name: titleSeries2,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: Math.floor(Math.random() * 1000)
					});
				}
				return data;
			}())
		}]
	});
	
	return elem;
}

var createHighchartsSingle = function( id, title, color, w, h ) {
	var elem = $( '<div style="" class="stats-highchart" id="' + id + '"></div>' );
	
	Highcharts.chart({
		chart: {
			backgroundColor: null,
			width: w,
			height: h,
			renderTo: elem[0],
			type: 'line',
			animation: Highcharts.svg, // don't animate in old IE
			events: {

			}
		},
		title: {
			text: title,
			style: {
				color: '#e2e3e4'
			}
		},
		xAxis: {
			visible: false
		},
		yAxis: {
			gridLineColor: null,
			title: {
				text: null
			},
			labels: {
				style: {
					color: "#4e5969",
				}
			},
		},
		tooltip: {
			formatter: function () {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		plotOptions: {
			line: {
				marker: {
					enabled: false
				}
			}
		},
		series: [{
			color: color,
			name: title,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: Math.floor(Math.random() * 1000)
					});
				}
				return data;
			}())
		}]
	});
	
	return elem;
}

var createSidebarItem = function( id, title, icon, link = "#" ) {
	return $( '<li id="' + id + '"> \
					<a id="' + id + '-link" class="btn-icon" href="' + link + '"> \
						<i id="' + id + '-icon" class="' + icon + '"></i> \
						   <h3>' + title + '</h3> \
					</a> \
			   </li>' );
}

var createChatItem = function( title, text, time ) {
	return $('<div class="chat-box"></div>')
	.append( $('<h4 class="chat-box-title"></h4>').text(title) )
	.append( $('<h4 class="chat-box-text"></h4>').text(text) )
	.append( $('<h4 class="chat-box-time"></h4>').text(time) );
}

var createChatSendWindow = function() {
	return $( '<div class="chat-send-window"> \
						<div class="chat-input-text-box"> <input class="chat-input-text" placeholder="Message" type="text" name"chat-input-text"> </div> \
						<div class="chat-send-btn-box"> <a class="chat-send-btn btn-icon" href="#"> <i class="fas fa-angle-right"></i></a> </div> \
					</div>' );
}

/* VOTE */
var createVoteSendWindow = function() {
	return $( '<div class="vote-send-window"> \
						<div class="vote-input-text-box"> <input class="vote-input-text" placeholder="Description" type="text" name"vote-input-text"> </div> \
						<div class="vote-send-btn-box"> \
							<a class="vote-send-btn btn-icon vote-step-previous" style="display: none;" href="#"> <i class="fas fa-angle-left"></i></a> \
							<span class="vote-step-count">1</span> \
							<a class="vote-send-btn btn-icon vote-step-next" href="#"> <i class="fas fa-angle-right"></i></a> \
						</div> \
					</div>' );
}

var voteIconForStatus = function( status ) {
	if ( status == "pending" )
		return "far fa-clock";
	else if ( status == "approved" )
		return "far fa-check-circle";
	else if ( status == "rejected" )
		return "far fa-times-circle";
}

var voteColorForStatus = function( status ) {
	if ( status == "pending" )
		return "blue";
	else if ( status == "approved" )
		return "green";
	else if ( status == "rejected" )
		return "red";
}

var createVoteItem = function( id, text, link, status, likes, budget ) {
	var statusIc
	return $('<div id="vote-box-' + id + '" class="vote-box"></div>')
	.append( $('<h4 class="vote-box-title"></h4>').text(text) )

	.append( 
		$('<h3 class="vote-box-info"></h3>')
		.append( $('<a href="#" class="vote-likes-btn"> <i class="far fa-thumbs-up blue"></i> <span>' + likes + '</span></a>') )
		.append( $('<a href="#" class="vote-budget-btn"> <i class="fas fa-dollar-sign green"></i> <span>' + budget + '</span></a>') )
		.append( $('<a href="' + link + '" target="_blank" class="right" style="margin-right: 0px;"> \
						<i class="fab fa-github"></i> \
					</a>') )
		.append( $('<a href="#" class="right"> \
						<i class="' + voteIconForStatus(status) + " " + voteColorForStatus(status) + '"></i> \
					</a>') )
	)
}

var createVoteSeparator = function( timestamp ) {
	var date = moment.unix(timestamp);
	var month = date.format("MMMM");
	var year = date.format("YYYY");
	var dateClass = "vote-separator-" + month + "-" + year;

	return $('<div class="vote-separator ' + dateClass + '"> \
	<span> \
		' + month + ' \
	</span> \
	</div>')
}