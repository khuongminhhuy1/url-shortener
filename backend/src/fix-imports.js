const fs = require("fs");
const path = require("path");

function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith(".js")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Fix relative imports that are missing .js extension
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  content = content.replace(importRegex, (match, importPath) => {
    // Only add .js to relative imports that don't already have an extension
    if (
      (importPath.startsWith("./") || importPath.startsWith("../")) &&
      !importPath.includes(".js") &&
      !importPath.includes(".json")
    ) {
      return `from '${importPath}.js'`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}

const outputDir = path.join(__dirname, "dist");
const jsFiles = findJsFiles(outputDir);

jsFiles.forEach((file) => {
  fixImports(file);
  console.log(`Fixed imports in ${file}`);
});
