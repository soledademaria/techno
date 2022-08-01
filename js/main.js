const vm = new Vue({
    el: '#app',
    data(){
        return{
            products: []
        }
    },
    methods: {
        fetchProducts(){
            fetch("./api/products.json")
            .then(res => res.json())
            .then(res => this.products = res)
        }
    },
    created(){
        this.fetchProducts()
    }
})