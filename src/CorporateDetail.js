import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import React, { useEffect, useState } from 'react';
import logoPic from './img/logo.png';
import './CorporateDetail.scss';
import axios from 'axios';
import Proposal from './Proposal';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function CorporateDetail() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    axios.get(`/api/faculties/search?keywords=park&limit=10`)
      .then(response => {
        const faculties = response.data;
        setFaculties(faculties);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="CorporateDetail">
      <div className="bio">
        <div className="photo" style={{ backgroundImage: `url(${logoPic})` }}/>
        <div className="info">
          <div className="name">Goldman Sachs</div>
          <div className="row">
            <FontAwesomeIcon className="icon" icon={faHeart} fixedWidth/>
            <div>
              Corporate Investment, Risk Management, Interest Rates
            </div>
          </div>
        </div>
      </div>
      <div className="proposalContainer">
        <div className="newProposal">
          <input className="titleInput" type="text" placeholder="Create a new proposal"/>
          <div className="icon">
            <FontAwesomeIcon icon={faPlus} fixedWidth/>
          </div>
        </div>
        {
          new Array(5).fill(0).map((_, i) => (
            <Proposal faculties={faculties} key={i} defaultExpanded={i === 0}/>
          ))
        }
      </div>
    </div>
  );
}

export default CorporateDetail;
