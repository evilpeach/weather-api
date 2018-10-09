const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else {
        reject('Argument must be a number');
      }
    }, 1200);
  });
};

asyncAdd(4, 3).then((res) => {
  console.log('First answer is ', res);
  return asyncAdd(res, 100);
}).then((res) => {
  console.log('last answer is ', res);
}).catch((err) => {
  console.log(err);
});

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Hey! It\'s OK');
//     reject('NO');
//   }, 2000);
// });

// somePromise.then((message) => {
//   console.log('Success: ' , message);
// },(errorMessage) => {
//   console.log('Error: ', errorMessage);
// });