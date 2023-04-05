import React, {useState, memo} from "react";

import {DynamicSquiggleChart as OriginalDynamicSquiggleChart} from "./displayers/dynamicSquiggleChart";
const DynamicSquiggleChart = memo(OriginalDynamicSquiggleChart);

// Helpers
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

const getItemToDisplayFromSquiggleString = string => {
  // gets Squiggle code as a string,
  // and returns the variable to display
  // it's going to be the last variable which was allocated.
  // For example, if the code is x = `x = 1
  // y = 1
  // `
  // then it is going to find the last =
  // and it's going to return "y".
  let lines = string.split("\n")
  let linesWithVariableAssignment = lines.filter(line => line.includes("=") && !line.includes("  ") && !line.includes("\t"))
  let n = linesWithVariableAssignment.length
  let lastVariableAssignmentLine = n > 0 ? linesWithVariableAssignment[n - 1] : ""
  let result = lastVariableAssignmentLine.replace(/(\s)?=.*/, "")
  return result
}

const joinArrayWithLineBreaks = xs => {
  return xs.join("\n")
}
const joinEnter = joinArrayWithLineBreaks

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
  let p1s2_nice_computer = `cost_nice_computer = 1k to 3k
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
}`
  const [p1s2_editor_code, p1s2_setEditorCode] = useState(p1s2_nice_computer)
  const [p1s2_chart_code, p1s2_setChartCode] = useState(joinEnter([p1s1_general_variables, p1s2_nice_computer, getItemToDisplayFromSquiggleString(p1s2_nice_computer)]))
  const p1s2_buildChartCode = () => p1s2_setChartCode(joinEnter([p1s1_editor_code, p1s2_editor_code, getItemToDisplayFromSquiggleString(p1s2_editor_code)]))

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
}`

  const [p1s3_editor_code, p1s3_setEditorCode] = useState(p1s3_nice_headphones)
  const [p1s3_chart_code, p1s3_setChartCode] = useState(joinEnter([p1s1_general_variables, p1s3_nice_headphones, getItemToDisplayFromSquiggleString(p1s3_nice_headphones)]))
  const p1s3_buildChartCode = () => p1s3_setChartCode(joinEnter([p1s1_editor_code, p1s3_editor_code, getItemToDisplayFromSquiggleString(p1s3_editor_code)]))

  // Spare laptop charger
  let p1s4_title = "Spare laptop charger"
  let p1s4_spare_charger = `cost_spare_laptop_charger = 15 to 40 // dollars
chance_of_default_charger_breakage_per_year = beta(1.2615450872566734, 5.967171456277175)
// ^ 1% to 50%
hours_needed_to_replace_it = 0.5 to 2
value_of_avoiding_hassle_if_broken = 100 // dollars
years_until_replacement_lost = 1 to 3

value_spare_laptop_charger = chance_of_default_charger_breakage_per_year * hours_needed_to_replace_it * value_of_avoiding_hassle_if_broken * years_until_replacement_lost
recommendation_spare_laptop_charger = mean(value_spare_laptop_charger) > mean(cost_spare_laptop_charger) ? true : false
item_spare_laptop_charger = {
  id: "5",
  num_id: 5,
  name: "Spare laptop charger (lifetime of item)",
  cost: cost_spare_laptop_charger,
  value: value_spare_laptop_charger,
  recommendation: recommendation_spare_laptop_charger
}`
  const [p1s4_editor_code, p1s4_setEditorCode] = useState(p1s4_spare_charger)
  const [p1s4_chart_code, p1s4_setChartCode] = useState(joinEnter([p1s1_general_variables, p1s4_spare_charger, getItemToDisplayFromSquiggleString(p1s4_spare_charger)]))
  const p1s4_buildChartCode = () => p1s4_setChartCode(joinEnter([p1s1_editor_code, p1s4_editor_code, getItemToDisplayFromSquiggleString(p1s4_editor_code)]))

  // Casio watch
  let p1s5_title = "Spare laptop charger"
  let p1s5_casio_watch = `cost_casio_watch = 15 to 50
