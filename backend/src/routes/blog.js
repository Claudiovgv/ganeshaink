const router = require('express').Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        seoTitle: true,
        seoDescription: true,
        author: { select: { name: true } },
      },
      orderBy: { publishedAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug: req.params.slug, isPublished: true },
      include: { author: { select: { name: true } } },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
