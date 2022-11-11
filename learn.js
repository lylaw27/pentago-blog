function delay() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }
  
  async function delayedLog(item) {
    // notice that we can await a function
    // that returns a promise
    let result = item*10;
    // await delay();
    console.log(item);
    return result
  }

  async function processArray(array) {
    for (const item of array) {
      const res = await delayedLog(item);
      console.log('done')
      console.log(res);
    }
    setTimeout(log, 3000)
}

function log(){
    console.log('done')
}

//   async function processArray(array) {
//     for (const item of array) {
//       await delayedLog(item);
//     }
//     console.log('Done!');
//   }
  
  processArray([1, 2, 3]);