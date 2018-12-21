import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

export class potagerHome extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <div class="container mt-5 ">
        <p class="text-justify">
        Nous construisons une passerelle pour manger mieux, plus frais et plus responsable.<br />
        Pota'Co sème les graines d’une agriculture durable et locale.<br /><br />

        De plus en plus d'habitants ne se fournissent plus chez les agriculteurs, trop loin de leur domicile.<br />
        Ils se replient sur les rayons de supermarchés aux étals fades, sans saveurs et très éloignés du cycle des saisons.<br /><br />

        En commandant chez nous, vous avez la garantie de consommer responsable.<br />
        Notre fonctionnement en circuit court permet à nos maraîchers et arboriculteurs d’être mieux rémunérés.<br />
        Notre éthique nous impose de régler rapidement nos créances, pour ne pas creuser la trésorerie de nos partenaires.
        </p>
      </div>
    `;  
  }


  static get properties() {
    return {
    };
  }
}


customElements.define('potager-home', potagerHome);