num_check_time_day = 1 to 20
would_otherwise_check_phone = beta(1.5598524392792164, 0.36044253926611014)
// 20% to 100% of the time
would_otherwise_get_distracted_by_phone = beta(5.224031849460337, 3.078888443018226)
// 30% to 90%
duration_distraction_seconds = 15 to 60
value_not_getting_distracted_by_phone = value_additional_free_hour * duration_distraction_seconds / 3600
// ^ one could also input the value of no distractions directly: 0.2 to 2 // 20cts to 2 dollars
coolness_factor = 50 to 200 
value_casio_watch = 365 * (num_check_time_day * would_otherwise_check_phone * would_otherwise_get_distracted_by_phone * value_not_getting_distracted_by_phone) + coolness_factor
recommendation_casio_watch = mean(value_casio_watch) > mean(cost_casio_watch) ? true : false

item_casio_watch = {
  id: "10",
  num_id: 10,
  name: "Watch (e.g., Casio F-91W)",
  cost: cost_casio_watch,
  value: value_casio_watch,
  recommendation: recommendation_casio_watch
}`
  const [p1s5_editor_code, p1s5_setEditorCode] = useState(p1s5_casio_watch)
  const [p1s5_chart_code, p1s5_setChartCode] = useState(joinEnter([p1s1_general_variables, p1s5_casio_watch, getItemToDisplayFromSquiggleString(p1s5_casio_watch)]))
  const p1s5_buildChartCode = () => p1s5_setChartCode(joinEnter([p1s1_editor_code, p1s5_editor_code, getItemToDisplayFromSquiggleString(p1s5_editor_code)]))

  // Prioritizing across consumer interventions
  const p1s6_title = "Prioritizing across consumer interventions"
  const p1s6_prioritizing = `budget = 2.1k
granularity = 5 // dollars. lower number => more accuracy, less speed

items = [item_nice_computer, item_nice_headphones, item_spare_laptop_charger, item_casio_watch, {name: "random lotery", value: 10 to 20, cost: 1 to 2}]

n = List.length(items)
num_options = 2^n // each item can be chosen or not
list_of_options = List.upTo(0, num_options-1)

// Helpers
isDivisionExact = {|a,b| // a divided by b
  multiplesOfB = List.map(List.upTo(0,20), {|x| x * b})
  tempL = List.map(multiplesOfB, {|y| y == a})
  result = List.reduce(tempL, false, {|iter, item| (iter || item)})
  result
}
isOdd = {|x| !isDivisionExact(x, 2)}

getItemsInOptionBools = {|option|
  is_item_1_in_it = isOdd(option)
  option_sub_1 = option - (is_item_1_in_it ? 1 : 0)
  
  is_item_2_in_it = isDivisionExact(option_sub_1, 2)
  option_sub_2 = option_sub_1 - (is_item_2_in_it ? 2 : 0)
  
  is_item_3_in_it = isDivisionExact(option_sub_2, 4)
  option_sub_3 = option_sub_2 - (is_item_3_in_it ? 4 : 0)
  
  is_item_4_in_it = isDivisionExact(option_sub_3, 8)
  option_sub_4 = option_sub_3 - (is_item_4_in_it ? 8 : 0)

  is_item_5_in_it = isDivisionExact(option_sub_4, 16)
  option_sub_5 = option_sub_4 - (is_item_5_in_it ? 16 : 0)

  result = [is_item_1_in_it, is_item_2_in_it, is_item_3_in_it, is_item_4_in_it, is_item_5_in_it]
  result
} // to do: do this as a reduce loop?

listAppend = {|xs, x|
  n = List.length(xs)
  temp_list = List.upTo(0,n)
  new_list = List.map(temp_list, {|i| 
    result = i < n ? xs[i] : x
    result
  })
  new_list
}

getItemsInOption = {|option|
  bools = getItemsInOptionBools(option)
  temp_list = List.upTo(0, n-1)
  result = List.reduce(temp_list, [],{|iter, i| 
    !bools[i] ? iter : listAppend(iter, items[i])
  })
  result
}

getCostOfOption = {|option|
  items_in_option = getItemsInOption(option)
  costs = List.map(items_in_option, {|i| mean(i.cost)})
  cost  = List.reduce(costs, 0, {|a,b| a + b})
  cost
}
getValueOfOption = {|option|
  items_in_option = getItemsInOption(option)
  values = List.map(items_in_option, {|i| mean(i.value)})
  value = List.reduce(values, 0, {|a,b| a + b})
  value
}

