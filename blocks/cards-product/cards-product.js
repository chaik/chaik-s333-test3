import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-product-card-image';
      } else {
        div.className = 'cards-product-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  // Style CTA links as buttons
  ul.querySelectorAll('.cards-product-card-body a').forEach((a) => {
    const p = a.closest('p');
    if (p && !a.closest('h1, h2, h3, h4, h5, h6')) {
      a.classList.add('button');
      p.classList.add('button-wrapper');
    }
  });

  block.replaceChildren(ul);
}
