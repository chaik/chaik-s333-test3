/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block.
 * Base: hero. Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Handles two instances:
 *   1. Coffee quiz teaser (.teaser with .cmp-teaser__pretitle) - pretitle, heading, CTA, image
 *   2. Offer content fragment (.contentfragment.cfoffer) - background image, pretitle+detail, headline, CTA
 *
 * Hero block library structure: 1 column, 3 rows:
 *   Row 1: block name
 *   Row 2: background image (optional)
 *   Row 3: title + subheading + CTA
 */
export default function parse(element, { document }) {
  const cells = [];

  // Instance 1: Teaser hero (.cmp-teaser)
  const teaser = element.querySelector('.cmp-teaser');
  if (teaser) {
    // Row 1: Image (background)
    const img = teaser.querySelector('.cmp-teaser__image img, .cmp-image__image');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      cells.push([imgEl]);
    }

    // Row 2: Content (pretitle + heading + CTA)
    const contentCell = [];
    const pretitle = teaser.querySelector('.cmp-teaser__pretitle');
    if (pretitle) contentCell.push(pretitle);

    const title = teaser.querySelector('.cmp-teaser__title');
    if (title) contentCell.push(title);

    const ctas = teaser.querySelectorAll('.cmp-teaser__action-link');
    ctas.forEach((cta) => contentCell.push(cta));

    if (contentCell.length > 0) cells.push([contentCell]);
  }

  // Instance 2: Content Fragment offer (.cmp-contentfragment)
  const cf = element.querySelector('.cmp-contentfragment');
  if (cf && !teaser) {
    // Row 1: Background image from style attribute or heroImage element
    const elementsContainer = cf.querySelector('.cmp-contentfragment__elements');
    const bgStyle = elementsContainer ? elementsContainer.style.backgroundImage : '';
    const bgMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
    if (bgMatch) {
      const imgEl = document.createElement('img');
      imgEl.src = bgMatch[1];
      imgEl.alt = 'Offer background';
      cells.push([imgEl]);
    }

    // Row 2: All text content (pretitle + detail + headline + CTA)
    const contentCell = [];

    const pretitleEl = cf.querySelector('.cmp-contentfragment__element--pretitle .cmp-contentfragment__element-value');
    const detailEl = cf.querySelector('.cmp-contentfragment__element--detail .cmp-contentfragment__element-value');
    if (pretitleEl || detailEl) {
      const subEl = document.createElement('p');
      const parts = [];
      if (pretitleEl) parts.push(pretitleEl.textContent.trim());
      if (detailEl) parts.push(detailEl.textContent.trim());
      subEl.textContent = parts.join(' ');
      contentCell.push(subEl);
    }

    const headlineEl = cf.querySelector('.cmp-contentfragment__element--headline .cmp-contentfragment__element-value');
    if (headlineEl) {
      const h2 = document.createElement('h2');
      h2.textContent = headlineEl.textContent.trim();
      contentCell.push(h2);
    }

    const ctaEl = cf.querySelector('.cmp-contentfragment__element--callToAction .cmp-contentfragment__element-value');
    const ctaUrlEl = cf.querySelector('.cmp-contentfragment__element--ctaUrl .cmp-contentfragment__element-value');
    if (ctaEl) {
      const link = document.createElement('a');
      link.href = ctaUrlEl ? ctaUrlEl.textContent.trim() : '#';
      link.textContent = ctaEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(link);
      contentCell.push(p);
    }

    if (contentCell.length > 0) cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
