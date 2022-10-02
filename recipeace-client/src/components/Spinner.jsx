import React from 'react';
import {MutatingDots} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <MutatingDots
        type="Circles"
        color="orange"
        secondaryColor= 'black'
        height="100"
  width="100"
        className="m-5"
      />

      <p className="text-lg text-center px-2 mt-2">{message}</p>
    </div>
  );
}

export default Spinner;