/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var data = [25, 20, 15, 10, 5];

var rects = svg.selectAll("rect")
	.data(data);

w = 40;
rects.enter()
    .append("rect")
        .attr("x", (d, i) => {
            return i * (w + 10);
        })
        .attr("y", (d, i) => {
            return i;
        })
        .attr("width", w)
        .attr("height", (d) => { return d; })
        .attr("fill", "green");