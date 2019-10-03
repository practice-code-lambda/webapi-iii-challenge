const express = require('express');
const db = require('./userDb.js')
const postsDb = require('../posts/postDb')
console.log(db)

const router = express.Router();
router.use(express.json())

router.post('/', (req, res) => {

    db.insert(req.body)
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not post object"
            })
        })
});

router.post('/:id/posts', (req, res) => {
    const { id } = req.params
    const post = req.body
    console.log(post, id)
    postsDb.insert(id, post)
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(500).json({
            error: err,
            message: "could not post comment"
        }))
});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            if (users) {
                res.json(users)
            } else {
                res.status(404).json({
                    message: "could not find users"
                })

            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "failed to get users"
            })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.getById(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({
                    message: "could not find user"
                })

            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "failed to retrieve user"
            })
        })
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params
    db.getUserPosts(id)
        .then(posts => {
            if (posts) {
                res.json(posts)
            } else {
                res.status(404).json({
                    message: "could not find posts"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "failed to retrieve posts"
            })
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(post => {
            if (post) {
                res.json(post).json({
                    message: "post has been removed"
                })
            } else {
                res.status(404).json({
                    message: "could not find post to delete"
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "failed to delete user"
            })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updatedUser = req.body
    console.log(updatedUser)
    db.update(id, updatedUser)
        .then(updated => {
            if (updated) {
                res.json(updated)
            } else {
                res.status(404).json({
                    message: "could not find user to update"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "failed to update user"
            })
        })

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
