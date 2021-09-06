export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        if (process.client) {
            const token = sessionStorage.getItem('Authorization');
            if (to.path == "/login") {
                if (token != 'null' && token != null) {
                    next('/deviceResource/resource');
                } else {
                    next();
                }
            } else {
                if (token != 'null' && token != null) {
                    next();
                }
                else {
                    next("/login");
                }
            }
            if(to.path =="/deviceResource") {
                next('/deviceResource/resource');
            }  
            if(to.path =="/panoramicMonitoring") {
                next('/panoramicMonitoring/deviceOnlineMonitoring/center');
            } 
            if(to.path =="/system") {
                next('/system/person');
                
            }   
            if(to.path =="/transportationInspection") {
                next('/transportationInspection/patrol/inspectionCycle');
                
            }   
        }

    });
}