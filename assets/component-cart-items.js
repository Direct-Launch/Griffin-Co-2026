/******/ (() => { // webpackBootstrap
/**
 * Cart Items Web Component
 * Handles quantity updates and item removal on the cart template page
 * using Shopify's section rendering API for seamless updates without page reload.
 */
class CartItems extends HTMLElement {
  constructor() {
    super();
    this.sectionId = this.getAttribute('data-section-id') || 'template--cart';
    this.dynamicContentIds = [
      'cart-items',
      'cart-footer'
    ];
    this.cartCountIndicator = document.querySelector('[data-cart-count-indicator]');
    
    // Bind methods
    this.handleQuantityButtonClick = this.handleQuantityButtonClick.bind(this);
    this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.updateLineItem = this.updateLineItem.bind(this);
    this.renderCartSection = this.renderCartSection.bind(this);
    this.handleCartErrors = this.handleCartErrors.bind(this);
  }

  connectedCallback() {
    window.wetheme.webcomponentRegistry.register({ key: 'component-cart-items' });
    
    // Use event delegation for dynamic content
    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('change', this.handleChange.bind(this));
  }

  handleClick(e) {
    /* ===== Handle delegated click events ===== */
    const quantityButton = e.target.closest('[data-cart-quantity-button]');
    const removeButton = e.target.closest('[data-cart-remove-item]');

    if (quantityButton) {
      e.preventDefault();
      this.handleQuantityButtonClick(quantityButton);
    } else if (removeButton) {
      e.preventDefault();
      this.handleRemoveItem(removeButton);
    }
  }

  handleChange(e) {
    /* ===== Handle delegated change events ===== */
    const quantityInput = e.target.closest('[data-cart-quantity-input]');
    if (quantityInput) {
      e.preventDefault();
      this.handleQuantityInputChange(quantityInput);
    }
  }

  handleQuantityButtonClick(button) {
    /* ===== Handle quantity button (+/-) click ===== */
    const lineItem = button.closest('[data-cart-item]');
    if (!lineItem) return;

    const input = lineItem.querySelector('[data-cart-quantity-input]');
    if (!input) return;

    const previousValue = parseInt(input.value);
    const adjustment = button.getAttribute('name') === 'plus' ? 1 : -1;
    let newValue = previousValue + adjustment;

    // Ensure minimum of 1
    if (newValue < 1) newValue = 1;

    // Only update if value changed
    if (newValue !== previousValue) {
      input.value = newValue;
      const lineIndex = parseInt(lineItem.getAttribute('data-item-index'));
      this.updateCart(lineItem, lineIndex, newValue);
    }
  }

  handleQuantityInputChange(input) {
    /* ===== Handle direct quantity input change ===== */
    const lineItem = input.closest('[data-cart-item]');
    if (!lineItem) return;

    let newValue = parseInt(input.value);
    
    // Validate input
    if (isNaN(newValue) || newValue < 1) {
      newValue = 1;
      input.value = newValue;
    }

    const lineIndex = parseInt(lineItem.getAttribute('data-item-index'));
    this.updateCart(lineItem, lineIndex, newValue);
  }

  handleRemoveItem(button) {
    /* ===== Handle remove item button click ===== */
    const lineItem = button.closest('[data-cart-item]');
    if (!lineItem) return;

    const lineIndex = parseInt(lineItem.getAttribute('data-item-index'));
    this.updateCart(lineItem, lineIndex, 0);
  }

  async updateCart(lineItem, line, quantity) {
    try {
      /* ===== Set loading state ===== */
      this.setLoadingState(lineItem);

      /* ===== If removing, set remove loading state ===== */
      if (quantity === 0) {
        this.setRemoveLoadingState(lineItem);
      }

      /* ===== Update the line item quantity ===== */
      const response = await this.updateLineItem(line, quantity);
      if (!response) return;

      /* ===== Re-render the cart section ===== */
      this.renderCartSection(response);

      /* ===== Update the cart drawer if it exists ===== */
      window.eventBus.emit('update:cart:drawer', response);

      /* ===== Update cart count indicator ===== */
      this.updateCartCountIndicator();

    } catch (error) {
      console.error('Error updating cart:', error);
      this.hideLoadingState(lineItem);
    }
  }

  async updateLineItem(line, quantity) {
    try {
      /* ===== Update line item quantity via cart change API ===== */
      const body = JSON.stringify({
        line,
        quantity,
        sections: this.sectionId
      });

      const response = await fetch(window.routes.cart_change_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body
      });

      const responseText = await response.text();

      if (!responseText) {
        this.handleCartErrors(line);
        return null;
      }

      const parsedResponse = JSON.parse(responseText);

      /* ===== Handle errors ===== */
      if (parsedResponse.errors) {
        this.handleCartErrors(line, parsedResponse.errors);
        return null;
      }

      return parsedResponse;
    } catch (error) {
      console.error('Error updating cart line item:', error);
      return null;
    }
  }

  renderCartSection(response) {
    /* ===== Re-render cart section with updated content from section rendering API ===== */
    const sectionHtml = response.sections?.[this.sectionId];
    if (!sectionHtml) return;

    this.dynamicContentIds.forEach((id) => {
      const selector = `[data-cart-dynamic-content="${id}"]`;
      const updatedContent = this.getContent(sectionHtml, selector);
      const targetElement = this.querySelector(selector);
      
      if (targetElement && updatedContent !== null) {
        targetElement.innerHTML = updatedContent;
      }
    });
  }

  getContent(html, selector) {
    /* ===== Parse HTML and extract content for a specific selector ===== */
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const element = doc.querySelector(selector);
    return element ? element.innerHTML : null;
  }

  handleCartErrors(line, errors) {
    /* ===== Handle cart update errors ===== */
    const lineItem = this.querySelector(`[data-item-index="${line}"]`);
    if (lineItem) {
      this.hideLoadingState(lineItem);
      this.hideRemoveLoadingState(lineItem);
      
      // Reset input to previous value
      const input = lineItem.querySelector('[data-cart-quantity-input]');
      if (input) {
        input.value = input.getAttribute('value');
      }
    }

    /* ===== Display error message ===== */
    if (errors) {
      this.renderErrorMessage(line, errors);
    }
  }

  renderErrorMessage(line, message) {
    /* ===== Display error message for a line item ===== */
    const errorElement = this.querySelector(`[data-cart-error-index="${line}"]`);
    if (!errorElement) return;
    
    errorElement.innerHTML = message;
    errorElement.setAttribute('aria-hidden', 'false');
  }

  async getCart() {
    /* ===== Fetch cart data ===== */
    try {
      const response = await fetch(`${window.routes.cart_url}?view=compare`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching cart: ${error.message}`);
      return null;
    }
  }

  updateCartCountIndicator() {
    /* ===== Update the cart count indicator in the header ===== */
    this.getCart().then(cart => {
      if (cart) {
        window.wetheme.updateCartCount(cart);
      }
    });
  }

  setLoadingState(lineItem) {
    lineItem?.classList.add('is-loading');
  }

  hideLoadingState(lineItem) {
    lineItem?.classList.remove('is-loading');
  }

  setRemoveLoadingState(lineItem) {
    lineItem?.classList.add('is-removing');
  }

  hideRemoveLoadingState(lineItem) {
    lineItem?.classList.remove('is-removing');
  }
}

customElements.define('cart-items', CartItems);

/******/ })()
;