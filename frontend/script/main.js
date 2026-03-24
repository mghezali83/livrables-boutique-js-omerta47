const API_BASE = '/api/products';
const STORAGE_KEYS = {
    address: 'mdl-address-v1',
    cart: 'mdl-cart-v1',
    favorites: 'mdl-favorites-v1',
    productsCache: 'mdl-products-cache-v1',
};

const elements = {
    cartCount: document.getElementById('cart-count'),
    cartItems: document.getElementById('cart-items'),
    cartPanel: document.getElementById('cart-panel'),
    cartSummaryText: document.getElementById('cart-summary-text'),
    cartSummaryTitle: document.getElementById('cart-summary-title'),
    cartTotals: document.getElementById('cart-totals'),
    catalogSummary: document.getElementById('catalog-summary'),
    checkoutButton: document.getElementById('checkout-button'),
    closeFiltersButton: document.getElementById('close-filters-button'),
    closeProductModal: document.getElementById('close-product-modal'),
    favoritesCount: document.getElementById('favorites-count'),
    favoritesList: document.getElementById('favorites-list'),
    favoritesPanel: document.getElementById('favorites-panel'),
    filterChampionship: document.getElementById('filter-championship'),
    filterContinent: document.getElementById('filter-continent'),
    filterCountry: document.getElementById('filter-country'),
    filterGender: document.getElementById('filter-gender'),
    filterPromo: document.getElementById('filter-promo'),
    filterStock: document.getElementById('filter-stock'),
    filtersPanel: document.getElementById('filters-panel'),
    heroGallery: document.getElementById('hero-gallery'),
    heroChampionshipCount: document.getElementById('hero-championship-count'),
    heroProductCount: document.getElementById('hero-product-count'),
    mobileFiltersButton: document.getElementById('mobile-filters-button'),
    overlay: document.getElementById('overlay'),
    priceRange: document.getElementById('price-range'),
    priceRangeValue: document.getElementById('price-range-value'),
    productModal: document.getElementById('product-modal'),
    productModalContent: document.getElementById('product-modal-content'),
    productsList: document.getElementById('products-list'),
    resetFiltersButton: document.getElementById('reset-filters-button'),
    resetFiltersTop: document.getElementById('reset-filters-top'),
    savedAddressPreview: document.getElementById('saved-address-preview'),
    searchInput: document.getElementById('search-input'),
    shippingForm: document.getElementById('shipping-form'),
    sortSelect: document.getElementById('sort-select'),
    toast: document.getElementById('toast'),
};

const state = {
    activeImageIndex: 0,
    activeProductId: null,
    address: loadJSON(STORAGE_KEYS.address, {
        fullName: '',
        street: '',
        postalCode: '',
        city: '',
        country: 'France',
    }),
    cart: loadJSON(STORAGE_KEYS.cart, []),
    favorites: loadJSON(STORAGE_KEYS.favorites, []),
    filters: getDefaultFilters(),
    meta: null,
    panels: {
        cart: false,
        favorites: false,
        filters: false,
    },
    productDetails: new Map(),
    productUi: {},
    products: [],
    sort: 'featured',
};

bootstrap();

function getDefaultFilters() {
    return {
        championship: 'all',
        continent: 'all',
        country: 'all',
        gender: 'all',
        maxPrice: 120,
        promotionOnly: false,
        search: '',
        stockComfortOnly: false,
    };
}

async function bootstrap() {
    hydrateAddressForm();
    restoreCatalogFromCache();
    bindStaticEvents();
    updatePriceRangeLabel();
    renderAll();

    try {
        await loadCatalog();
    } catch (error) {
        showToast("Le catalogue en ligne n'a pas pu etre recharge, l'affichage en cache est utilise.");
        console.error(error);
    }
}

function bindStaticEvents() {
    elements.searchInput.addEventListener('input', (event) => {
        state.filters.search = event.target.value.trim().toLowerCase();
        renderCatalogExperience();
    });

    elements.sortSelect.addEventListener('change', (event) => {
        state.sort = event.target.value;
        renderCatalogExperience();
    });

    elements.filterContinent.addEventListener('change', (event) => {
        state.filters.continent = event.target.value;
        renderCatalogExperience();
    });

    elements.filterCountry.addEventListener('change', (event) => {
        state.filters.country = event.target.value;
        renderCatalogExperience();
    });

    elements.filterChampionship.addEventListener('change', (event) => {
        state.filters.championship = event.target.value;
        renderCatalogExperience();
    });

    elements.filterGender.addEventListener('change', (event) => {
        state.filters.gender = event.target.value;
        renderCatalogExperience();
    });

    elements.filterPromo.addEventListener('change', (event) => {
        state.filters.promotionOnly = event.target.checked;
        renderCatalogExperience();
    });

    elements.filterStock.addEventListener('change', (event) => {
        state.filters.stockComfortOnly = event.target.checked;
        renderCatalogExperience();
    });

    elements.priceRange.addEventListener('input', (event) => {
        state.filters.maxPrice = Number(event.target.value);
        updatePriceRangeLabel();
        renderCatalogExperience();
    });

    elements.resetFiltersButton.addEventListener('click', resetFilters);
    elements.resetFiltersTop.addEventListener('click', resetFilters);
    elements.mobileFiltersButton.addEventListener('click', () => toggleFiltersPanel(true));
    elements.closeFiltersButton.addEventListener('click', () => toggleFiltersPanel(false));
    elements.closeProductModal.addEventListener('click', closeProductModal);
    elements.overlay.addEventListener('click', () => {
        closePanels();
        closeProductModal();
    });
    elements.checkoutButton.addEventListener('click', handleCheckout);

    elements.shippingForm.addEventListener('input', (event) => {
        const { name, value } = event.target;
        state.address[name] = value;
        persistState(STORAGE_KEYS.address, state.address);
        renderSavedAddress();
    });

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('change', handleDocumentChange);
    document.addEventListener('input', handleDocumentInput);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePanels();
            closeProductModal();
        }
    });
}

