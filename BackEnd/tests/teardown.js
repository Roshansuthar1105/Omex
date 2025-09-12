// Clean up after tests
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  
  // Clean up test files
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    for (const file of files) {
      if (file.endsWith('.test.txt')) {
        fs.unlinkSync(path.join(uploadsDir, file));
      }
    }
  }
};