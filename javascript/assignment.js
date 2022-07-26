function init(){

	// canvas size 	
		var w = 700;
		var h = 500;
		var dataset
		var padding = 0; // setting padding
		var hoverstate = 1;
		
		var color = {
			s1: "rgba(237,248,251)",
			s2: "rgba(179,205,227)",
			s3: "rgba(140,150,198)",
			s4: "rgba(136,86,167)",
			s5: "rgba(129,15,124)",
			hover: "rgba(253,204,138)"
	
		};
	
	// loading the csv file	
		d3.csv("price.csv", function(d) {
	
			//d.Nsw = parseInt(d['New South Wales'])
			//d.Sa = parseInt(d['South Australia']);
			return {
				
				
				date: d.year,
				Queensland: +d.Queensland,
				NSW : +d.NSW,
				Victoria : +d.Victoria,
				SA : +d.SA,
				Tasmania: +d.Tasmania
			};
		}).then(function(data){
			dataset = data;
			barChart(dataset);
		//printing data for checking in console
			console.table(dataset, ["date", "Queensland","NSW", "Victoria","SA","Tasmania"]);
			});
			console.log(hoverstate);
			
		
	function barChart(){
					
		var xScale = d3.scaleBand()
			.domain(d3.range(dataset.length))
			.rangeRound([85,w])
			.paddingInner(0.05);
	
				
		var xScale1 = d3.scaleLinear()
		.domain([
			d3.min(dataset, function(d){return d.date;}),
			d3.max(dataset, function(d){return d.date;})
			])
		.rangeRound([120,w-30]);
	
		var yScale = d3.scaleLinear()
		.domain([0,d3.max(dataset, function(d){return +d.Queensland;})+1
		])
		.range([0,h-50]);
	
		var yScale1 = d3.scaleLinear()
		.domain([0,d3.max(dataset, function(d){return +d.Queensland;})+1
		])
		.range([h-50,0]);
	var svg = d3.select("#chart")
	  .append("svg")
	  .attr("width", w)
	  .attr("height", h+50);
	  
	 
	  svg.append("text")
	   .attr("transform", "rotate(-90)")
	   .attr("x", -(h/2))
	   .attr("y", 15)
	   .attr("fill",color.s1)
	   .style("text-anchor", "middle")
	   .text("Megawatt Per Hour")
	
	var testing = "d.Queensland";
	var statedata = (dataset, function(d)
	{
		if(hoverstate == 1)
				{
					testing = "d.Queensland"
				} 
				else if(hoverstate == 2)
				{
					return d.Victoria
				} else if(hoverstate == 3)
				{
					return d.SA
				}else if(hoverstate == 4)
				{
					return d.NSW
				}else if(hoverstate ==5)
				{
					return d.Tasmania
				}
					
	})
	console.log(testing);
	console.log(statedata);
			 // xAxis measurement
			 var xAxis = d3.axisBottom()
			 .ticks(8)
			 .tickPadding(10)
			 .tickSize(0)
			 .scale(xScale1);
		 //yAxis measurement
			 var yAxis = d3.axisLeft()
			 .ticks(10)
			 .scale(yScale1);
			 svg.append("g")
			 .attr("transform", "translate(" + (0) +", "+ (h+10) +")")
			 .call(xAxis)
			 svg.append("g")
			 .attr("transform", "translate(" + (60 ) +", "+ (50) +")")
			 .call(yAxis)
	 
	svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("fill", color.s1)
	.attr("x", function(d,i){
		 return xScale(i);
		 })
	.attr("y",function(d){
		 return h-yScale(d.Queensland);
	})
	.attr("width",xScale.bandwidth())
	.attr("height",function(d){
	 return yScale(+d.Queensland);
	})
	
	// hover
	
	.on("mouseover", function(event,d){
		d3.select(this)
	.attr("fill",color.hover)
		var xPosition = parseFloat(d3.select(this).attr("x")) +10
		var yPosition = parseFloat(d3.select(this).attr("y")) - 20
		
		if (hoverstate == 1){		
		svg.append("text")
				.style("font-size","12px")
				.data(dataset)
				.attr("fill", color.s1)
				.attr("font-weight", "bold")
				.attr("id","tooltip")
				.attr("x", xPosition)
				.attr("y",yPosition)
	
				.text(d.Queensland  + " Mg/H")
			}
		else if (hoverstate == 2){		
		svg.append("text")
				.style("font-size","12px")
				.data(dataset)
				.attr("fill", color.s1)
				.attr("font-weight", "bold")
				.attr("id","tooltip")
				.attr("x", xPosition)
				.attr("y",yPosition)
	
				.text(d.Victoria + " Mg/H")
			}
			else if (hoverstate == 3){		
				svg.append("text")
						.style("font-size","12px")
						.data(dataset)
						.attr("fill", color.s1)
						.attr("font-weight", "bold")
						.attr("id","tooltip")
						.attr("x", xPosition)
						.attr("y",yPosition)
			
						.text(d.SA + " Mg/H")
					}
			else if (hoverstate == 4){		
			svg.append("text")
				.style("font-size","12px")
				.data(dataset)
				.attr("fill", color.s1)
				.attr("font-weight", "bold")
				.attr("id","tooltip")
				.attr("x", xPosition)
				.attr("y",yPosition)
	
				.text(d.NSW + " Mg/H")
			}
			else if (hoverstate == 5){		
				svg.append("text")
						.style("font-size","12px")
						.data(dataset)
						.attr("fill", color.s1)
						.attr("font-weight", "bold")
						.attr("id","tooltip")
						.attr("x", xPosition)
						.attr("y",yPosition)
			
						.text(d.Tasmania + " Mg/H")
					}
		})
	.on("mouseout", function(d){
			d3.select(this)
			.attr("fill",function(d)
			{
				if(hoverstate == 1)
				{
					return color.s1
				} 
				else if(hoverstate == 2)
				{
					return color.s2
				} else if(hoverstate == 3)
				{
					return color.s3
				}else if(hoverstate == 4)
				{
					return color.s4
				}else if(hoverstate ==5)
				{
					return color.s5
				}
					
			})
			d3.select("#tooltip").remove();
			
	});
	
	
	//--------------------------------------------------Queensland ---------------------------//
	d3.select("#queensland")
	.on("click", function(){				
		   
	svg.selectAll("rect")
	.data(dataset)
	.transition()
	.attr("fill", color.s1)
	.duration(5000)
	.ease(d3.easeElasticOut)
	.delay(function(d,i){
		return i/dataset.length * 1000;
	})
	.attr("x", function(d,i){
		return xScale(i);
		})
	.attr("y",function(d){
		return h-yScale(+d.Queensland);
	})
	.attr("width",xScale.bandwidth())
	.attr("height",function(d){
		return yScale(+d.Queensland);
	})
	hoverstate = 1
	});
	
	
	
	
	//--------------------------------------------------Victoria ---------------------------//
	d3.select("#vic")
	.on("click", function(){					   
	svg.selectAll("rect")
	.data(dataset)
	.transition()
	.attr("fill", color.s2)
	.duration(5000)
	.ease(d3.easeElasticOut)
	.delay(function(d,i){
		return i/dataset.length * 1000;
	})
	.attr("x", function(d,i){
		return xScale(i);
		})
	.attr("y",function(d){
		return h-yScale(+d.Victoria);
	})
	.attr("width",xScale.bandwidth())
	.attr("height",function(d){
		return yScale(+d.Victoria);
	})
	hoverstate = 2
	});
	
	//--------------------------------------------------SA ---------------------------//
	d3.select("#sa")
	.on("click", function(){				
		   
		svg.selectAll("rect")
		.data(dataset)
		.transition()
		.duration(5000)
		.attr("fill", color.s3)
		.ease(d3.easeElasticOut)
		.delay(function(d,i){
			return i/dataset.length * 1000;
		})
		.attr("x", function(d,i){
			return xScale(i);
			})
		.attr("y",function(d){
			return h-yScale(+d.SA);
		})
		.attr("width",xScale.bandwidth())
		.attr("height",function(d){
			return yScale(+d.SA);
		});
		hoverstate = 3
		});
	
		//--------------------------------------------------NSW ---------------------------//
	d3.select("#nsw")
	.on("click", function(){				
		   
	svg.selectAll("rect")
	.data(dataset)
	.transition()
	.duration(5000)
	.attr("fill", color.s4)
	.ease(d3.easeElasticOut)
	.delay(function(d,i){
		return i/dataset.length * 1000;
	})
	.attr("x", function(d,i){
		return xScale(i);
		})
	.attr("y",function(d){
		return h-yScale(+d.NSW);
	})
	.attr("width",xScale.bandwidth())
	.attr("height",function(d){
		return yScale(+d.NSW);
	})
	hoverstate = 4
	});
	//--------------------------------------------------Tas ---------------------------//
	d3.select("#tas")
	.on("click", function(){				
		   
	svg.selectAll("rect")
	.data(dataset)
	.transition()
	.duration(5000)
	.attr("fill", color.s5)
	.ease(d3.easeElasticOut)
	.delay(function(d,i){
		return i/dataset.length * 1000;
	})
	.attr("x", function(d,i){
		return xScale(i);
		})
	.attr("y",function(d){
		return h-yScale(+d.Tasmania);
	})
	.attr("width",xScale.bandwidth())
	.attr("height",function(d){
		return yScale(+d.Tasmania);
	})
	hoverstate = 5
	});
	
	
							
		}
				
}
function linechart(){

	// canvas size 	
		var w = 800;
		var h = 330;
		var dataset
		var padding = 0; // setting padding
		var color = {
			s1: "rgba(237,248,251)",
			s2: "rgba(179,205,227)",
			s3: "rgba(140,150,198)",
			s4: "rgba(136,86,167)",
			s5: "rgba(201,204,204)",
	
		};
	
	// loading the csv file	
		d3.csv("greenhouse.csv", function(d) {
			return {
	
				date: new Date(+d.year, +d.month -1),
				emissions: d.emissions,
				seasonal: d.weather_normalised,
				trend: d.Trend
			};
		}).then(function(data){
			dataset = data;
			lineChart(dataset);
		//printing data for checking in console
			console.table(dataset, ["date", "emissions", "seasonal","trend"]);
			});
		
	
		
		function lineChart(){
		
			
		xScale = d3.scaleTime()
			.domain([
			d3.min(dataset, function(d){return d.date;}),
			d3.max(dataset, function(d){return d.date;})
			])
			.range([60,w-50]); // setting the range of the data, instead of 0 which is on the right border, we set it to 60 so it looks nicer
	
	
		yScale = d3.scaleLinear()
			.domain([120,d3.max(dataset, function(d){return d.emissions;})
			])
			.range([h-70,30]); // using maximum height - 40 so it doesn't push toward the border and some infomation is missing
	
	
	
		line = d3.line()
				.x(function(d){return xScale(d.date);})
				.y(function(d){return yScale(d.emissions);})
		line_trend = d3.line()
				.x(function(d){return xScale(d.date);})
				.y(function(d){return yScale(d.trend);})
		line_seasonal = d3.line()
				.x(function(d){return xScale(d.date);})
				.y(function(d){return yScale(d.seasonal);})
			// xAxis measurement
				var xAxis = d3.axisBottom()
				.ticks(10)
				.scale(xScale);
			// yAxis measurement
				var yAxis = d3.axisLeft()
				.ticks(4)
				.scale(yScale);
	
	
		
	
	

				var svg = d3.select("#linechart")
				.append("svg")
				.attr("width",w)
				.attr("height",h)

			svg.append("path")
				.datum(dataset)
				.attr("class", "line_emission")
				.attr("d",line);

			// 	svg.append("path")
			// 	.datum(dataset)
			// 	.attr("class", "line_trend")
			// 	.attr("d",line_trend);
				
			// svg.append("path")
			// .datum(dataset)
			// .attr("class", "line_seasonal")
			// .attr("d",line_seasonal);

					
			svg.append("g")
				.attr("transform", "translate(" + (0) +", "+ (h-70) +")")
				.call(xAxis);
			svg.append("g")
				.attr("transform", "translate(" + (60 ) +", "+ (0) +")")
				.call(yAxis);
		

			svg.append("line")
				.attr("class","line mark")

// Line separator for every 10 increament				
//start of line ----130
				.attr("x1",+60)
				.attr("y1" ,yScale(130))
//end of line
				.attr("x2",w-40)
				.attr("y2",yScale(130));
//start of line ----140
svg.append("line")
				.attr("class","line mark")
				.attr("x1",+60)
				.attr("y1" ,yScale(140))
//end of line
				.attr("x2",w-40)
				.attr("y2",yScale(140));

//start of line ----150
svg.append("line")
				.attr("class","line mark")
				.attr("x1",+60)
				.attr("y1" ,yScale(150))
//end of line
				.attr("x2",w-40)
				.attr("y2",yScale(150));

			svg.append("text")
			.attr("class" , "actualemission")
			.attr("x", 80)
			.attr("y", h-10)
			.text("..... Actual Emissions");

			svg.append("text")
			.attr("class" , "seasonal")
			.attr("x", 240)
			.attr("y", h-10)
			.text("_ _ _ _ Seasonally adjusted and weather normalized");

			svg.append("text")
			.attr("class" , "trend")
			.attr("x", 560)
			.attr("y", h-10)
			.text("_____ Trend");

			//------------------------------trend line--------------------------//

	d3.select("#trend")
	.on("click", function(){
			
			svg.select("path")
				.datum(dataset)
				.transition()
				.delay(0)
				.attr("class", "line_trend")
				.attr("d",line_trend);
	})


	//------------------------------seasonal line--------------------------//

	d3.select("#seasonal")
	.on("click", function(){
			
			svg.select("path")
				.datum(dataset)
				.transition()
				.delay(0)
				.attr("class", "line_seasonal")
				.attr("d",line_seasonal);
	})
	//------------------------------emission line--------------------------//

	d3.select("#emission")
	.on("click", function(){
			
			svg.select("path")
				.datum(dataset)
				.transition()
				.delay(0)
				.attr("class", "line_emission")
				.attr("d",line);
	})

		//------------------------------all line--------------------------//

		d3.select("#emission")
		.on("click", function(){
				
				svg.select("path")
					.datum(dataset)
					.transition()
					.delay(0)
					.attr("class", "line_emission")
					.attr("d",line);
		})			
}
}

