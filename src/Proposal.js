import React, { useState } from 'react';
import { classes } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import FacultySummary from './FacultySummary';
import LabeledInput from './LabeledInput';
import './Proposal.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';

function Proposal({ defaultExpanded, faculties }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [tabIndex, setTabIndex] = useState(0);

  const title = 'Profit maximization';

  return (
    <div className={classes('Proposal', expanded && 'expanded')}>
      <div className="titleBar" onClick={() => setExpanded(!expanded)}>
        <div className="title">{title}</div>
        <div className="state">2 researchers signed the contract.</div>
        <FontAwesomeIcon icon={faChevronDown} fixedWidth/>
      </div>
      <div className="body">
        <div className="content">
          <div className="tabContainer">
            {
              ['Proposal', 'Smart Contract'].map((tab, i) => (
                <div className={classes('tab', tabIndex === i && 'selected')} key={i}
                     onClick={() => setTabIndex(i)}>{tab}</div>
              ))
            }
          </div>
          {
            [(
              <div className="tabContent">
                <LabeledInput className="input" label="Workspace"/>
                <LabeledInput className="input" label="Objective"/>
                <LabeledInput className="input" label="Faculties"/>
                <LabeledInput className="input" label="Staff"/>
                <LabeledInput className="input" label="Timetable"/>
                <LabeledInput className="input" label="Budget"/>
                <LabeledInput className="input" label="Dissemination"/>
              </div>
            ), (
              <div className="tabContent">
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
                <Checkbox className="question" label="Lorem ipsum blah blah blah magna carta?"/>
              </div>
            )][tabIndex]
          }
          <div className="buttonContainer">
            <div className="button">Save</div>
            <div className="button secondary">Preview</div>
            <div className="button secondary">Cancel</div>
          </div>
        </div>
        <div className="researcherContainer">
          {
            ['Proposal Sent', 'Proposal Accepted', 'Contract Sent', 'Contract Signed', 'Not Fulfilled'].map((status, i) => (
              <div className={classes('status', i === 4 && 'dim')} key={status}>
                <div className="label">{status}</div>
                {
                  faculties.slice(0, [4, 1, 3, 2, 4][i]).map(faculty => (
                    <FacultySummary faculty={faculty} key={faculty.id} minimal/>
                  ))
                }
                {
                  i === 0 &&
                  <Link className="propose" to={`/search?keywords=${title}`}>
                    <div className="icon">
                      <FontAwesomeIcon icon={faPlus}/>
                    </div>
                    <div className="text">
                      Propose More
                    </div>
                  </Link>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Proposal;
