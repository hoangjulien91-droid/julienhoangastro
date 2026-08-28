const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (/\.(ts|tsx|json|astro|css)$/.test(file)) {
        results.push(file);
      }
    }
  });
  return results;
}

const targets = [
  path.join(__dirname, "../src/components/pst"),
  path.join(__dirname, "../src/lib/pst")
];

targets.forEach((dir) => {
  if (fs.existsSync(dir)) {
    const files = walk(dir);
    files.forEach((file) => {
      let content = fs.readFileSync(file, "utf8");
      if (content.includes("/pst/")) {
        content = content.replace(/\/pst\//g, "/formation/pst/");
        fs.writeFileSync(file, content, "utf8");
        console.log("Updated links in:", file);
      }
    });
  }
});
