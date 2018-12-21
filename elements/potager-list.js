import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Import template repeater
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

import './potager-list-item.js';

export class potagerBuy extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      
      <div class="potagers container">
        <div class="row">
          <div class="col-md-3">
            <!--Sidebar content--> 
            <div class="form-group">
              <label for="search">Search</label>
              <input 
                  type="text" 
                  class="form-control" 
                  id="search"  
                  placeholder="Enter search"
                  on-input="_inputChange">
              <label for="sort" class="mt-3">Sort by</label>
              <select 
                  id="sort" 
                  class="form-control"
                  on-change='_sortingChanged'>
                <template is="dom-repeat" items="[[criteria]]">
                  <option 
                      value="[[item.name]]">
                    [[item.label]]
                  </option>
                </template>
              </select>
              <label for="descending" class="mt-3">Descending sort</label>
              <input 
                  id="descending" 
                  type="checkbox" 
                  on-change="_descendingChange">
            </div>
          </div>
          <div class="col-md-9">
            <div class="potagers">
              <template
                  id="potagerList" is="dom-repeat" 
                  items="[[potagers]]" filter="_potagerFilter" sort="_potagerSorter">
                <potager-list-item
                    id="[[item.id]]"
                    name="[[item.name]]" 
                    description="[[item.description]]"
                    location="[[item.location]]">
                </potager-list-item>
              </template>
            </div>
            <div>Number of potagers in list: [[currentpotagers]]</div>
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
      filterText: {
        type: String,
      },
      currentpotagers: {
        type: String,
        computed: '_getCurrentPotagers(potagers, filterText)',
      },
      criterium: {
        type: String,
      },
      descendingSort: {
        type: Boolean,
      }
    }
  }

  _inputChange() {
    this.filterText = this.$.search.value;
    this.$.potagerList.render();
  }

  _sortingChanged() {
    this.criterium = this.$.sort.selectedOptions["0"].value;
    this.$.potagerList.render();
  }

  _descendingChange() {
    this.descendingSort = this.$.descending.checked;
    this.$.potagerList.render();
  }

  _potagerFilter(item) {
      return item.name.match(new RegExp(this.filterText, 'i'));
  }

  _potagerSorter(a, b) {
    var invert = 1;
    if (this.descendingSort) invert = -1;
    if ( a[this.criterium] === b[this.criterium] ) return "0";
    if ( a[this.criterium] < b[this.criterium] ) return -1*invert;
    if ( a[this.criterium] > b[this.criterium] ) return 1*invert;         
  }

  _getCurrentPotagers() {
    return this.potagers.filter((item) => item.name.match(new RegExp(this.filterText, 'i'))).length;
  }

  constructor() {
    super();

    this.criteria = [
      { name: "name", label: "Alphabetical"},
      { name: "location", label: "location" }
    ];

    this.criterium = this.criteria["0"].name;
  }
}

customElements.define('potager-buy', potagerBuy);