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
export function DisplayerNativeSquiggleEditor({initialSquiggleString}) { // console.log("initialSquiggleString", initialSquiggleString)

  return (
    <div className={`grid place-items-center w-full`}>

      <div className="grid place-items-center bg-white">
      <h1 className="pt-10">Using Squiggle's editor component</h1>
        <div className="bg-white m-12">
          <SquiggleEditor defaultCode={initialSquiggleString}
            width={672}
            height={200}/>
        </div>
      </div>


    </div>
  );
}
