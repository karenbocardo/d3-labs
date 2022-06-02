/*
*    main.js
*/
var margin = {top:10, right:10, bottom:100, left:100};
var width = 600;
var height = 400;

var flag = true;

var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([height, 0]);

var g = d3.select("#chart-area")
.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

var xAxisGroup = g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")")

var yAxisGroup = g.append("g")
    .attr("class", "y axis")

var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls.)");

d3.json("data/revenues.json").then((data)=> {
	data.forEach((d)=>{
		d.revenue = +d.revenue;
        d.profit= +d.profit;
	});
    console.log(data);
    
    d3.interval( ( ) => { 
        update(data); 
        flag = !flag;
    }, 1000);
    update(data);

}).catch((error)=> {
    console.log(error);
});

var x = d3.scaleBand().range([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);

function update(data) {
    var value = flag ? "revenue" : "profit";

    var max = d3.max(data, (d) => { return d.revenue; });

    x.domain(data.map((d) => { return d.month; }));
    y.domain([0, d3.max(data, (d) => { return d.revenue; })]);

    var bottomAxis = d3.axisBottom(x);

    xAxisGroup.call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("filled", "white")
    .attr("text-anchor", "middle");

    var yAxisCall = d3.axisLeft(y)
        .ticks(10)
	    .tickFormat((d) => { return "$" + + d/1000 + "K"; });
    
    yAxisGroup.call(yAxisCall);

    g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 140)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, -70)")
    .text("Month");

    var label = flag ? "Revenue" : "Profit";
    yLabel.text(label)

    var rects = g.selectAll("rect")
	    .data(data);
    rects.exit().remove();

    rects.attr("x", (d) => { return x(d.month); })
	    .attr("y", (d) => { return y(d[value]); })
	    .attr("width", x.bandwidth)
	    .attr("height",(d) => { return height - y(d[value])});

    w = 40;
    rects.enter()
        .append("rect")
            .attr("x", (d) => {
                return x(d.month);
            })
            .attr("y", (d) => {
                return y(d[value]);
            })
            .attr("width", x.bandwidth())
            .attr("height", (d) => { return height - y(d[value]); })
            .attr("fill", (d) => { return "orange"; })
        
} 