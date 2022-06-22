const vm = new Vue({
    el: '#app',
    data(){
        return{
            products: [],
            product: false
        }
    },
    filters:{
        formatedPrice(value){
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
    },
    methods:{
        fetchProducts(){
            fetch("./api/products.json")
            .then(res => res.json())
            .then(res => {
                this.products = res
            })
        },
        fetchProduct(id){
            fetch(`./api/products/${id}/dados.json`)
            .then(res => res.json())
            .then(res => {
                this.product = res
            })
        }
    },
    created(){
        this.fetchProducts()
    }
})