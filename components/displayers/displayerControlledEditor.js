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

const effectButtonStyle = "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5";

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
export function DisplayerControlledEditor({initialSquiggleString}) { // console.log("initialSquiggleString", initialSquiggleString)
  const backupSquiggleString = `x = 1 to 10
x`

  const [squiggleCode, setSquiggleCode] = useState(initialSquiggleString || backupSquiggleString);
  const [editorCode, setEditorCode] = useState(initialSquiggleString || backupSquiggleString);
  const [changeSquiggleCodeTimeout, setChangeSquiggleCodeTimeout] = useState(0);

  let onClickRunCodeButton = newCode => {
    clearTimeout(changeSquiggleCodeTimeout)
    let newTimeout = setTimeout(() => {
      setSquiggleCode(newCode)
    }, 100)
    setChangeSquiggleCodeTimeout(newTimeout)
  }


  return (
    <div className={
      `grid place-items-center w-full ${
        squiggleCode == null ? "hidden" : ""
      }`
    }>

      <div className="bg-blue-100 pt-8 pb-12 mb-8  content-center items-center">
        <DynamicSquiggleChart squiggleInput={
            ({squiggleCode: squiggleCode})
          }
          isOutdated={
            false // chartCode != squiggleCode
          }
          stopShowing={
            () => setSquiggleCode(null)
          }/>
        <h4 className="text-2xl font-bold mb-4 mt-8">
          Underlying Squiggle Code
        </h4>
        <textarea value={editorCode}
          readOnly={false}
          onChange={
            (event) => setEditorCode(event.target.value)
          }
          rows={
            countNumberOfLines(editorCode) + 1
          }
          cols={70}
          className="text-left text-gray-600 bg-white rounded text-normal p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12"/>
        <br/>
        <button className={effectButtonStyle}
          onClick={
            () => onClickRunCodeButton(editorCode)
        }>
          Run model
        </button>
      </div>


    </div>
  );
}
