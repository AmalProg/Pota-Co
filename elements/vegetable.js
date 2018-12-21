import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class Vegetable extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <div class="input-group ml-5">
        <div class="input-group-prepend w-25">
          <span class="input-group-text w-100">[[name]]</span>
        </div>
        <input id="quantityNumber" type="number" class="w-25" placeholder="Number" value={{quantity::change}}
          min="0" max="999999" on-change="quantityChanged">
      </div>
    `;
  }


  static get properties() {
    return {
      quantity: {
        notify: true,
        type: Number,
      },
      name: {
        type: String,
      }
    };
  }

  quantityChanged() {
    this.quantity = this.shadowRoot.querySelector("#quantityNumber").value;
    if(this.quantity < 0)
      this.quantity = 0
  }

  constructor() {
    super();
  }
}


customElements.define('vegetable-item', Vegetable);