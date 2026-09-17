import { ADSENSE_SCRIPT_TAG, injectAdsenseSnippet } from '@/lib/injectAdsense';

const LIVE_HEAD = `<head><link rel="preload" href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9938976891580683" as="script" crossorigin=""/><meta name="google-adsense-account" content="ca-pub-9938976891580683"/><script>(self.__next_s=self.__next_s||[]).push(["https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9938976891580683",{"async":true,"crossOrigin":"anonymous","id":"adsense"}])</script></head>`;

describe('injectAdsenseSnippet', () => {
  test('insere o snippet exacto do Google no HTML que o Next.js publica hoje', () => {
    const out = injectAdsenseSnippet(LIVE_HEAD);
    expect(out).toContain(ADSENSE_SCRIPT_TAG);
    expect(out).toContain('<meta name="google-adsense-account" content="ca-pub-9938976891580683"/>');
    expect((out.match(/adsbygoogle\.js\?client=ca-pub-9938976891580683/g) || []).filter(() => true).length).toBeGreaterThan(0);
    expect(out.indexOf(ADSENSE_SCRIPT_TAG)).toBeLessThan(out.indexOf('</head>'));
  });

  test('não duplica o snippet se já existir o script real', () => {
    const already = `<head>${ADSENSE_SCRIPT_TAG}<title>ok</title></head>`;
    expect(injectAdsenseSnippet(already)).toBe(already);
  });

  test('não altera respostas sem HTML', () => {
    expect(injectAdsenseSnippet('google.com, pub-9938976891580683, DIRECT, f08c47fec0942fa0\n')).toBe(
      'google.com, pub-9938976891580683, DIRECT, f08c47fec0942fa0\n',
    );
  });
});
