---
layout: default
title: Accueil
---

<meta charset="utf-8">
<style>
.box{
  float: top;
  width: 100%;
  height: 10%;
 }
.links {
  stroke: #0066ff;
  stroke-opacity: 0;
}
.polygons {
  fill: none;
  stroke: #0066ff;
}
.polygons :first-child {
  fill: #0066ff;
}
.sites {
  fill: #0066ff;
  stroke: #fff;
}
.sites :first-child {
  fill: #0066ff;
}
</style>
<svg id='box'></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script>
var svg = d3.select("svg").on("touchmove mousemove", moved),
    width = +svg.attr("width"),
    height = +svg.attr("height");
var sites = d3.range(100)
    .map(function(d) { return [Math.random() * width, Math.random() * height]; });
var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);
var polygon = svg.append("g")
    .attr("class", "polygons")
  .selectAll("path")
  .data(voronoi.polygons(sites))
  .enter().append("path")
    .call(redrawPolygon);
var link = svg.append("g")
    .attr("class", "links")
  .selectAll("line")
  .data(voronoi.links(sites))
  .enter().append("line")
    .call(redrawLink);
var site = svg.append("g")
    .attr("class", "sites")
  .selectAll("circle")
  .data(sites)
  .enter().append("circle")
    .attr("r", 2.5)
    .call(redrawSite);
function moved() {
  sites[0] = d3.mouse(this);
  redraw();
}
function redraw() {
  var diagram = voronoi(sites);
  polygon = polygon.data(diagram.polygons()).call(redrawPolygon);
  link = link.data(diagram.links()), link.exit().remove();
  link = link.enter().append("line").merge(link).call(redrawLink);
  site = site.data(sites).call(redrawSite);
}
function redrawPolygon(polygon) {
  polygon
      .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
}
function redrawLink(link) {
  link
      .attr("x1", function(d) { return d.source[0]; })
      .attr("y1", function(d) { return d.source[1]; })
      .attr("x2", function(d) { return d.target[0]; })
      .attr("y2", function(d) { return d.target[1]; });
}
function redrawSite(site) {
  site
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; });
}
</script>



Bienvenu !

Vous trouverez ici la présentation de différents projets que j'ai pu réaliser durant mes études ou bien lors d'expériences professionnelles.

<h1>Parcours</h1>

<h1>Dossiers</h1>

<h1>DataScience</h1>

