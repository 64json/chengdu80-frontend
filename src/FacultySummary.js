import { classes } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons/faScroll';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import React from 'react';
import './FacultySummary.scss';
import { Link } from 'react-router-dom';
import emptyPic from './img/profile.jpg';

function FacultySummary({ faculty, selected, onClick, minimal }) {
  const Component = onClick ? (props) => (
    <div onClick={onClick} {...props} />
  ) : (props) => (
    <Link to={`/faculty/${faculty._id}`} {...props} />
  );

  return (
    <Component className={classes('FacultySummary', selected && 'selected', minimal && 'minimal')}>
      <div className="photo" style={{ backgroundImage: `url(${faculty.image_url || emptyPic})` }}/>
      <div className="info">
        <div className="name">{faculty.name}</div>
        <div className="organization">{faculty.university}</div>
        <div className="row">
          <FontAwesomeIcon className="icon" icon={faHeart} fixedWidth/>
          <div className="expertise">
            {faculty.expertises.map(v => v.slice(0, 1).toUpperCase() + v.slice(1)).join(', ')}
          </div>
        </div>
        {
          faculty.papers.map(paper => (
            <div className="row" key={paper._id}>
              <FontAwesomeIcon className="icon" icon={faScroll} fixedWidth/>
              <div>{paper.displayName}</div>
            </div>
          ))
        }
      </div>
    </Component>
  );
}

export default FacultySummary;
