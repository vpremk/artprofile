const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.filter-button');

let portfolio = [];
let activeFilter = 'all';

function normalizeCategory(category) {
  return String(category || '').toLowerCase();
}

function getDisplaySize(item) {
  if (item.size) {
    return item.size;
  }

  const dimensions = item.dimensions || { width: 0, height: 0 };
  const isMural = normalizeCategory(item.category) === 'murals';

  if (isMural && dimensions.width && dimensions.height) {
    const sqft = Math.round((dimensions.width * dimensions.height) / 144);
    return `${sqft} sq ft`;
  }

  if (dimensions.width && dimensions.height) {
    return `${dimensions.width} × ${dimensions.height} in`;
  }

  return 'Custom size';
}

function buildGalleryItems() {
  const items = activeFilter === 'all'
    ? portfolio
    : portfolio.filter((item) => normalizeCategory(item.category) === activeFilter);

  gallery.innerHTML = items
    .map((item) => {
      const categoryLabel = item.categoryLabel || item.category;
      const sizeLabel = getDisplaySize(item);

      return `
        <article class="gallery-item" data-category="${normalizeCategory(item.category)}" data-id="${item.id || ''}">
          <div class="gallery-media">
            <img src="${item.src}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="gallery-copy">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="meta-row">
              <span>${categoryLabel}</span>
              <span>${sizeLabel}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    buildGalleryItems();
  });
});

async function loadPortfolio() {
  try {
    const response = await fetch('portfolio.json');
    if (!response.ok) {
      throw new Error('Unable to load portfolio');
    }

    portfolio = await response.json();
    buildGalleryItems();
  } catch (error) {
    gallery.innerHTML = `
      <article class="gallery-item">
        <div class="gallery-copy">
          <h3>Portfolio unavailable</h3>
          <p>We could not load the current collection. Please refresh or check the portfolio data file.</p>
        </div>
      </article>
    `;
    console.error(error);
  }
}

loadPortfolio();
