const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');
// GET api/posts/ -- get all posts
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
  
    try {
      const newPost = await Post.create({ ...body, userId: req.session.userId });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET api/posts/:id -- get a single post by id



router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTags = await Tag.findByPk(req.params.id, {include: [Product] });
    if (!getTags) {
      res.status(404).json({message: 'No such Tag ID was found!'});
      return;
    }
    res.status(200).json(getTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST api/posts -- create a new post

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const addTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(addTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT api/posts/1-- update a post's title or text

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE api/posts/1 -- delete a post

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
