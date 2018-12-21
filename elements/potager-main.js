import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import './potager-list';
import './potager-detail';
import './potager-home';
import './potager-sell';

export class PotagerMain extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .background {
          padding-bottom: 200px;
          background-image: url("/data/images/background.png");
          background-position: center bottom;
          background-repeat:no-repeat;
          background-size: 100% 100px;

        }
        .activated {
          color: #fff;
          background-color: #28a745;
          border-color: #28a745;
        }
      </style>

      <header>
        <h1 class="text-center">Pota'Co</h1>
        <ul class="nav nav-pills justify-content-center">
          <li class="nav-item">
            <a class="nav-link bg-success" id="homeNav" href="#/home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="buyNav" href="#/buy">Buy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="sellNav" href="#/sell">Sell</a>
          </li>
        </ul>
      </header>

      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route route="[[route]]" pattern="/home" active="{{potagerHomeActive}}"></app-route>
      <app-route route="[[route]]" pattern="/sell" active="{{potagerSellActive}}"></app-route>
      <app-route route="[[route]]" pattern="/buy" active="{{potagerBuyActive}}"></app-route>
      <app-route route="[[route]]" pattern="/potager/:id" data={{potagerId}} active="{{potagerIdActive}}"></app-route>
      
      <div class="background">
        <template is="dom-if" if="{{potagerHomeActive}}">
          <potager-home></potager-home>
        </template> 

        <template is="dom-if" if="{{potagerSellActive}}">
          <potager-sell potagers={{potagers}}></potager-sell>
        </template>

        <template is="dom-if" if="{{potagerBuyActive}}">
          <potager-buy potagers={{potagers}}></potager-buy>
        </template>

        <template is="dom-if" if="{{potagerIdActive}}">
          <potager-detail potagers={{potagers}} id={{potagerId}}></potager-detail>
        </template>
      </div>
    `;
  }


  static get properties() {
    return {
      potagerHomeActive: {
        type: Boolean,
        observer: "navUpdate"
      },
      potagerSellActive: {
        type: Boolean,
        observer: "navUpdate"
      },
      potagerBuyActive: {
        type: Boolean,
        observer: "navUpdate"
      },
      potagerId: {
        tpe: Number,
      },
      route: {
        type: Object,
      },
      potagers: {
        notify: true,
        type: Array,
      },
    };
  }

  constructor() {
    super();

    this._getData();
  }

  async _getData() {
    try {
      const response = await fetch('/data/potagers-list.json');
      this.potagers = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  navUpdate() {
    var shadowroot = document.querySelector("potager-main").shadowRoot;

    if(this.potagerHomeActive)
      shadowroot.querySelector("#homeNav").className = "nav-link activated"
    else
      shadowroot.querySelector("#homeNav").className = "nav-link"

    if(this.potagerSellActive)
      shadowroot.querySelector("#sellNav").className = "nav-link activated"
    else
      shadowroot.querySelector("#sellNav").className = "nav-link"

    if(this.potagerBuyActive)
      shadowroot.querySelector("#buyNav").className = "nav-link activated"
    else
      shadowroot.querySelector("#buyNav").className = "nav-link"
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.route.path) {
      this.route = { ... this.route, path: '/home' }
    }
  }
}


customElements.define('potager-main', PotagerMain);