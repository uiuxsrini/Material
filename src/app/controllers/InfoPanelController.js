(function(){

  angular
    .module('app')
    .controller('InfoPanelController', [
      '$mdDialog',
      InfoPanelController
    ]);

  function InfoPanelController($mdDialog) {
    var vm = this;
  //  vm.bs = {};
    vm.support = true;
    window.navigator = window.navigator || {};

         if (!navigator.battery && !navigator.getBattery) {
            vm.support = false;
         } 
         else {
            var log = document.getElementById('log');
            function updateInfo(battery) {
                vm.incharge = (battery.charging ? 'Yes' : 'No');
                vm.chargingtime = battery.chargingTime;
                vm.dischargingtime =  battery.dischargingTime;
                vm.batterylevel = battery.level;
              
            }

            function addEvents(battery) {
               function eventHandler(event) {
                  log.innerHTML = 'Event "' + event.type + '" fired<br />' + log.innerHTML;
                  updateInfo(event.target);
                 // console.log(event.target);
               }

               var events = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];
               for (var i = 0; i < events.length; i++) {
                  battery.addEventListener(events[i], eventHandler);
               }
            }

            if (navigator.getBattery) {
               navigator.getBattery().then(function(battery) {
                  updateInfo(battery);
                  addEvents(battery);
               });
            } else {
               updateInfo(navigator.battery);
               addEvents(navigator.battery);
            }

          }
          vm.clearlog = function(){
             // document.getElementById('clear-log').addEventListener('click', function() {
              log.innerHTML = '';
            }//);
               
               
       
  }
  

  /*  vm.buttonEnabled = false;
    vm.reloadServer = 'Staging';
    vm.showAlert = showAlert;
    vm.startValue = 0;
    vm.bufferValue = 1;

    function showAlert() {
      vm.startValue = 100;
      vm.bufferValue = 100;
      alert = $mdDialog.alert({
        title: 'Reloading done!',
        content: vm.reloadServer + " server reloaded.",
        ok: 'Close'
      });
      setTimeout(function(){
        $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
        vm.startValue = 0;
        vm.bufferValue = 1;
      }, 500);
    }*/
  

})();
