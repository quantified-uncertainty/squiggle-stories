/* Notes */

// This function is just a simple wrapper around components/homepage.
// Most of the time, I'll want to edit that instead

/* Imports */
import React from "react";
import {Homepage} from "../components/homepage.js";

/* Definitions */
const initialSquiggleString = "1 to 10"

// Main react component
export default function Home({initialSquiggleString}) {
    return <Homepage initialSquiggleString={initialSquiggleString}/>;
}
