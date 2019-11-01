import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.scss';
import * as queryString from 'query-string';

function Search({ history, location }) {
  const [keywords, setKeywords] = useState('');
  useEffect(() => {
    const { keywords } = queryString.parse(location.search);
    setKeywords(keywords);
  }, [location.search]);

  return (
    <input className="Search" type="text" placeholder="Search 'Post-Loan Warning'"
           onChange={e => setKeywords(e.target.value)} value={keywords}
           onKeyDown={e => e.keyCode === 13 && history.push(`/search?keywords=${keywords}`)}/>
  );
}

export default withRouter(Search);
