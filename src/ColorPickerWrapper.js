// ColorPickerWrapper.js
import React from 'react';
import { render } from 'react-dom';
import ColorPicker from './ColorPicker.svelte';

const ColorPickerWrapper = (props) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const colorPicker = new ColorPicker({
      target: containerRef.current,
      props,
    });

    return () => {
      colorPicker.$destroy();
    };
  }, [props]);

  return <div ref={containerRef}></div>;
};

export default ColorPickerWrapper;
