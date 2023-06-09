import React, {useRef, useState, useEffect} from "react";
import dynamic from "next/dynamic";
import {SquiggleEditor} from "@quri/squiggle-components"

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
export function DynamicNativeSquiggleEditor({initialSquiggleString, onCodeChange}) { // console.log("initialSquiggleString", initialSquiggleString)

  return (
    <div className={`grid place-items-center w-full bg-blue-100 w-full`}>

      <div className="grid place-items-center w-11/12">
        <div className="block w-11/12 items-center bg-white mt-5">
          <SquiggleEditor defaultCode={initialSquiggleString}
            onCodeChange={onCodeChange}
            hideViewer={true}
            className=""/>
        </div>
      </div>


    </div>
  );
}
