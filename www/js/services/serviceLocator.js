(function(){

  angular.module('starter')
    .service('serviceLocator', [serviceLocator]);

  function serviceLocator(){

    var serviceList = {
          PayLeService : {
            serviceId:1,
            serviceName:'PayLe Rest',
            serviceUrl:'http://52.77.133.12',
            port:'8080',
            base_url:'/Pay_Web/rest'
          },
          OrganizationService : {
            serviceId:1,
            serviceName:'Organization Service',
            serviceUrl:'http://52.16.0.100',
            port:'8080',
            base_url:'/api'
          }
    };

    var statusList = {
        CREATED : 0,
        PENDING : 1,
        APPROVED : 2,
        CANCELED : 3,
        REVERTED : 4,
        REJECTED : 5,
        SUSPENDED : 6
    };

    return {
      serviceList: serviceList, // revealing module pattern to expose the register method as a public method of RequestsService.
      statusList: statusList // revealing module pattern to expose the register method as a public method of RequestsService.
    };
  }
})();
