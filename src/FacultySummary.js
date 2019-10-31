import { classes } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons/faScroll';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import React from 'react';
import './FacultySummary.scss';
import { Link } from 'react-router-dom';

function FacultySummary({ faculty, selected, onClick, minimal }) {
  const Component = onClick ? (props) => (
    <div onClick={onClick} {...props} />
  ) : (props) => (
    <Link to={`/faculty/${faculty._id}`} {...props} />
  );

  return (
    <Component key={faculty._id}
               className={classes('FacultySummary', selected && 'selected', minimal && 'minimal')}>
      <div className="photo" style={{ backgroundImage: `url(${faculty.image_url})` }}/>
      <div className="info">
        <div className="name">{faculty.name}</div>
        <div className="organization">Georgia Institute of Technology</div>
        <div className="row">
          <FontAwesomeIcon className="icon" icon={faHeart} fixedWidth/>
          <div>
            Corporate Investment, Risk Management, Interest Rates
          </div>
        </div>
        <div className="row">
          <FontAwesomeIcon className="icon" icon={faScroll} fixedWidth/>
          <div>
            Some Research Paper Title Goes Here
          </div>
        </div>
        <div className="row">
          <FontAwesomeIcon className="icon" icon={faScroll} fixedWidth/>
          <div>
            Some Research Paper Title Goes Here
          </div>
        </div>
      </div>
    </Component>
  );
}

export default FacultySummary;
