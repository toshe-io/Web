var config = {
	dimensions: {
      borderWidth: 1
    },
	content: [{
		type: 'row',
		content: [
		{
			type: 'stack',
			width: 6,
			content: [{
				type: 'component',
				componentName: 'sideBar',
				componentState: { color: '#373e48' },
				header : {
					show: false
				}
			}]
		},
		
		{
			type: 'column',
			width: 70,
			content: [{
				type: 'component',
				componentName: 'tosheView',
				title: 'TOSHE View',
				height: 70,
			},
			{
				type: 'component',
				componentName: 'statistics',
				title: 'Statistics'
			}]
		}, 
		
		{
			type: 'stack',
			width: 25,
			content: [{
				type: 'component',
				componentName: 'chatWindow',
				title: 'Chat',
				height: 90
			},
			{
				type: 'component',
				componentName: 'voteWindow',
				title: 'Vote',
				height: 90
			}]
		}]
	}]
};

var appLayout = new GoldenLayout(config);

appLayout.registerComponent('testComponent', function() {});

appLayout.registerComponent('chatWindow', function( container, state ) {
	chatWindow = $( '<div class="chat-window"></div>' );

	container.getElement().append( chatWindow );
	container.getElement().append( createChatSendWindow() );
});

appLayout.registerComponent('voteWindow', function( container, state ) {
	voteWindow = $( '<div class="vote-window"></div>' );

	container.getElement().append( voteWindow );
	container.getElement().append( createVoteSendWindow() );
});

appLayout.registerComponent('tosheView', function( container, state ) {
	webstream = $( '<div class="tosheView"> \
						<img src="http://175.38.65.229:8081/"> \
					</body>' );
	container.getElement().append( webstream );
});

appLayout.registerComponent('sideBar', function( container, state ){
	container.getElement().css( 'background-color', state.color );
	
	menu = $( '<ul class="side-bar"></ul>' );
	menu.append( createSidebarItem("torp-status", "STATUS", "fas fa-power-off") );
	menu.append( createSidebarItem("broker-status", "BROKER", "fas fa-cloud") );
	menu.append( createSidebarItem("computer-status", "TOSHE", "fas fa-robot") );
	
	menuBottom = $( '<ul class="side-bar side-bar-bottom"></ul>' );
	menuBottom.append( createSidebarItem("github-link", "HELP", "far fa-question-circle") );
	menuBottom.append( createSidebarItem("github-link", "GITHUB", "fab fa-github") );
	
	container.getElement().append( menu );
	container.getElement().append( menuBottom );
});

appLayout.registerComponent('statistics', function( container, state ){
	statistics = $( '<div class="statistics-window"></div>' )
	
	statistics.append( createHighchartsSingle("chart-msg", "Messages per second", "#3498db", 300, 150) );
	statistics.append( createHighchartsMulti("chart-power", "Power Consumption", "12V rail", "5V rail", "#e74c3c", "#e67e22", 300, 150) );
	
	container.getElement().append( statistics );
});

appLayout.init();