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
import contractPdf from './contract.pdf';

function Proposal({ defaultExpanded, faculties }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [tabIndex, setTabIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(2);

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
                {
                  ['1) Two party', '2) Multi-party consortium'].map((q, i) => (
                    <Checkbox key={q} className="question" label={q} checked={i === questionIndex}
                              onClick={() => setQuestionIndex(i)}/>
                  ))
                }
                {
                  [[
                    ' a) Corporate has non-exclusive rights to use in specified field/territory; no sub-licences',
                    ' b) Corporate may negotiate further licence to some or all Institution IP',
                    ' c) Corporate may negotiate for an assignment of some Institution IP',
                    ' d) Institution has right to use for non-commercial purposes',
                    ' e) Each party has right to exploit certain results created during the project and takes assignment of those results. Institution has right to use for academic and research purposed, the Corporate for research purposes',
                    ' f) Contract research: no publication by Institution without Collaborator’s permission',
                    ' g) Institution has right to use for academic and research purposes',
                  ], [
                    ' a) Each member of the consortium owns the IP in the results that it creates. They grant each other party a non-exclusive licence to use those results for the purposes of the project and any other purpose',
                    ' b) The other parties assign their IP in the results to the lead exploitation party (or the lead exploitation party granted an exclusive licence).',
                    ' c) Each party takes an assignment of IP in the results that are germane to its core business and exploits those results.',
                    ' d) Each member of the consortium owns the IP in the results that it creates. They grant each other party a non-exclusive licence to use those results for the purposes of the project only. If any member of the consortium wishes to exploit another’s IP they must negotiate a license or assignment with the owner of that IP.',
                  ], []][questionIndex].map(q => (
                    <Checkbox key={q} className="question" label={q}/>
                  ))
                }
              </div>
            )][tabIndex]
          }
          <div className="buttonContainer">
            <div className="button">Save</div>
            <a className="button secondary" href={contractPdf} target="_blank">Preview</a>
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
