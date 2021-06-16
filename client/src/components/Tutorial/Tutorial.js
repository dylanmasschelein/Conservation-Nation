import React from "react";
import TutorialStep from "../TutorialStep/TutorialStep";
import "./Tutorial.scss";

export default function Tutorial() {
  const stepOne = {
    step: "Step #1 🐙",
    direction: "Search for a country of your choice",
  };
  const stepTwo = {
    step: "Step #2 🦍",
    direction: "Click an area for closer inspection",
  };
  const stepThree = {
    step: "Step #3 🐍",
    direction: "Click the explore button to reveal the observation markers",
  };

  const stepFour = {
    step: "Step #4 🐳",
    direction: "Click on the markers to learn about the wildlife!",
  };

  return (
    <div className='tutorial'>
      <TutorialStep step={stepOne} />
      <TutorialStep step={stepTwo} />
      <TutorialStep step={stepThree} />
      <TutorialStep step={stepFour} />
    </div>
  );
}
