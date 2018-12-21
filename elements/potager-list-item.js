// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class potagerListItem extends PolymerElement {

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
        .el-location {
          clear: both;
        }
      </style>
      <div id="[[id]]" class="potager clearfix  mt-5">
        <a href="#/potager/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-location">[[location]]</p>
      </div>
    `;
  }

  static get properties() {
    return {
      id: {
        type: Number,
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      location: {
        type: String,
      },
    }
  }
}

// Associate the new class with an element name
customElements.define('potager-list-item', potagerListItem);