function choropleth(){
	//canvas size
	var w=900;
	var h=600; 
	var year = 2015;
	
   
	//color setting of the map
	// red
	var color = d3.scaleQuantize()
					.range(["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]);
   
   var color1 = d3.scaleQuantize()
				   .range(["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]);
   
   var color2 = d3.scaleQuantize()
				   .range(["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]);
   
   var color3 = d3.scaleQuantize()
				   .range(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]);
	//green
	var color4 = d3.scaleQuantize()
					.range(["#ffffcc","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]);
   
	//projecting one part of the map
	var projection = d3.geoMercator()
						.center([182,-46.5])
						.translate([w,h])  //map size divide by 2
						.scale(700); 
   
	var path = d3.geoPath()
				.projection(projection);
   
	//creating the svg  
	var svg = d3.select("#choropleth")
	.append("svg")
	.attr("width",w)
	.attr("height",h);
   
	//loading csv file, have to use live server
	d3.csv("renewable.csv").then(function(d){
		//d.year_2018 = parseInt(+d.year_2018);
   
	   dataset = d;
   
		   //sets the color using min = 0, and d3.max
		   color1.domain([d3.min(d,function(d){
			   return +d.year_2016;		
		   }),d3.max(d,function(d){
			   return +d.year_2016;		
		   })])
		   
		   color.domain([d3.min(d,function(d){
			   return +d.year_2015;		
		   }),d3.max(d,function(d){
			   return +d.year_2015;		
		   })])
   
		   color2.domain([d3.min(d,function(d){
			   return +d.year_2017;		
		   }),d3.max(d,function(d){
			   return +d.year_2017;		
		   })])
   
		   color3.domain([d3.min(d,function(d){
			   return +d.year_2018;		
		   }),d3.max(d,function(d){
			   return +d.year_2018;		
		   })])
   
		   color4.domain([d3.min(d,function(d){
			   return +d.year_2019;		
		   }),d3.max(d,function(d){
			   return +d.year_2019;		
		   })])
   
   
	   //pathing
   d3.json("states.geojson").then(function(json)
   {
		   
		   for(var i=0;i<d.length;i++){
			   var dataState=d[i].ABC;   
			   var dataValue=parseFloat(d[i].year_2015);
			   var dataValue2=parseFloat(d[i].year_2016);
			   var dataValue3=parseFloat(d[i].year_2017);
			   var dataValue4=parseFloat(d[i].year_2018);
			   var dataValue5=parseFloat(d[i].year_2019);
	   
   
			   for(var j=0;j<json.features.length;j++){   
				   var jsonState=json.features[j].properties.STATE_NAME;
				   if(dataState==jsonState){
					   json.features[j].properties.year_2015=dataValue; 
					   json.features[j].properties.year_2016=dataValue2;
					   json.features[j].properties.year_2017=dataValue3; 
					   json.features[j].properties.year_2018=dataValue4; 
					   json.features[j].properties.year_2019=dataValue5;       
					   break;
				   }
	   
		   
			   }
		   }
   
		   
		   
	   // creating the path
	   svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("class", "map")
	   .attr("d",path)
	   .style("fill",function(d,i){
   
			   var value=d.properties.year_2017;   //getting the data of unemployed 
			   if(value){
				   
				   return color(value)  ///return the hue set color based on value
			   }
			   else{
				   return "lightgrey" ;   //return grey if there is not data
			   }
			   
		   }
		   
	   )

						   svg.append("text")
						   .attr("class", "energy")
						   .style("font-size","14px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("font-weight", "bold")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 100)
						   .text("Total Renewable Energy Produced ")
   
						   svg.append("text")
						   .attr("class", "tas")
						   .style("font-size","12px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 140)
						   .text(function (d,i)
						   {
   
							   return (dataset[0].ABC + " : " + dataset[0].year_2015  )
						   })
						   
						   svg.append("text")
						   .attr("class", "nsw")
						   .style("font-size","12px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 160)
						   .text(function (d,i)
						   {
   
							   return (dataset[1].ABC + " : " + dataset[1].year_2015  )
						   })
   
						   svg.append("text")
						   .attr("class", "sa")
						   .style("font-size","12px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 180)
						   .text(function (d,i)
						   {
   
							   return (dataset[2].ABC + " : " + dataset[2].year_2015  )
						   })
   
						   svg.append("text")
						   .attr("class", "wa")
						   .style("font-size","12px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 200)
						   .text(function (d,i)
						   {
   
							   return (dataset[3].ABC + " : " + dataset[3].year_2015  )
						   })
   
						   svg.append("text")
						   .attr("class", "queensland")
						   .style("font-size","12px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 220)
						   .text(function (d,i)
						   {
   
							   return (dataset[4].ABC + " : " + dataset[4].year_2015  )
						   })
   
						   svg.append("text")
						   .attr("class", "vic")
						   .style("font-size","12px")
						   .data(dataset)
						   .attr("fill", "white")
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 240)
						   .text(function (d,i)
						   {
   
							   return (dataset[5].ABC + " : " + dataset[5].year_2015  )
						   })
   
						   svg.append("text")
						   .attr("class", "nt")
						   .style("font-size","12px")
						   .attr("fill", "white")
						   .data(dataset)
						   .attr("id","tooltip")
						   .attr("x", w-300)
						   .attr("y", 260)
						   .text(function (d,i)
						   {
   
							   return (dataset[6].ABC + " : " + dataset[6].year_2015  )
						   })
   
   

	   d3.selectAll("input").on("change", function ()
	   {
		   year = this.value;
		   var change = d3.selectAll("path.map")
		   .data(json.features)
		   change.transition()
		   .attr("d",path)
		   .duration(2500)
		   .ease(d3.easeQuad)
		   
		   .style("fill",function(d,i){
			   switch(year){
				   case "2015":
			   
   
				   var value=d.properties.year_2017;   //getting the data of unemployed 
				   if(value){
					   
					   return color(value)  ///return the hue set color based on value
				   }
				   else{
					   return "lightgrey" ;   //return grey if there is not data
				   }
			   
					   break;
				   case "2016":
					   
					   var value=d.properties.year_2016;   //getting the data of unemployed 
   
				   if(value){
			   
					   return color1(value)  ///return the hue set color based on value
				   }
				   else{
				   return "lightgrey" ;   //return grey if there is not data
					   }
					   break;
				   case "2017":
   
					   var value=d.properties.year_2017;   //getting the data of unemployed 
   
				   if(value){
			   
					   return color2(value)  ///return the hue set color based on value
				   }
				   else{
				   return "lightgrey" ;   //return grey if there is not data
					   }
					   break;
					   case "2018":
   
					   var value=d.properties.year_2018;   //getting the data of unemployed 
   
				   if(value){
			   
					   return color3(value)  ///return the hue set color based on value
				   }
				   else{
				   return "lightgrey" ;   //return grey if there is not data
					   }
					   break;
					   case "2019":
   
					   var value=d.properties.year_2019;   //getting the data of unemployed 
   
				   if(value){
			   
					   return color4(value)  ///return the hue set color based on value
				   }
				   else{
				   return "lightgrey" ;   //return grey if there is not data
					   }
					   break;
			   }
   
		   })
		   var tt = svg.select("text.tas")
			   .data(dataset)
			   tt.exit()
			   .attr("x",w)
			   .transition()
			   .remove(); 
   
   //---------------- update function for tasmania -----------------------------			
		   tt.text(function (d,i)
						   {
							   console.log("im here  " + year)
							   switch(year){
   
								   case  "2015":
									   return (dataset[0].ABC + " : " + dataset[0].year_2015)
								   
								   case  "2016":
									   return (dataset[0].ABC + " : " + dataset[0].year_2016)
								   case  "2017":
									   return (dataset[0].ABC + " : " + dataset[0].year_2017)
								   case  "2018":
									   return (dataset[0].ABC + " : " + dataset[0].year_2018)
								   case  "2019":
									   return (dataset[0].ABC + " : " + dataset[0].year_2019)
							   }								
						   })
   //------------------update function for nsw--------------------------------
		   var tnsw = svg.select("text.nsw")
			   .data(dataset)
			   tnsw.exit()
				   .attr("x",w)
				   .transition()
				   .remove();
							   
			   tnsw.text(function (d,i)
									   {
										   console.log("im here  " + year)
										   switch(year){
			   
											   case  "2015":
												   return (dataset[1].ABC + " : " + dataset[1].year_2015)
											   
											   case  "2016":
												   return (dataset[1].ABC + " : " + dataset[1].year_2016)
											   case  "2017":
												   return (dataset[1].ABC + " : " + dataset[1].year_2017)
											   case  "2018":
												   return (dataset[1].ABC + " : " + dataset[1].year_2018)
											   case  "2019":
												   return (dataset[1].ABC + " : " + dataset[1].year_2019)
										   }								
									   })
   
   //------------------update function for SA--------------------------------
   var tsa = svg.select("text.sa")
   .data(dataset)
   tsa.exit()
	   .attr("x",w)
	   .transition()
	   .remove();
				   
   tsa.text(function (d,i)
						   {
							   console.log("im here  " + year)
							   switch(year){
   
								   case  "2015":
									   return (dataset[2].ABC + " : " + dataset[2].year_2015)
								   
								   case  "2016":
									   return (dataset[2].ABC + " : " + dataset[2].year_2016)
								   case  "2017":
									   return (dataset[2].ABC + " : " + dataset[2].year_2017)
								   case  "2018":
									   return (dataset[2].ABC + " : " + dataset[2].year_2018)
								   case  "2019":
									   return (dataset[2].ABC + " : " + dataset[2].year_2019)
							   }								
						   })		
   
   //------------------update function for wa--------------------------------
   var twa = svg.select("text.wa")
   .data(dataset)
   twa.exit()
	   .attr("x",w)
	   .transition()
	   .remove();
				   
   twa.text(function (d,i)
						   {
							   console.log("im here  " + year)
							   switch(year){
   
								   case  "2015":
									   return (dataset[3].ABC + " : " + dataset[3].year_2015)
								   
								   case  "2016":
									   return (dataset[3].ABC + " : " + dataset[3].year_2016)
								   case  "2017":
									   return (dataset[3].ABC + " : " + dataset[3].year_2017)
								   case  "2018":
									   return (dataset[3].ABC + " : " + dataset[3].year_2018)
								   case  "2019":
									   return (dataset[3].ABC + " : " + dataset[3].year_2019)
							   }								
						   })
   
   //------------------update function for queenslad--------------------------------
   var tqueensland = svg.select("text.queensland")
   .data(dataset)
   tqueensland.exit()
	   .attr("x",w)
	   .transition()
	   .remove();
				   
   tqueensland.text(function (d,i)
						   {
							   console.log("im here  " + year)
							   switch(year){
   
								   case  "2015":
									   return (dataset[4].ABC + " : " + dataset[4].year_2015)
								   
								   case  "2016":
									   return (dataset[4].ABC + " : " + dataset[4].year_2016)
								   case  "2017":
									   return (dataset[4].ABC + " : " + dataset[4].year_2017)
								   case  "2018":
									   return (dataset[4].ABC + " : " + dataset[4].year_2018)
								   case  "2019":
									   return (dataset[4].ABC + " : " + dataset[4].year_2019)
							   }								
						   })
   
   //------------------update function for victoria--------------------------------
   var tvic = svg.select("text.vic")
   .data(dataset)
   tvic.exit()
	   .attr("x",w)
	   .transition()
	   .remove();
				   
   tvic.text(function (d,i)
						   {
							   console.log("im here  " + year)
							   switch(year){
   
								   case  "2015":
									   return (dataset[5].ABC + " : " + dataset[5].year_2015)
								   
								   case  "2016":
									   return (dataset[5].ABC + " : " + dataset[5].year_2016)
								   case  "2017":
									   return (dataset[5].ABC + " : " + dataset[5].year_2017)
								   case  "2018":
									   return (dataset[5].ABC + " : " + dataset[5].year_2018)
								   case  "2019":
									   return (dataset[5].ABC + " : " + dataset[5].year_2019)
							   }								
						   })
   
   //------------------update function for nt--------------------------------
   var tnt = svg.select("text.nt")
   .data(dataset)
   tnt.exit()
	   .attr("x",w)
	   .transition()
	   .remove();
				   
   tnt.text(function (d,i)
						   {
							   console.log("im here  " + year)
							   switch(year){
   
								   case  "2015":
									   return (dataset[6].ABC + " : " + dataset[6].year_2015)
								   
								   case  "2016":
									   return (dataset[6].ABC + " : " + dataset[6].year_2016)
								   case  "2017":
									   return (dataset[6].ABC + " : " + dataset[6].year_2017)
								   case  "2018":
									   return (dataset[6].ABC + " : " + dataset[6].year_2018)
								   case  "2019":
									   return (dataset[6].ABC + " : " + dataset[6].year_2019)
							   }								
						   })
	   }
   
	   )
   
   });
   

   })
   }
   
   function start(){
	   init();
   
   }



	function start() {
		init();
		linechart();
		choropleth();
	  }
	  window.onload = start;
