export default function decorate(block) {
  const rows = [...block.children];

  // Build the location finder structure
  const panel = document.createElement('div');
  panel.classList.add('location-finder-panel');

  const mapArea = document.createElement('div');
  mapArea.classList.add('location-finder-map');

  // Extract content from rows
  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const heading = col.querySelector('h2, h3');
      const textContent = col.textContent.trim();

      if (heading) {
        const title = document.createElement('h2');
        title.classList.add('location-finder-title');
        title.textContent = heading.textContent;
        panel.appendChild(title);
      } else if (textContent && !col.querySelector('picture')) {
        // Check if it's a label
        const p = col.querySelector('p');
        if (p) {
          const label = document.createElement('p');
          label.classList.add('location-finder-label');
          label.textContent = p.textContent;
          panel.appendChild(label);
        }
      }
    });
  });

  // Add search form
  const searchDiv = document.createElement('div');
  searchDiv.classList.add('location-finder-search');

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('location-finder-input');
  input.placeholder = 'Zip code';
  input.setAttribute('aria-label', 'Enter zip code');
  input.maxLength = 10;

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('location-finder-button');
  button.textContent = 'Search';

  searchDiv.appendChild(input);
  searchDiv.appendChild(button);
  panel.appendChild(searchDiv);

  // Add map placeholder
  const mapPlaceholder = document.createElement('div');
  mapPlaceholder.classList.add('location-finder-map-placeholder');

  const mapIcon = document.createElement('div');
  mapIcon.classList.add('location-finder-map-icon');
  mapIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"></path></svg>';

  const mapLabel = document.createElement('span');
  mapLabel.textContent = 'Map View';

  mapPlaceholder.appendChild(mapIcon);
  mapPlaceholder.appendChild(mapLabel);
  mapArea.appendChild(mapPlaceholder);

  // Replace block content
  block.textContent = '';
  block.appendChild(panel);
  block.appendChild(mapArea);
}
