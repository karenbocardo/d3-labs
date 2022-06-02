/*
*    main.js
*/
var margin = {top:10, right:10, bottom:100, left:100};
var width = 600;
var height = 400;
var svg = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/revenues.json").then((data)=> {
	data.forEach((d)=>{
		d.revenue = parseInt(d.revenue);
	});
    console.log(data);

    var max = d3.max(data, (d) => { return d.revenue; });
    
    var ls = data.map((d) => { return d.month; }) ;

    var x = d3.scaleBand()
        .domain(ls)
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    var y = d3.scaleLinear()
        .domain([max, 0])
        .range([0, height]);

    var color = d3.scaleOrdinal()
        .domain(ls)
        .range(d3.schemeSet3);

    var rects = g.selectAll("rect")
	    .data(data);

    w = 40;
    rects.enter()
        .append("rect")
            .attr("x", (d) => {
                return x(d.month);
            })
            .attr("y", (d) => {
                return y(d.revenue);
            })
            .attr("width", x.bandwidth())
            .attr("height", (d) => { return height - y(d.revenue); })
            .attr("fill", (d) => { return "orange"; })

    var bottomAxis = d3.axisBottom(x);
    g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", "20")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-20)");
    
    var yAxisCall = d3.axisLeft(y)
        .ticks(5)
	    .tickFormat((d) => { return d + "m"; });
            
    g.append("g")
    .attr("class", "left axis")
    .call(yAxisCall);
    
    g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, -50)")
    .text("Month");

    g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls.)");
        
}).catch((error)=> {
    console.log(error);
});