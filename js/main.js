const vm = new Vue({
    el: '#app',
    data(){
        return{
            products: [],
            productDetail: false
        }
    },
    filters:{
        currencyType(value){
            return value.toLocaleString("pt-br", {style: "currency", currency: "BRL"})
        }
    },
    methods: {
        fetchProducts(){
            fetch("./api/products.json")
            .then(res => res.json())
            .then(res => this.products = res)
        },
        getProductItem(id){
            fetch(`./api/products/${id}/dados.json`)
            .then(res => res.json())
            .then(res => this.productDetail = res)
        }
    },
    created(){
        this.fetchProducts()
    }
})