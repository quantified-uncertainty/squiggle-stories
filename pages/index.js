/* Notes */

// This function is just a simple wrapper around components/homepage.
// Most of the time, I'll want to edit that instead

/* Imports */
import React from "react";
import {Homepage} from "../components/homepage.js";

/* Definitions */

// Main react component
export default function Home() {
  return <div className="flex-grid">
        <h1 className="font-bold mb-4">Index of Squiggle Stories</h1>
    <div className="w-11/12">
      <p className="mr-5 ml-5 mb-5"><a href="/consumer-surplus">Things you should buy, quantified</a></p>
    </div>
  </div>
}
