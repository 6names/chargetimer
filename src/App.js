import React, { useEffect, useState } from 'react';
import axios from "axios";
import classes from './App.module.css';
import { Field, Form, Formik } from "formik";

function App() {
  const [state, setState] = useState({
    RUB: 0,
    UAH: 0,
    USD: 0
  });
  
  useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=3491e1fa9df0ad5380b89167a890a6cc&symbols=USD,RUB,UAH&format=1')
      .then(({ data: { rates } }) => {
        setState(rates)
      }).catch(console.log);
  }, []);
  
  return (
    <div className="App">
      <Formik
        onSubmit={() => {
        }}
        initialValues={{
          price: 800,
          hours: 0,
          minutes: 0
        }}
      >
        {({ values }) => {
          const { price, hours, minutes } = values;
          
          function calcCharge() {
            const hoursToMin = hours * 60;
            const totalMinutes = minutes + hoursToMin;
            return Math.floor((totalMinutes / 60) * price);
          }
          
          function countUAH() {
            const rub = state.RUB;
            const uah = state.UAH;
            const result = Math.floor((calcCharge() / rub) * uah);
            return isNaN(result) ? 0 : result;
          }
          
          function countUSD() {
            const rub = state.RUB;
            const usd = state.USD;
            const result = Math.floor((calcCharge() / rub) * usd);
            return isNaN(result) ? 0 : result;
          }
          
          return (
            <Form className={classes.Form}>
              <div className={classes.Line}>
                <Field name={'price'}>
                  {({ field }) => (
                    <>
                      <label className={classes.Label}>Price</label>
                      <input
                        className={classes.Input}
                        type={'number'}
                        {...field}/>
                    </>
                  )}
                </Field>
              </div>
              
              <div className={classes.Line}>
                <Field name={'hours'}>
                  {({ field }) => (
                    <>
                      <label className={classes.Label}>Hours</label>
                      <input
                        className={classes.Input}
                        type={'number'}
                        {...field}/>
                    </>
                  )}
                </Field>
              </div>
              
              <div className={classes.Line}>
                <Field name={'minutes'}>
                  {({ field }) => (
                    <>
                      <label className={classes.Label}>Minutes</label>
                      <input
                        className={classes.Input}
                        type={'number'}
                        {...field}/>
                    </>
                  )}
                </Field>
              </div>
              
              <div className={classes.Result}>
                <div className={classes.ResultItem}>{calcCharge()} RUB</div>
                <div className={classes.ResultItem}>{countUAH()} UAH</div>
                <div className={classes.ResultItem}>{countUSD()} USD</div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default App;
