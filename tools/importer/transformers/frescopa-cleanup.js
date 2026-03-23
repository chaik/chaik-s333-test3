/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: frescopa cleanup.
 * Selectors from captured DOM of https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Removes non-authorable content: header, footer, cookie/tracking elements, AEM grid markup.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove AEM tracking/data attributes that can interfere with parsing
    element.querySelectorAll('[data-cmp-data-layer]').forEach((el) => el.removeAttribute('data-cmp-data-layer'));
    element.querySelectorAll('[data-cmp-is]').forEach((el) => el.removeAttribute('data-cmp-is'));

    // Remove hidden overlays and dialogs from location-finder
    WebImporter.DOMUtils.remove(element, [
      '.cmp-location-finder__overlay',
      '.cmp-location-finder__confirmation',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site shell: header, footer experience fragments
    WebImporter.DOMUtils.remove(element, [
      '.experiencefragment.header',
      '.experiencefragment.footer',
      '.cmp-page__toastmessagehide',
      'noscript',
      'link',
      '.separator',
    ]);

    // Clean up AEM grid wrapper classes that are non-content
    element.querySelectorAll('.aem-Grid, .aem-GridColumn').forEach((el) => {
      el.classList.remove(
        ...Array.from(el.classList).filter((c) => c.startsWith('aem-Grid') || c.startsWith('aem-GridColumn')),
      );
    });
  }
}
