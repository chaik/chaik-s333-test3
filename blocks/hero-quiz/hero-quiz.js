export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 0: image, Row 1: content
  const imageRow = rows[0];
  const contentRow = rows[1];

  imageRow.classList.add('hero-quiz-image');
  contentRow.classList.add('hero-quiz-content');

  // Style CTA links as buttons
  contentRow.querySelectorAll('a').forEach((a) => {
    const p = a.closest('p');
    if (p && !a.closest('h1, h2, h3, h4, h5, h6')) {
      a.classList.add('button');
      p.classList.add('button-wrapper');
    }
  });
}
