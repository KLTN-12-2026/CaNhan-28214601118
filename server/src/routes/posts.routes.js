const { Router } = require('express');
const { createSupabaseClient } = require('../config/supabase');
const requireAuth = require('../middleware/require-auth');

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const supabase = createSupabaseClient();
    if (!supabase) return response.status(503).json({ error: 'Supabase is not configured yet.' });
    const { data, error } = await supabase
      .from('community_posts')
      .select('id, topic, content, is_anonymous, created_at, author_name')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) return next(error);
    return response.json({ posts: data });
  } catch (error) {
    return next(error);
  }
});

router.post('/', requireAuth, async (request, response, next) => {
  try {
    const { content, topic, anonymityMode = 'unlinked' } = request.body;
    if (typeof content !== 'string' || content.trim().length < 3 || content.length > 3000) {
      return response.status(400).json({ error: 'Post content must be between 3 and 3000 characters.' });
    }
    if (typeof topic !== 'string' || topic.length > 40) {
      return response.status(400).json({ error: 'A valid topic is required.' });
    }
    if (!['unlinked', 'moderator_only', 'public'].includes(anonymityMode)) {
      return response.status(400).json({ error: 'Choose a valid post identity mode.' });
    }
    const { error } = await request.supabase
      .from('posts')
      .insert({
        content: content.trim(),
        topic,
        is_anonymous: anonymityMode !== 'public',
        anonymity_mode: anonymityMode,
        author_user_id: anonymityMode === 'unlinked' ? null : request.user.id,
        status: 'pending_ai'
      });
    if (error) return next(error);
    return response.status(201).json({ message: 'Post submitted for review.', status: 'pending_ai' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
