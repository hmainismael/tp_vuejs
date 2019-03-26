const Test = {
	template: '<div>Test {{ $route.params.id }}</div>'
}

const Toto = {
	template: '<div>Toto {{ $route.params.id }} - {{ $route.params.idcomms }}</div>'
}

const routes = [
	{path: '/test/:id', component: Test},
	{path: '/toto/:id/comment/:idcomms', component: Toto}
]

const router = new VueRouter({
	routes : routes
})

const app = new Vue({router})
	.$mount('#app')