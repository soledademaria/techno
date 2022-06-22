const vm = new Vue({
    el: '#app',
    data(){
        return{
            products: []
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
        }
    },
    created(){
        this.fetchProducts()
    }
})