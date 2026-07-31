const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_blog'));

function generateSlug(title) {
  return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ include: { author: { select: { name: true } } }, orderBy: { createdAt: 'desc' } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, coverImageUrl, seoTitle, seoDescription, isPublished } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content required' });

    const post = await prisma.blogPost.create({
      data: {
        title, slug: generateSlug(title), content,
        excerpt: excerpt || null, coverImageUrl: coverImageUrl || null,
        authorId: req.user.id, seoTitle: seoTitle || null, seoDescription: seoDescription || null,
        isPublished: isPublished || false, publishedAt: isPublished ? new Date() : null,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'A post with this title already exists' });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, excerpt, coverImageUrl, seoTitle, seoDescription, isPublished } = req.body;
    const updateData = {};
    if (title !== undefined) { updateData.title = title; updateData.slug = generateSlug(title); }
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription;
    if (isPublished !== undefined) { updateData.isPublished = isPublished; if (isPublished) updateData.publishedAt = new Date(); }

    const post = await prisma.blogPost.update({ where: { id }, data: updateData });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
