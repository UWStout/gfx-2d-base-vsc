/**
 * Generate an orthographic projeciton matrix (2D or 3D) for use
 * in defining the cannonical viewing volume for the current scene.
 * Can be used as a projection matrix in a shader.
 * @param {number} b The location of the BOTTOM of the view volume
 * @param {number} t The location of the TOP of the view volume
 * @param {number} l The location of the LEFT of the view volume
 * @param {number} r The location of the RIGHT of the view volume
 * @param {number} n The location of the NEAR face of the view
 *                   volume (optional, defaults to -1)
 * @param {number} f The location of the FAR face of the view
 *                   volume (optional, defaults to 1)
 */
export function orthoMatrix (b, t, l, r, n = -1.0, f = 1.0) {
  // Pre-compute matrix values
  var A1 = 2 / (r - l)
  var B1 = 2 / (t - b)
  var C1 = -2 / (f - n)
  var A2 = -(r + l) / (r - l)
  var B2 = -(t + b) / (t - b)
  var C2 = -(f + n) / (f - n)

  // Build orthographic projection matrix in col-major order
  var M = [
    A1, 0, 0, 0,
    0, B1, 0, 0,
    0, 0, C1, 0,
    A2, B2, C2, 1
  ]

  // Return matrix
  return M
}
