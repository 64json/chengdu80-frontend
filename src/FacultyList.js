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
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { keywords } = queryString.parse(location.search);

  useEffect(() => {
    axios.get(`/api/faculties/search?keywords=${keywords}&limit=8`)
      .then(response => {
        const faculties = response.data;
        setFaculties(faculties);
        setSelectedFaculty(null);
        setSelectedTopic(null);
      })
      .catch(console.error);
  }, [keywords]);

  return (
    <div className={classes('FacultyList')}>
      {
        faculties.length > 0 &&
        ['Corporate Investment', 'Risk Management', 'Interest Rates'].map(topic => [(
          <div className="topicContainer" key={topic}>
            <div className="topic">{topic}</div>
            <div className="facultyContainer">
              {
                faculties.map(faculty => {
                  const selected = topic === selectedTopic && faculty === selectedFaculty;
                  return (
                    <FacultySummary faculty={faculty} selected={selected} onClick={() => {
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
