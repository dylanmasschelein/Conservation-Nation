import React from "react";
import "./TutorialStep.scss";

export default function TutorialStep(props) {
  const { step } = props;
  return (
    <div className='tutorial-step'>
      <h2 className='tutorial-step__num'>{step.step}</h2>
      <span className='tutorial-step__direction'>{step.direction}</span>
    </div>
  );
}