function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        return fallback;
    }
}

function persistState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function restoreCatalogFromCache() {
    const cache = loadJSON(STORAGE_KEYS.productsCache, null);
    if (cache && Array.isArray(cache.products)) {
        state.products = cache.products;
    }
}

async function loadCatalog() {
    const [productsResponse, metaResponse] = await Promise.all([
        fetch(API_BASE),
        fetch(`${API_BASE}/meta`),
    ]);

    if (!productsResponse.ok || !metaResponse.ok) {
        throw new Error('Le chargement du catalogue a echoue.');
    }

    state.products = await productsResponse.json();
    state.meta = await metaResponse.json();

    persistState(STORAGE_KEYS.productsCache, {
        fetchedAt: Date.now(),
        products: state.products,
    });

    renderAll();
}

function renderAll() {
    renderFilterOptions();
    syncFilterControls();
    renderHeroStats();
    renderSavedAddress();
    renderCatalogExperience();
    renderFavoritesPanel();
    renderCartPanel();
    syncOverlay();
}

function renderCatalogExperience() {
    const visibleProducts = getVisibleProducts();
    renderHeroGallery(visibleProducts);
    renderProducts(visibleProducts);
    updateShortcutButtons();
}

function renderFilterOptions() {
    if (!state.meta) {
        return;
    }

    fillSelect(elements.filterContinent, state.meta.filters.continents, state.filters.continent);
    fillSelect(elements.filterCountry, state.meta.filters.countries, state.filters.country);
    fillSelect(elements.filterChampionship, state.meta.filters.championships, state.filters.championship);
    fillSelect(elements.filterGender, state.meta.filters.genders, state.filters.gender);
}

