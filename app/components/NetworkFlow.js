"use client";
// components/NetworkFlow.js
import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const NetworkFlow = ({ data, width }) => {
  useEffect(() => {
    const svg = d3.select("#network-flow").attr("width", width).attr("height", 400);

    // Create nodes
    const nodes = [];
    const space = 40;
    let routerOffset = 0;
    let machineOffset = 0;
    let machineCount = 0;

    for (const router of data) {
      routerOffset += router.length * space * 0.5;

      nodes.push({ id: router[0], x: 700, y: routerOffset, type: "ROUTER", bw: 3 });

      machineOffset = routerOffset - 0.5 * router.length * space + space;
      for (let i = 1; i < router.length; i++) {
        nodes.push({ id: router[i], x: 900, y: machineOffset, type: "MACHINE", bw: 1 });
        machineOffset += space;
        machineCount++;
      }
      routerOffset += router.length * space * 0.5;
    }

    nodes.push({ id: "IPS", x: 200, y: machineCount * space * 0.5, type: "IPS", bw: 20 });
    nodes.push({ id: "MANAGER", x: 400, y: machineCount * space * 0.5, type: "MANAGER" });

    // Create links
    const links = [{ source: "IPS", target: "MANAGER" }];
    for (const router of data) {
      links.push({ source: "MANAGER", target: router[0] });
      for (let i = 1; i < router.length; i++) {
        links.push({ source: router[0], target: router[i] });
      }
    }

    // Draw straight links
    svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", (d) => nodes.find((node) => node.id === d.source).x)
      .attr("y1", (d) => nodes.find((node) => node.id === d.source).y)
      .attr("x2", (d) => nodes.find((node) => node.id === d.target).x)
      .attr("y2", (d) => nodes.find((node) => node.id === d.target).y)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw icons using foreignObject correctly
    svg
      .selectAll("foreignObject")
      .data(nodes)
      .enter()
      .append("foreignObject")
      .attr("x", (d) => d.x - 30)
      .attr("y", (d) => d.y - 30)
      .attr("width", 60)
      .attr("height", 60)
      .html((d) => {
        return `<div style="font-size: 30px; text-align: center; background-color : white ; padding : 1rem" ;><img src="/${d.type}.png"></div>`;
      });

    // Add node labels
    svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 35) // Adjusted to show below the icon
      .attr("text-anchor", "middle")
      .text((d) => (d.type != "MACHINE" ? d.id : null));

    svg
      .selectAll("text2")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d) => (d.type == "MACHINE" ? d.x + 50 : d.x))
      .attr("y", (d) => (d.type != "MACHINE" ? d.y - 25 : d.y + 5)) // Adjusted to show below the icon
      .attr("text-anchor", "middle")
      .text((d) => d.bw && `${d.bw} mbps`);
  }, [data]);

  return <svg id="network-flow"></svg>;
};

export default NetworkFlow;
