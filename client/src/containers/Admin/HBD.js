import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HBD.css";
import Sound from "react-sound";

class HBD extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <div
          className="overlay"
          style={{
            background: "transparent",
            backgroundColor: "transparent",
            height: "10vh"
          }}
        ></div>
        {/* <br></br> */}
        <Sound
          playStatus={Sound.status.PLAYING}
          url={
            "http://soundbible.com/mp3/Happy%20Birthday%20To%20You-SoundBible.com-766044851.mp3"
          }
          loop={true}
          volume={100}
          autoLoad={true}
        />
        <div className="back">
          <div className="cake">
            <div className="plate"></div>
            <div className="layer layer-bottom"></div>
            <div className="layer layer-middle"></div>
            <div className="layer layer-top"></div>
            <div className="icing"></div>
            <div className="drip drip1"></div>
            <div className="drip drip2"></div>
            <div className="drip drip3"></div>
            <div className="candle">
              <div className="flame"></div>
            </div>
          </div>

          <div className="hdcontainer">
            <div className="balloon">
              <div>
                <span className="hd-span">☺</span>
              </div>
              <div>
                <span className="hd-span">B</span>
              </div>
              <div>
                <span className="hd-span">D</span>
              </div>
              <div>
                <span className="hd-span">A</span>
              </div>
              <div>
                <span className="hd-span">Y</span>
              </div>
              <div>
                <span className="hd-span">!</span>
              </div>
            </div>
            <h2 className="hd-head">Sai Pallavi</h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  auth: state.auth,
  isAuthenticated: state.isAuthenticated,
  err: state.err
});

export default connect(mapStateToProp)(withRouter(HBD));
