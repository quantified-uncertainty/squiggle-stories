import React, {useState, memo} from "react";

import {DynamicSquiggleChart as OriginalDynamicSquiggleChart} from "./displayers/dynamicSquiggleChart";
const DynamicSquiggleChart = memo(OriginalDynamicSquiggleChart);

// Helpers
const effectButtonStyle = "bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 mb-5";

const sum = xs => {
  let result = 0
	for(let x of xs){
		result += x
	}
	return result
}

const countNumberOfLines = string => {
	// to do: get numCols as a function of screensize.
	// (see how much each component takes, from tailwinds.) 
	let numCols = 82
	let lines = string.split("\n")
	let line_equivalents = lines.map(l => Math.ceil(l.length/numCols) || 1)
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
	let lastVariableAssignmentLine = n > 0 ? linesWithVariableAssignment[n-1] : ""
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
	const p1s6_prioritizing = `budget = 1k
budget = 1k
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

canYouAffordOption = {|option, budget|
  items_in_option = getItemsInOption(option)
  costs = List.map(items_in_option, {|i| mean(i.cost)})
  cost  = List.reduce(costs, 0, {|a,b| a + b})
  result = cost < budget
  result
}
getValueOfOption = {|option|
  items_in_option = getItemsInOption(option)
  values = List.map(items_in_option, {|i| mean(i.value)})
  value = List.reduce(values, 0, {|a,b| a + b})
  value
}

// Get best option within budget
best_affordable_option = List.reduce(list_of_options, {value_best_option: 0, item_names_best_option: []}, {|iter, option|
  value_of_new_option = getValueOfOption(option) 
  is_new_option_superior = canYouAffordOption(option, budget) && (getValueOfOption(option) > iter.value_best_option)
  item_names = List.map(getItemsInOption(option), {|o| o.name})
  result = is_new_option_superior ? ({value_best_option: value_of_new_option, items_names_best_option: item_names}) : iter
  result 
})
`

  const [p1s6_editor_code, p1s6_setEditorCode] = useState(p1s6_prioritizing)
  const [p1s6_chart_code, p1s6_setChartCode] = useState(joinEnter([p1s1_general_variables, p1s6_prioritizing, getItemToDisplayFromSquiggleString(p1s6_prioritizing)]))
  const p1s6_buildChartCode = () => 
	{
		let temp_chart_code = (joinEnter([p1s1_editor_code, p1s2_editor_code, p1s3_editor_code, p1s4_editor_code, p1s5_editor_code, p1s6_editor_code, getItemToDisplayFromSquiggleString(p1s6_editor_code)]))
		p1s6_setChartCode(temp_chart_code)
		console.log(temp_chart_code)
	}

  return (
    <div className="grid align-self-center items-center mt-10 place-items-center">
      <div className="w-9/12">
        <h1 className="font-bold mb-4">A story about values and tradeoffs</h1>
        <h2 className="mb-4">Part I: Consumerism</h2>

        <p>In my extended social circle, people sometimes make lists of &ldquo;things you should buy&rdquo;. My friend Gavin has gathered a list of such lists&nbsp;
          <a href="https://www.gleech.org/stuff">here</a>. I&rsquo;m going to go over a few of the items on those lists, and estimate their value. And I&rsquo;m starting this story that way not because estimating the consumer surplus of products is particularly important, but because it is easy and intersting. 
		</p><p>But before I get started, first I&rsquo;ll first have to set some variables, and determine how much I value a few things relative to each other. If you want to follow along, you can edit these to correspond to your values:</p>

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
                countNumberOfLines(p1s2_editor_code)
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
                countNumberOfLines(p1s3_editor_code)
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
              spellcheck={"false"}
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
        <p>Here is a model of the value of a casio watch. I'm modelling most of its value as coming from reducing the number of distractions that stem from looking at the time on my phone.
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
              spellcheck={"false"}
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
        <h3 className="mb-4">Prioritization across options</h3>
        <p>Now, one thing we can do when given these estimates is to prioritize across them. That is, if you have a finite budget and want to extract as much value from the above consumer products, what should you buy? To solve this, we are going to use a pretty general function baked into Squiggle: <code>Danger.optimalAllocationGivenDiminishingMarginalReturnsForManyFunctions</code>.</p>

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
              spellcheck={"false"}
              className="text-left text-blue-800 bg-white rounded p-5 border-0 shadow outline-none focus:outline-none focus:ring w-10/12 font-mono font-light text-sm mb-5"/>
            <br/>
            <button className={effectButtonStyle}
              onClick={p1s6_buildChartCode}>
              Run model
            </button>
            <DynamicSquiggleChart squiggleChartCode={p1s6_chart_code}/>
          </div>
        </div>
				<p>What this code is saying is that the value of buying a product is 0 if we pay below the cost of the product, and some summary statistic of the estimate of value we computed above. And this is enough enough for out very general <code>Danger.optimalAllocationGivenDiminishingMarginalReturnsForManyFunctions</code>function to do its work. Note that that function is overkill. In Spanish we have an expression which is &ldquo;matar mosquitos a cañonazos&rdquo;, namely, &ldquo;to kill mosquitos with cannonballs&rdqup;, and the expression might apply here.</p>
		<p>We could also use a more conservative summary function for the purposes of our decisions. For instance, if we wanted to be conservative, instead of using <code>mean(dist)</code> we could use <code>inv(dist, 0.3)</code>, i.e., get the value of a distribution at its 30% confidence interval.</p>
        <h2>Part II:</h2>
      </div>
    </div>

  );
}
