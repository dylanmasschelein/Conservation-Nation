import React from "react";
import TutorialStep from "../TutorialStep/TutorialStep";
import "./Tutorial.scss";

export default function Tutorial() {
  const stepOne = {
    step: "Step #1 🐙",
    direction: "Search for a country",
  };
  const stepTwo = {
    step: "Step #2 🦍",
    direction: "Inspect and click an area",
  };
  const stepThree = {
    step: "Step #3 🐍",
    direction: "Hit Explore to learn!",
  };

  // const stepFour = {
  //   step: "Step #4 🐳",
  //   direction: "Click on the markers to learn about the wildlife!",
  // };

  return (
    <div className='tutorial'>
      <TutorialStep step={stepOne} />
      <TutorialStep step={stepTwo} />
      <TutorialStep step={stepThree} />
      {/* <TutorialStep step={stepFour} /> */}
    </div>
  );
}
