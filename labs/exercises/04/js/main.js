/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 500);

d3.json("buildings.json").then((data)=> {
	data.forEach((d)=>{
		d.height = parseInt(d.height);
	});
    console.log(data);

    var max = d3.max(data, (d) => { return d.height; });
    
    var buildings = data.map((d) => { return d.name; }) ;

    var x = d3.scaleBand()
        .domain(buildings)
        .range([0, 500])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([0, 500]);

    var color = d3.scaleOrdinal()
        .domain(buildings)
        .range(d3.schemeSet3);

    var rects = svg.selectAll("rect")
	    .data(data);

    w = 40;
    rects.enter()
        .append("rect")
            .attr("x", (d) => {
                return x(d.name);
            })
            .attr("y", (d) => {
                return 500 - y(d.height);
            })
            .attr("width", x.bandwidth())
            .attr("height", (d) => { return y(d.height); })
            .attr("fill", (d) => { return color(d.name); })
}).catch((error)=> {
    console.log(error);
});