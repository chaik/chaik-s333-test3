/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: .container.flexcolummns
 *
 * Cards block library structure: 2 columns per row, multiple rows:
 *   Each row: image | title + description + CTA
 *   One row per card (teaser)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Each teaser in the flex columns becomes a card row
  const teasers = element.querySelectorAll('.teaser');
  teasers.forEach((teaser) => {
    const cmpTeaser = teaser.querySelector('.cmp-teaser');
    if (!cmpTeaser) return;

    // Column 1: Image
    const img = cmpTeaser.querySelector('.cmp-teaser__image img, .cmp-image__image');

    // Column 2: Content (title + description + CTA)
    const contentCell = [];

    const title = cmpTeaser.querySelector('.cmp-teaser__title');
    if (title) contentCell.push(title);

    const desc = cmpTeaser.querySelector('.cmp-teaser__description');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentCell.push(p);
    }

    const ctas = cmpTeaser.querySelectorAll('.cmp-teaser__action-link');
    ctas.forEach((cta) => {
      const link = document.createElement('a');
      link.href = cta.href || '#';
      link.textContent = cta.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(link);
      contentCell.push(p);
    });

    if (img) {
      cells.push([img, contentCell]);
    } else if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
