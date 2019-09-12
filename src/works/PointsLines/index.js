import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import debounce from 'fn/debounce';

function PointsLines() {
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
    };

    p.windowResized = () => {
      debounce(p.resizeCanvas(window.innerWidth, window.innerHeight), 100);
    };

    p.draw = () => {
      let d = 70;
      let p1 = d;
      let p2 = p1 + d;
      let p3 = p2 + d;
      let p4 = p3 + d;

      p.background(0);
      p.translate(140, 0);

      // Draw gray box
      p.stroke(153);
      p.line(p3, p3, p2, p3);
      p.line(p2, p3, p2, p2);
      p.line(p2, p2, p3, p2);
      p.line(p3, p2, p3, p3);

      // Draw white points
      p.stroke(255);
      p.point(p1, p1);
      p.point(p1, p3);
      p.point(p2, p4);
      p.point(p3, p1);
      p.point(p4, p2);
      p.point(p4, p4);
    };
  };

  return (
    <>
      <P5Wrapper sketch={sketch} />
    </>
  );
}

export default PointsLines;
