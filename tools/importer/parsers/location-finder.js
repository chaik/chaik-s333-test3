/* eslint-disable */
/* global WebImporter */

/**
 * Parser for location-finder custom block.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: .location-finder
 *
 * Location Finder block structure: 1 column, multiple rows:
 *   Row 1: title
 *   Row 2: label text
 *   Row 3: search placeholder text
 */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: Title
  const title = element.querySelector('.cmp-location-finder__title');
  if (title) {
    cells.push([title]);
  }

  // Row 2: Label
  const label = element.querySelector('.cmp-location-finder__label');
  if (label) {
    cells.push([label]);
  }

  // Row 3: Search placeholder info
  const input = element.querySelector('.cmp-location-finder__input');
  if (input) {
    const p = document.createElement('p');
    p.textContent = input.placeholder || 'Zip code';
    cells.push([p]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'location-finder', cells });
  element.replaceWith(block);
}
