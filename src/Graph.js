import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emptyPic from './img/profile.jpg';
import './Graph.scss';
import { withRouter } from 'react-router-dom';
import { classes } from './utils';

let prevSvg = null;

function Graph({ className, history, facultyId }) {
  const [faculties, setFaculties] = useState([[], []]);

  useEffect(() => {
    if (!facultyId) return;
    axios.get(`/api/faculties/${facultyId}/graph`)
      .then(response => {
        const { faculties, links } = response.data;
        setFaculties(faculties);

        const { d3 } = window;
        const width = 1080;
        const height = 760;

        const maxCount = links.reduce((acc, link) => Math.max(acc, link.count), 0);
        const maxCitationCount = faculties.reduce((acc, faculty) => Math.max(acc, faculty.totalCitationCount), 0);

        const simulation = d3.forceSimulation(faculties)
          .force('link', d3.forceLink(links).id(d => d._id).distance(d => 200 + (d.count / maxCount) * 200))
          .force('charge', d3.forceManyBody().strength(-200))
          .force('center', d3.forceCenter(width / 2, height / 2));

        if (prevSvg) prevSvg.remove();
        const svg = prevSvg = d3.select('.Graph').append('svg')
          .attr('width', width)
          .attr('height', height);

        const drag = simulation => {
          function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.2).restart();
            d.fx = d.x;
            d.fy = d.y;
          }

          function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          }

          function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }

          return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
        };

        const link = svg.append('g')
          .attr('stroke', 'white')
          .attr('stroke-opacity', 0.15)
          .selectAll('line')
          .data(links)
          .join('line')
          .attr('stroke-width', 5);

        const node = svg.append('g')
          .selectAll('g')
          .data(faculties)
          .join('g')
          .attr('class', 'node')
          .call(drag(simulation))
          .on('click', d => history.push(`/faculty/${d._id}`));

        node.append('circle')
          .attr('class', 'facultyCircle')
          .attr('stroke-width', 2)
          .attr('r', d => 20 + (d.totalCitationCount / maxCitationCount) * 80)
          .attr('fill', d => `url(#${d._id})`);

        simulation.on('tick', () => {
          link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          node
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
        });
      })
      .catch(console.error);
  }, [facultyId]);

  return (
    <div className={classes('Graph', className)}>
      <svg className="defs" width="0" height="0">
        <defs>
          {
            faculties.map(faculty => (
              <pattern key={faculty._id} id={faculty._id} height="100%" width="100%"
                       patternContentUnits="objectBoundingBox">
                <image xlinkHref={emptyPic} preserveAspectRatio="none" width="1" height="1"/>
                <image xlinkHref={faculty.image_url} preserveAspectRatio="none" width="1" height="1"/>
              </pattern>
            ))
          }
        </defs>
      </svg>
    </div>
  );
}

export default withRouter(Graph);
