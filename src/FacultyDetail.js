import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons/faScroll';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import React, { useEffect, useState } from 'react';
import './FacultyDetail.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import FacultySummary from './FacultySummary';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function FacultyDetail({ faculty: passedFaculty, expanded }) {
  const { id } = useParams();
  const [fetchedFaculty, setFetchedFaculty] = useState(null);

  const faculty = passedFaculty || fetchedFaculty || {};

  useEffect(() => {
    if (!id) {
      setFetchedFaculty(null);
      return;
    }
    axios.get(`/api/faculties/${id}`)
      .then(response => {
        const faculty = response.data;
        setFetchedFaculty(faculty);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div className="FacultyDetail">
      <div className="bio">
        <div className="photo" style={{ backgroundImage: `url(${faculty.image_url})` }}/>
        <div className="info">
          <div className="top">
            <div className="basicInfo">
              <div className="name">{faculty.name}</div>
              <div className="organization">Georgia Institute of Technology</div>
            </div>
            <div className="button">
              Propose
            </div>
          </div>
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faHeart} fixedWidth/>
            <div>
              Corporate Investment, Risk Management, Interest Rates
            </div>
          </div>
          <div className="paperContainer">
            <div className="paper">
              <FontAwesomeIcon className="icon" icon={faScroll} fixedWidth/>
              <div className="paperInfo">
                <div className="paperTitle">Some Research Paper Title Goes Here</div>
                <div className="abstract">
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </div>
              </div>
            </div>
            <div className="paper">
              <FontAwesomeIcon className="icon" icon={faScroll} fixedWidth/>
              <div className="paperInfo">
                <div className="paperTitle">Some Research Paper Title Goes Here</div>
                <div className="abstract">
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        expanded ? (
          <div className="relationContainer">
            <svg className="linkContainer" width="1080" height="864">
              <path className="link" d="M 204 136 H 421 V 402 H 638"/>
              <path className="link anim reverse" d="M 204 136 H 421 V 402 H 638"/>

              <path className="link" d="M 204 728 H 421 V 462 H 638"/>
              <path className="link anim reverse" d="M 204 728 H 421 V 462 H 638"/>

              <path className="link" d="M 1076 136 H 859 V 402 H 638"/>
              <path className="link anim" d="M 1076 136 H 859 V 402 H 638"/>

              <path className="link" d="M 1076 728 H 859 V 462 H 638"/>
              <path className="link anim" d="M 1076 728 H 859 V 462 H 638"/>

              <path className="link" d="M 204 432 H 638"/>
              <path className="link anim reverse" d="M 204 432 H 638"/>

              <path className="link" d="M 1076 432 H 638"/>
              <path className="link anim" d="M 1076 432 H 638"/>

              <path className="link" d="M 623 136 V 432"/>
              <path className="link anim reverse" d="M 623 136 V 432"/>

              <path className="link" d="M 653 136 V 432"/>
              <path className="link anim" d="M 653 136 V 432"/>

              <path className="link" d="M 623 728 V 432"/>
              <path className="link anim" d="M 623 728 V 432"/>

              <path className="link" d="M 653 728 V 432"/>
              <path className="link anim reverse" d="M 653 728 V 432"/>
            </svg>
            <div className="column">
              {
                [0, 1, 2].map(i => (
                  <div className="relationWrapper">
                    <FacultySummary faculty={faculty} key={i}/>
                    <div className="comment">
                      Got cited by <b>this guy</b> in <b>this paper</b>.
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="column">
              {
                [0, 1, 2].map(i => (
                  <div className="relationWrapper">
                    <FacultySummary faculty={faculty} key={i}/>
                    {
                      i !== 1 &&
                      <div className="comment">
                        Worked with <b>this guy</b> on <b>this paper</b>.
                      </div>
                    }
                  </div>
                ))
              }
            </div>
            <div className="column">
              {
                [0, 1, 2].map(i => (
                  <div className="relationWrapper">
                    <FacultySummary faculty={faculty} key={i}/>
                    <div className="comment">
                      Cited <b>this guy</b> in <b>this paper</b>.
                    </div>
                  </div>
                ))
              }
            </div>
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
