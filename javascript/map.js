function init(){
            var w = 850;
			var h = 700;

			//Define map projection
			var projection = d3.geo.mercator()
								   .center([132, -28])
								   .translate([ w/2, h/2 ])
								   .scale(1000);


			//Define path generator
			var path = d3.geo.path()
							 .projection(projection);

			var color = d3.scale.ordinal()
                                .range(['rgb(242,240,247)','rgb(203,201,226)','rgb(158,154,200)','rgb(117,107,177)','rgb(84,39,143)']);

			//Create SVG
			var svg = d3.select("#map")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

            
			//Load in GeoJSON data
			d3.json("aust.json", function(json) {

				
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "dimgray")
				   .attr("fill", function(d, i) {return color(i)});
				  
				 //States
				svg.selectAll("text")
					.data(json.features)
					.enter()
					.append("text")
					.attr("fill", "black")
					.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
					.attr("text-anchor", "middle")
    				.attr("dy", ".35em")
					.text(function(d) {
						return d.properties.STATE_NAME;
					});	

                svg.selectAll("text")
					.data(json.features)
					.enter()
					.append("text")
					.attr("class", "label")
                    .attr("x", function(d) {
                        return path.centroid(d[0]);
                    })
                    .attr("y", function(d) {
                        return path.centeroid(d[1]);
                    })
					.text(function(d) {
						if (d.properties.power)
                        {
                            return d.properties.power;
                        }
					});	
			});
        

}
window.onload = init;