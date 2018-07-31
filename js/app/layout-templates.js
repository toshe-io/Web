/* STATISTICS */
// TODO: Merge hightcharts single and multi into one method
var createHighchartsMulti = function( id, title, titleSeries1, titleSeries2, colorSeries1, colorSeries2, w, h ) {
	var elem = $( '<div style="" class="stats-box""></div>' );
	elem.append( $('<h3 class="stats-box-title">' + title + '</h3>') );

	var highchart = $('<div class="stats-highchart" id="' + id + '"></div>');
	elem.append (highchart);
	
	Highcharts.chart({
		chart: {
			backgroundColor: null,
			width: w,
			height: h,
			renderTo: highchart[0],
			type: 'line',
			animation: Highcharts.svg, // don't animate in old IE
			events: {

			}
		},
		title: {
			text: null
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
	var elem = $( '<div style="" class="stats-box""></div>' );
	elem.append( $('<h3 class="stats-box-title">' + title + '</h3>') );

	var highchart = $('<div class="stats-highchart" id="' + id + '"></div>');
	elem.append (highchart);
	
	Highcharts.chart({
		chart: {
			backgroundColor: null,
			width: w,
			height: h,
			renderTo: highchart[0],
			type: 'line',
			animation: Highcharts.svg, // don't animate in old IE
			events: {

			}
		},
		title: {
			text: null
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

var createGaugeMeter = function(id, title, label) {
	var elem = $( '<div class="stats-box stats-gauge"></div>' );
	elem.append( $('<h3 class="stats-box-title">' + title + '</h3>') );

	elem.append( $('<div class="gaugemeter" id="' + id + '" \
						data-id="' + id + '" \
						data-back="RGBa(255,255,255,.2)" \
						data-animate_gauge_colors="0" \
						data-animate_text_colors="false" \
						data-animationstep="0" \
						data-text_size="0.16" \
						data-size="130" \
						data-label_color="#ddd" \
						data-theme="Green-Red" \
						data-width="2"></div>').gaugeMeter() );
	
	return elem;
}

var updateGaugeMeter = function(id, percent, text, label="") {
	$("#"+id).gaugeMeter({text: text, label: label, percent: percent});
}

/* SIDEBAR */
var createSidebarItem = function( id, title, icon, link = "#" ) {
	return $( '<li id="' + id + '"> \
					<a id="' + id + '-link" class="btn-icon" href="' + link + '"> \
						<i id="' + id + '-icon" class="' + icon + '"></i> \
						   <h3 class="sideBarItem-title">' + title + '</h3> \
					</a> \
			   </li>' );
}

/* CHAT */
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

/* proposal */
var createproposalSendWindow = function() {
	return $( '<div class="proposal-send-window"> \
						<div class="proposal-input-text-box"> <input class="proposal-input-text" placeholder="Description" type="text" name"proposal-input-text"> </div> \
						<div class="proposal-send-btn-box"> \
							<a class="proposal-send-btn btn-icon proposal-step-previous" style="display: none;" href="#"> <i class="fas fa-angle-left"></i></a> \
							<span class="proposal-step-count">1</span> \
							<a class="proposal-send-btn btn-icon proposal-step-next" href="#"> <i class="fas fa-angle-right"></i></a> \
						</div> \
					</div>' );
}

var proposalIconForStatus = function( status ) {
	if ( status == "pending" )
		return "far fa-clock";
	else if ( status == "approved" )
		return "far fa-check-circle";
	else if ( status == "rejected" )
		return "far fa-times-circle";
}

var proposalColorForStatus = function( status ) {
	if ( status == "pending" )
		return "blue";
	else if ( status == "approved" )
		return "green";
	else if ( status == "rejected" )
		return "red";
}

var createproposalItem = function( id, text, link, status, likes, budget ) {
	var statusIc
	return $('<div id="proposal-box-' + id + '" class="proposal-box"></div>')
	.append( $('<h4 class="proposal-box-title"></h4>').text(text) )

	.append( 
		$('<h3 class="proposal-box-info"></h3>')
		.append( $('<a href="#" class="proposal-likes-btn"> <i class="far fa-thumbs-up blue"></i> <span>' + likes + '</span></a>') )
		.append( $('<a href="#" class="proposal-budget-btn"> <i class="fas fa-dollar-sign green"></i> <span>' + budget + '</span></a>') )
		.append( $('<a href="' + link + '" target="_blank" class="right" style="margin-right: 0px;"> \
						<i class="fab fa-github"></i> \
					</a>') )
		.append( $('<a href="#" class="right"> \
						<i class="' + proposalIconForStatus(status) + " " + proposalColorForStatus(status) + '"></i> \
					</a>') )
	)
}

var createproposalSeparator = function( timestamp ) {
	var date = moment.unix(timestamp);
	var month = date.format("MMMM");
	var year = date.format("YYYY");
	var dateClass = "proposal-separator-" + month + "-" + year;

	return $('<div class="proposal-separator ' + dateClass + '"> \
	<span> \
		' + month + ' \
	</span> \
	</div>')
}