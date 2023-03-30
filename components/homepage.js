import React, {useState} from "react";

import {Title} from "./title.js";
import {DisplayerControlledEditor} from "./displayers/displayerControlledEditor";


export function Homepage({initialSquiggleString}) {
    return (
        <div className="block w-full items-center sm:w-full mt-10">
            <Title/>
            <DisplayerControlledEditor initialSquiggleString={initialSquiggleString}/>
        </div>
    );
}