function fillSelect(select, values, selectedValue) {
    const options = ['<option value="all">Tous</option>']
        .concat(values.map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`))
        .join('');

    select.innerHTML = options;
    select.value = selectedValue;
}

function renderHeroStats() {
    elements.heroProductCount.textContent = String(state.products.length || 20);
    elements.heroChampionshipCount.textContent = String(state.meta?.stats?.championshipCount || 0);
}

function renderSavedAddress() {
    const hasAddress = state.address.fullName && state.address.street && state.address.city;

    elements.savedAddressPreview.textContent = hasAddress
        ? `${state.address.fullName}, ${state.address.city}`
        : 'Aucune adresse enregistree';
}

function renderHeroGallery(products) {
    const galleryProducts = (products.length ? products : state.products).slice(0, 3);

    if (!galleryProducts.length) {
        elements.heroGallery.innerHTML = '';
        return;
    }

    elements.heroGallery.innerHTML = galleryProducts
        .map(
            (product, index) => `
                <button class="hero-gallery__card ${index === 0 ? 'hero-gallery__card--main' : ''}" type="button" data-open-product="${product.id}">
                    <img src="${product.defaultImages[0].url}" alt="${escapeHTML(product.defaultImages[0].alt)}">
                    <span class="hero-gallery__shade"></span>
                    <span class="hero-gallery__content">
                        <small>${escapeHTML(product.championship)} / ${escapeHTML(product.country)}</small>
                        <strong>${escapeHTML(product.name)}</strong>
                        <span>${formatMoney(product.finalPrice)} ${product.discountPercentage > 0 ? `<em>- ${product.discountPercentage}%</em>` : ''}</span>
                    </span>
                </button>
            `
        )
        .join('');
}

function renderProducts(visibleProducts = getVisibleProducts()) {
    if (!visibleProducts.length) {
        elements.productsList.innerHTML = `
            <article class="empty-products">
                <p class="eyebrow">Aucun resultat</p>
                <h3>Le mur est vide pour ce filtre.</h3>
                <p>Essaie un autre championnat ou remonte un peu le prix maximum.</p>
            </article>
        `;
    } else {
        elements.productsList.innerHTML = visibleProducts.map(renderProductCard).join('');
    }

    elements.catalogSummary.textContent = `${visibleProducts.length} maillot(s) affiches sur ${state.products.length} dans la boutique.`;
}

function updateShortcutButtons() {
    const buttons = document.querySelectorAll('[data-shortcut-championship], [data-shortcut-reset]');
    const isResetActive =
        state.filters.championship === 'all' &&
        state.filters.continent === 'all' &&
        state.filters.country === 'all' &&
        state.filters.gender === 'all' &&
        state.filters.maxPrice === 120 &&
        !state.filters.promotionOnly &&
        !state.filters.search &&
        !state.filters.stockComfortOnly;

    buttons.forEach((button) => {
        if (!button.classList.contains('filter-chip')) {
            return;
        }

        const isResetButton = Object.prototype.hasOwnProperty.call(button.dataset, 'shortcutReset');
        const isActive = isResetButton
            ? isResetActive
            : button.dataset.shortcutChampionship === state.filters.championship;

        button.classList.toggle('is-active', Boolean(isActive));
    });
}

function getVisibleProducts() {
    const filtered = state.products.filter((product) => {
        const matchesSearch = !state.filters.search || [product.name, product.club, product.country, product.championship]
            .join(' ')
            .toLowerCase()
            .includes(state.filters.search);

        const matchesContinent =
            state.filters.continent === 'all' || product.continent === state.filters.continent;
        const matchesCountry =
            state.filters.country === 'all' || product.country === state.filters.country;
        const matchesChampionship =
            state.filters.championship === 'all' || product.championship === state.filters.championship;
        const matchesGender =
            state.filters.gender === 'all' || product.gender === state.filters.gender;
        const matchesPromo = !state.filters.promotionOnly || product.discountPercentage > 0;
        const matchesStock = !state.filters.stockComfortOnly || product.totalStock >= 60;
        const matchesPrice = product.finalPrice <= state.filters.maxPrice;

        return (
            matchesSearch &&
            matchesContinent &&
            matchesCountry &&
            matchesChampionship &&
            matchesGender &&
            matchesPromo &&
            matchesStock &&
            matchesPrice
        );
    });

    return filtered.sort(sortProducts);
}

function sortProducts(first, second) {
    if (state.sort === 'price-asc') {
        return first.finalPrice - second.finalPrice;
    }

    if (state.sort === 'price-desc') {
        return second.finalPrice - first.finalPrice;
    }

    if (state.sort === 'discount') {
        return second.discountPercentage - first.discountPercentage;
    }

    if (state.sort === 'name') {
        return first.name.localeCompare(second.name, 'fr');
    }

    return (
        second.discountPercentage - first.discountPercentage ||
        second.totalStock - first.totalStock ||
        first.name.localeCompare(second.name, 'fr')
    );
}

function renderProductCard(product) {
    const isFavorite = state.favorites.includes(product.id);
    const swatches = product.colorways
        .slice(0, 3)
        .map(
            (colorway) => `
                <span class="swatch" style="background: linear-gradient(135deg, ${colorway.primary}, ${colorway.secondary});" title="${escapeHTML(colorway.name)}"></span>
            `
        )
        .join('');

    return `
        <article class="product-card">
            <button class="product-card__favorite ${isFavorite ? 'is-active' : ''}" type="button" data-favorite-toggle="${product.id}" aria-label="Ajouter aux favoris">
                ${isFavorite ? '♥' : '♡'}
            </button>

            <div class="product-card__media">
                <div class="product-card__badges">
                    ${product.discountPercentage > 0 ? `<span class="badge badge--promo">-${product.discountPercentage}%</span>` : ''}
                    <span class="badge badge--tag">${escapeHTML(product.styleTag)}</span>
                </div>
                <img src="${product.defaultImages[0].url}" alt="${escapeHTML(product.defaultImages[0].alt)}">
                <img src="${product.defaultImages[1].url}" alt="${escapeHTML(product.defaultImages[1].alt)}">
            </div>

            <div class="product-card__body">
                <p class="product-card__meta">${escapeHTML(product.championship)} · ${escapeHTML(product.country)}</p>
                <h3>${escapeHTML(product.name)}</h3>
                <p class="product-card__subline">${escapeHTML(product.club)} · ${escapeHTML(product.gender)}</p>

                <div class="price-row">
                    <span class="price-row__current">${formatMoney(product.finalPrice)}</span>
                    ${product.discountPercentage > 0 ? `<span class="price-row__original">${formatMoney(product.price)}</span>` : ''}
                </div>

                <span class="stock-pill">${product.totalStock} pieces suivies en stock</span>

                <div class="swatches">${swatches}</div>

                <div class="product-card__actions">
                    <button class="primary-button" type="button" data-open-product="${product.id}">Configurer</button>
                    <button class="chip-button" type="button" data-favorite-toggle="${product.id}">
                        ${isFavorite ? 'Retirer' : 'Favori'}
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderFavoritesPanel() {
    const favoriteProducts = state.products.filter((product) => state.favorites.includes(product.id));

    elements.favoritesCount.textContent = String(favoriteProducts.length);

    if (!favoriteProducts.length) {
        elements.favoritesList.innerHTML = `
            <p class="empty-state">
                Aucun favori pour le moment. Utilise le coeur sur une carte produit pour garder tes coups de coeur.
            </p>
        `;
        return;
    }

    elements.favoritesList.innerHTML = favoriteProducts
        .map(
            (product) => `
                <article class="favorite-item">
                    <img class="favorite-item__media" src="${product.defaultImages[0].url}" alt="${escapeHTML(product.defaultImages[0].alt)}">
                    <div>
                        <p class="favorite-item__title">${escapeHTML(product.name)}</p>
                        <p class="favorite-item__meta">${escapeHTML(product.club)} · ${escapeHTML(product.championship)}<br>${formatMoney(product.finalPrice)}</p>
                        <div class="favorite-item__actions">
                            <button class="mini-button" type="button" data-open-product="${product.id}">Voir la fiche</button>
                            <button class="mini-button mini-button--danger" type="button" data-favorite-toggle="${product.id}">Retirer</button>
                        </div>
                    </div>
                </article>
            `
        )
        .join('');
}

function renderCartPanel() {
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shipping = cartCount === 0 ? 0 : subtotal >= 180 ? 0 : 6.9;
    const total = subtotal + shipping;

    elements.cartCount.textContent = String(cartCount);
    elements.cartSummaryTitle.textContent = `${cartCount} article${cartCount > 1 ? 's' : ''}`;
    elements.cartSummaryText.textContent = cartCount
        ? 'Le panier peut encore etre ajuste avant la validation finale.'
        : "Choisis un maillot, configure-le puis ajoute-le pour preparer la commande.";

    if (!state.cart.length) {
        elements.cartItems.innerHTML = `
            <p class="empty-state">
                Le panier est vide. Ajoute un maillot depuis la fiche produit pour commencer.
            </p>
        `;
    } else {
        elements.cartItems.innerHTML = state.cart.map(renderCartItem).join('');
    }

    elements.cartTotals.innerHTML = `
        <div class="totals-list">
            <div class="totals-line"><span>Sous-total</span><strong>${formatMoney(subtotal)}</strong></div>
            <div class="totals-line"><span>Livraison</span><strong>${shipping === 0 ? 'Offerte' : formatMoney(shipping)}</strong></div>
            <div class="totals-line"><span>Total</span><strong>${formatMoney(total)}</strong></div>
        </div>
    `;
}

function renderCartItem(item) {
    const patches = item.patchNames.length ? item.patchNames.join(', ') : 'Sans patch';
    const flockingText = item.flockingValue ? `${item.flockingLabel} : ${item.flockingValue}` : item.flockingLabel;

    return `
        <article class="cart-item">
            <img class="cart-item__media" src="${item.image.url}" alt="${escapeHTML(item.image.alt)}">
            <div>
                <p class="cart-item__title">${escapeHTML(item.name)}</p>
                <p class="cart-item__meta">
                    ${escapeHTML(item.club)}<br>
                    ${escapeHTML(item.colorwayName)} · Taille ${escapeHTML(item.size)}<br>
                    ${escapeHTML(flockingText)}<br>
                    ${escapeHTML(patches)}
                </p>
                <div class="cart-item__actions">
                    <button class="mini-button" type="button" data-cart-quantity="${item.key}" data-cart-step="-1">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="mini-button" type="button" data-cart-quantity="${item.key}" data-cart-step="1">+</button>
                    <button class="mini-button mini-button--danger" type="button" data-cart-remove="${item.key}">Retirer</button>
                    <span class="mini-button">${formatMoney(item.unitPrice * item.quantity)}</span>
                </div>
            </div>
        </article>
    `;
}

async function openProductModal(productId) {
    try {
        const product = await getProductDetail(productId);
        state.activeProductId = productId;
        state.activeImageIndex = 0;

        initializeProductUi(product);
        renderProductModal(product);

        elements.productModal.classList.add('is-open');
        syncOverlay();
    } catch (error) {
        showToast("Impossible d'ouvrir cette fiche produit.");
        console.error(error);
    }
}

function closeProductModal() {
    elements.productModal.classList.remove('is-open');
    state.activeProductId = null;
    syncOverlay();
}

async function getProductDetail(productId) {
    if (state.productDetails.has(productId)) {
        return state.productDetails.get(productId);
    }

    const response = await fetch(`${API_BASE}/${productId}`);
    if (!response.ok) {
        throw new Error('Produit introuvable.');
    }

    const product = await response.json();
    state.productDetails.set(productId, product);
    return product;
}

function initializeProductUi(product) {
    if (state.productUi[product.id]) {
        return;
    }

    const firstPlayer = product.officialPlayers[0] || null;
    state.productUi[product.id] = {
        customName: '',
        customNumber: '',
        descriptionExpanded: false,
        flockingType: 'none',
        officialPlayerName: firstPlayer ? firstPlayer.name : '',
        officialPlayerNumber: firstPlayer ? firstPlayer.number : '',
        patchIds: [],
        quantity: 1,
        selectedColorwayId: product.colorways[0].id,
        selectedSize: product.sizes[0],
    };
}

function getProductUi(productId) {
    return state.productUi[productId];
}

function renderProductModal(product) {
    const ui = getProductUi(product.id);
    const selectedColorway = product.colorways.find((colorway) => colorway.id === ui.selectedColorwayId) || product.colorways[0];
    const currentImage = selectedColorway.images[state.activeImageIndex] || selectedColorway.images[0];
    const patchesTotal = ui.patchIds.reduce((sum, patchId) => {
        const patch = product.availablePatches.find((entry) => entry.id === patchId);
        return sum + (patch ? patch.price : 0);
    }, 0);
    const flockingPrice = ui.flockingType === 'none' ? 0 : 5;
    const configuredPrice = product.finalPrice + flockingPrice + patchesTotal;
    const stockForSize = selectedColorway.stockBySize[ui.selectedSize] || 0;
    const description = ui.descriptionExpanded ? product.description : truncateText(product.description, 150);

    elements.productModalContent.innerHTML = `
        <div class="product-view">
            <div class="product-gallery">
                <div class="product-gallery__hero">
                    <img src="${currentImage.url}" alt="${escapeHTML(currentImage.alt)}">
                </div>
                <div class="product-gallery__thumbs">
                    ${selectedColorway.images
                        .map(
                            (image, index) => `
                                <button class="product-gallery__thumb ${index === state.activeImageIndex ? 'is-active' : ''}" type="button" data-thumb-index="${index}">
                                    <img src="${image.url}" alt="${escapeHTML(image.alt)}">
                                </button>
                            `
                        )
                        .join('')}
                </div>
            </div>

            <div class="product-content">
                <p class="product-eyebrow">${escapeHTML(product.championship)} · ${escapeHTML(product.country)} · ${escapeHTML(product.reference)}</p>
                <h1 class="product-title">${escapeHTML(product.name)}</h1>
                <p class="product-subtitle">${escapeHTML(product.club)} · ${escapeHTML(product.gender)} · ${escapeHTML(product.type)}</p>

                <div class="product-price">
                    <span class="product-price__current">${formatMoney(configuredPrice)}</span>
                    ${product.discountPercentage > 0 ? `<span class="price-row__original">${formatMoney(product.price)}</span>` : ''}
                    ${product.discountPercentage > 0 ? `<span class="badge badge--promo">-${product.discountPercentage}%</span>` : ''}
                </div>

                <div class="product-description">
                    <p>${escapeHTML(description)}</p>
                    ${product.description.length > 150 ? `<button class="text-button" type="button" data-description-toggle="${product.id}">${ui.descriptionExpanded ? 'Voir moins' : 'Voir la description complete'}</button>` : ''}
                </div>

                <div class="product-section">
                    <h3>Choisir une couleur</h3>
                    <div class="option-grid">
                        ${product.colorways
                            .map(
                                (colorway) => `
                                    <button class="option-card ${colorway.id === ui.selectedColorwayId ? 'is-active' : ''}" type="button" data-colorway-id="${colorway.id}">
                                        <span class="option-card__swatches">
                                            <span class="swatch" style="background:${colorway.primary}"></span>
                                            <span class="swatch" style="background:${colorway.secondary}"></span>
                                            <span class="swatch" style="background:${colorway.accent}"></span>
                                        </span>
                                        <strong>${escapeHTML(colorway.name)}</strong>
                                    </button>
                                `
                            )
                            .join('')}
                    </div>
                </div>

                <div class="product-section">
                    <h3>Choisir une taille</h3>
                    <div class="size-grid">
                        ${product.sizes
                            .map((size) => {
                                const available = selectedColorway.stockBySize[size] || 0;
                                return `
                                    <button class="size-button ${size === ui.selectedSize ? 'is-active' : ''}" type="button" data-size="${size}">
                                        ${size}<br><small>${available} dispo</small>
                                    </button>
                                `;
                            })
                            .join('')}
                    </div>
                </div>

                <div class="product-section">
                    <h3>Flocage</h3>
                    <div class="radio-stack">
                        ${renderFlockingOption('none', 'Sans flocage', 'Prix du maillot seul', ui.flockingType)}
                        ${renderFlockingOption('official', 'Joueur officiel +5 EUR', 'Choix parmi des joueurs reels', ui.flockingType)}
                        ${renderFlockingOption('custom', 'Personnalise +5 EUR', 'Nom et numero libres', ui.flockingType)}
                    </div>

                    <div class="form-row" style="margin-top: 12px;">
                        ${ui.flockingType === 'official' ? `
                            <div class="field-group">
                                <label for="official-player-select">Joueur officiel</label>
                                <select id="official-player-select">
                                    ${product.officialPlayers
                                        .map(
                                            (player) => `
                                                <option value="${escapeHTML(player.name)}" data-player-number="${player.number}" ${player.name === ui.officialPlayerName ? 'selected' : ''}>
                                                    ${escapeHTML(player.name)} #${player.number}
                                                </option>
                                            `
                                        )
                                        .join('')}
                                </select>
                            </div>
                        ` : ''}

                        ${ui.flockingType === 'custom' ? `
                            <div class="field-group">
                                <label for="custom-player-name">Nom personnalise</label>
                                <input id="custom-player-name" type="text" value="${escapeHTML(ui.customName)}" placeholder="Ton nom">
                            </div>
                            <div class="field-group">
                                <label for="custom-player-number">Numero</label>
                                <input id="custom-player-number" type="number" min="0" max="99" value="${escapeHTML(ui.customNumber)}" placeholder="10">
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="product-section">
                    <h3>Patchs d'epaule</h3>
                    <div class="patch-grid">
                        ${product.availablePatches
                            .map(
                                (patch) => `
                                    <button class="patch-card ${ui.patchIds.includes(patch.id) ? 'is-active' : ''}" type="button" data-patch-id="${patch.id}">
                                        <strong>${escapeHTML(patch.name)}</strong><br>
                                        <span>${formatMoney(patch.price)}</span>
                                    </button>
                                `
                            )
                            .join('')}
                    </div>
                </div>

                <div class="product-section">
                    <h3>Caracteristiques</h3>
                    <div class="config-summary">
                        <div class="totals-line"><span>Public</span><strong>${escapeHTML(product.gender)}</strong></div>
                        <div class="totals-line"><span>Saison</span><strong>${escapeHTML(product.season)}</strong></div>
                        <div class="totals-line"><span>Type</span><strong>${escapeHTML(product.type)}</strong></div>
                        <div class="totals-line"><span>Stock sur la taille choisie</span><strong>${stockForSize}</strong></div>
                    </div>
                </div>

                <div class="product-section">
                    <h3>Quantite</h3>
                    <div class="quantity-row">
                        <button type="button" data-product-quantity-step="-1">-</button>
                        <span class="quantity-value">${ui.quantity}</span>
                        <button type="button" data-product-quantity-step="1">+</button>
                    </div>
                </div>

                <div class="product-section">
                    <h3>Resume de personnalisation</h3>
                    <div class="config-summary">
                        <div class="totals-line"><span>Base promo</span><strong>${formatMoney(product.finalPrice)}</strong></div>
                        <div class="totals-line"><span>Flocage</span><strong>${flockingPrice ? formatMoney(flockingPrice) : 'Inclus a 0 EUR'}</strong></div>
                        <div class="totals-line"><span>Patchs</span><strong>${patchesTotal ? formatMoney(patchesTotal) : 'Aucun'}</strong></div>
                        <div class="totals-line"><span>Total unitaire</span><strong>${formatMoney(configuredPrice)}</strong></div>
                    </div>
                    <div style="margin-top: 16px;">
                        <button class="primary-button primary-button--full" type="button" data-add-to-cart="${product.id}">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="product-section">
            <h3>Produits similaires</h3>
            <div class="similar-grid">
                ${product.similarProducts
                    .map(
                        (similar) => `
                            <button class="similar-card" type="button" data-similar-product="${similar.id}">
                                <img src="${similar.image.url}" alt="${escapeHTML(similar.image.alt)}">
                                <div class="similar-card__body">
                                    <strong>${escapeHTML(similar.name)}</strong>
                                    <p class="product-subtitle">${escapeHTML(similar.club)} · ${formatMoney(similar.finalPrice)}</p>
                                </div>
                            </button>
                        `
                    )
                    .join('')}
            </div>
        </div>
    `;
}

function renderFlockingOption(id, title, description, currentValue) {
    return `
        <button class="radio-card ${id === currentValue ? 'is-active' : ''}" type="button" data-flocking-option="${id}">
            <span>${id === currentValue ? '●' : '○'}</span>
            <span><strong>${title}</strong><br>${description}</span>
        </button>
    `;
}

function handleDocumentClick(event) {
    const resetShortcut = event.target.closest('[data-shortcut-reset]');
    if (resetShortcut) {
        resetFilters();
        scrollToCatalog();
        return;
    }

    const championshipShortcut = event.target.closest('[data-shortcut-championship]');
    if (championshipShortcut) {
        applyChampionshipShortcut(championshipShortcut.dataset.shortcutChampionship);
        scrollToCatalog();
        return;
    }

    const panelButton = event.target.closest('[data-panel-target]');
    if (panelButton) {
        openPanel(panelButton.dataset.panelTarget);
        return;
    }

    if (event.target.closest('[data-close-panel]')) {
        closePanels();
        return;
    }

    const favoriteButton = event.target.closest('[data-favorite-toggle]');
    if (favoriteButton) {
        toggleFavorite(Number(favoriteButton.dataset.favoriteToggle));
        return;
    }

    const productButton = event.target.closest('[data-open-product]');
    if (productButton) {
        openProductModal(Number(productButton.dataset.openProduct));
        return;
    }

    const similarButton = event.target.closest('[data-similar-product]');
    if (similarButton) {
        openProductModal(Number(similarButton.dataset.similarProduct));
        return;
    }

    if (state.activeProductId) {
        const detail = state.productDetails.get(state.activeProductId);
        const ui = getProductUi(state.activeProductId);
        if (detail && ui) {
            const thumbButton = event.target.closest('[data-thumb-index]');
            if (thumbButton) {
                state.activeImageIndex = Number(thumbButton.dataset.thumbIndex);
                renderProductModal(detail);
                return;
            }

            const colorwayButton = event.target.closest('[data-colorway-id]');
            if (colorwayButton) {
                ui.selectedColorwayId = colorwayButton.dataset.colorwayId;
                state.activeImageIndex = 0;
                renderProductModal(detail);
                return;
            }

            const sizeButton = event.target.closest('[data-size]');
            if (sizeButton) {
                ui.selectedSize = sizeButton.dataset.size;
                renderProductModal(detail);
                return;
            }

            const flockingButton = event.target.closest('[data-flocking-option]');
            if (flockingButton) {
                ui.flockingType = flockingButton.dataset.flockingOption;
                renderProductModal(detail);
                return;
            }

            const patchButton = event.target.closest('[data-patch-id]');
            if (patchButton) {
                const patchId = patchButton.dataset.patchId;
                ui.patchIds = ui.patchIds.includes(patchId)
                    ? ui.patchIds.filter((id) => id !== patchId)
                    : ui.patchIds.concat(patchId);
                renderProductModal(detail);
                return;
            }

            const descriptionButton = event.target.closest('[data-description-toggle]');
            if (descriptionButton) {
                ui.descriptionExpanded = !ui.descriptionExpanded;
                renderProductModal(detail);
                return;
            }

            const quantityButton = event.target.closest('[data-product-quantity-step]');
            if (quantityButton) {
                const nextQuantity = ui.quantity + Number(quantityButton.dataset.productQuantityStep);
                ui.quantity = Math.max(1, nextQuantity);
                renderProductModal(detail);
                return;
            }

            const addToCartButton = event.target.closest('[data-add-to-cart]');
            if (addToCartButton) {
                addConfiguredProductToCart(detail);
                return;
            }
        }
    }

    const cartQuantityButton = event.target.closest('[data-cart-quantity]');
    if (cartQuantityButton) {
        updateCartQuantity(cartQuantityButton.dataset.cartQuantity, Number(cartQuantityButton.dataset.cartStep));
        return;
    }

    const cartRemoveButton = event.target.closest('[data-cart-remove]');
    if (cartRemoveButton) {
        removeCartItem(cartRemoveButton.dataset.cartRemove);
    }
}

function handleDocumentChange(event) {
    if (!state.activeProductId) {
        return;
    }

    const detail = state.productDetails.get(state.activeProductId);
    const ui = getProductUi(state.activeProductId);

    if (!detail || !ui) {
        return;
    }

    if (event.target.id === 'official-player-select') {
        const selectedOption = event.target.selectedOptions[0];
        ui.officialPlayerName = selectedOption.value;
        ui.officialPlayerNumber = selectedOption.dataset.playerNumber;
        renderProductModal(detail);
    }
}

function handleDocumentInput(event) {
    if (!state.activeProductId) {
        return;
    }

    const detail = state.productDetails.get(state.activeProductId);
    const ui = getProductUi(state.activeProductId);

    if (!detail || !ui) {
        return;
    }

    if (event.target.id === 'custom-player-name') {
        ui.customName = event.target.value;
    }

    if (event.target.id === 'custom-player-number') {
        ui.customNumber = event.target.value;
    }
}

function toggleFavorite(productId) {
    state.favorites = state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)
        : state.favorites.concat(productId);

    persistState(STORAGE_KEYS.favorites, state.favorites);
    renderCatalogExperience();
    renderFavoritesPanel();
}

function addConfiguredProductToCart(product) {
    const ui = getProductUi(product.id);
    const colorway = product.colorways.find((entry) => entry.id === ui.selectedColorwayId);
    const availableStock = colorway?.stockBySize[ui.selectedSize] || 0;

    if (!colorway || availableStock < ui.quantity) {
        showToast('La combinaison choisie ne dispose pas de stock suffisant.');
        return;
    }

    if (ui.flockingType === 'official' && !ui.officialPlayerName) {
        showToast('Choisis un joueur officiel pour ce flocage.');
        return;
    }

    if (ui.flockingType === 'custom' && (!ui.customName.trim() || !String(ui.customNumber).trim())) {
        showToast('Renseigne un nom et un numero pour le flocage personnalise.');
        return;
    }

    const patches = product.availablePatches.filter((patch) => ui.patchIds.includes(patch.id));
    const unitPrice = Number(
        (
            product.finalPrice +
            (ui.flockingType === 'none' ? 0 : 5) +
            patches.reduce((sum, patch) => sum + patch.price, 0)
        ).toFixed(2)
    );
    const flockingValue =
        ui.flockingType === 'official'
            ? `${ui.officialPlayerName} #${ui.officialPlayerNumber}`
            : ui.flockingType === 'custom'
                ? `${ui.customName.trim()} #${ui.customNumber}`
                : null;
    const flockingLabel =
        ui.flockingType === 'official'
            ? 'Flocage officiel'
            : ui.flockingType === 'custom'
                ? 'Flocage personnalise'
                : 'Sans flocage';

    const key = [
        product.id,
        ui.selectedColorwayId,
        ui.selectedSize,
        ui.flockingType,
        flockingValue || 'none',
        ui.patchIds.slice().sort().join('-'),
    ].join('|');

    const existingItem = state.cart.find((item) => item.key === key);
    if (existingItem) {
        existingItem.quantity += ui.quantity;
    } else {
        state.cart.push({
            key,
            club: product.club,
            colorwayId: colorway.id,
            colorwayName: colorway.name,
            flockingLabel,
            flockingType: ui.flockingType,
            flockingValue,
            image: colorway.images[0],
            name: product.name,
            patchIds: patches.map((patch) => patch.id),
            patchNames: patches.map((patch) => patch.name),
            productId: product.id,
            quantity: ui.quantity,
            size: ui.selectedSize,
            unitPrice,
        });
    }

    persistState(STORAGE_KEYS.cart, state.cart);
    renderCartPanel();
    openPanel('cart-panel');
    showToast('Le maillot a ete ajoute au panier.');
}

function updateCartQuantity(itemKey, step) {
    const item = state.cart.find((entry) => entry.key === itemKey);
    if (!item) {
        return;
    }

    item.quantity += step;

    if (item.quantity <= 0) {
        state.cart = state.cart.filter((entry) => entry.key !== itemKey);
    }

    persistState(STORAGE_KEYS.cart, state.cart);
    renderCartPanel();
}

function removeCartItem(itemKey) {
    state.cart = state.cart.filter((item) => item.key !== itemKey);
    persistState(STORAGE_KEYS.cart, state.cart);
    renderCartPanel();
}

async function handleCheckout() {
    if (!state.cart.length) {
        showToast('Le panier est vide.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: state.cart.map((item) => ({
                    colorwayId: item.colorwayId,
                    flockingType: item.flockingType,
                    flockingValue: item.flockingValue,
                    patchIds: item.patchIds,
                    productId: item.productId,
                    quantity: item.quantity,
                    size: item.size,
                })),
                shippingAddress: state.address,
            }),
        });

        const payload = await response.json();

        if (!response.ok) {
            showToast(payload.message || 'La commande simulee n a pas pu etre validee.');
            return;
        }

        state.cart = [];
        persistState(STORAGE_KEYS.cart, state.cart);
        state.productDetails.clear();
        await loadCatalog();
        renderCartPanel();
        closePanels();
        closeProductModal();
        showToast(`Commande validee: ${payload.orderNumber}`);
    } catch (error) {
        showToast("Une erreur empeche la validation de la commande.");
        console.error(error);
    }
}

