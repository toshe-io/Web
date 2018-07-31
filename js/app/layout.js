var config = {
	dimensions: {
	  borderWidth: 1,
	  minItemWidth: 50
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
				title: 'TOSHE Statistics'
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
				componentName: 'proposalWindow',
				title: 'Proposals',
				height: 90
			}]
		}]
	}]
};

// appLayout.root.contentItems[0].contentItems[2].contentItems[0] chat
// appLayout.root.contentItems[0].contentItems[2].contentItems[1] proposals

// appLayout.root.contentItems[0].contentItems[2].contentItems[0].parent.addChild(
//	appLayout.root.contentItems[0].contentItems[0].contentItems[0], 0)

// appLayout.root.contentItems[0].contentItems[1].contentItems[1].contentItems[0].config stats
// appLayout.root.contentItems[0].contentItems[1].contentItems[1].contentItems[0].parent.addChild(appLayout.root.contentItems[0].contentItems[2].contentItems[0])

var appLayout = new GoldenLayout(config);

appLayout.registerComponent('testComponent', function() {});

appLayout.registerComponent('chatWindow', function( container, state ) {
	chatWindow = $( '<div class="chat-window"></div>' );

	container.getElement().append( chatWindow );
	container.getElement().append( createChatSendWindow() );
});

appLayout.registerComponent('proposalWindow', function( container, state ) {
	proposalWindow = $( '<div class="proposal-window"></div>' );

	container.getElement().append( proposalWindow );
	container.getElement().append( createproposalSendWindow() );
});

appLayout.registerComponent('tosheView', function( container, state ) {
	webstream = $( '<div class="tosheView"> \
						<div class="tosheView-box"><img src="http://175.38.65.229:8081/"></div> \
						<div class="tosheView-box tosheView-status"><i class="fas fa-spin fa-cog tosheView-status-icon"></i><i class="fas fa-robot"></i></div> \
					</body>' );
	container.getElement().append( webstream );
});

appLayout.registerComponent('sideBar', function( container, state ){
	container.getElement().css( 'background-color', state.color );
	
	menu = $( '<ul class="side-bar"></ul>' );
	menu.append( createSidebarItem("api-status", "API", "fas fa-server") );
	menu.append( createSidebarItem("toshe-status", "TOSHE", "fas fa-robot") );
	
	menuBottom = $( '<ul class="side-bar side-bar-bottom"></ul>' );
	menuBottom.append( createSidebarItem("github-link", "HELP", "far fa-question-circle") );
	menuBottom.append( createSidebarItem("github-link", "GITHUB", "fab fa-github", "https://github.com/toshe-io") );
	
	container.getElement().append( menu );
	container.getElement().append( menuBottom );
});

appLayout.registerComponent('statistics', function( container, state ){
	statistics = $( '<div class="statistics-window"></div>' );
	
	statistics.append( createHighchartsSingle("chart-msg", "Messages per second", "#3498db", 300, 150) );
	statistics.append( createHighchartsMulti("chart-power", "Power Consumption", "12V rail", "5V rail", "#e74c3c", "#e67e22", 300, 150) );

	statistics.append( createGaugeMeter("gauge-toshe-user", "Current user lease", "The Winner of them all") );
	
	container.getElement().append( statistics );
});

appLayout.init();