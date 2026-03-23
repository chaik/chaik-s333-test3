/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: frescopa sections.
 * Adds section breaks (<hr>) and section-metadata blocks based on template sections.
 * Runs in afterTransform only. Uses payload.template.sections from page-templates.json.
 *
 * Dual-strategy: During actual import, parsers replace original DOM elements with block
 * tables (<table> with th header). During validation, original DOM selectors still exist.
 * This transformer tries both strategies: block tables first, then original selectors.
 */
export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;

  const { template } = payload;
  if (!template || !template.sections || template.sections.length < 2) return;

  const doc = element.ownerDocument || document;

  // Normalize block name for matching (e.g., "Location Finder" matches "location-finder")
  function normalizeName(name) {
    return name.toLowerCase().replace(/[-\s]+/g, ' ').trim();
  }

  // Strategy 1: Find block tables (post-parser DOM)
  const allTables = [...element.querySelectorAll('table')];
  const blockTables = allTables.filter((table) => {
    const th = table.querySelector('tr:first-child th');
    return th && th.textContent.trim().length > 0;
  });

  // Strategy 2: Find elements by original selectors (pre-parser DOM / validation)
  function findBySelector(section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (const sel of selectors) {
      const el = element.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  // Try to match sections to elements
  const matches = [];

  // Check if block tables exist (post-parser context)
  if (blockTables.length > 0) {
    let tableIdx = 0;
    template.sections.forEach((section) => {
      if (!section.blocks || section.blocks.length === 0) return;
      const expectedName = normalizeName(section.blocks[0]);

      for (let i = tableIdx; i < blockTables.length; i += 1) {
        const th = blockTables[i].querySelector('tr:first-child th');
        const tableName = normalizeName(th.textContent);
        if (tableName === expectedName) {
          matches.push({ el: blockTables[i], section });
          tableIdx = i + 1;
          break;
        }
      }
    });
  }

  // Fall back to original selectors if block tables didn't match enough sections
  if (matches.length < template.sections.length) {
    matches.length = 0;
    template.sections.forEach((section) => {
      const el = findBySelector(section);
      if (el) {
        matches.push({ el, section });
      }
    });
  }

  // Insert section breaks and metadata in reverse order to avoid index shifts
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const { el, section } = matches[i];

    // Add section-metadata block after the element if section has a style
    if (section.style) {
      const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: [['style', section.style]],
      });
      el.after(sectionMetadata);
    }

    // Add <hr> before section (except first)
    if (i > 0) {
      const hr = doc.createElement('hr');
      el.before(hr);
    }
  }
}
