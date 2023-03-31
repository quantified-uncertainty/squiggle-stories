import React, {useState, memo} from "react";

import {DynamicSquiggleChart as OriginalDynamicSquiggleChart} from "./displayers/dynamicSquiggleChart";

const DynamicSquiggleChart = memo(OriginalDynamicSquiggleChart);

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
  const [p1s1_editor_code, p1s1_setEditorCode] = useState(p1s1_general_variables)
  const [p1s1_chart_code, p1s1_setChartCode] = useState(p1s1_general_variables)
  const p1s1_buildChartCode = () => p1s1_setChartCode(p1s1_editor_code)

  // Nice computer (e.g., MacBook Pro)
  let p1s2_nice_computer = `cost_nice_computer = 2k to 3k
fraction_improvement_productivity = beta(1.6308424891839157, 13.480636131095403)
// ^ 1% to 30% (https://nunosempere.com/blog/2023/03/15/fit-beta/)
value_from_productivity = fraction_improvement_productivity * value_doubling_productivity
value_from_subjective_wellbeing = 1k to 5k // very uncertain
years_of_use_nice_computer = 1 to 4

value_nice_computer = (value_from_productivity + value_from_subjective_wellbeing) * years_of_use_nice_computer
recommendation_nice_computer = mean(value_nice_computer) > mean(cost_nice_computer) ? true : false
item_nice_computer = {
	name: "Nice computer (e.g., MacBook pro) (lifetime of item)",
	cost: cost_nice_computer,
	value: value_nice_computer,
	recommendation: recommendation_nice_computer
}
`
  const [p1s2_editor_code, p1s2_setEditorCode] = useState(p1s2_nice_computer)
  const [p1s2_chart_code, p1s2_setChartCode] = useState(p1s1_general_variables + "\n" + p1s2_nice_computer)
  const p1s2_buildChartCode = () => p1s2_setChartCode(p1s1_editor_code + "\n" + p1s2_editor_code )

  return (
    <div className="grid align-self-center items-center mt-10 place-items-center">
      <div className="w-9/12">
        <h1 className="font-bold mb-4">A story about values and tradeoffs</h1>
        <h2 className="mb-4">Part I: Consumerism</h2>

        <p>In my extended social circle, people sometimes make lists of &ldquo;things you should buy&rdquo;. My friend Gavin has gathered a list of such lists&nbsp;
          <a href="https://www.gleech.org/stuff">here</a>. I&rsquo;m going to go over a few of the items on those lists, and estimate their value. But before I get started, first I&rsquo;ll first have to set some variables, and determine how much I value a few things relative to each other. If you want to follow along, you can edit these to correspond to your values:</p>

        <div className="grid place-items-center w-full">
          {/* I'm going to repeat this piece of code a few times, 
          and then later wrap it in its own function.
          But wrapping it in its own function right now is not worth it
          because it keeps changing too much and I have to go back and forth*/}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {"General variables"} </h4>
            <textarea value={p1s1_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s1_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s1_editor_code) * 1.15 + 1
              }
              cols={120}
              spellcheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={
                p1s1_buildChartCode // () => p1s1_setChartCode(p1s1_editor_code)
            }>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s1_chart_code}/>
          </div>
        </div>

        <h3 className="mb-4">A nice computer</h3>
        <p>With the above variables in mind, here is how much I think I value a nice computer, i.e., my current computer, or a not-too-new Macbook:</p>

        <div className="grid place-items-center w-full">
          {/* to do: wrapp in its own component, see above */}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {"General variables"} </h4>
            <textarea value={p1s2_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s2_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s2_editor_code) * 1.15 + 1
              }
              cols={120}
              spellcheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={
                p1s2_buildChartCode
            }>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s2_chart_code}/>
          </div>
        </div>

        <h2>Part II:</h2>
      </div>
    </div>

  );
}