// Get best option within budget
best_affordable_option = List.reduce(list_of_options, {value_best_option: 0}, {|iter, option|
  value_of_new_option = getValueOfOption(option) 
  is_new_option_superior = (getCostOfOption(option) < budget) && (getValueOfOption(option) > iter.value_best_option)
  item_names = List.map(getItemsInOption(option), {|o| o.name})
  result = is_new_option_superior ? ({value_best_option: value_of_new_option, items_names_best_option: item_names, cost_best_option: getCostOfOption(option)}) : iter
  result 
})
`

  const [p1s6_editor_code, p1s6_setEditorCode] = useState(p1s6_prioritizing)
  const [p1s6_chart_code, p1s6_setChartCode] = useState(joinEnter([
    p1s1_general_variables,
    p1s2_nice_computer,
    p1s3_nice_headphones,
    p1s4_spare_charger,
    p1s5_casio_watch,
    p1s6_prioritizing,
    getItemToDisplayFromSquiggleString(p1s6_prioritizing)
  ]))
  const p1s6_buildChartCode = () => {
    let temp_chart_code = (joinEnter([
      p1s1_editor_code,
      p1s2_editor_code,
      p1s3_editor_code,
      p1s4_editor_code,
      p1s5_editor_code,
      p1s6_editor_code,
      getItemToDisplayFromSquiggleString(p1s6_editor_code)
    ]))
    p1s6_setChartCode(temp_chart_code)
    console.log(temp_chart_code)
  }

  // Prioritizing across consumer interventions
  const p1s7_title = "Prioritizing across consumer interventions, with distributional output"
  const p1s7_prioritizing = `// Helpers  
item_value_dists = List.map(items, {|i| i.value})
item_cost_dists = List.map(items, {|i| i.cost})
listSum(xs) = List.reduce(xs, 0, {|a,b| a + b})
getItemsInOptionByNum = {|option|
  bools = getItemsInOptionBools(option)
  temp_list = List.upTo(0, n-1)
  result = List.reduce(temp_list, [],{|iter, i| 
    !bools[i] ? iter : listAppend(iter, i)
  })
  result
}

// Main
getBestAffordableOptionSample(i) = {
  item_value_samples = List.map(item_value_dists, sample)
  item_cost_samples = List.map(item_cost_dists, sample)
  best_affordable_option = List.reduce(list_of_options, {best: 0, num: -1}, {|iter, option|
      items_in_option = getItemsInOptionByNum(option)
      value_of_new_option = listSum(List.map(items_in_option, {|i| item_value_samples[i]}))
      cost_of_new_option = listSum(List.map(items_in_option, {|i| item_cost_samples[i]}))
      
      is_new_option_superior = (cost_of_new_option < budget) && (value_of_new_option > iter.best)
      // item_names = List.map(items_in_option, {|o| items[0].name})
      result = is_new_option_superior ? 
        {best: value_of_new_option, num: option} : iter
      result 
    })
  best_affordable_option
}

