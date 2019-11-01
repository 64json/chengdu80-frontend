import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons/faScroll';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import React, { useEffect, useState } from 'react';
import './FacultyDetail.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import emptyPic from './img/profile.jpg';
import Graph from './Graph';

function FacultyDetail({ faculty: passedFaculty, expanded, signedIn }) {
  const { id } = useParams();
  const [fetchedFaculty, setFetchedFaculty] = useState(null);

  const faculty = passedFaculty || fetchedFaculty || {
    expertises: [],
    papers: [],
  };

  useEffect(() => {
    if (!id) {
      setFetchedFaculty(null);
      return;
    }
    axios.get(`/api/faculties/${id}?fields={papers}`)
      .then(response => {
        const faculty = response.data;
        setFetchedFaculty(faculty);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div className="FacultyDetail">
      <div className="bio">
        <div className="photo" style={{ backgroundImage: `url(${faculty.image_url || emptyPic})` }}/>
        <div className="info">
          <div className="top">
            <div className="basicInfo">
              <div className="name">{faculty.name}</div>
              <div className="organization">{faculty.university}</div>
            </div>
            {
              signedIn &&
              <div className="button">
                Propose
              </div>
            }
          </div>
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faHeart} fixedWidth/>
            <div className="expertise">
              {faculty.expertises.map(v => v.slice(0, 1).toUpperCase() + v.slice(1)).join(', ')}
            </div>
          </div>
          <div className="paperContainer">
            {
              faculty.papers.map(paper => (
                <div className="paper" key={paper._id}>
                  <FontAwesomeIcon className="icon" icon={faScroll} fixedWidth/>
                  <div className="paperInfo">
                    <div className="paperTitle">{paper.displayName}</div>
                    <div className="abstract">{paper.description}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {
        expanded ? (
          <div className="relationContainer">
            <Graph facultyId={faculty._id}/>
          </div>
        ) : (
          <Link className="expand" to={`/faculty/${faculty._id}`}>
            <FontAwesomeIcon icon={faChevronDown} className="icon"/>
          </Link>
        )
      }
    </div>
  );
}

export default FacultyDetail;
