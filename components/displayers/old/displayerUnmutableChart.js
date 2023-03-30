import React, {useRef, useState, useEffect} from "react";
import dynamic from "next/dynamic";

const SquiggleChart = dynamic(() => import ("@quri/squiggle-components").then((mod) => mod.SquiggleChart), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

/*
squiggleInput: {
  squiggleCode, // squiggle code
  squiggleBindings // squiggle bindings (optional)
}
*/

function DynamicSquiggleChart({squiggleInput, isOutdated}) {
  if (squiggleInput == null || squiggleInput.squiggleCode == null) {
    return "";
  } else {
    let code = squiggleInput.squiggleCode
    return (
      <div className="grid place-items-center">
        <div className="bg-white w-11/12 p-8">
          <h4 className={
            `text-xl font-bold mb-4 ${
              isOutdated ? "" : "hidden"
            }`
          }>
            Outdated, rerun model at your convenience
          </h4>

          <div className=" h-96 max-w-2xl">
            <SquiggleChart code={code}
              width={672}
              height={208}
              bindings={
                squiggleInput.binding
              }
              showSummary={true}
              showTypes={true}/>
          </div>
        </div>
      </div>
    );
  }
}

// Main
export function DisplayerImmutableChart({initialSquiggleString}) { // console.log("initialSquiggleString", initialSquiggleString)
  const immutableSquiggleString = initialSquiggleString || `x = 1 to 10
x` // you could of course control this from a parent react component, though.
  const doNothing = _ => _


  return (
    <div className={
      `grid place-items-center w-full`
    }>

      <div className="bg-blue-100 pt-8 pb-12 mb-8  content-center items-center">
        <h1 className="pb-5">A normal, uncontrolled chart</h1>
        <DynamicSquiggleChart squiggleInput={
            ({squiggleCode: immutableSquiggleString})
          }
          isOutdated={
            false // chartCode != squiggleCode
          }
          stopShowing={doNothing}/>
      </div>


    </div>
  );
}
