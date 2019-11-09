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
    this.presentations = /** @type {Set<I_Presentation>} */ (new Set());

    this._changeCallback = /** @type {ChangeCallback|null} */ (null);

    rebind(this, 'onChange');
  }

  onChange() {
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
  }

  /**
   * @param {I_Presentation[]} presentations
   */
  setPresentations(presentations) {
    [...this.presentations].forEach((presentation) => {
      presentation.removeListener(changeEvent, this.onChange);
    });

    this.presentations.clear();

    presentations.forEach((presentation) => {
      this.presentations.add(presentation);
      presentation.on(changeEvent, this.onChange);
    });

    this.onChange();
  }
}

module.exports = {
  Display
};
