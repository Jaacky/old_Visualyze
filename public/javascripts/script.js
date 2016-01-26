function formatUserRow(user) {
	var email = user.email;
	var name;
	if (user.name) {
		name = user.name;
	} else {
		name = email;
	}
	console.log(email);
	console.log(name);

	return "<tr class='userRow' id='" + user._id + "'><td>" + email + "</td><td>" + name + "</td></tr>";
}

function submitForm(id) {
	$('#' + id).submit();
}

function userLoggedIn(user) {
	if ($('.user-nav') != undefined) {
		if ( !$('.user-nav').hasClass('loggedIn') ) {
			$('.user-nav').addClass('loggedIn');
			var email = user.email;
			var name;
			if (user.name) {
				name = user.name;
			} else {
				name = email;
			}
			$('#userName').html(name);
			$('#userImage').attr('src', "../" + user.image);
		}
	}
}

function userLoggedOut() {
	if ($('.user-nav') != undefined) {
		console.log("removee");
		$('.user-nav').removeClass('loggedIn');
	}
}

/* NOT NEEDED
function getGraphs(user) {
	var graphs = [];
	if (!user.graphs.length == 0) {
		for (var i=0; i < user.graphs.length; i++) {
			graphs.push(user.graphs[i]);
		}
	}
	console.log(graphs);
	return graphs;
}
*/

function formatGraphButton(graph) {
	return '<div class="col-sm-2 dashboard-graph">'
			+ '<a href="/graph/' + graph._id + '">'
				+ '<button class="btn btn-default btn-graph">'
					+ '<p>' + graph.name + '</p>'
				+ '</button>'
			+ '</a>';
			+ '</div>';
}

function appendGraphButtons(container, graphs) {
	for (var i=0; i<graphs.length; i++) {
		$(container).append(formatGraphButton(graphs[i]));
	}
}

var OPTIONS = {
	'graph-year-option' : 'year',
	'graph-month-option' : 'month',
	'graph-week-option' : 'week'
};

function getDataset(set, option) {
	if (OPTIONS[option] == 'year') {
		return set.getCurrentYear(true);
	} else if (OPTIONS[option] == 'month') {
		return set.getCurrentMonth(true);
	} else if (OPTIONS[option] == 'week') {
		return set.getCurrentWeek(true);
	} else { // not one of the options
		return [];
	}
}

/* NOT NEEDED 
function convertDateToDayNumber(date) {
	console.log(moment(date, 'x').format('DDD'));
	return parseInt(moment(date, 'x').format('DDD'));
}
*/

function Graph(container, dataset) {
	var width = 500,
		height = 300,
		padding = 30,
		xScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { //return convertDateToDayNumber(d[0]);
					return d[0];
				})])
				.range([padding, width - padding * 2]),
		yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return d[1]; })])
				.range([height - padding, padding]),
		xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom'),
		yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left');

	var svg = d3.select(container)
				.append('svg')
				.attr('width', width)
				.attr('height', height);

	svg.selectAll('circle')
		.data(dataset)
		.enter()
		.append('circle')
		.attr('cx', function(d) {
			// return xScale(convertDateToDayNumber(d[0]));
			return xScale(d[0]);
		})
		.attr('cy', function(d) {
			return yScale(d[1]);
		})
		.attr('r', 3);

	// svg.selectAll('text')
	// 	.data(dataset)
	// 	.enter()
	// 	.append('text')
	// 	.text(function(d) {
	// 		return d[0] + ", " + d[1];
	// 	})
	// 	.attr('x', function(d) {
	// 		// return xScale(convertDateToDayNumber(d[0]));
	// 		return xScale(d[0]);
	// 	})
	// 	.attr('y', function(d) {
	// 		return yScale(d[1]);
	// 	})
	// 	.attr('font-family', 'sans-serif')
	// 	.attr('font-size', '12px')
	// 	.attr('fill', 'teal');

	svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(0,' + (height - padding) + ')')
			.call(xAxis);

	svg.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(' + padding + ', 0)')
		.call(yAxis);
	return 0;
}

