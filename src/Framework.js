// Render function for template literals
const render = async (x, ...values) => {
  var rendered = "";
  for (let u = 0; u < x.length; u++) {
    rendered = rendered.concat(x[u]);
    if (u < x.length - 1) {
      if (typeof values[u] == "function") {
        rendered = rendered.concat(await values[u]());
      } else {
        rendered = rendered.concat(values[u]);
      }
    }
  }

  return rendered;
};

module.exports = { render };
