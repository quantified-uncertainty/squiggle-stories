import React, {useState, memo} from "react";

import {DynamicSquiggleChart as OriginalDynamicSquiggleChart} from "./displayers/dynamicSquiggleChart";

const DynamicSquiggleChart = memo(OriginalDynamicSquiggleChart);

// Helpers
const effectButtonStyle = "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 mb-5";

const countNumberOfLines = string => {
  return string.split("\n").length
}

// Main
export function Homepage() {
  const p1s1_title = "General variables" /* General variables */
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
  let p1s2_title = "Nice computer"
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
item_nice_computer
`
  const [p1s2_editor_code, p1s2_setEditorCode] = useState(p1s2_nice_computer)
  const [p1s2_chart_code, p1s2_setChartCode] = useState(p1s1_general_variables + "\n" + p1s2_nice_computer)
  const p1s2_buildChartCode = () => p1s2_setChartCode(p1s1_editor_code + "\n" + p1s2_editor_code)

  // Nice headphones
  let p1s3_title = "Nice headphones"
  let p1s3_nice_headphones = `cost_nice_headphones = 250 to 350 // dollars
hours_per_day_with_headphones = hours_day_in_front_of_computer

hedonic_improvement_from_current_headphones = 1 to 2
// good headphones improve by moment-to-moment experience 
// a whole lot, i.e., listening to music moves me from a 
// 4 to a 6 in a 1-10 scale

hedonic_improvement_from_new_headphones = 1.5 to 2.2
// pulling this number out of my ass.
// in particular, old headphones (Senheiser) are good, but 
// bluetooth isn't particularly great
// and they are starting to have some problems

value_hedonic_improvement_in_dollars = 1 to 10
// value of a 1 point improvement in a 1-10 scale for 1h.
// initial thought is
// would pay $30/hour to go from a 5 to an 8? yeah
// or (24-9) * 365 * (8-5) * 10 = $164,250
// lol, I can't afford to pay $30/hour
// for a 3 point improvement in a 1-10 scale
// (if it was all year round)
// this sucks
// I'm still considering leaving the $10/1 point improvement
// one could also adjust for hedonic treadmill?

hedonic_delta_headphones = truncateLeft(hedonic_improvement_from_new_headphones - hedonic_improvement_from_current_headphones, 1)
// the calculation of the delta is obvious, 
// but whence the truncation?
// well, if you don't like the new ones, you can keep the old ones
// the truncation at 1 instead of at zero is so that relative values work.
// but we can also pretend that it's because there is some value of information
lifespan_headphones = ( 1 to 3 ) * 365 

value_nice_headphones = hedonic_delta_headphones * hours_per_day_with_headphones * lifespan_headphones * value_hedonic_improvement_in_dollars
recommendation_nice_headphones = mean(hedonic_delta_headphones) > mean(cost_nice_headphones) ? true : false
item_nice_headphones = {
  id: "2",
  num_id: 2,
  name: "Nice headphones (e.g., Bose 45) (lifespan of item)",
  cost: cost_nice_headphones,
  value: value_nice_headphones,
  recommendation: recommendation_nice_headphones
}
item_nice_headphones`

  const [p1s3_editor_code, p1s3_setEditorCode] = useState(p1s3_nice_headphones)
  const [p1s3_chart_code, p1s3_setChartCode] = useState(p1s1_general_variables + "\n" + p1s3_nice_headphones)
  const p1s3_buildChartCode = () => p1s2_setChartCode(p1s1_editor_code + "\n" + p1s2_editor_code)

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
              {p1s1_title} </h4>
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
              {p1s2_title} </h4>
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
              onClick={p1s2_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s2_chart_code}/>
          </div>
        </div>
        <p>Some points of order about that model:</p>
        <ol>
          <li>The value term represents my consumer surplus, in dollars. But I would generally be willing to pay less than the consumer surplus for any particular item, because I could always switch to a competition, and because there are other competing products that also make a bid on my finite budget.</li>
          <li>The beta term has a lot of unnecessary decimal points. I am mildly averse to deleting decimal points. The origin of these decimal points is
            <a href="https://nunosempere.com/blog/2023/03/15/fit-beta/">this tool</a>
            to find a beta distribution which fits a 90% confidence interval. In the future, finding a beta that fits a given confidence interval will probably be incorporated into the core Squiggle syntax, but we haven't figured out how yet. See
            <a href="https://github.com/quantified-uncertainty/squiggle/issues/1615">this issue</a>
            for discussion.</li>
          <li>That model reuses the general variables we outlined at the beginning.
          </li>
        </ol>


        <h3 className="mb-4">Nice headphones</h3>
        <p>Here is a similar model about nice headphones:
        </p>

        <div className="grid place-items-center w-full">
          {/* to do: wrapp in its own component, see above */}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {p1s3_title} </h4>
            <textarea value={p1s3_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s3_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s3_editor_code) * 1.15 + 1
              }
              cols={120}
              spellcheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s3_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s3_chart_code}/>
          </div>
        </div>
        <p>It's kind of absurd how much headphones increase my level of happiness. I also thought it was interesting that I can't afford to pay $30/hour for a 3 point improvement in a 10 point scale, if that intervention is permanent.</p>

        <h2>Part II:</h2>
      </div>
    </div>

  );
}
