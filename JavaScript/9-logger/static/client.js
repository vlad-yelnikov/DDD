'use strict';
// console.log(1);
// const socket = new WebSocket('ws://127.0.0.1:8001/');

// const buildAPI = (methods) => {
//   const api = {};
//   for (const method of methods) {
//     api[method] = (...args) => new Promise((resolve, reject) => {
//       const url = `/api/${method}`;
//       // console.log(url, args);
//       fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(args),
//       }).then((res) => {
//         const { status } = res;
//         if (status !== 200) {
//           reject(new Error(`Status Code: ${status}`));
//           return;
//         }
//         resolve(res.json());
//       });
//     });
//   }
//   return api;
// };

const scaffold = (url, structure) => {
  console.log(2);
  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = (id, ...args) => new Promise((resolve, reject) => {
        const path = `${url}/${serviceName}/${methodName}/${id}`;
        console.log(args);
        console.log(JSON.stringify(args));
        fetch(path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args),
          params: args,
        }).then((res) => {
          const { status } = res;
          if (status !== 200) {
            reject(new Error(`Status Code: ${status}`));
            return;
          }
          resolve(res.json());
        });
      });
    }
  }
  return api;
};
// console.log(3);
const api = scaffold('http://127.0.0.1:8001', {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});
// console.log(4);
// socket.addEventListener('open', async () => {
//   const data = await api.user.read(3);
//   console.dir({ data });
// });
