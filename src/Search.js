import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.scss';

function Search({ history }) {
  const [keywords, setKeywords] = useState('');

  return (
    <input className="Search" type="text" placeholder="Search 'Post-Loan Warning'"
           onChange={e => setKeywords(e.target.value)} value={keywords}
           onKeyDown={e => e.keyCode === 13 && history.push(`/search?keywords=${keywords}`)}/>
  );
}

export default withRouter(Search);
