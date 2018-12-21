var handlers = {};

/**
 * @export
 */
var busa = {
  ["on"]: (key, val) => {
    if (!handlers[key]) handlers[key] = [];
    handlers[key].push(val);
  },
  ["off"]: (key, val) => {
    for (var i = 0; i < handlers[key].length; i++) {
      if (val === handlers[key][i]) {
        handlers[key].splice(i, 1);
      }
    }
  },
  ["emit"]: (key, props) => {
    for (var i = 0; i < handlers[key].length; i++) {
      handlers[key][i](props);
    }
  }
};
