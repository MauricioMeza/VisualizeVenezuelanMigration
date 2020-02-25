//BARCHAR
var rawData1 = `pais,v2018
Colombia,1630000
Peru,861000
Ecuador,385000
Chile,371000
USA,340000
España,320000
Brasil,253000
Argentina,182000`;

var rawData2 = `y,cantidad
2010,600000
2011,700000
2012,900000
2013,1000000
2014,1500000
2015,1800000
2016,2530000
2017,3000000
2018,4000000`;

function drawBarGraph(rawData){
    var svg = d3.select("#barChar")
    var margin = ({top: 20, right: 0, bottom: 0, left: 60});
    var data = d3.csvParse(rawData, ({pais, v2018}) => ({name: pais, value2018: v2018 })).sort((a, b) => b.value2018 - a.value2018);
    var height = data.length * 25 + margin.top + margin.bottom;
    var width = svg.style("width").replace("px", "");

    var x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value2018/(width/375))])
    .range([margin.left, width - margin.right]);

    var y = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.top, height - margin.bottom])
    .padding(0.1);

    var xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())

    var yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))

    var format = x.tickFormat(20);

    svg.append("g")
        .attr("fill", "DimGray")
    .selectAll("rect")
    .data(data)
    .join("rect")
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", d => (x(d.value2018) - x(0)))
        .attr("height", y.bandwidth());

    svg.append("g")
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .style("font", "12px sans-serif")
    .selectAll("text")
    .data(data)
    .join("text")
        .attr("x", d => x(d.value2018) + 52)
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => format(d.value2018));
        
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
}

//LINECHAR
function drawLineGraph(rawData){
	var data = d3.csvParse(rawData, ({y, cantidad}) => ({year: y, value: cantidad})).sort((a, b) => b.year - a.year)
    var svg = d3.select("#lineChar")
	var height = svg.style("height").replace("px", "")
	var width = svg.style("width").replace("px", "");
	
    var margin = ({top: 10, right: 13, bottom: 20, left: 60})

    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([margin.left, width - margin.right])
    var y = d3.scaleLinear()
        .domain([0, 4000000])
        .range([height - margin.bottom, margin.top])
    
    var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(10))
		
    var yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
    
    var curve = d3.curveLinear
    var area = d3.area()
        .curve(curve)
        .x(d => x(d.year))
        .y0(y(0))
        .y1(d => y(d.value))

    svg.append("path")
        .datum(data)
        .attr("fill", "DimGray")
        .attr("d", area);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);
}

drawBarGraph(rawData1);
drawLineGraph(rawData2)
