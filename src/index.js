/**
 * @constructor
 */
function Bus() {
  /**
   * @private {*}
   */
  this.handlers = {};
}

/**
 * @param {string} key
 * @param {Function} val
 */
Bus.prototype["on"] = function(key, val) {
  if (!this.handlers[key]) {
    this.handlers[key] = [];
  }

  this.handlers[key].push(val);
};

/**
 * @param {string} key
 * @param {Function} val
 */
Bus.prototype["off"] = function(key, val) {
  var next = [];

  for (var i = 0; i < this.handlers[key].length; i++) {
    var f = this.handlers[key][i];
    if (val !== f) {
      next.push(f);
    }
  }

  this.handlers[key] = next;
};

/**
 * @param {string} key
 * @param {Object=} props
 */
Bus.prototype["emit"] = function(key, props) {
  for (var i = 0; i < this.handlers[key].length; i++) {
    this.handlers[key][i](props);
  }
};

/**
 * @export
 */
var bus = new Bus();
