const Tag = require('../models/tag');
const slugify = require("slugify")
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.createTag = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase()
    let tag = new Tag({ name, slug })
    tag.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.listTags = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}


exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    console.log(slug)
    Tag.findOne({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Tag not found"
            })
        }
        res.json(data);
    })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Tag.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Tag deleted successfully'
        })
    })
}