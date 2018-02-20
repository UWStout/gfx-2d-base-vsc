// Import the Shape and Point objects
import Color from './Color'
import Point from './Point'

import { setPixel } from '../main'

// TODO: Import any other functions or classes you may need here

/** @class Object to represent a drawable 2D shape */
class Shape {
  /**
   * Create a new Shape object
   * @param {Color} C The color of this shape (default Color.WHITE)
   * @param {boolean} fill Is the shape filled or not (default true)
   */
  constructor (C, fill) {
    // Test if C and 'fill' were provided and give them
    // default values if they were not
    this.color = (typeof C !== 'undefined') ? C : Color.WHITE
    this.filled = (typeof fill !== 'undefined') ? fill : true

    // Fill in default values for id and shape. These should
    // be overwritten in the constructor of the child shape
    this._id = -1
    this._type = Shape.SHAPE_TYPE.UNKNOWN

    // The buffer holding the vertices for use with WebGL
    this.buffer = null

    // Default transformation properties
    // TODO: Copy over you additions to the constructor from project 1
    // NOTE: Do NOT replace the entire file! It is different in some places.
  }

  /**
   * NOTE: The next two functions are STATIC!
   *    This means you do not need an instace of a shape to call them. Rather
   * you call them using the class name like so: Shape.rasterizeHLine(...)
   */

  // TODO: Implement rasterizeHLine
  // Rasterize a perfectly horizontal line. You may not use WebGL
  // functions or any other libraries to draw. All changes to the
  // canvas must happen through the 'setPixel' function.
  static rasterizeHLine (x1, x2, y, color) {
    // Important notes:
    // - Do NOT transform or round the coordinates
    // - x1 and x2 may NOT be in increasing order

    // NOTE: Remove these two lines once your function is complete
    setPixel(new Point(x1, y), color)
    setPixel(new Point(x2, y), color)
  }

  // TODO: Implement rasterizeVLine
  // Rasterize a perfectly vertical line. You may not use WebGL
  // functions or any other libraries to draw. All changes to the
  // canvas must happen through the 'setPixel' function.
  static rasterizeVLine (x, y1, y2, color) {
    // Important notes:
    // - Do NOT transform or round the coordinates
    // - y1 and y2 may NOT be in increasing order

    // NOTE: Remove these two lines once your function is complete
    setPixel(new Point(x, y1), color)
    setPixel(new Point(x, y2), color)
  }

  // Function to get the ID of this shape as a number
  get id () { return this._id }

  // Function to get the type of this shape (a Shape.SHAPE_TYPE values)
  get type () { return this._type }

  // Functions to get or set the color of this shape as a Color object
  get color () { return this._color }
  set color (C) {
    if (C instanceof Color) {
      this._color = C
    }
  }

  // Functions to get or set whether or not this shape is filled
  get filled () { return this._filled }
  set filled (filled) {
    if (typeof filled === 'boolean') {
      this._filled = filled
    }
  }

  /**
   * Compute the approximate center-point of this Shape
   * Should be overridden in the child, returns (0, 0) by default.
   * @virtual
   * @return {Point} The center of the shape in global coordinates
   */
  computeCentroid () { return Point.ORIGIN }

  /**
   * Build or re-build the array buffers for drawing this shape in WebGL
   * @abstract
   * @param {WebGLRenderingContext} gl The current webGL rendering context
   */
  updateBuffers (gl) {
    console.error('ERROR: Abstract Shape.updateBuffers() called.')
  }

  /**
   * Rasterize this shape by drawing pixels (should be overriden)
   * @abstract
   */
  rasterize () {
    console.error('ERROR: Abstract Shape.rasterize() called.')
  }
}

// Expose the shape object to other files
export default Shape

/* The variables below are 'static' members of the Shape class */

// An enumeration of the available shape types.
Shape.SHAPE_TYPE = {
  UNKNOWN: 'unknown',
  CIRCLE: 'circle',
  LINE: 'line',
  TRIANGLE: 'triangle'
}

// Global counts of each shape type for naming purposes.
// The parameters match the strings of SHAPE_TYPE above
Shape.shapeCount = {
  unknown: 0,
  circle: 0,
  line: 0,
  triangle: 0
}
