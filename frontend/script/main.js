const API_URL = "http://localhost:3000/api/produits";

let allProducts = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("ultragoal-cart")) || [];
let favorites = JSON.parse(localStorage.getItem("ultragoal-favorites")) || [];
let savedAddress = JSON.parse(localStorage.getItem("ultragoal-address")) || null;

let currentProduct = null;
let currentProductDetails = null;
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let currentQuantity = 1;
let selectedSize = "S";

/* =========================
   HELPERS
========================= */
function formatPrice(value) {
    return `${Number(value).toFixed(2).replace(".", ",")} €`;
}

function isNationalTeam(product) {
    const championnat = (product?.championnat || "").toLowerCase();
    return championnat.includes("national");
}

function getFinalPrice(product) {
    return Number(product?.reduction || 0) > 0 ? 30 : 45;
}

function getOldPrice(product) {
    return Number(product?.reduction || 0) > 0 ? 45 : null;
}

function getPatchLabel(product) {
    return isNationalTeam(product)
        ? "Patch Coupe du Monde (+2,50€)"
        : "Patch Ligue des Champions (+2,50€)";
}

function getPatchShortLabel(product) {
    return isNationalTeam(product) ? "Patch Coupe du Monde" : "Patch LDC";
}

function getProductImages(product) {
    const firstImage = product.url_image || "./assets/maillot-bresil.png";
    const secondImage = product.url_image_2 || null;
    const images = [firstImage];

    if (secondImage) {
        images.push(secondImage);
    } else if (firstImage.includes(".jpg")) {
        images.push(firstImage.replace(".jpg", " dos.jpg"));
    } else if (firstImage.includes(".png")) {
        images.push(firstImage.replace(".png", " dos.png"));
    } else if (firstImage.includes(".webp")) {
        images.push(firstImage.replace(".webp", " dos.webp"));
    }

    return [...new Set(images)];
}

