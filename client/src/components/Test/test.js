import React from "react";

function test() {
  const position = navigator.geolocation.getCurrentPosition(function (
    position
  ) {
    const { latitude, longitude } = position;
    return [latitude, longitude];
  });

  console.log(position);

  return (
    <div>
      <h1>uiuiojn</h1>
    </div>
  );
}
export default test;
