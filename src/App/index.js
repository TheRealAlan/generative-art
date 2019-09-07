import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import './App.css';

function App() {

  /**
   * Just a test to get P5 and the wrapper up and running
   */

  let rotation = null;

  const convertRotation = (rotation) => {
    return (rotation * Math.PI) / 180;
  };

  const handleRotation = (e) => {
    rotation = convertRotation(e.target.value);
  };

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, 400, p.WEBGL);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
      if (props.rotation !== null) {
        rotation = convertRotation(props.rotation);
      }
    };

    p.draw = () => {
      p.background(100);
      p.normalMaterial();
      p.noStroke();
      p.push();
      p.rotateY(rotation);
      p.box(100);
      p.pop();
    };
  };

  return (
    <div className="App">
      <P5Wrapper sketch={sketch} rotation={45} />
      <input type="range" min={0} max={360} onChange={handleRotation} />
    </div>
  );
}

export default App;