function truncateText(text, max = 150) {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max)}...` : text;
}

function getStockLabel(product) {
    const stock = Number(product.quantite_stock || 0);
    if (stock <= 0) return "Rupture de stock";
    if (stock <= 5) return "Stock faible";
    return "En stock";
}

function getCardBadge(product) {
    const stock = Number(product.quantite_stock || 0);

    if (Number(product.reduction) > 0) {
        return `<span class="badge">Promo</span>`;
    }

    if (stock > 0 && stock <= 5) {
        return `<span class="badge" style="background:#ffb703;color:#171a22;">Stock faible</span>`;
    }

    return "";
}

function saveCart() {
    localStorage.setItem("ultragoal-cart", JSON.stringify(cart));
}

function saveFavorites() {
    localStorage.setItem("ultragoal-favorites", JSON.stringify(favorites));
}

function saveAddress(address) {
    localStorage.setItem("ultragoal-address", JSON.stringify(address));
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function normalize(str) {
    return (str || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

/* =========================
   FETCH
========================= */
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Impossible de charger les produits");

        allProducts = await response.json();
        filteredProducts = [...allProducts];

        populateFilters(allProducts);
        renderHomeSections(allProducts);
        renderProducts(filteredProducts);
        updateCounters();
        renderCart();
        renderFavorites();
        preloadSavedAddress();
    } catch (error) {
        console.error(error);
        document.getElementById("produits-liste").innerHTML =
            `<p class="loading-text">Erreur de chargement du catalogue.</p>`;
        document.getElementById("nouveautes-list").innerHTML =
            `<p class="loading-text">Impossible de charger les nouveautés.</p>`;
        document.getElementById("promotions-list").innerHTML =
            `<p class="loading-text">Impossible de charger les promotions.</p>`;
    }
}

/* =========================
   FILTERS / SEARCH / SORT
========================= */
function populateFilters(products) {
    const championshipSelect = document.getElementById("filter-championship");
    const countrySelect = document.getElementById("filter-country");
    const sexSelect = document.getElementById("filter-sex");

    const championships = [...new Set(products.map((p) => p.championnat).filter(Boolean))].sort();
    const countries = [...new Set(products.map((p) => p.pays).filter(Boolean))].sort();
    const sexes = [...new Set(products.map((p) => p.sexe).filter(Boolean))].sort();

    championships.forEach((value) => {
        championshipSelect.innerHTML += `<option value="${value}">${value}</option>`;
    });

    countries.forEach((value) => {
        countrySelect.innerHTML += `<option value="${value}">${value}</option>`;
    });

    sexes.forEach((value) => {
        sexSelect.innerHTML += `<option value="${value}">${value}</option>`;
    });
}

function applyFiltersAndSort() {
    const championship = document.getElementById("filter-championship").value;
    const country = document.getElementById("filter-country").value;
    const sex = document.getElementById("filter-sex").value;
    const sort = document.getElementById("sort-select").value;
    const search = normalize(document.getElementById("search-input").value);

    filteredProducts = allProducts.filter((product) => {
        const matchChampionship = !championship || product.championnat === championship;
        const matchCountry = !country || product.pays === country;
        const matchSex = !sex || product.sexe === sex;

        const haystack = normalize(
            `${product.nom} ${product.description} ${product.reference} ${product.type} ${product.sexe} ${product.pays} ${product.championnat}`
        );
        const matchSearch = !search || haystack.includes(search);

        return matchChampionship && matchCountry && matchSex && matchSearch;
    });

    if (sort === "price-asc") {
        filteredProducts.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    } else if (sort === "price-desc") {
        filteredProducts.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    }

    renderProducts(filteredProducts);
}

function resetFilters() {
    document.getElementById("filter-championship").value = "";
    document.getElementById("filter-country").value = "";
    document.getElementById("filter-sex").value = "";
    document.getElementById("sort-select").value = "default";
    document.getElementById("search-input").value = "";
    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
}

/* =========================
   RENDER HOME
========================= */
function createProductCard(product, compact = false) {
    const images = getProductImages(product);
    const finalPrice = getFinalPrice(product);
    const oldPriceValue = getOldPrice(product);
    const oldPrice =
        oldPriceValue !== null
            ? `<span class="old-price">${formatPrice(oldPriceValue)}</span>`
            : "";

    return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        ${getCardBadge(product)}
        <img src="${images[0]}" alt="${product.nom}">
        <img class="hover-img" src="${images[1] || images[0]}" alt="${product.nom}">
      </div>

      <div class="product-info">
        <p class="product-name">${product.nom}</p>
        <p class="product-meta-line">${product.championnat || "Maillot"} • ${product.sexe || "Mixte"}</p>

        <div class="product-price">
          <span>${formatPrice(finalPrice)}</span>
          ${oldPrice}
        </div>

        ${compact
            ? ""
            : `
          <div class="card-bottom">
            <button class="card-view-btn" type="button" data-open-product="${product.id}">Voir</button>
            <button class="card-fav-btn" type="button" data-add-favorite="${product.id}">❤</button>
          </div>
        `
        }
      </div>
    </article>
  `;
}

function renderHomeSections(products) {
    const nouveautes = products.slice(0, 4);
    const promotions = products.filter((product) => Number(product.reduction) > 0).slice(0, 4);

    document.getElementById("nouveautes-list").innerHTML = nouveautes.length
        ? nouveautes.map((product) => createProductCard(product, true)).join("")
        : `<p class="loading-text">Aucune nouveauté.</p>`;

    document.getElementById("promotions-list").innerHTML = promotions.length
        ? promotions.map((product) => createProductCard(product, true)).join("")
        : `<p class="loading-text">Aucune promotion pour le moment.</p>`;
}

/* =========================
   RENDER CATALOG
========================= */
function renderProducts(products) {
    const list = document.getElementById("produits-liste");
    const count = document.getElementById("catalog-count");

    count.textContent = `${products.length} produit${products.length > 1 ? "s" : ""}`;

    if (!products.length) {
        list.innerHTML = `<p class="loading-text">Aucun produit trouvé.</p>`;
        return;
    }

    list.innerHTML = products.map((product) => createProductCard(product)).join("");
}

/* =========================
   PRODUCT DETAILS / STOCK
========================= */
function getAvailableSizes() {
    return ["S", "M", "L", "XL"];
}

function getSelectedVariantStock() {
    if (!currentProductDetails || !Array.isArray(currentProductDetails.variantes)) {
        return Number(currentProduct?.quantite_stock || 0);
    }

    const variant = currentProductDetails.variantes.find((v) => v.taille === selectedSize);
    return Number(variant?.quantite_stock || 0);
}

