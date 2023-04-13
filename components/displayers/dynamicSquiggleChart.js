import React, {useRef, useState, useEffect} from "react";
import dynamic from "next/dynamic";
import {SquiggleChart} from "@quri/squiggle-components"

/*
squiggleInput: {
  squiggleCode, // squiggle code
  squiggleBindings // squiggle bindings (optional)
}
*/

export function DynamicSquiggleChart({ squiggleChartCode }) {
  if (squiggleChartCode == null) {
    return "";
  } else {
    return (
      <div className="grid place-items-center">
        <div className="grid place-items-center bg-white w-9/12 p-8">
          <div className=" max-w-2xl">
						<div className="squiggle text-left">
            <SquiggleChart code={squiggleChartCode}
              width={672}
              height={1000}

              distributionChartSettings={
                {showSummary: true}
              }/>
						</div>
          </div>
        </div>
      </div>
    );
  }
}
