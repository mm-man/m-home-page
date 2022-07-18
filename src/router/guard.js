function init(router) {
    router.beforeEach((to, from) => {
        console.log("beforeEach");
    })

    router.afterEach((to, from) => {
        console.log("afterEach");
    })

}

export default init