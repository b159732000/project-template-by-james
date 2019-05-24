import React, { Component } from "react";
import './HouseModel3D.scss';
// import * as THREE from "three";

class HouseModel3D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IframeLoaded: false,
    }
  }
  componentDidMount() {
  }

  handleIframeLoad() {
    // console.log(this.refs.threeDHouseModelIframe.contentWindow.document);
    // console.log(this.refs.threeDHouseModelIframe.contentWindow.document);
    this.setState({
      IframeLoaded: true,
    })
  }

  render() {
    return (
      <div className="houseModel3DContainer">
        {/*<div className="loadingWrapper">*/}
        <div className={(this.state.IframeLoaded) ? ("loadingWrapper hiding") : ("loadingWrapper")}>
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>

        <div className="sketchfab-embed-wrapper">
          <div className="hideBarTop"></div>
          <div className="hideBarBottom"></div>
          <iframe onLoad={() => this.handleIframeLoad()} width="100%" height="100%" src="https://sketchfab.com/models/cab226c480b74cf0a58fefa49076cfda/embed?autospin=0.2&amp;autostart=1&amp;preload=1" frameBorder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true" ref="threeDHouseModelIframe"></iframe>
        </div>
      </div>
    );
  }
}
export default HouseModel3D;