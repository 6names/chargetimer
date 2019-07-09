import React from "react";
import { Field } from "formik";
import classes from "./Input.module.css";

function Input({ name, label }) {
  return (
    <div className={classes.Line}>
      <Field name={name}>
        {({ field }) => (
          <>
            <label className={classes.Label}>{label}</label>
            <input
              min={0}
              className={classes.Input}
              type={'number'}
              {...field}/>
          </>
        )}
      </Field>
    </div>
  );
}

Input.propTypes = {};

export default Input;