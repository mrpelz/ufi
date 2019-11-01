const { rebind } = require('./utils');
const { changeEvent } = require('./presentation');

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

    this._changeCallback = /** @type {ChangeCallback|null} */ (null);
    this.presentations = /** @type {Set<I_Presentation>} */ (new Set());

    rebind(this, '_onChange');
  }

  _onChange() {
    if (!(this._changeCallback instanceof Function)) return;

    this._changeCallback();
  }

  removeChangeCallback() {
    this._changeCallback = null;
  }

  /**
   * @param {ChangeCallback} callback
   */
  setChangeCallback(callback) {
    this._changeCallback = callback;

    this._onChange();
  }

  /**
   * @param {I_Presentation[]} presentations
   */
  setPresentations(presentations) {
    [...this.presentations].forEach((presentation) => {
      presentation.removeListener(changeEvent, this._onChange);
    });

    this.presentations.clear();

    presentations.forEach((presentation) => {
      this.presentations.add(presentation);
      presentation.on(changeEvent, this._onChange);
    });

    this._onChange();
  }
}

module.exports = {
  Display
};
