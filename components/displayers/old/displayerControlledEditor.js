import React, {useRef, useState, useEffect} from "react";
import dynamic from "next/dynamic";

const SquiggleChart = dynamic(() => import ("@quri/squiggle-components").then((mod) => mod.SquiggleChart), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const SquiggleEditor = dynamic(() => import ("@quri/squiggle-components").then((mod) => mod.SquiggleEditor), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
// ^ works, but updating the editor content from the outside would be tricky.
// and so instead we are hacking our own mini-editor.

const effectButtonStyle = "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 mb-5";

const countNumberOfLines = string => {
  return string.split("\n").length
}

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
        <div className="grid place-items-center bg-white w-11/12 p-8">
          <h4 className={
            `text-xl font-bold mb-4 ${
              isOutdated ? "" : "hidden"
            }`
          }>
            Outdated, rerun model at your convenience
          </h4>

          <div className=" max-w-2xl">
            <SquiggleChart code={code}
              width={672}
              height={1000}
              bindings={
                {}
              }
              showSummary={false}
              distributionChartSettings={
                {showSummary: false}
              }/>
          </div>
        </div>
      </div>
    );
  }
}

// Main
export function DisplayerControlledEditor({
  initialSquiggleCode,
  editorCode,
  setEditorCode,
  sectionTitle,
  computeCodeWithExtraBefore
}) {
  const backupSquiggleString = `x = 1 to 10
x`

  const [squiggleCode, setSquiggleCode] = useState((initialSquiggleCode || backupSquiggleString));

  const [changeSquiggleCodeTimeout, setChangeSquiggleCodeTimeout] = useState(0);

  let onClickRunCodeButton = newCode => {
    clearTimeout(changeSquiggleCodeTimeout)
    let newTimeout = setTimeout(() => {
      setSquiggleCode((newCode))
    }, 50)
    setChangeSquiggleCodeTimeout(newTimeout)
  }

  return (
    <div className={
      `grid place-items-center w-full ${
        squiggleCode == null ? "hidden" : ""
      }`
    }>

      <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
        <h4 className="text-lg font-bold mb-4">
          {sectionTitle} </h4>
        <textarea value={editorCode}
          readOnly={false}
          onChange={
            (event) => setEditorCode(event.target.value)
          }
          rows={
            countNumberOfLines(editorCode) * 1.15
          }
          cols={120}
          spellcheck={"false"}
          className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm"/>
        <br/>
        <button className={effectButtonStyle}
          onClick={
            () => onClickRunCodeButton(editorCode)
        }>
          Run model
        </button>
        <DynamicSquiggleChart squiggleInput={
            ({squiggleCode: squiggleCode})
          }
          isOutdated={
            false // chartCode != squiggleCode
          }
          stopShowing={
            () => setSquiggleCode(null)
          }/>

      </div>


    </div>
  );
}
