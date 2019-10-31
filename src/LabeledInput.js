import React, { useState } from 'react';
import './LabeledInput.scss';
import { classes } from './utils';

function LabeledInput({ className, label, type = 'text' }) {
  const [value, setValue] = useState('');

  return (
    <div className={classes('LabeledInput', className)}>
      <div className="label">{label}</div>
      <input className="input" type={type} value={value} onChange={e => setValue(e.target.value)}/>
    </div>
  );
}

export default LabeledInput;
