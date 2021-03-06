 var width = 700, height = 450, τ = 2 * Math.PI, maxLength = 80, maxLength2 = maxLength * maxLength;

var nodes = d3.range(200).map(function() { return { x: Math.random() * width, y: Math.random() * height }; });

var force = d3.layout.force() .size([width, height]) .nodes(nodes.slice()) .charge(function(d, i) { return i ? -30 : -1500; }) .on("tick", ticked) .start();

var voronoi = d3.geom.voronoi() .x(function(d) { return d.x; }) .y(function(d) { return d.y; });

var root = nodes.shift();

root.fixed = true;

var canvas = d3.select("body").append("canvas") .attr("width", width) .attr("height", height) .on("ontouchstart" in document ? "touchmove" : "mousemove", moved);

var context = canvas.node().getContext("2d");

function moved() { var p1 = d3.mouse(this); root.px = p1[0]; root.py = p1[1]; force.resume(); }

function ticked() { var links = voronoi.links(nodes);

context.clearRect(0, 0, width, height);

context.beginPath(); for (var i = 0, n = links.length; i < n; ++i) { var link = links[i], dx = link.source.x - link.target.x, dy = link.source.y - link.target.y; if (dx * dx + dy * dy < maxLength2) { context.moveTo(link.source.x, link.source.y); context.lineTo(link.target.x, link.target.y); } } context.lineWidth = 1; context.strokeStyle = "#e6f2ff"; context.stroke();

context.beginPath(); for (var i = 0, n = nodes.length; i < n; ++i) { var node = nodes[i]; context.moveTo(node.x, node.y); context.arc(node.x, node.y, 2, 0, τ); } context.lineWidth = 3; context.strokeStyle = "#e6f2ff"; context.stroke(); context.fillStyle = "#3399ff"; context.fill(); }