function updateStockDisplay() {
    const stock = getSelectedVariantStock();
    const stockLine = document.getElementById("modal-stock-line");

    if (stock <= 0) {
        stockLine.textContent = `Rupture de stock en taille ${selectedSize}`;
        stockLine.style.color = "#e63946";
    } else if (stock <= 5) {
        stockLine.textContent = `Stock faible en taille ${selectedSize} : ${stock} restant(s)`;
        stockLine.style.color = "#ff9800";
    } else {
        stockLine.textContent = `En stock en taille ${selectedSize} : ${stock} restant(s)`;
        stockLine.style.color = "#2a9d8f";
    }
}

/* =========================
   PRODUCT MODAL
========================= */
async function openProductModal(productId) {
    const product = allProducts.find((p) => Number(p.id) === Number(productId));
    if (!product) return;

    currentProduct = product;
    currentProductDetails = null;
    currentQuantity = 1;
    selectedSize = "S";

    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) throw new Error("Impossible de charger le détail produit");

        const details = await response.json();
        currentProductDetails = details;

        const detailImages =
            Array.isArray(details.images) && details.images.length
                ? details.images.map((img) => img.url_image)
                : getProductImages(product);

        currentGalleryImages = detailImages.length ? detailImages : getProductImages(product);
        currentGalleryIndex = 0;

        const finalPrice = getFinalPrice(product);
        const oldPrice = document.getElementById("modal-old-price");
        const discountBadge = document.getElementById("modal-discount-badge");

        document.getElementById("modal-product-name").textContent = product.nom;
        document.getElementById("modal-product-meta").textContent =
            `${product.championnat || "Football"} • ${product.sexe || "Mixte"} • ${product.type || "Maillot"}`;

        document.getElementById("modal-main-image").src = currentGalleryImages[0];
        document.getElementById("config-preview-image").src = currentGalleryImages[0];

        document.getElementById("modal-current-price").textContent = formatPrice(finalPrice);

        if (Number(product.reduction) > 0) {
            oldPrice.classList.remove("hidden");
            discountBadge.classList.remove("hidden");
            oldPrice.textContent = formatPrice(45);
            discountBadge.textContent = "Promo";
        } else {
            oldPrice.classList.add("hidden");
            discountBadge.classList.add("hidden");
        }

        updateStockDisplay();

        document.getElementById("modal-product-chip").textContent =
            Number(product.reduction) > 0
                ? "Promotion"
                : getSelectedVariantStock() <= 5
                    ? "Stock faible"
                    : "Disponible";

        document.getElementById("modal-description-short").textContent = truncateText(product.description, 150);
        document.getElementById("modal-description-full").textContent = product.description;
        document.getElementById("modal-description-full").classList.add("hidden");
        document.getElementById("toggle-description-btn").textContent = "Lire plus";

        document.getElementById("flocking-select").value = "none";
        document.getElementById("patch-select").value = "none";

        const officialWrapper = document.getElementById("official-player-wrapper");
        const officialSelect = document.getElementById("official-player-select");

        if (officialWrapper) officialWrapper.classList.add("hidden");
        if (officialSelect) officialSelect.innerHTML = `<option value="">Choisir un joueur</option>`;

        document.getElementById("custom-flocking-wrapper").classList.add("hidden");
        document.getElementById("custom-name-input").value = "";
        document.getElementById("custom-number-input").value = "";

        const patchSelect = document.getElementById("patch-select");
        patchSelect.innerHTML = `
      <option value="none">Sans patch</option>
      <option value="competition">${getPatchLabel(product)}</option>
    `;

        document.getElementById("qty-value").textContent = currentQuantity;
        renderSizeOptions();
        renderGalleryThumbs();
        renderSimilarProducts(product);
        updateConfiguratorPrice();

        document.getElementById("product-modal-overlay").classList.remove("hidden");
    } catch (error) {
        console.error(error);
        showToast("Impossible de charger le produit");
    }
}

function closeProductModal() {
    document.getElementById("product-modal-overlay").classList.add("hidden");
}

function renderGalleryThumbs() {
    const container = document.getElementById("gallery-thumbs");
    container.innerHTML = currentGalleryImages
        .map(
            (image, index) => `
      <button type="button" class="thumb-item" data-thumb-index="${index}">
        <img src="${image}" alt="Miniature ${index + 1}">
      </button>
    `
        )
        .join("");
}

