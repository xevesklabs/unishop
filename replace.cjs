const fs = require('fs');
let code = fs.readFileSync('src/data/mockData.js', 'utf8');

// Replace standard IMG.xxx
code = code.replace(/images:\s*\[?(?:IMG|IMG_DUMMY)\.\w+(?:,\s*(?:IMG|IMG_DUMMY)\.\w+)*\]?/g, (match, offset) => {
  return `images: getUniformImg('blue', 'shirt', ${offset})`;
});

// Since the colors should probably match the school, we can refine it if we want,
// but 'blue shirt' is a safe fallback for loremflickr to give us a uniform image.
// Or we can just let it be random uniform images per product.

fs.writeFileSync('src/data/mockData.js', code);
console.log('Replaced images');
