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

var createSidebarItem = function( id, title, icon ) {
	return $( '<li id="' + id + '"> <a id="' + id + '-link" class="btn-icon" href="#"> \
					<i id="' + id + '-icon" class="' + icon + '"></i> \
			   <h3>' + title + '</h3></a> </li>' );
}

var createChatItem = function( title, text, time ) {
return $('<div class="chat-box"> \
<h4 class="chat-box-title"> \
	' + title + ' \
</h4> \
\
<h3 class="chat-box-text"> \
	' + text + ' \
</h3> \
\
<h4 class="chat-box-time"> \
	' + time + ' \
</h4></div>')
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
							<a class="vote-send-btn btn-icon vote-step-previous" href="#"> <i class="fas fa-angle-left"></i></a> \
							<span class="vote-step-count">1</span> \
							<a class="vote-send-btn btn-icon vote-step-next" href="#"> <i class="fas fa-angle-right"></i></a> \
						</div> \
					</div>' );
}

var createVoteItem = function( text, link, likes, budget ) {
	return $('<div class="vote-box"> \
	<h4 class="vote-box-title"> \
		' + text + ' \
	</h4> \
	\
	<h3 class="vote-box-info"> \
		<a href="#"> <i class="far fa-thumbs-up vote-like-btn"></i> ' + likes + '</a> \
		<a href="#"> <i class="fas fa-dollar-sign vote-budget-btn"></i> ' + budget + '</a> \
		<a href="' + link + '" target="_blank"> <i class="fab fa-github vote-github-btn"></i></a> \
	</h3> \
	\
	</div>')
}

var createVoteSeparator = function( text ) {
	return $('<div class="vote-separator"> \
	<span> \
		' + text + ' \
	</span> \
	</div>')
}