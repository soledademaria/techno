const vm = new Vue({
  el: "#app",
  data() {
    return {
      products: [],
      productDetail: false,
      shopProducts: [],
      messageAlert: "",
      activeAlert: false,
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
        this.productDetail.stock > 0 ? "Adicionar Item" : "Produto Esgotado";

      return title;
    },
    totalShop() {
      let total = 0;
      if (this.shopProducts.length) {
        total = this.shopProducts.reduce((acc, item) => {
          return acc + item.price;
        }, 0);
      }
      return total;
    },
  },
  watch: {
    shopProducts() {
      window.localStorage.products = JSON.stringify(this.shopProducts);
    },
  },
  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then((res) => res.json())
        .then((res) => (this.products = res));
    },
    openModal(id) {
      this.getProductItem(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    getProductItem(id) {
      fetch(`./api/products/${id}/dados.json`)
        .then((res) => res.json())
        .then((res) => (this.productDetail = res));
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.productDetail = false;
      }
    },
    addProduct() {
      const { id, name, price } = this.productDetail;
      if (this.productDetail.stock > 0) {
        this.productDetail.stock--;
        this.shopProducts.push({ id, name, price });
        this.alert("Item adicionado!").finally(
          () => (this.activeAlert = false)
        );
      }
    },
    removeProduct(index) {
      this.shopProducts.splice(index, 1);
    },
    checkLocalstorage() {
      if (window.localStorage.products)
        this.shopProducts = JSON.parse(window.localStorage.products);
    },
    alert(message) {
      this.messageAlert = message;
      this.activeAlert = true;
      setTimeout(() => {
        this.activeAlert = false
      }, 900)
    },
  },
  created() {
    this.fetchProducts();
    this.checkLocalstorage();
  },
});
