import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import debounce from 'fn/debounce';

function Cube() {
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
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    };

    p.windowResized = () => {
      debounce(p.resizeCanvas(window.innerWidth, window.innerHeight), 100);
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
    <>
      <P5Wrapper sketch={sketch} rotation={45} />
      <div>
        <input type="range" min={0} max={360} onChange={handleRotation} />
      </div>
    </>
  );
}

export default Cube;
