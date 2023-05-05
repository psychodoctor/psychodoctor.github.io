
  var tooltip = d3.select("#chart-container")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");


// set the dimensions and margins of the graph
var width = 700
    height = 700
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// input the data
var data = {Indonesia: 11200, Laos: 15620, Uzbekistan:17320, Vietnam:23600, Iran:41350}
//
// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#6F0000", "#8F8800", "#268100", "#00316F", "#660075"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
var paths = svg.selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);

// Add click event listener to the paths
paths.on("click", function(d) {
  // Get the currently clicked path
  var clickedPath = d3.select(this);
  
  // Transition the clicked path
  clickedPath.transition()
    .duration(750)
    .attr("d", d3.arc()
      .innerRadius(0)
      .outerRadius(radius * 1.1)
    );
    
  // Transition all other paths back to their original size
  paths.filter(function(d2) {
      return d.data.key !== d2.data.key;
    })
    .transition()
    .duration(750)
    .attr("d", d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    );
    
  // Show tooltip on click
  tooltip.transition()
    .duration(200)
    .style("opacity", 1)
    .text("This country is: " + d.data.key + " ,Exchange Rate: " + d.data.value + " Per US Dollor")
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY - 20) + "px");
});

// Add click event listener to the paths
paths.on("mouseleave", function() {
  // Hide tooltip on mouseleave
  tooltip.transition()
    .duration(1500)
    .style("opacity", 0);
});

// Get references to the images
const images = document.querySelectorAll('#pictures img');

// Add event listeners to the images
images.forEach(img => {
  img.addEventListener('click', function() {
    // Toggle the "selected" class on the clicked image
    this.classList.toggle('selected');

    // If the image is selected, increase its size
    if (this.classList.contains('selected')) {
      this.style.width = '800px';
      this.style.height = '800px';
    } else {
      this.style.width = '200px';
      this.style.height = '200px';
    }
  });
});



