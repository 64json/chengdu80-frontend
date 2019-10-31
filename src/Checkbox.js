import React from 'react';
import { classes } from './utils';
import './Checkbox.scss'

function Checkbox({ className, label }) {
  return (
    <label className={classes('Checkbox', className)}>
      <input type="checkbox"/>
      <div className="box"/>
      <div className="label">{label}</div>
    </label>
  );
}

export default Checkbox;
