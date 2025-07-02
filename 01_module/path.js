const path = require("path");

console.log(__filename);
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));
console.log(path.basename(__dirname));

let result = path.format({
  base: "sample.txt",
  dir: "/home/temp",
});

console.log(result);

result = path.parse("/home/temp/sample.txt");
console.log(result);
