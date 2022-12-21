import { useState, useEffect } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,

  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,

  } = useInput(value => value.includes('@'));
  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(() => {
    if(enteredNameIsValid && enteredEmailIsValid){
      setFormIsValid(true);
    }else{
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid])
  
  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid && !enteredEmailIsValid ) {
      return;
    }
    console.log({
      name: enteredName,
      email: enteredEmail
    })
    resetNameInput();
    resetEmailInput();
  }
  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";  

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          />
          {nameInputHasError && <span className="error-text">Name is required !</span>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='email' 
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          />
          {emailInputHasError && <span className="error-text">Email is Invalid !</span>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} >Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
