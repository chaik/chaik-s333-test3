export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  const row = rows[0];
  const cols = [...row.children];

  // First column: image, Second column: text content
  if (cols.length >= 2) {
    cols[0].classList.add('banner-image');
    cols[1].classList.add('banner-content');
  }

  // Style CTA links as buttons
  block.querySelectorAll('a').forEach((a) => {
    const p = a.closest('p');
    if (p && p.children.length === 1) {
      a.classList.add('banner-cta');
      p.classList.add('banner-cta-container');
    }
  });
}