function updateMainGalleryImage() {
    const image = currentGalleryImages[currentGalleryIndex] || currentGalleryImages[0];
    document.getElementById("modal-main-image").src = image;
    document.getElementById("config-preview-image").src = image;
}

function renderSizeOptions() {
    const sizes = getAvailableSizes();
    const container = document.getElementById("size-options");

    container.innerHTML = sizes
        .map((size) => {
            const stock = currentProductDetails?.variantes?.find((v) => v.taille === size)?.quantite_stock ?? 0;
            const disabled = Number(stock) <= 0;

            return `
        <button
          type="button"
          class="${size === selectedSize ? "active" : ""}"
          data-size-value="${size}"
          ${disabled ? "disabled" : ""}
          style="${disabled ? "opacity:.45;cursor:not-allowed;" : ""}"
        >
          ${size}
        </button>
      `;
        })
        .join("");
}

function renderSimilarProducts(product) {
    const container = document.getElementById("similar-products-list");

    const similar = allProducts
        .filter((item) => item.id !== product.id && item.championnat === product.championnat)
        .slice(0, 4);

    if (!similar.length) {
        container.innerHTML = `<p class="loading-text">Pas de produits similaires pour le moment.</p>`;
        return;
    }

    container.innerHTML = similar.map((item) => createProductCard(item, true)).join("");
}

function toggleDescription() {
    const full = document.getElementById("modal-description-full");
    const button = document.getElementById("toggle-description-btn");

    if (full.classList.contains("hidden")) {
        full.classList.remove("hidden");
        button.textContent = "Réduire";
    } else {
        full.classList.add("hidden");
        button.textContent = "Lire plus";
    }
}

/* =========================
   CONFIGURATOR
========================= */
function updateConfiguratorUI() {
    const flockingType = document.getElementById("flocking-select").value;
    const customWrapper = document.getElementById("custom-flocking-wrapper");

    customWrapper.classList.toggle("hidden", flockingType !== "custom");
    updateConfiguratorPrice();
}

function updateConfiguratorPrice() {
    if (!currentProduct) return;

    let price = getFinalPrice(currentProduct);

    const flockingType = document.getElementById("flocking-select").value;
    const patchType = document.getElementById("patch-select").value;

    let previewName = "Sans flocage";
    let previewPatch = "Sans patch";

    if (flockingType === "custom") {
        price += 5;
        const customName = document.getElementById("custom-name-input").value.trim();
        const customNumber = document.getElementById("custom-number-input").value.trim();
        previewName =
            customName || customNumber
                ? `${customName || "Nom"} ${customNumber || ""}`.trim()
                : "Flocage personnalisé (+5€)";
    }

    if (patchType === "competition") {
        price += 2.5;
        previewPatch = getPatchShortLabel(currentProduct);
    }

    document.getElementById("config-preview-name").textContent = previewName;
    document.getElementById("config-preview-patch").textContent = previewPatch;
    document.getElementById("modal-final-config-price").textContent = formatPrice(price);
}

