import React from "react";
import "./PurePannellumJS.scss";
// import '../../lib/PannellumJS/pannellum.js';
// import '../../lib/PannellumJS/pannellum.css';

const pannellum = window.pannellum;

class PurePannellumJS extends React.Component {
    componentDidMount() {
        console.log(pannellum);
    }

    render() {
        return(
            <div className="PurePannellumJSContainer">
            </div>
        )
    }
}

export default PurePannellumJS;