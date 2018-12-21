import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class VegetableBuy extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <div class="input-group ml-5">
        <div class="input-group-prepend w-25">
          <span class="input-group-text w-100">[[name]]</span>
        </div>
        <input id="choiceNumberNumber" type="number" class="w-25" placeholder="Number" value=[[choiceNumber]]
          min="0" max="{{quantity}}" on-change="choiceNumberChanged">
        <div class="input-group-prepend w-25">
          <span class="input-group-text w-100">Quantity : {{quantity}}</span>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      choiceNumber: {
        notify: true,
        type: Number,
      },
      quantity: {
        notify: true,
        type: Number,
      },
      name: {
        type: String,
      },
      vegetableToBuy: {
        notify: true,
        type: Array,
      }
    };
  }

  choiceNumberChanged() {
    this.set('choiceNumber',  this.shadowRoot.querySelector("#choiceNumberNumber").value);

    if(this.choiceNumber < 0)
      this.choiceNumber = 0

    if(this.choiceNumber > this.quantity)
      this.choiceNumber = this.quantity
  }

  constructor() {
    super();

    this.choiceNumber = 0
  }
}


customElements.define('vegetable-buy', VegetableBuy);