/* =========================
   CART
========================= */
function addCurrentProductToCart() {
    if (!currentProduct) return;

    const availableStock = getSelectedVariantStock();

    if (availableStock <= 0) {
        showToast("Cette taille est en rupture de stock");
        return;
    }

    if (currentQuantity > availableStock) {
        showToast(`Stock insuffisant : ${availableStock} disponible(s)`);
        return;
    }

    const flockingType = document.getElementById("flocking-select").value;
    const patchType = document.getElementById("patch-select").value;
    const customName = document.getElementById("custom-name-input").value.trim();
    const customNumber = document.getElementById("custom-number-input").value.trim();

    let unitPrice = getFinalPrice(currentProduct);
    let flockingLabel = "Sans flocage";
    let patchLabel = "Sans patch";

    if (flockingType === "custom") {
        unitPrice += 5;
        flockingLabel = `${customName || "Personnalisé"} ${customNumber || ""}`.trim();
    }

    if (patchType === "competition") {
        unitPrice += 2.5;
        patchLabel = getPatchShortLabel(currentProduct);
    }

    const key = [currentProduct.id, selectedSize, flockingType, flockingLabel, patchType].join("|");

    const existingItem = cart.find((item) => item.key === key);
    const existingQty = existingItem ? existingItem.quantity : 0;

    if (existingQty + currentQuantity > availableStock) {
        showToast(`Tu dépasses le stock disponible pour cette taille (${availableStock})`);
        return;
    }

    if (existingItem) {
        existingItem.quantity += currentQuantity;
    } else {
        cart.push({
            key,
            productId: currentProduct.id,
            name: currentProduct.nom,
            image: getProductImages(currentProduct)[0],
            size: selectedSize,
            quantity: currentQuantity,
            unitPrice,
            flocking: flockingLabel,
            patch: patchLabel,
            flockingType,
            patchType
        });
    }

    saveCart();
    updateCounters();
    renderCart();
    showToast("Produit ajouté au panier");
    closeProductModal();
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!cart.length) {
        container.innerHTML = `<p class="empty-message">Ton panier est vide.</p>`;
        totalElement.textContent = formatPrice(0);
        return;
    }

    container.innerHTML = cart
        .map(
            (item) => `
    <article class="drawer-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>Taille : ${item.size}</p>
        <p>${item.flocking}</p>
        <p>${item.patch}</p>
        <p>Quantité : ${item.quantity}</p>
        <strong>${formatPrice(item.unitPrice * item.quantity)}</strong>
      </div>
      <button class="drawer-remove-btn" type="button" data-remove-cart="${item.key}">Suppr.</button>
    </article>
  `
        )
        .join("");

    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    totalElement.textContent = formatPrice(total);
}

function removeFromCart(key) {
    cart = cart.filter((item) => item.key !== key);
    saveCart();
    updateCounters();
    renderCart();
}

function toggleCartDrawer(open = null) {
    const drawer = document.getElementById("cart-drawer");
    const shouldOpen = open === null ? !drawer.classList.contains("open") : open;
    drawer.classList.toggle("open", shouldOpen);
}

/* =========================
   FAVORITES
========================= */
function addToFavorites(productId) {
    const product = allProducts.find((p) => Number(p.id) === Number(productId));
    if (!product) return;

    const exists = favorites.some((item) => Number(item.id) === Number(product.id));
    if (exists) {
        showToast("Déjà dans les favoris");
        return;
    }

    favorites.push({
        id: product.id,
        name: product.nom,
        image: getProductImages(product)[0],
        price: getFinalPrice(product)
    });

    saveFavorites();
    updateCounters();
    renderFavorites();
    showToast("Produit ajouté aux favoris");
}

function renderFavorites() {
    const container = document.getElementById("favorites-items");

    if (!favorites.length) {
        container.innerHTML = `<p class="empty-message">Aucun favori pour le moment.</p>`;
        return;
    }

    container.innerHTML = favorites
        .map(
            (item) => `
    <article class="drawer-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <strong>${formatPrice(item.price)}</strong>
      </div>
      <button class="drawer-remove-btn" type="button" data-remove-favorite="${item.id}">Suppr.</button>
    </article>
  `
        )
        .join("");
}

function removeFavorite(productId) {
    favorites = favorites.filter((item) => Number(item.id) !== Number(productId));
    saveFavorites();
    updateCounters();
    renderFavorites();
}

function toggleFavoritesDrawer(open = null) {
    const drawer = document.getElementById("favorites-drawer");
    const shouldOpen = open === null ? !drawer.classList.contains("open") : open;
    drawer.classList.toggle("open", shouldOpen);
}

/* =========================
   CHECKOUT
========================= */
function preloadSavedAddress() {
    if (!savedAddress) return;
    document.getElementById("checkout-fullname").value = savedAddress.fullName || "";
    document.getElementById("checkout-street").value = savedAddress.street || "";
    document.getElementById("checkout-postalcode").value = savedAddress.postalCode || "";
    document.getElementById("checkout-city").value = savedAddress.city || "";
    document.getElementById("checkout-country").value = savedAddress.country || "";
}

function toggleCheckoutModal(open = null) {
    const modal = document.getElementById("checkout-modal-overlay");
    const shouldOpen = open === null ? modal.classList.contains("hidden") : open;
    modal.classList.toggle("hidden", !shouldOpen);

    if (shouldOpen) {
        renderCheckoutSummary();
    }
}

