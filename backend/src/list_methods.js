const dbus = require('dbus-next');
const bus = dbus.systemBus();

async function listMethods() {
  const service = await bus.getProxyObject('net.reactivated.Fprint', '/net/reactivated/Fprint/Device/0');
  const iface = service.getInterface('net.reactivated.Fprint.Device');
  
  console.log(iface.$methods);
}

listMethods().catch(console.error);
