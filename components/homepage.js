import React, {useRef, useState, useEffect} from "react";
import {DynamicSquiggleChart} from "./displayers/dynamicSquiggleChart"
import {DisplayerNativeSquiggleEditor} from "./displayers/displayerNativeSquiggleEditor"
// Helpers
const effectButtonStyle = "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 mb-5";

const countNumberOfLines = string => {
  return string.split("\n").length
}

// Main
export function Homepage() { /* General variables */
  let p1s1_general_variables = `salary = SampleSet.fromDist(70k to 150k)

value_doubling_productivity = SampleSet.fromDist(30k to 75k)
// how much would you pay to be 100% more productive? 
// personally, i.e., from your own salary.

hours_worked_in_year = SampleSet.fromDist( (48 to 52) * (5 to 6) * (5 to 16 ))// 48 to 52 weeks, 5 to 6 days per week, 5 to 16 hours per day

hours_day_in_front_of_computer = SampleSet.fromDist(8 to 14)

hourly_salary = SampleSet.fromDist(salary / hours_worked_in_year)

value_additional_free_hour = 30 to 150 // dollars`
  const [p1s1_editor_code, p1s1_setEditorCode] = useState(p1s1_general_variables);
  const [p1s1_chart_code, p1s1_setChartCode] = useState(p1s1_general_variables)

  return (
    <div className="grid align-self-center items-center mt-10 place-items-center">
      <div className="w-9/12">
        <h1 className="font-bold mb-4">A story about values and tradeoffs</h1>
        <h2 className="mb-4">Part I: Consumerism</h2>

        <p>In my extended social circle, people sometimes make lists of &ldquo;things you should buy&rdquo;. My friend Gavin has gathered a list of such lists&nbsp;
          <a href="https://www.gleech.org/stuff">here</a>. I&rsquo;m going to go over a few of the items on those lists, and estimate their value. But before I get started, first I&rsquo;ll first have to set some variables, and determine how much I value a few things relative to each other. If you want to follow along, you can edit these to correspond to your values:</p>
        <DisplayerNativeSquiggleEditor initialSquiggleString={"1 to 10"} onCodeChange={p1s1_setEditorCode}/>
        <h3 className="mb-4">A nice computer</h3>
        <p>With the above variables in mind, here is how much I think I value a nice computer</p>


        <h2>Part II:</h2>
      </div>
    </div>

  );
}
