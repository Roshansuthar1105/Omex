require('dotenv').config({ path: '.env.local' });
const app = require('./src/app')

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log("🔍 USE_GEMINI:", process.env.USE_GEMINI);
    console.log("🔍 GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
})