num_samples = 1000
best_affordable_option_values_samples = List.map(List.upTo(0,num_samples-1), getBestAffordableOptionSample)
best_values = SampleSet.fromList(
  List.map(
    best_affordable_option_values_samples,
    {|x| x.best}
  )
)
`
  const [p1s7_editor_code, p1s7_setEditorCode] = useState(p1s7_prioritizing)
  const [p1s7_chart_code, p1s7_setChartCode] = useState(`caveat = "Model takes around 20s, run with care."`)
  const p1s7_buildChartCode = () => {
    let temp_chart_code = (joinEnter([
      p1s1_editor_code,
      p1s2_editor_code,
      p1s3_editor_code,
      p1s4_editor_code,
      p1s5_editor_code,
      p1s6_editor_code,
      p1s7_editor_code,
      getItemToDisplayFromSquiggleString(p1s7_editor_code)
    ]))
    p1s7_setChartCode(temp_chart_code)
    console.log(temp_chart_code)
  }

  return (
    <div className="grid align-self-center items-center mt-10 place-items-center">
      <div className="w-9/12">
        <h1 className="font-bold mb-4">Prioritizing consumption at $100k/year</h1>
        <p>This piece showcases some web technology for estimation that we've been developing at the Quantified Uncertainty Research Institute. To do so, I'm presenting some estimates of the value that some consumer products would produce for someone with an earning power of around $100k. I'm doing this not because estimating the consumer surplus of products is particularly important or valuable, but because it is easy. In particular, consumption under capitalism provides a self-contained, simple framework for making tradeoffs.
        </p>
        <p>All text fields are editable, and their new values will be computed once you click the &ldquo;Run model&rdquo; buttons. You reader might want to edit these fields to capture what you value as you follow along.
        </p>
        <p>The background for this is that in my extended social circle, people sometimes make lists of &ldquo;things you should buy&rdquo;. My friend Gavin has gathered a list of such lists&nbsp;
          <a href="https://www.gleech.org/stuff">here</a>. So I&rsquo;m going to go over a few of the items on those lists, and estimate their value. First, I&rsquo;ll have to set some variables, and determine how much I value a few general classes of things relative to each other:</p>

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
                countNumberOfLines(p1s1_editor_code)
              }
              cols={120}
              spellCheck={"false"}
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
        <p>With the above variables in mind, here is how much I would value a nice computer, i.e., my current computer, or a not-too-new Macbook:</p>

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
                countNumberOfLines(p1s2_editor_code)
              }
              cols={120}
              spellCheck={"false"}
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
          <li>The value term represents consumer surplus, in dollars. But one would generally be willing to pay less than the consumer surplus for any particular computer brand, because one could always switch to a competitor, and because there are other competing products that also make a bid on a finite budget.</li>
          <li>The beta term has a lot of unnecessary decimal points. I am mildly averse to deleting decimal points. The origin of these decimal points is&nbsp;
            <a href="https://nunosempere.com/blog/2023/03/15/fit-beta/">this tool</a>
            &nbsp;to find a beta distribution which fits a 90% confidence interval. In the future, finding a beta that fits a given confidence interval will probably be incorporated into the core Squiggle syntax&mdash;the language that I'm using to run these estimations&mdash;but we haven't figured out how yet. See&nbsp;
            <a href="https://github.com/quantified-uncertainty/squiggle/issues/1615">this issue</a>
            &nbsp;for discussion.</li>
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
                countNumberOfLines(p1s3_editor_code)
              }
              cols={120}
              spellCheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s3_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s3_chart_code}/>
          </div>
        </div>
        <p>It's kind of absurd how much headphones increase my level of happiness. I also thought it was interesting that someone with a $100k/year salary can't afford to pay $30/hour for a 3 point improvement in a 10 point scale, if that intervention is permanent.</p>

        <h3 className="mb-4">Spare laptop charger</h3>
        <p>Here is a similar model about a spare laptop charger. A similar model would apply to an external battery for a phone.
        </p>

        <div className="grid place-items-center w-full">
          {/* to do: wrapp in its own component, see above */}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {p1s4_title} </h4>
            <textarea value={p1s4_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s4_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s4_editor_code)
              }
              cols={120}
              spellCheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s4_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s4_chart_code}/>
          </div>
        </div>

        <h3 className="mb-4">Casio watch</h3>
        <p>Here is a model of the value of a casio watch. I'm modelling most of its value as coming from reducing the number of distractions that stem from looking at the time on one's phone.
        </p>

        <div className="grid place-items-center w-full">
          {/* to do: wrapp in its own component, see above */}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {p1s5_title} </h4>
            <textarea value={p1s5_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s5_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s5_editor_code)
              }
              cols={120}
              spellCheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s5_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s5_chart_code}/>
          </div>
        </div>
        <p>But you get the idea. I've also played around with models of the value of a sleep mask, taking melatonin, having an external battery for a phone, stocking zinc lozenges, having a vertical mouse, an external microphone, or a blog. You can see some of those models
          <a href="to do">here</a>.
        </p>
        <h3 className="mb-4">Prioritization across consumption choices</h3>
        <p>Now, one thing we can do when given these estimates is to prioritize across them. That is, if you have a finite budget allocated to consumption and want to extract as much value from the above consumer products, what should you buy? I'm going to just paste some code and then make some comments about it:
        </p>

        <div className="grid place-items-center w-full">
          {/* to do: wrapp in its own component, see above */}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {p1s6_title} </h4>
            <textarea value={p1s6_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s6_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s6_editor_code)
              }
              cols={120}
              spellCheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s6_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s6_chart_code}/>
          </div>
        </div>
        <p>What the above code is doing is to try all possible combinations of items, and then see if they are under our budget, and if they beat the previous best option. That code is a bit stilted: because Squiggle doesn't yet have great escape hatches into JavaScript, I'm having to do things like define an "append" function. Though more list functions should be added in the &nbsp;<a href="https://github.com/quantified-uncertainty/squiggle/pull/1669">next release of Squiggle</a>.</p>
        <p>We could also use a more conservative summary function for the purposes of our decisions. For instance, in the&nbsp;
          <code>getValueOfOption</code>
          &nbsp;function, instead of&nbsp;
          <code>mean(i.value)</code>
          &nbsp;we could use&nbsp;
          <code>inv(i.value, 0.5)</code>, i.e., rather than getting the expected value of an option we could get its median. You can try that now if you want.</p>
        <p>I've also chosen the budget to be&nbsp;
          <code>2.1k</code>
          &nbsp;because that&lsquo;s close to an inflection point. Maybe try moving it  a few hundred up and a few hundred down and see what changes.</p>

        <h3 className="mb-4">Prioritization between consumption and other choices.</h3>
        <p>More broadly, consumption choices like the above are only a narrow slice of the set of choices that one has to make across one lifetime.</p>
        <p>Some of the other choices one has to make are, for example, between:</p>
        <ol>
          <li>Using one&lsquo;s budget for personal consumption.</li>
          <li>Using one&lsquo;s budget for normal altruistic efforts, like donating to a local soup kitchen.</li>
          <li>Using one&lsquo;s budget for altruistic efforts which might be more effective, like donating to the Against Malaria Foundation.</li>
          <li>Using on&lsquo;s budget to build up one&lsquo;s savings, to preserve optionality.</li>
          <li>Reducing one&lsquo;s earnings, to spend more time with loved ones.</li>
          <li>Reducing one&lsquo;s earnings, to spend more time on projects one considers important, but one&lsquo;s boss doesn&lsquo;t.</li>
        </ol>
        <p>I'm not going to prioritize between those here, but it's conceivable that I could do so in the future. And readers are welcome to do their own estimations. For that purposes, it might be useful to estimate that value of consumption as a distribution, rather than as a point estimate, as above. So to do so, I provide the following code, which estimates the value of consumption as a distribution by taking samples from the cost and value distributions for each item, and then prioritizing amongst them. Note that this code pretty un-optimized, and it might make your browser stop to a crawl.</p>
        <div className="grid place-items-center w-full">
          {/* to do: wrapp in its own component, see above */}
          <div className="bg-blue-100 pt-8 pb-12 mb-8 mt-5 content-center items-center">
            <h4 className="text-lg font-bold mb-3">
              {p1s7_title} </h4>
            <textarea value={p1s7_editor_code}
              readOnly={false}
              onChange={
                (event) => p1s7_setEditorCode(event.target.value)
              }
              rows={
                countNumberOfLines(p1s7_editor_code)
              }
              cols={120}
              spellCheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s7_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s7_chart_code}/>
          </div>
        </div>
        <h3 className="mb-4">What you've just read</h3>
        <p>What you've just read the result of a few years of work at the Quantified Uncertainty Research Institute into a particular software stack. Previously, the closest that there was was something like&nbsp;
          <a href="https://www.foretold.io/c/b2412a1d-0aa4-4e37-a12a-0aca9e440a96/n/c01b0899-4100-4efd-9710-c482d89eddad">this Foretold notebook</a>, which used public distributional forecasts from Foretold, an embryonic prediction platform, and maybe things like&nbsp;
          <a href="https://www.metaculus.com/project/journal/">Metaculus journal entries</a>. Later on, we had Observable notebooks, like&nbsp;
          <a href="">this one</a>
          &nbsp;estimating the impact of the Against Malaria Foundation.</p>
        <p>Like the Observable page and unlike the Foretold or Metaculus notebooks, this page uses reusable React components, meaning that in principle anyone can replicate and use them in their own projects. In fact, you can fork this website&nbsp;
          <a href="">here</a>
        </p>
        <p>Some other explanations and disclaimers.</p>
      </div>
    </div>
  );
}
