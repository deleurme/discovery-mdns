//                     ____  _                 __ 
//    ____ ___  __  __/ / /_(_)________ ______/ /_
//   / __ `__ \/ / / / / __/ / ___/ __ `/ ___/ __/
//  / / / / / / /_/ / / /_/ / /__/ /_/ (__  ) /_  
// /_/ /_/ /_/\__,_/_/\__/_/\___/\__,_/____/\__/  

// import the module
var mdns = require('mdns');

// advertise a http server on port 4321
var txtRecord = {
    name: 'Helm Discovery Daemon'
  , service: 'helm-node'
};
var ad = mdns.createAdvertisement(
    mdns.tcp('http')
  , 8080
  , {txtRecord:txtRecord});
ad.start();

ad.stop();

// watch all http servers
var browser = mdns.createBrowser(mdns.tcp('http'));
browser.on('serviceUp', function(service) {
  // console.log(service);
  console.log("up:", service.name, service.host, service.port, 
  service.txtRecord ? service.txtRecord : "");
});
browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});
browser.start();

// discover all available service types
var browser = mdns.browseThemAll(); 
browser.on('serviceUp', function(service) {
  console.log("up:", service);
});
// browser.on('serviceDown', function(service) {
  // console.log("down: ", service);
// });
browser.start();
