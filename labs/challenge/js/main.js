/*
*    main.js
*/

/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 2000)
	.attr("height", 2000);

d3.json("buildings.json").then((data)=> {
    var h = []
	data.forEach((d)=>{
		d.height = +d.height;
        h.push(d.height);
	});
    console.log(data);

    var rects = svg.selectAll("rect")
	    .data(data);

    var max = Math.max.apply(Math, h);

    w = 40;
    rects.enter()
        .append("rect")
            .attr("x", (d, i) => {
                return 40 * i + 40 * i * 0.5 + 20;
            })
            .attr("y", (d, i) => {
                return max - d.height;
            })
            .attr("width", w)
            .attr("height", (d) => { return d.height; })
            .attr("fill", "green");
}).catch((error)=> {
    console.log(error);
});