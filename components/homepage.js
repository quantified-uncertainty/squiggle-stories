import React, {useRef, useState, useEffect} from "react";

import {Title} from "./title.js";
import {DisplayerControlledEditor} from "./displayers/displayerControlledEditor";
import {DisplayerNativeSquiggleEditor} from "./displayers/displayerNativeSquiggleEditor";
import {DisplayerImmutableChart} from "./displayers/displayerUnmutableChart.js";

export function Homepage() { // General variables
  let p_1_sq_1_general_variables = `salary = SampleSet.fromDist(70k to 150k)

value_doubling_productivity = SampleSet.fromDist(30k to 75k)
// how much would you pay to be 100% more productive? 
// personally, i.e., from your own salary.

hours_worked_in_year = SampleSet.fromDist( (48 to 52) * (5 to 6) * (5 to 16 ))
// 48 to 52 weeks, 5 to 6 days per week, 5 to 16 hours per day

hours_day_in_front_of_computer = SampleSet.fromDist(8 to 14)

hourly_salary = SampleSet.fromDist(salary / hours_worked_in_year)

value_additional_free_hour = 30 to 150 // dollars`
  const [p_1_sq_1_editorCode, p_1_sq_1_setEditorCode] = useState(p_1_sq_1_general_variables);

  // Value of a nice computer
  let p_1_sq_2_nice_computer = `cost_nice_computer = 2k to 3k
  
  fraction_improvement_productivity = beta(1.6308424891839157, 13.480636131095403)
  // ^ 1% to 30% (https://nunosempere.com/blog/2023/03/15/fit-beta/
  value_from_productivity = fraction_improvement_productivity * value_doubling_productivity
  value_from_subjective_wellbeing = 1k to 5k // very uncertain
  years_of_use_nice_computer = 1 to 4
  
  value_nice_computer = (value_from_productivity + value_from_subjective_wellbeing) * years_of_use_nice_computer
  recommendation_nice_computer = mean(value_nice_computer) > mean(cost_nice_computer) ? true : false
  item_nice_computer = {
    id: "1",
    num_id: 1,
    name: "Nice computer (e.g., MacBook pro) (lifetime of item)",
    cost: cost_nice_computer,
    value: value_nice_computer,
    recommendation: recommendation_nice_computer
  }
  item_nice_computer
  `
  const [p_1_sq_2_editorCode, p_1_sq_2_setEditorCode] = useState(p_1_sq_2_nice_computer);

  return (
    <div className="grid align-self-center items-center mt-10 place-items-center">
      <div className="w-9/12">
        <h1 className="font-bold mb-4">A story about values and tradeoffs</h1>
        <h2 className="mb-4">Part I: Consumerism</h2>

        <p>In my extended social circle, people sometimes make lists of &ldquo;things you should buy&rdquo;. My friend Gavin has gathered a list of such lists&nbsp;
          <a href="https://www.gleech.org/stuff">here</a>. I&rsquo;m going to go over a few of the items on those lists, and estimate their value. But before I get started, first I&rsquo;ll first have to set some variables, and determine how much I value a few things relative to each other. If you want to follow along, you can edit these to correspond to your values:</p>
        <DisplayerControlledEditor initialSquiggleCode={p_1_sq_1_editorCode}
          editorCode={p_1_sq_1_editorCode}
          setEditorCode={p_1_sq_1_setEditorCode}
          sectionTitle={"General variables"}
          extraCodeBefore={""}/>

        <h3 className="mb-4">A nice computer</h3>
        <p>With the above variables in mind, here is how much I think I value a nice computer</p>
        <DisplayerControlledEditor initialSquiggleCode={p_1_sq_2_editorCode}
          editorCode={p_1_sq_2_editorCode}
          setEditorCode={p_1_sq_2_setEditorCode}
          sectionTitle={"General variables"}
          extraCodeBefore={p_1_sq_1_editorCode}/>

        <h2>Part II:</h2>
      </div>
    </div>

  );
}
