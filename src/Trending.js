import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emptyPic from './img/profile.jpg';
import './Trending.scss';

function Trending({ className }) {
  const [topics, setTopics] = useState([]);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    axios.get(`/api/papers?limit=5`)
      .then(response => {
        const topics = response.data;
        setTopics(topics);
      })
      .catch(console.error);
    axios.get(`/api/faculties?limit=40`)
      .then(response => {
        const faculties = response.data;
        setFaculties(faculties);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (topics.length === 0 || faculties.length === 0) return;
    const { d3 } = window;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const rootNode = {
      id: 'root',
    };
    const topicNodes = topics.map(topic => ({
      id: topic.id,
      topic,
    }));
    const facultyNodes = faculties.map(faculty => ({
      id: faculty.id,
      weight: Math.random() * .4 + .8,
      faculty,
    }));
    const nodes = [
      rootNode,
      ...facultyNodes,
      ...topicNodes,
    ];
    const links = [
      ...topics.map(topic => ({
        source: 'root',
        target: topic.id,
      })),
      ...faculties.map((faculty, i) => ({
        source: topics[i / 8 | 0].id,
        target: faculty.id,
      })),
    ];

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id)
        .distance(d => {
          if (d.source.id === 'root') {
            return 260;
          } else if ('topic' in d.source) {
            return 120 / d.target.weight;
          }
        }))
      .force('charge', d3.forceManyBody().strength(-60))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select('.trending').append('svg')
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
      .attr('stroke-width', d => {
        return d.source.id === 'root' ? 0 : 5;
      });

    const topicNode = svg.append('g')
      .selectAll('g')
      .data(topicNodes)
      .join('g')
      .attr('class', 'topicNode')
      .call(drag(simulation));

    topicNode.append('circle')
      .attr('stroke-width', 0)
      .attr('r', 50)
      .attr('fill', 'rgb(27, 27, 29)');

    topicNode.append('circle')
      .attr('class', 'topicCircle')
      .attr('stroke-width', 0)
      .attr('r', 50)
      .attr('fill', '#EF7C00');

    topicNode.append('foreignObject')
      .attr('x', -50)
      .attr('y', -50)
      .attr('width', 100)
      .attr('height', 100)
      .attr('class', 'topicInner')
      .html(d => `<div class="topicName">${d.topic.displayName.split(' ').slice(0, 2).join(' ')}</div>`);

    const facultyNode = svg.append('g')
      .selectAll('g')
      .data(facultyNodes)
      .join('g')
      .attr('class', 'facultyNode')
      .call(drag(simulation));

    facultyNode.append('circle')
      .attr('stroke-width', 2)
      .attr('r', d => 20 * d.weight)
      .attr('fill', 'rgb(27, 27, 29)');

    facultyNode.append('circle')
      .attr('class', 'facultyCircle')
      .attr('stroke-width', 2)
      .attr('r', d => 20 * d.weight)
      .attr('fill', d => `url(#${d.faculty.id})`);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      topicNode
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

      facultyNode
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

    svg.on('mousemove', function () {
      const [d] = nodes;
      const [x, y] = d3.mouse(this);
      const cx = width / 2;
      const cy = height / 2;
      d.fx = cx + (x - cx) / 10;
      d.fy = cy + (y - cy) / 10;
      if (!d3.event.active) {
        simulation.alphaTarget(0.05).tick();
        simulation.restart();
        simulation.alphaTarget(0);
      }
    });

    return () => {
      svg.remove();
    };
  }, [topics.length > 0 && faculties.length > 0]);

  return (
    <div className={`Trending ${className}`}>
      <svg className="defs" width="0" height="0">
        <defs>
          {
            faculties.map(faculty => (
              <pattern key={faculty.id} id={faculty.id} height="100%" width="100%"
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

export default Trending;
