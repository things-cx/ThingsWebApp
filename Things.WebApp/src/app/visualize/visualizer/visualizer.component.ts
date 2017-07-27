import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  // NEditor https://github.com/sketchpunk/NEditorJS

  dragMode = 0;
  dragItem = null;    // reference to the dragging item
  startPos = null;    // Used for starting position of dragging lines
  offsetX = 0;        // OffsetX for dragging nodes
  offsetY = 0;        // OffsetY for dragging nodes
  svg = null;         // SVG where the line paths are drawn.

  pathColor = '#999999';
  pathColorA = '#86d530';
  pathWidth = 2;
  pathDashArray = '20,5,5,5,5,5';

  constructor() { }

  ngOnInit() {
    this.svg = document.getElementById('connsvg');
    this.svg.ns = this.svg.namespaceURI;
  }

  /*--------------------------------------------------------
  Global Function */

  // Trail up the parent nodes to get the X,Y position of an element
  getOffset(elm) {
    const pos = { x: 0, y: 0 };
    while (elm) {
      pos.x += elm.offsetLeft;
      pos.y += elm.offsetTop;
      elm = elm.offsetParent;
    }
    return pos;
  };

  // Gets the position of one of the connection points
  getConnPos(elm) {
    const pos = this.getOffset(elm);
    pos.x += (elm.offsetWidth / 2) + 1.5; // Add some offset so its centers on the element
    pos.y += (elm.offsetHeight / 2) + 0.5;
    return pos;
  };

  // Used to reset the svg path between two nodes
  updateConnPath(o) {
    const pos1 = o.output.getPos(),
      pos2 = o.input.getPos();
    this.setQCurveD(o.path, pos1.x, pos1.y, pos2.x, pos2.y);
  };

  // Creates an Quadratic Curve path in SVG
  createQCurve(x1, y1, x2, y2) {
    const elm = document.createElementNS(this.svg.ns, 'path');
    elm.setAttribute('fill', 'none');
    elm.setAttribute('stroke', this.pathColor);
    elm.setAttribute('stroke-width', this.pathWidth.toString());
    elm.setAttribute('stroke-dasharray', this.pathDashArray);

    this.setQCurveD(elm, x1, y1, x2, y2);
    return elm;
  }

  // This is seperated from the create so it can be reused as a way to update an existing path without duplicating code.
  setQCurveD(elm, x1, y1, x2, y2) {
    const dif = Math.abs(x1 - x2) / 1.5,
      str = 'M' + x1 + ',' + y1 + ' C' +	// MoveTo
        (x1 + dif) + ',' + y1 + ' ' +	// First Control Point
        (x2 - dif) + ',' + y2 + ' ' +	// Second Control Point
        (x2) + ',' + y2;				// End Point

    elm.setAttribute('d', str);
  };

  setCurveColor(elm, isActive) {
    elm.setAttribute('stroke', (isActive) ? this.pathColorA : this.pathColor);
  };

  /*Unused function at the moment, it creates a straight line
  NEditor.createline = function (x1, y1, x2, y2, color, w) {
    const line = document.createElementNS(NEditor.svg.ns, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', w);
    return line;
  }*/


  /*--------------------------------------------------------
  Dragging Nodes */
  beginNodeDrag(n, x, y) {
    if (this.dragMode !== 0) {
      return;
    }

    this.dragMode = 1;
    this.dragItem = n;
    this.offsetX = n.offsetLeft - x;
    this.offsetY = n.offsetTop - y;

    window.addEventListener('mousemove', this.onNodeDragMouseMove);
    window.addEventListener('mouseup', this.onNodeDragMouseUp);
  };

  onNodeDragMouseUp(e) {
    e.stopPropagation(); e.preventDefault();
    this.dragItem = null;
    this.dragMode = 0;

    window.removeEventListener('mousemove', this.onNodeDragMouseMove);
    window.removeEventListener('mouseup', this.onNodeDragMouseUp);
  };

  onNodeDragMouseMove(e) {
    e.stopPropagation(); e.preventDefault();
    if (this.dragItem) {
      this.dragItem.style.left = e.pageX + this.offsetX + 'px';
      this.dragItem.style.top = e.pageY + this.offsetY + 'px';
      this.dragItem.ref.updatePaths();
    }
  };


  /*--------------------------------------------------------
  Dragging Paths */
  beginConnDrag(path) {
    if (this.dragMode !== 0) {
      return;
    }

    this.dragMode = 2;
    this.dragItem = path;
    this.startPos = path.output.getPos();

    this.setCurveColor(path.path, false);
    window.addEventListener('click', this.onConnDragClick);
    window.addEventListener('mousemove', this.onConnDragMouseMove);
  };

  endConnDrag() {
    this.dragMode = 0;
    this.dragItem = null;

    window.removeEventListener('click', this.onConnDragClick);
    window.removeEventListener('mousemove', this.onConnDragMouseMove);
  }

  onConnDragClick(e) {
    e.stopPropagation(); e.preventDefault();
    this.dragItem.output.removePath(this.dragItem);
    this.endConnDrag();
  };

  onConnDragMouseMove(e) {
    e.stopPropagation(); e.preventDefault();
    if (this.dragItem) {
      this.setQCurveD(this.dragItem.path, this.startPos.x, this.startPos.y, e.pageX, e.pageY);
    }
  };


  /*--------------------------------------------------------
  Connection Event Handling */
  onOutputClick(e) {
    e.stopPropagation(); e.preventDefault();
    const path = e.target.parentNode.ref.addPath();

    this.beginConnDrag(path);
  }
}
