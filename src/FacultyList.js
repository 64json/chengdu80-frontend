import React, { useEffect, useState } from 'react';
import './FacultyList.scss';
import axios from 'axios';
import { classes } from './utils';
import FacultyDetail from './FacultyDetail';
import FacultySummary from './FacultySummary';
import { withRouter } from 'react-router-dom';
import * as queryString from 'query-string';

function FacultyList({ location }) {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { keywords } = queryString.parse(location.search);

  useEffect(() => {
    axios.get(`/api/similarities?keywords=${keywords}`)
      .then(response => {
        let relatedTopics = response.data.slice(0, 2);
        axios.get(`/api/faculties/search?keywords=${keywords}&limit=24&fields={papers}`)
          .then(response => {
            const { faculties, type } = response.data;
            setFaculties(faculties);
            setSelectedFaculty(null);
            setSelectedTopic(null);

            if (relatedTopics.length === 0) {
              const topics = faculties.flatMap(faculty => faculty.papers.flatMap(paper => paper.topics));
              const countMap = {};
              topics.forEach(topic => {
                if (topic in countMap) {
                  countMap[topic]++;
                } else {
                  countMap[topic] = 1;
                }
              });
              relatedTopics = [...new Set(topics)].sort((a, b) => countMap[b] - countMap[a]).slice(0, 2);
            }
            setRelatedTopics(relatedTopics);
          })
          .catch(console.error);
      });
  }, [keywords]);

  return (
    <div className={classes('FacultyList')}>
      {
        faculties.length > 0 &&
        [keywords, ...relatedTopics].map((topic, i) => [(
          <div className="topicContainer" key={topic}>
            <div className="topic">{topic.slice(0, 1).toUpperCase() + topic.slice(1)}</div>
            <div className="facultyContainer">
              {
                faculties.slice(i * 8, (i + 1) * 8).map(faculty => {
                  const selected = topic === selectedTopic && faculty === selectedFaculty;
                  return (
                    <FacultySummary key={faculty._id} faculty={faculty} selected={selected} onClick={() => {
                      setSelectedFaculty(selected ? null : faculty);
                      setSelectedTopic(selected ? null : topic);
                    }}/>
                  );
                })
              }
            </div>
          </div>
        ), (
          topic === selectedTopic && selectedFaculty &&
          <FacultyDetail faculty={selectedFaculty} key={`${topic}-faculty-detail`}/>
        )])
      }
    </div>
  );
}

export default withRouter(FacultyList);

/**
 link
 expertise

 **/