function openPanel(panelId) {
    state.panels.favorites = panelId === 'favorites-panel';
    state.panels.cart = panelId === 'cart-panel';
    state.panels.filters = false;

    elements.favoritesPanel.classList.toggle('is-open', state.panels.favorites);
    elements.cartPanel.classList.toggle('is-open', state.panels.cart);
    elements.filtersPanel.classList.remove('is-open');
    syncOverlay();
}

function closePanels() {
    state.panels.favorites = false;
    state.panels.cart = false;
    state.panels.filters = false;

    elements.favoritesPanel.classList.remove('is-open');
    elements.cartPanel.classList.remove('is-open');
    elements.filtersPanel.classList.remove('is-open');
    syncOverlay();
}

function toggleFiltersPanel(forceOpen) {
    state.panels.filters = typeof forceOpen === 'boolean' ? forceOpen : !state.panels.filters;
    state.panels.favorites = false;
    state.panels.cart = false;
    elements.filtersPanel.classList.toggle('is-open', state.panels.filters);
    elements.favoritesPanel.classList.remove('is-open');
    elements.cartPanel.classList.remove('is-open');
    syncOverlay();
}

function syncOverlay() {
    const anyPanelOpen =
        state.panels.cart ||
        state.panels.favorites ||
        state.panels.filters ||
        elements.productModal.classList.contains('is-open');

    elements.overlay.hidden = !anyPanelOpen;
    document.body.classList.toggle('panel-open', anyPanelOpen);
}

