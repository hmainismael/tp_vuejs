var Achats = {
    props: ['items'],
    template:
        `<ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in items" :key="index">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="achete" v-model="item.achete">
                          <label class="form-check-label" for="achete">
                            Acheté
                          </label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <h4>{{ item.nom }}</h4>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group w-50" v-if="item.achete">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Prix</span>
                            </div>
                            <input type="text" class="form-control" v-model="item.prix" v-on:keypress="isNumber($event)">
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" @click="supprimerProduit(index)">X</button>
                </div>    
            </li>
        </ul>`,
    methods: {
        supprimerProduit: function(index) {
            this.items.splice(index, 1)
        },
        isNumber: function(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();;
          } else {
            return true;
          }
        }
    }
}

var app = new Vue({
  el: '#app',
  data: {
    budget: 20,
    produit: '',
    panier: []
  },
  methods: {
    ajouterProduit() {
        if (this.produit) {
            this.panier.push({
                nom: this.produit,
                achete: false,
                prix: 0
            });

            this.produit = '';
        }
    }
  },
  components: {
    Achats
  },
  computed: {
    montantTotal () {
      const reducer = (accumulator, currentValue) => currentValue.achete ? accumulator += parseInt(currentValue.prix) : accumulator;

      return this.panier.reduce(reducer, 0)
    },
    budgetDepasse () {
      return this.budget < this.montantTotal
    }
  }
})