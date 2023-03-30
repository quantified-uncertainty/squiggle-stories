/* Notes */

// This function is just a simple wrapper around components/homepage.
// Most of the time, I'll want to edit that instead

/* Imports */
import React from "react";
import {Homepage} from "../components/homepage.js";

/* Definitions */

/* React components */
export async function getStaticProps() {
    let listOfElementsInit = ({})
    return {props: {
            listOfElementsInit
        }};
}

// Main react component
export default function Home({listOfElementsInit}) {
    return <Homepage listOfElementsInit={listOfElementsInit}/>;
}
