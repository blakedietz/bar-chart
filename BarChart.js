function BarChart()
{
	// Default selector is the body
	var selector = "body";
	var data;

	var xScale,
		yScale;

	var yAxis,
		xAxis;

	var svg;

	// Chart Dimensions
	var margin  = {top: 20, right: 20, bottom: 20, left: 30};           
	var width   = 600 - margin.left - margin.right;
	var height  = 400 - margin.top  - margin.bottom;

	function barchart()
	{

	};

	barchart.createCanvas = function()
	{
		//Create SVG element
		svg = d3.select(selector)
		    .append("svg")
		    .attr("width",  width  + margin.right + margin.left)
		    .attr("height", height + margin.top   + margin.bottom);
	};

	barchart.createScales = function()
	{
		xScale = d3.scale.ordinal()
					.domain(data.map(function (d) 
					{
						return d.key; 
					}))
					.rangeRoundBands([margin.left, width], 0.4);

		yScale = d3.scale.linear()
		    .domain([0, d3.max(data, function(d) 
		    	{
		    		return d.val; 
		    	})])
		    .range([height,0]);
	};

	barchart.drawAxes = function()
	{
		xAxis = d3.svg.axis().scale(xScale).orient("bottom");
		yAxis = d3.svg.axis().scale(yScale).orient("left");

		// Add the x axis to the chart
		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0,"+ height +")")
		    .call(xAxis);

		// Add the yAxis to the chart
		svg.append("g")
		    .attr("class","y axis")
		.attr("transform", "translate(" + margin.left + ", 0 )")
		    .call(yAxis);
	};

	barchart.drawBars = function()
	{
		//Create bars
		svg.selectAll("rect")
		    .data(data)
	    		.enter().append("rect")
	    		    .attr("x", function(d, i) 
	    		    {
	    		        return xScale(d.key);
	    		    })
	    		    .attr("y", function(d) 
	    		    {
	    		        return yScale(d.val);
	    		    })
	    		    .attr("width", xScale.rangeBand())
	    		    .attr("height", function(d) 
	    		    {
	    		        return height - yScale(d.val);
	    			});
	};
		    
	barchart.data = function(datum)
	{
		if(!arguments.length)
		{
			return data;
		}
		else
		{
			data = datum;
		}
	};

	barchart.selector = function(sel)
	{
		if(!arguments.length)
		{
			return selector;
		}
		else
		{
			selector = sel;
		}
	};

	barchart.draw = function()
	{
		barchart.createCanvas();
		barchart.createScales();
		barchart.drawAxes();
		barchart.drawBars();
	};

	return barchart;
};