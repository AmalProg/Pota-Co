import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import './vegetable-buy.js';

export class potagerDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .potager {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          border-radius: 10px;
          min-height: 150px;
        }
        .back {
          width: 50px;
          height: 50px;
        }
        ul.potager-thumbs {
          margin: 0;
          list-style: none;
        }
        ul.potager-thumbs li {
          border: 1px solid black;
          display: inline-block;
          margin: 1em;
          background-color: white;
        }
        ul.potager-thumbs img {
          height: 100px;
          width: 100px;
          padding: 1em;
        }
        ul.specs {
          clear: both;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        ul.specs > li{
          display: inline-block;
          width: 200px;
          vertical-align: top;
        }
        ul.specs > li > span{
          font-weight: bold;
          font-size: 1.2em;
        }
        ul.specs dt {
          font-weight: bold;
        }
        h1 {
          border-bottom: 1px solid gray;
        }
      </style>
      <div id="[[potager.id]]" class="potager clearfix  mt-5">
        <h1 class="name">[[potager.name]]</h1>
        <p class="description">[[potager.description]]</p>
        <ul class="specs">
          <li>
            <dl>
              <dt>Location</dt>
              <dd>[[potager.location]]</dd>
            </dl>
          </li>
        </ul>
        <div class="mt-5">
          <template 
            id="vegetableList" is="dom-repeat" 
            items="{{potager.vegetables}}">
            <vegetable-buy
              name="[[item.name]]"
              quantity="{{item.quantity}}">
            </vegetable-buy>
          </template>
        </div>
      </div>
      <p class="mx-auto mt-5" style="width: 10rem">
        <button type="button" class="btn btn-success" on-click="onCommand">Command</button>
      </p>
    `;  
  }


  static get properties() {
    return {
      id: {
        type: Number,
        observer: '_onIdChange',
      },
      potager: {
        type: Object,
      },
      potagers: {
        notify: true,
        type: Object,
      },
      vegetableToBuy: {
        notify: true,
        type: Object,
      }
    };
  }

  constructor() {
    super();

    this.vegetableToBuy = {
      "Tomate": 0,
      "Pomme de terre": 0,
      "Courgette": 0,
      "Fraise": 50,
      "Poire": 0,
      }
  }

  _onIdChange() {
    this.potager = this.potagers[this.id.id]; 
  }

  onCommand() {
      for(let i = 0; i < this.potager.vegetables.length; i++) {
        this.potager.vegetables[i].quantity -= this.vegetableToBuy[this.potager.vegetables[i].name]
        this.notifyPath('this.potager.vegetables');
      }
  }
}


customElements.define('potager-detail', potagerDetail);