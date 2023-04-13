import React, {memo} from "react";

// import {DynamicSquiggleChart as OriginalDynamicSquiggleChart} from "./dynamicSquiggleChart";
// const DynamicSquiggleChart = memo(OriginalDynamicSquiggleChart);

import {DynamicNativeSquiggleEditor as OriginalDynamicNativeSquiggleEditor} from "./dynamicNativeSquiggleEditor";
const DynamicNativeSquiggleEditor = memo(OriginalDynamicNativeSquiggleEditor);

const effectButtonStyle = "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 mb-5";

const sum = xs => {
  let result = 0
  for (let x of xs) {
    result += x
  }
  return result
}

const countNumberOfLines = string => {
  // to do: get numCols as a function of screensize.
  // (see how much each component takes, from tailwinds.)
  let numCols = 82
  let lines = string.split("\n")
  let line_equivalents = lines.map(l => Math.ceil(l.length / numCols) || 1)
  let result = sum(line_equivalents) + 1
  return result
  // return string.split("\n").length * 1.3
}


export function NotebookChartEditorWrapper({
  title,
  editor_code,
  initial_editor_code,
  setEditorCode,
  chart_code,
  buildChartCode
}) {
  return (
    <div className="grid place-items-center w-full">
      <div className="bg-blue-100 w-10/12 mt-5 pt-10 content-center items-center pb-20 mb-5">
        <h4 className="text-xl font-bold mb-3 ">
          {title} </h4>
        <div className="text-left">
          <DynamicNativeSquiggleEditor initialSquiggleString={initial_editor_code}
            onCodeChange={
              newCode => setEditorCode(newCode)
            }/>
        </div>
        <button className={effectButtonStyle}
          onClick={buildChartCode}>
          Run model
        </button>
        <DynamicSquiggleChart squiggleChartCode={chart_code} className="text-left"/>
      </div>
    </div>
  )
}
