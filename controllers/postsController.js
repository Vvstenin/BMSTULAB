const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db.json');

function readDB() {
    return JSON.parse(fs.readFileSync(dbPath));
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

exports.getPosts = (req, res) => {
    const { search } = req.query;
    const db = readDB();
    let posts = db.posts;

    if (search) {
        const q = search.toLowerCase();
        posts = posts.filter(post =>
            post.author.toLowerCase().includes(q) ||
            post.caption.toLowerCase().includes(q)
        );
    }

    res.json(posts);
};

exports.getPostById = (req, res) => {
    const db = readDB();
    const post = db.posts.find(p => p.id === parseInt(req.params.id));
    if (post) res.json(post);
    else res.status(404).json({ message: 'Post not found' });
};

exports.createPost = (req, res) => {
    const db = readDB();
    const newPost = {
        id: Date.now(),
        author: req.body.author,
        image: req.body.image,
        caption: req.body.caption
    };
    db.posts.push(newPost);
    writeDB(db);
    res.status(201).json(newPost);
};

exports.updatePost = (req, res) => {
    const db = readDB();
    const postIndex = db.posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

    db.posts[postIndex] = { ...db.posts[postIndex], ...req.body };
    writeDB(db);
    res.json(db.posts[postIndex]);
};

exports.deletePost = (req, res) => {
    const db = readDB();
    const postIndex = db.posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

    const deleted = db.posts.splice(postIndex, 1);
    writeDB(db);
    res.json(deleted[0]);
};