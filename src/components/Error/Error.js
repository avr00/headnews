import React from "react";

const Error = props => {
  return (
    <div>
      <h1>I'm sorry but we could not find this website</h1>
      <button onClick={() => console.log(props)}>TestingProps</button>
    </div>
  );
};

export default Error;
