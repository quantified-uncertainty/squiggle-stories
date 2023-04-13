import React, {memo} from "react";

import {DynamicSquiggleChart as OriginalDynamicSquiggleChart} from "./dynamicSquiggleChart";
const DynamicSquiggleChart = memo(OriginalDynamicSquiggleChart);

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
      <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
        <h4 className="text-lg font-bold mb-3">
          {title} </h4>
        <textarea value={editor_code}
          readOnly={false}
          onChange={
            (event) => setEditorCode(event.target.value)
          }
          rows={
            countNumberOfLines(editor_code)
          }
          cols={120}
          spellCheck={"false"}
          className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
        <br/>
        <button className={effectButtonStyle}
          onClick={
            buildChartCode
        }>
          Run model
        </button>
        <DynamicSquiggleChart squiggleChartCode={chart_code}/>
      </div>
    </div>
  )
}
