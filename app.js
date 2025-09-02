const express = require('express');
const app = express();
const path = require('path');
const postsRoutes = require('./routes/posts');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});