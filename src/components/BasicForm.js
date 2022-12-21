import { useEffect, useState } from "react";
// import useInput from "../hooks/use-input";
import useReducerInput from "../hooks/use-reducer-input";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useReducerInput(value => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useReducerInput(value => value.trim() !== "");


  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useReducerInput(value => value.includes('@'));




  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log(firstNameIsValid);
    if(firstNameIsValid && lastNameIsValid && emailIsValid){
      setFormIsValid(true);
    }else{
      setFormIsValid(false)
    }
  }, [firstNameIsValid, lastNameIsValid, emailIsValid])
  
  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control'
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control'
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control'

  const formSubmitHandler = (event) =>{
    event.preventDefault();
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    }
    console.log({
      first_name: enteredFirstName,
      last_name: enteredLastName,
      email: enteredEmail
    })
    resetFirstName();
    resetLastName();
    resetEmail();
  }
  
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='first_name'>First Name</label>
          <input 
            type='text' 
            id='first_name' 
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
            />
            {firstNameHasError && <p className="error-text">First name required</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='last_name'>Last Name</label>
          <input 
            type='text' 
            id='last_name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName} 
            />
            {lastNameHasError && <p className="error-text">Last name required</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email' 
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail} 
          />
          {emailHasError && <p className="error-text">Email invalid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
