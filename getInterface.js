// var os = require('os');
// var ifaces = os.networkInterfaces();
let IP_ADDRESS ;
// Object.keys(ifaces).forEach(function (ifname) {
//   var alias = 0;

//   ifaces[ifname].forEach(function (iface) {
//     if ('IPv4' !== iface.family || iface.internal !== false) {
//       // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//       return;
//     }

//     if (alias >= 1) {
//       // this single interface has multiple ipv4 addresses
//       console.log("goddamnit docker")
//       console.log(ifname + ':' + alias, iface.address);
//     } else {
//       // this interface has only one ipv4 adress
//       // console.log(ifname, iface.address);
//       IP_ADDRESS = iface.address;
//     }
//     ++alias;
//   });
// });
// I don't feel like trying to figure out how to reliably determine NIC ip as above, so I'll rely on the DNS I have setup
// const dns = require('dns')
// dns.lookup(`<myhost.mynetwork>`, (err, a, f) => { IP_ADDRESS = a})
// console.log(IP_ADDRESS)
// i give up I'll just use a library :'(

module.exports = require('ip').address();