var PhotoModel = require('../models/photoModel.js');
var UserModel = require('../models/userModel.js');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
            .populate('postedBy')
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                var data = [];
                data.photos = photos;
                //return res.render('photo/list', data);
                return res.json(photos);
            });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
            name: req.body.name,
            message: req.body.message,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            views: 0,
            likes: 0,
            dislikes: 0,
            likedBy: [],
            dislikedBy: [],
            comments: []
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
            photo.message = req.body.message ? req.body.message : photo.message;
            photo.path = req.body.path ? req.body.path : photo.path;
            photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
            photo.views = req.body.views ? req.body.views : photo.views;
            photo.likes = req.body.likes ? req.body.likes : photo.likes;
            photo.dislikes = req.body.dislikes ? req.body.dislikes : photo.dislikes;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function (req, res) {
        return res.render('photo/publish');
    },

    /**
     * Increment the likes count for a photo
     */
    likePhoto: function (req, res) {
        var id = req.params.id;
        var userId = req.session.userId || req.body.userId;

        PhotoModel.findByIdAndUpdate(id, { $inc: { likes: 1 }, $push: { likedBy: { user: userId } } }, { new: true }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating likes count',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    /**
     * Increment the dislikes count for a photo
     */
    dislikePhoto: function (req, res) {
        var id = req.params.id;
        var userId = req.session.userId || req.body.userId;

        PhotoModel.findByIdAndUpdate(id, { $inc: { dislikes: 1 }, $push: { dislikedBy: { user: userId } } }, { new: true }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating dislikes count',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    removeLike: function (req, res) {
        var id = req.params.id;
        var userId = req.session.userId || req.body.userId;

        PhotoModel.findByIdAndUpdate(id, { $inc: { likes: -1 }, $pull: { likedBy: { user: userId } } }, { new: true }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating likes count',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    removeDislike: function (req, res) {
        var id = req.params.id;
        var userId = req.session.userId || req.body.userId;

        PhotoModel.findByIdAndUpdate(id, { $inc: { dislikes: -1 }, $pull: { dislikedBy: { user: userId } } }, { new: true }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating dislikes count',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    /**
     * Add a comment to a photo
     */
    addComment: function (req, res) {
        var id = req.params.id;
        var userId = req.session.userId || req.body.userId;
        
        // Find the user by ID to get the username
        UserModel.findById(userId, function(err, user) {
            if (err || !user) {
                console.error("Error finding user:", err);
                // Handle error, return response, etc.
                return;
            }
    
            // Once user is found, get the username
            var username = user.username;
    
            // Find the photo by ID and update the comments array
            PhotoModel.findByIdAndUpdate(id, { $push: { comments: { user: username, content: req.body.content } } }, { new: true })
                .populate('comments.user')
                .exec(function (err, photo) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when adding comment',
                            error: err
                        });
                    }
                    if (!photo) {
                        return res.status(404).json({
                            message: 'No such photo'
                        });
                    }
                    return res.json(photo);
                });
        });
    }
    

};