/**
 * @typedef I_Presentation
 * @type {InstanceType<import('./presentation')['Presentation']>}
 */

/**
 * @typedef ChangeCallback
 * @type {() => void}
 */

/**
 * @class Display
 */
class Display {

  /**
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.presentations = /** @type {Set<I_Presentation>} */ (new Set());
  }

  /**
   * @param {I_Presentation[]} presentations
   */
  setPresentations(presentations) {
    this.presentations.clear();

    presentations.forEach((presentation) => {
      this.presentations.add(presentation);
    });
  }
}

module.exports = {
  Display
};
