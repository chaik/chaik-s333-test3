/* eslint-disable */
/* global WebImporter */

/**
 * Parser for banner block.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: .frescopa-banner
 *
 * Banner block structure: 2 columns, 1 row:
 *   Row 1: image | title + description + CTA
 */
export default function parse(element, { document }) {
  const cells = [];

  // Column 1: Product image
  const img = element.querySelector('.cmp-frescopa-banner__image img');

  // Column 2: Text content (title + description + CTA)
  const contentCell = [];

  const title = element.querySelector('.cmp-frescopa-banner__title');
  if (title) contentCell.push(title);

  const desc = element.querySelector('.cmp-frescopa-banner__description');
  if (desc) {
    const p = desc.querySelector('p');
    if (p) contentCell.push(p);
    else contentCell.push(desc);
  }

  const cta = element.querySelector('.cmp-frescopa-banner__cta');
  if (cta) {
    const link = document.createElement('a');
    link.href = cta.href || '#';
    link.textContent = cta.textContent.trim();
    const p = document.createElement('p');
    p.appendChild(link);
    contentCell.push(p);
  }

  if (img) {
    cells.push([img, contentCell]);
  } else {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'banner', cells });
  element.replaceWith(block);
}
