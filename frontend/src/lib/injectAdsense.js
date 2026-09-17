const ADSENSE_CLIENT = 'ca-pub-9938976891580683';
const ADSENSE_SCRIPT_TAG =
  '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9938976891580683" crossorigin="anonymous"></script>';

function hasRealAdsenseScript(html) {
  return /<script\b[^>]*\bsrc=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-9938976891580683["']/i.test(
    html,
  );
}

function injectAdsenseSnippet(html) {
  if (typeof html !== 'string' || !/<head[\s>]/i.test(html)) return html;
  if (hasRealAdsenseScript(html)) return html;
  return html.replace(/<head([^>]*)>/i, (open) => `${open}${ADSENSE_SCRIPT_TAG}`);
}

module.exports = {
  ADSENSE_CLIENT,
  ADSENSE_SCRIPT_TAG,
  injectAdsenseSnippet,
};
