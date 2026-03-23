import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let fragment = await loadFragment(footerPath);

  // fallback footer content when fragment is not available
  if (!fragment) {
    fragment = document.createElement('main');
    fragment.innerHTML = `<div><div class="default-content-wrapper">
        <p><strong>Frescopa Coffee &amp; Tea</strong></p>
        <p>One sip, one cup at a time.</p>
      </div></div>
      <div><div class="default-content-wrapper footer-columns">
        <div class="footer-col"><h4>Machines</h4><ul><li><a href="/us/en/machines">Espresso Machines</a></li><li><a href="/us/en/machines">Frescopa Roast</a></li><li><a href="/us/en/machines">Frescopa Mist</a></li></ul></div>
        <div class="footer-col"><h4>Coffee</h4><ul><li><a href="/us/en/coffee">Bagged Coffee</a></li><li><a href="/us/en/coffee">Coffee Pods</a></li><li><a href="/us/en/coffee">Frescopa Affiliate</a></li></ul></div>
        <div class="footer-col"><h4>Tea</h4><ul><li><a href="/us/en/tea">Loose Leaf</a></li><li><a href="/us/en/tea">Cups &amp; Mugs</a></li><li><a href="/us/en/tea">Travel Mugs</a></li></ul></div>
        <div class="footer-col"><h4>Accessories</h4><ul><li><a href="/us/en/accessories">Replacement Parts</a></li><li><a href="/us/en/accessories">Cups &amp; Mugs</a></li><li><a href="/us/en/accessories">Kettles &amp; Carafes</a></li></ul></div>
        <div class="footer-col"><h4>About Frescopa</h4><ul><li><a href="/us/en/about">About Us</a></li><li><a href="/us/en/about">Frescopa Affiliate</a></li><li><a href="/us/en/sustainability">Sustainability</a></li></ul></div>
      </div></div>
      <div><div class="default-content-wrapper">
        <p>&copy; Frescopa, Inc. All rights reserved.</p>
        <p><a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a> | <a href="#">Cookie Notice</a></p>
      </div></div>`;
  }

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