function resetFilters() {
    state.filters = getDefaultFilters();
    state.sort = 'featured';
    syncFilterControls();
    renderCatalogExperience();
    closePanels();
}

function applyChampionshipShortcut(championship) {
    state.filters = {
        ...getDefaultFilters(),
        championship,
    };
    state.sort = 'featured';
    syncFilterControls();
    renderCatalogExperience();
    closePanels();
}

function syncFilterControls() {
    elements.searchInput.value = state.filters.search;
    elements.filterContinent.value = state.filters.continent;
    elements.filterCountry.value = state.filters.country;
    elements.filterChampionship.value = state.filters.championship;
    elements.filterGender.value = state.filters.gender;
    elements.filterPromo.checked = state.filters.promotionOnly;
    elements.filterStock.checked = state.filters.stockComfortOnly;
    elements.priceRange.value = String(state.filters.maxPrice);
    elements.sortSelect.value = state.sort;
    updatePriceRangeLabel();
}

function hydrateAddressForm() {
    const fields = ['fullName', 'street', 'postalCode', 'city', 'country'];
    fields.forEach((field) => {
        const input = elements.shippingForm.elements.namedItem(field);
        if (input) {
            input.value = state.address[field] || '';
        }
    });
}

function updatePriceRangeLabel() {
    elements.priceRangeValue.textContent = `Jusqu'a ${state.filters.maxPrice} EUR`;
}

function scrollToCatalog() {
    document.getElementById('catalog')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('is-visible');

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
        elements.toast.classList.remove('is-visible');
    }, 2600);
}

function formatMoney(amount) {
    return new Intl.NumberFormat('fr-FR', {
        currency: 'EUR',
        style: 'currency',
    }).format(amount);
}

function truncateText(text, limit) {
    return text.length <= limit ? text : `${text.slice(0, limit).trim()}...`;
}

function escapeHTML(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
