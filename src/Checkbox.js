import React from 'react';
import { classes } from './utils';
import './Checkbox.scss';

function Checkbox({ className, label, checked, onClick }) {
  return (
    <label className={classes('Checkbox', className)} onClick={onClick}>
      <input type="checkbox" checked={checked}/>
      <div className="box"/>
      <div className="label">{label}</div>
    </label>
  );
}

export default Checkbox;
