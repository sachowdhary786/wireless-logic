const fetch = require('node-fetch');

describe('HTTP fetch requests', () => {
  test('returns a successful response', async () => {
    const response = await fetch('https://wltest.dns-systems.net/');
    expect(response.status).toBe(200);
  });

  test('handles errors gracefully', async () => {
    const response = await fetch('https://wltest.dns-systems.net/invalid-url');
    expect(response.status).toBe(404);
  });
});
