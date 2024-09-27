// Render function for template literals
const render = async (x, ...values) => {
  var rendered = "";
  for (let u = 0; u < x.length; u++) {
    rendered = rendered.concat(x[u]);
    if (u < x.length - 1) {
      if (typeof values[u] == "function") {
        var res = await values[u]()
        if(res) rendered += res;
      } else {
        rendered +=values[u]
            }
    }
  }
  return rendered;
};

module.exports = { render };
