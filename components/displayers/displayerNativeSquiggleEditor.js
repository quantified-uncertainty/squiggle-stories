import React, {useRef, useState, useEffect} from "react";
import dynamic from "next/dynamic";

const SquiggleEditor = dynamic(() => import ("@quri/squiggle-components").then((mod) => mod.SquiggleEditor), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

/*
    code?: string;
    defaultCode?: string;
    onChange?(expr: bindings | undefined): void;
    onCodeChange?(code: string): void;
    bindings?: bindings;
    environment?: environment;
    jsImports?: jsImports;
*/

// Main
export function DisplayerNativeSquiggleEditor({initialSquiggleString, onCodeChange}) { // console.log("initialSquiggleString", initialSquiggleString)

  return (
    <div className={`grid place-items-center w-11/12`}>

      <div className="grid place-items-center w-11/12">
        <div className="grid place-items-center bg-white w-11/12 p-8">
          <div className=" max-w-2xl"></div>
          <SquiggleEditor defaultCode={initialSquiggleString}
            onCodeChange={onCodeChange}
            width={800}
            height={400}
            distributionChartSettings={
              {showSummary: true}
            }/>
        </div>
      </div>


    </div>
  );
}
