// Import the Shape and Point objects
import Shape from './Shape'
import Point from './Point'
import Color from './Color'

// Import the setPixel funciton for rasterizing
import { setPixel } from '../main'

// TODO: Import the transformPoint function from matrix_math
//       This is needed inside the updateBuffers() function

// Import NanoGL library
// @ts-ignore
import NanoGL from 'nanogl'

/** @class A drawable 2D line */
class Line extends Shape {
  /**
   * Create a new Line shape object
   * @param {WebGLRenderingContext} gl The canvas element rendering context
   * @param {Point} newP1 Location of the first endpoint of the line
   * @param {Point} newP2 Location of the second endpoint of the line
   // @ts-ignore
   * @param {Color} color The color of this shape (default Color.WHITE)
   * @param {boolean} filled Is the shape filled or not (default true)
   */
  constructor (gl, newP1, newP2, color, filled) {
    // Call parent constructor first
    super(color, filled)

    // Increase the global line count
    Shape.shapeCount[Shape.SHAPE_TYPE.LINE]++

    // Update properties inherited from Shape to be specific to lines
    this._type = Shape.SHAPE_TYPE.LINE
    this._id = Shape.shapeCount[Shape.SHAPE_TYPE.LINE]

    // New properties for this type of shape (public)
    this.P1 = newP1
    this.P2 = newP2

    // Call updateBuffers() once to initialize them
    this.updateBuffers(gl)
  }

  /**
   * Compute the center of this shape
   * Computes and returns a reasonable value for the center of the line
   * @return {Point} The center of the line
   */
  computeCentroid () {
    // TODO: Copy over your code from project 1 for this function
    //       and replace its contents entirely.
    return Point.ORIGIN
  }

  /**
   * Update the internal WebGL vertex buffers for this line
   * Stores the transformed endpoints in an ArrayBuffer so they may be used
   * to draw this shape using WebGL.
   * @param {WebGLRenderingContext} gl The canvas element rendering context
   */
  updateBuffers (gl) {
    // TODO: Copy over your code from project 1 for this function
    //       and replace its contents entirely.
    this._positions = new Float32Array([])

    // Make the WebGL ArayBuffer for this shape (using nanoGL)
    this.buffer = new NanoGL.ArrayBuffer(gl, this._positions)
    this.buffer.attrib('aPosition', 3, gl.FLOAT)
  }

  // Override parent function to rasterize a line
  rasterize () {
    // TODO: Complete this function to do the following
    // - Transform and round the endpoints
    //   > You can round a point by calling 'P1.round()'
    //   > This rounds both the x and y components in place
    // - Call Line.bresenham (defined below) with the ROUNDED points

    // NOTE: This line is temporary. It should be different in the
    // final version of this function.
    Line.bresenham(this.P1, this.P2, this.color)
  }

  // TODO: Complete this function as Bresenham's Line algorithm
  // Rasterize a general line using Bresenham's algorithm. You may
  // not use WebGL functions or any other libraries to draw. All
  // changes to the canvas must happen through the 'setPixel' func.
  static bresenham (P1, P2, color) {
    // Important notes:
    // - Do NOT transform or round P1 and P2 (this has already happened)
    // - Handle perfectly horiz and vert lines as special cases
    //   > Use Shape.rasterizeHLine or Shape.rasterizeVLine
    //   > You will need to import these functions to use them
    // - For all remaining lines use Bresenham's algorithm
    // - You must use integer arithmetic EVERYWHERE
    // - You can only use integer addition inside the loop
    // - All types of lines (e.g. all slopes) must be handled

    // TIPS!!
    // - Don't operate on P1 and P2 directly, break out their components
    //    > for example, turn P1 into the variables x1 and y1
    // - Implement the version of Bresenham's for slopes between 0 and 1 first!
    // - Do NOT compute m directly!  Just compare y2 - y1 with x2 - x1
    //    > m will always be a floating point value so DON'T compute it
    // - To generalize the algorithm to all lines, consider the following:
    //   > Avoid computing dx and dy until just before you start the main loop
    //   > Just use y2 - y1 and x2 - x1 directly until the loop starts
    // - You can "fix" other slopes to work in the general case as follows:
    //   > Check for slopes > 1 in abs first (swap x's with y's to fix)
    //   > Check for x1 > x2 next (swap endpoints to fix)
    //   > Lastly, check for a decending y value and make note

    // NOTE: The following lines of code draw the endpoints in red and are handy
    //       for debugging but REMOVE THEM FROM THE FINAL VERSION!
    setPixel(P1, Color.RED)
    setPixel(P2, Color.RED)
  }
}

// Expose the Line class to other modules for importing
export default Line