function renderCheckoutSummary() {
    const summary = document.getElementById("checkout-summary");

    if (!cart.length) {
        summary.innerHTML = `<p>Ton panier est vide.</p>`;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shipping = subtotal >= 90 ? 0 : 6.9;
    const total = subtotal + shipping;

    summary.innerHTML = `
    <h3>Récapitulatif</h3>
    <p>Sous-total : <strong>${formatPrice(subtotal)}</strong></p>
    <p>Livraison : <strong>${formatPrice(shipping)}</strong></p>
    <p>Total : <strong>${formatPrice(total)}</strong></p>
  `;
}

async function submitCheckout(event) {
    event.preventDefault();

    if (!cart.length) {
        showToast("Ton panier est vide");
        return;
    }

    const shippingAddress = {
        fullName: document.getElementById("checkout-fullname").value.trim(),
        street: document.getElementById("checkout-street").value.trim(),
        postalCode: document.getElementById("checkout-postalcode").value.trim(),
        city: document.getElementById("checkout-city").value.trim(),
        country: document.getElementById("checkout-country").value.trim()
    };

    saveAddress(shippingAddress);

    const items = cart.map((item) => ({
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
        flockingType: item.flockingType || "none",
        patchType: item.patchType || "none"
    }));

    try {
        const response = await fetch(`${API_URL}/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items,
                shippingAddress
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Erreur pendant la commande");
        }

        cart = [];
        saveCart();
        updateCounters();
        renderCart();
        toggleCheckoutModal(false);
        toggleCartDrawer(false);

        document.getElementById("checkout-summary").innerHTML = `
      <div class="checkout-success">
        Commande validée avec succès. Total : ${formatPrice(result.total)}
      </div>
    `;

        showToast("Commande validée");
        await fetchProducts();
    } catch (error) {
        console.error(error);
        showToast(error.message || "Erreur commande");
    }
}

/* =========================
   COUNTERS
========================= */
function updateCounters() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("favorites-count").textContent = favorites.length;
}

/* =========================
   EVENTS
========================= */
function bindStaticEvents() {
    document.getElementById("filter-championship").addEventListener("change", applyFiltersAndSort);
    document.getElementById("filter-country").addEventListener("change", applyFiltersAndSort);
    document.getElementById("filter-sex").addEventListener("change", applyFiltersAndSort);
    document.getElementById("sort-select").addEventListener("change", applyFiltersAndSort);
    document.getElementById("search-input").addEventListener("input", applyFiltersAndSort);
    document.getElementById("reset-filters-btn").addEventListener("click", resetFilters);

    document.getElementById("close-product-modal").addEventListener("click", closeProductModal);
    document.getElementById("product-modal-overlay").addEventListener("click", (event) => {
        if (event.target.id === "product-modal-overlay") closeProductModal();
    });

    document.getElementById("toggle-description-btn").addEventListener("click", toggleDescription);

    document.getElementById("gallery-prev").addEventListener("click", () => {
        if (!currentGalleryImages.length) return;
        currentGalleryIndex =
            (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateMainGalleryImage();
    });

    document.getElementById("gallery-next").addEventListener("click", () => {
        if (!currentGalleryImages.length) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
        updateMainGalleryImage();
    });

    document.getElementById("qty-minus").addEventListener("click", () => {
        currentQuantity = Math.max(1, currentQuantity - 1);
        document.getElementById("qty-value").textContent = currentQuantity;
    });

    document.getElementById("qty-plus").addEventListener("click", () => {
        currentQuantity += 1;
        document.getElementById("qty-value").textContent = currentQuantity;
    });

    document.getElementById("flocking-select").addEventListener("change", updateConfiguratorUI);
    document.getElementById("custom-name-input").addEventListener("input", updateConfiguratorPrice);
    document.getElementById("custom-number-input").addEventListener("input", updateConfiguratorPrice);
    document.getElementById("patch-select").addEventListener("change", updateConfiguratorPrice);

    document.getElementById("add-to-cart-btn").addEventListener("click", addCurrentProductToCart);
    document.getElementById("add-to-favorites-btn").addEventListener("click", () => {
        if (currentProduct) addToFavorites(currentProduct.id);
    });

    document.getElementById("cart-btn").addEventListener("click", () => toggleCartDrawer());
    document.getElementById("close-cart-btn").addEventListener("click", () => toggleCartDrawer(false));

    document.getElementById("favorites-btn").addEventListener("click", () => toggleFavoritesDrawer());
    document.getElementById("close-favorites-btn").addEventListener("click", () => toggleFavoritesDrawer(false));

    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (!cart.length) {
            showToast("Ton panier est vide");
            return;
        }
        toggleCheckoutModal(true);
    });

    document.getElementById("close-checkout-modal").addEventListener("click", () => toggleCheckoutModal(false));
    document.getElementById("cancel-checkout-btn").addEventListener("click", () => toggleCheckoutModal(false));
    document.getElementById("checkout-modal-overlay").addEventListener("click", (event) => {
        if (event.target.id === "checkout-modal-overlay") toggleCheckoutModal(false);
    });

    document.getElementById("checkout-form").addEventListener("submit", submitCheckout);

    document.getElementById("hero-catalog-btn").addEventListener("click", () => scrollToSection("catalogue"));
    document.getElementById("hero-promo-btn").addEventListener("click", () => {
        document.getElementById("filter-championship").value = "";
        document.getElementById("filter-country").value = "";
        document.getElementById("filter-sex").value = "";
        document.getElementById("sort-select").value = "default";
        document.getElementById("search-input").value = "";
        filteredProducts = allProducts.filter((product) => Number(product.reduction) > 0);
        renderProducts(filteredProducts);
        scrollToSection("catalogue");
    });

    document.getElementById("mega-discover-btn").addEventListener("click", () => scrollToSection("catalogue"));

    document.getElementById("mobile-menu-btn").addEventListener("click", () => {
        const mobileMenu = document.getElementById("mobile-menu");
        mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        const openBtn = event.target.closest("[data-open-product]");
        if (openBtn) {
            openProductModal(openBtn.dataset.openProduct);
            return;
        }

        const favBtn = event.target.closest("[data-add-favorite]");
        if (favBtn) {
            event.stopPropagation();
            addToFavorites(favBtn.dataset.addFavorite);
            return;
        }

        const card = event.target.closest(".product-card");
        if (card && !event.target.closest("button")) {
            openProductModal(card.dataset.productId);
            return;
        }

        const thumb = event.target.closest("[data-thumb-index]");
        if (thumb) {
            currentGalleryIndex = Number(thumb.dataset.thumbIndex);
            updateMainGalleryImage();
            return;
        }

        const sizeBtn = event.target.closest("[data-size-value]");
        if (sizeBtn && !sizeBtn.disabled) {
            selectedSize = sizeBtn.dataset.sizeValue;
            renderSizeOptions();
            updateStockDisplay();

            document.getElementById("modal-product-chip").textContent =
                getSelectedVariantStock() <= 5 ? "Stock faible" : "Disponible";
            return;
        }

        const cartRemoveBtn = event.target.closest("[data-remove-cart]");
        if (cartRemoveBtn) {
            removeFromCart(cartRemoveBtn.dataset.removeCart);
            return;
        }

        const favoriteRemoveBtn = event.target.closest("[data-remove-favorite]");
        if (favoriteRemoveBtn) {
            removeFavorite(favoriteRemoveBtn.dataset.removeFavorite);
            return;
        }

        const homeLink = event.target.closest("[data-home-link]");
        if (homeLink) {
            scrollToSection(homeLink.dataset.homeLink);
            return;
        }

        const filterBtn = event.target.closest("[data-filter-type='championship']");
        if (filterBtn) {
            const value = filterBtn.dataset.filterValue;
            document.getElementById("filter-championship").value = value;
            applyFiltersAndSort();
            scrollToSection("catalogue");
            return;
        }

        const showAll = event.target.closest("[data-show-all]");
        if (showAll) {
            const mode = showAll.dataset.showAll;

            if (mode === "promo") {
                document.getElementById("filter-championship").value = "";
                document.getElementById("filter-country").value = "";
                document.getElementById("filter-sex").value = "";
                document.getElementById("sort-select").value = "default";
                document.getElementById("search-input").value = "";
                filteredProducts = allProducts.filter((product) => Number(product.reduction) > 0);
                renderProducts(filteredProducts);
            } else {
                resetFilters();
            }

            scrollToSection("catalogue");
        }
    });
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    bindStaticEvents();
    fetchProducts();
});