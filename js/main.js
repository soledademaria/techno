const vm = new Vue({
  el: "#app",
  data() {
    return {
      products: [],
      productDetail: false,
      dialog: {
        products: {},
      },
      productsInCart: [],
      dialogAlertMessage: '',
      dialogAlertActive: false,
      productIdSelected: 0
    };
  },

  filters: {
    currencyType(value) {
      return value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },

  computed: {
    buttonTitle() {
      let title = "";
      title =
        this.dialog.products.stock > 0 ? "Adicionar item" : "Produto esgotado";
      return title;
    },
    totalProductsPrice() {
      let total = 0;
      if (this.productsInCart.length) {
        total = this.productsInCart.reduce((acc, item) => {
          return acc + item.price;
        }, 0);
      }
      return total;
    },
  },

  watch: {
    productsInCart() {
      window.localStorage.products = JSON.stringify(this.productsInCart);
    },
    productDetail(){
    const productSelected = this.products.find((product) => product.id === this.productIdSelected)
    const hash = productSelected.id || "";
    document.title = productSelected.name || 'Techno'
    history.pushState(null, null, `#${hash}`)
    }
  },

  methods: {
    // requisição dos produtos
    getProducts() {
      fetch("./api/products.json")
        .then((res) => res.json())
        .then((res) => (this.products = res));
    },

    // abrir dialog
    openDialog(id) {
      this.productDetail = true;
      this.productIdSelected = id
      this.getProductItem(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    // requisição dos detalhes do produto clicado
    getProductItem(id) {
      fetch(`./api/products/${id}/dados.json`)
        .then((res) => res.json())
        .then((res) => (this.dialog.products = res));
    },

    // fechar dialog
    closeDialog({ target, currencyTarget }) {
      if (target === currencyTarget) {
        this.productDetail = false;
      }
    },

    // adicionar produto
    addProduct() {
      const { id, name, price } = this.dialog.products;
      if (this.dialog.products.stock > 0) {
        this.dialog.products.stock--;
        this.productsInCart.push({ id, name, price });
        this.alert('Item adicionado ao carrinho!');
      }
    },

    // remover produto
    removeProduct(index) {
      this.productsInCart.splice(index, 1);
    },

    checkLocalstorage() {
      if (window.localStorage.products)
        this.productsInCart = JSON.parse(window.localStorage.products);
    },

    alert(message){
      this.dialogAlertMessage = message;
      this.dialogAlertActive = true;
      setTimeout(() => {
        this.dialogAlertActive = false
      }, 900)
    },

    router(){
      const hash = document.location.hash;
      if(hash){
        this.getProductItem(hash.replace('#', ''))
      }
    }
  },

  created() {
    this.getProducts();
    this.router()
    this.checkLocalstorage();
  },
});
