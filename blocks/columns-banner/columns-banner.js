export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-banner-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-banner-img-col');
        }
      } else {
        col.classList.add('columns-banner-text-col');
      }
    });
  });

  // Style CTA links
  block.querySelectorAll('.columns-banner-text-col a').forEach((a) => {
    const p = a.closest('p');
    if (p && !a.closest('h1, h2, h3, h4, h5, h6')) {
      a.classList.add('button');
      p.classList.add('button-wrapper');
    }
  });
}
