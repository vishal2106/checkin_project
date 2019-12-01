import React, { Component } from "react";
import Particles from "react-particles-js";
class Background extends Component {
  state = {};
  render() {
    return (
      <Particles
        params={{
          particles: {
            number: {
              value: 200
            },
            size: {
              value: 3
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              }
            }
          }
        }}
      />
    );
  }
}

export default Background;
