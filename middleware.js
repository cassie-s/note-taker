async function edgeMiddleware(req, res, next) {
  try {
    const fetch = (await import('node-fetch')).default;
    const EDGE_CONFIG_URL = process.env.EDGE_CONFIG;
    const EDGE_CONFIG_TOKEN = process.env.EDGE_CONFIG_TOKEN;

    const response = await fetch(`${EDGE_CONFIG_URL}/item/greeting`, {
      headers: {
        'Authorization': `Bearer ${EDGE_CONFIG_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Edge Config fetch failed:', response.status, errorText);
      throw new Error('Failed to fetch from Edge Config');
    }

    const greeting = await response.json();
    res.json(greeting);
  } catch (err) {
    console.error('Edge Config error:', err);
    res.status(500).json({ error: 'Failed to fetch Edge Config' });
  }
}

module.exports = edgeMiddleware;