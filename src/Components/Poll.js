import React from 'react';
import * as Survey from "survey-react";

export default (props) => {

  Survey.Survey.cssType = "bootstrap";
  const data = props.pollData;
  console.log(data)
  let survey = new Survey.ReactSurveyModel(data);

  return props.hidden ? null : (
    <div className='col-md-12' id='poll'>
	    <Survey.Survey 
	    model={survey} 
	    onComplete={props.submitPoll} 
	    />
    </div>
  );
}