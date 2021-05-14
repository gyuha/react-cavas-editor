import React from 'react';
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleDown,
  FaAngleUp,
  FaRegClone,
  FaTrash,
} from 'react-icons/fa';
import { ImFontSize } from 'react-icons/im';
import { FabricCanvas } from '../FabricCanvas';
import '../sass/panel.scss';
import FillColor from './FillColor';
import FontFamily from './FontFamily';
import Opacity from './Opacity';
import SetRange from './SetRange';
import StrokeColor from './StrokeColor';
import StrokeWidth from './StrokeWidth';

type PropertyPanelProps = {
  fabricCanvas: () => FabricCanvas;
  activeObject: any;
};

const getPanelPosition = (object: any, canvas: any): { left?: number; top?: number } => {
  if (!object) {
    return {};
  }
  const scaleY = object.scaleY || 1;
  let top = Number(object.top) + Number(object.height) * scaleY + 50;
  if (canvas.height < top) {
    top = canvas.height;
  }
  const left = object.left < 0 ? 0 : object.left;
  return {
    left,
    top,
  };
};

const PropertyPanel = ({
  activeObject,
  fabricCanvas,
}: PropertyPanelProps): React.ReactElement | null => {
  const position = getPanelPosition(activeObject, fabricCanvas().canvas);
  console.log('📢[PropertyPanel.tsx:41]:', activeObject);

  return (
    <div className="rce-property-panel" style={position}>
      {activeObject.fill && (
        <FillColor canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {!activeObject.fontSize && (
        <StrokeColor canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {!activeObject.fontSize && (
        <StrokeWidth min={0} max={20} canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {activeObject.fontSize && (
        <FontFamily canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {activeObject.fontSize && (
        <SetRange
          min={5}
          max={100}
          changeValue="fontSize"
          canvas={fabricCanvas().canvas}
          activeObject={activeObject}
        >
          <ImFontSize />
        </SetRange>
      )}
      {activeObject.opacity && (
        <Opacity canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      <div className="item" onClick={() => fabricCanvas().sendTo('back')}>
        <FaAngleDoubleDown />
      </div>
      <div className="item" onClick={() => fabricCanvas().sendTo('backwards')}>
        <FaAngleDown />
      </div>
      <div className="item" onClick={() => fabricCanvas().sendTo('forward')}>
        <FaAngleUp />
      </div>
      <div className="item" onClick={() => fabricCanvas().sendTo('front')}>
        <FaAngleDoubleUp />
      </div>
      <div className="item" onClick={() => fabricCanvas().quickClone()}>
        <FaRegClone />
      </div>
      <div className="item" onClick={() => fabricCanvas().removeActiveObjects()}>
        <FaTrash />
      </div>
    </div>
  );
};

PropertyPanel.defaultProps = {} as PropertyPanelProps;

export default PropertyPanel;
