A Busa is a silly mustache that makes its wearer especially opinionated and unreasonable.

#### Example

```javascript
/**
 * This will fire handle off on window load.
 * If an error is encountered before the handle
 * is removed and will not fire.
 */
import bus from "busa";

function handle(props) {
  console.log(props.msg);
}

bus.on("window:load", handle);

window.addEventListener("load", function(event) {
  bus.emit("window:load", { msg: "Done loading", event });
});

window.addEventListener("error", function(event) {
  bus.off("window:load", handle);
});
```
