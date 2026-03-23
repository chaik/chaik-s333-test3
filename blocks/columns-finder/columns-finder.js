export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];

  // Left panel: content with heading and text
  if (cols[0]) {
    cols[0].classList.add('columns-finder-panel');

    // Add search form
    const searchDiv = document.createElement('div');
    searchDiv.classList.add('columns-finder-search');

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('columns-finder-input');
    input.placeholder = 'Zip code';
    input.setAttribute('aria-label', 'Enter zip code');

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('columns-finder-button');
    button.textContent = 'Search';

    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    cols[0].appendChild(searchDiv);
  }

  // Right panel: map placeholder
  if (cols[1]) {
    cols[1].classList.add('columns-finder-map');
    cols[1].innerHTML = '';

    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.classList.add('columns-finder-map-placeholder');
    mapPlaceholder.innerHTML = `
      <div class="columns-finder-map-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
        </svg>
      </div>
      <span>Map View</span>`;
    cols[1].appendChild(mapPlaceholder);
  }
}
