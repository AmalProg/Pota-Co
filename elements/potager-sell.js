import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import './vegetable.js';

export class potagerSell extends PolymerElement {

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

      <p class="mx-auto mt-5" style="width: 10rem">
        <button type="button" class="btn btn-success" on-click="toggleForm">Add new sell location</button>
      </p>
      <template is="dom-if" if="{{adding}}">
        <div class="card">
          <div class="card-body">
            <form on-submit="addSellForm">
              <div class="form-group">
                <label for="potagerName">Vegetable garden name</label>
                <input type="text" class="form-control" id="potagerName"
                  placeholder="Name" value="{{potager.name::change}}">
              </div>
              <div class="form-group">
                <label for="locationName">Location name</label>
                <input type="text" class="form-control" id="locationName"
                  placeholder="Location" on-input="locationChange">
              </div>
              <div class="form-group">
              <label for="description">Description</label>
                <input type="text" class="form-control" id="description"
                  placeholder="Description" value="{{potager.description::change}}">
              </div>
              <button type="button" class="btn btn-success" on-click="addSell">Validate</button>
            </form> 
          </div>
        </div>
      </template>

      <div class="card">
        <div class="card-body">
          <div id="[[id]]" class="potager clearfix mt-5">
            <p><h2 class="el-name">[[potagers.0.name]]</h2></a>
            <p class="el-description">[[potagers.0.description]]</p>
            <p class="float-right el-location">[[potagers.0.location]]</p>
            <div class="mt-5">
              <template 
                id="vegetableList" is="dom-repeat" 
                items="[[potagers.0.vegetables]]">
                <vegetable-item
                  name="[[item.name]]" 
                  quantity="{{item.quantity}}">
                </vegetable-item>
              </template>
            </div>
          </div>
        </div>
      </div>
    `;
  }


  static get properties() {
    return {
      potagers: {
        notify: true,
        type: Array,
      },
      adding: {
        type: Boolean,
      },
      potager: {
        notify: true,
        type: Object,
      },
    };
  }

  constructor() {
    super()

    this.potager = {
      "name": "",
      "location": "",
      "description": "No description",
      "id": "",
      "vegetables": [
            {
                "name": "Tomate",
                "quantity": 0
            },
            {
                "name": "Pomme de terre",
                "quantity": 0
            },
            {
                "name": "Courgette",
                "quantity": 0
            },
            {
                "name": "Fraise",
                "quantity": 0
            },
            {
                "name": "Poire",
                "quantity": 0
            }
        ]
    }
  }

  descrChange() {
    console.log(this.potager.description)
  }

  addSell() {
    console.log(this.potagers)
    this.push('potagers', ({"name": this.potager.name, "location": this.potager.location,
                    "description": this.potager.description, "id": this.potagers[this.potagers.length-1].id + 1,
                    "vegetables": this.potager.vegetables}))
  
    this.adding = false;
  }

  locationChange() {
    this.potager.location = this.shadowRoot.querySelector("#locationName").value;
  }

  toggleForm() {
    this.adding = !this.adding
  }
}


customElements.define('potager-sell', potagerSell);