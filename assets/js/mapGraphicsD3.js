//BARCHA
addText(2010)
changeCountries(5)

function drawBarGraph(csvRef){
    d3.selectAll("svg > *").remove()  
    var svg = d3.select("#barChar")
    var margin = ({top: 20, right: 0, bottom: 0, left: 60});
    $.get(csvRef, function(rawData) {
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
        });
}

//LINECHAR
function drawLineGraph(rawData, ano){
	var data = d3.csvParse(rawData, ({y, cantidad}) => ({year: y, value: cantidad})).sort((a, b) => b.year - a.year)
    var svg = d3.select("#lineChar")
	var height = svg.style("height").replace("px", "")
	var width = svg.style("width").replace("px", "");
	
    var margin = ({top: 10, right: 13, bottom: 20, left: 60})

    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([margin.left, width - margin.right])


    if(ano<2014){
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.value})])
        .range([height - margin.bottom, margin.top])
    }else{
        var fuckItWellDoItLive
        switch(ano){
            case 2014:
                fuckItWellDoItLive = 12831
                break;
            case 2015:
                fuckItWellDoItLive = 22548
                break;
            case 2016:
                fuckItWellDoItLive = 52626
                break;
            case 2017:
                fuckItWellDoItLive = 502806
                break;
            case 2018:
                fuckItWellDoItLive = 3078183
                break;
            case 2019:
                fuckItWellDoItLive = 4610443
                break;
        }
        var y = d3.scaleLinear()
        .domain([0, fuckItWellDoItLive])
        .range([height - margin.bottom, margin.top])
    }
    
    
    if(ano < 2015){
        var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(ano - 2009).tickSizeOuter(10))
    }else{
        var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(10))   
    }
    
		
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

var rawData2 = `y,cantidad
2010,7329
2011,8150
2012,8707
2013,9552
2014,12831
2015,22548
2016,52626
2017,502806
2018,3078183
2019,4610443`;


