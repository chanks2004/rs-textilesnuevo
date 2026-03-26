const HIGHLIGHT_MS = 2200;

export function runScrollToQuoteFormHighlight() {
  const el = document.getElementById('quote-form');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.add('quote-form--highlight');
  window.setTimeout(() => el.classList.remove('quote-form--highlight'), HIGHLIGHT_MS);
}
