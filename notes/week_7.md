# Week 7

## Promises

- Non-blocking JavaScript to avoid slowing the main HTML rendering thread
- 3 States
    - Pending: Running async
    - Fulfilled: Completed successfully
    - Rejected: Failed to complete
- ```JavaScript
    const coinToss = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('success');
        } else {
          reject('error');
        }
      }, 10000);
    });
    
    coinToss
      .then((result) => console.log(`Coin toss result: ${result}`))
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => console.log('Toss completed'));
    ```
    
- You can place multiple calls in the promise "chain" at the end which handle after a promise object is returned.

## Async/Await

- ```JavaScript
    try {
      const result = await coinToss();
      console.log(`Toss result ${result}`);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      console.log(`Toss completed`);
    }
    
    // Equivalent to the chain we saw earlier
    ```
    
- ```JavaScript
    const httpPromise = fetch('https://simon.cs260.click/api/user/me');
    const jsonPromise = httpPromise.then((r) => r.json());
    jsonPromise.then((j) => console.log(j));
    console.log('done');
    
    // OUTPUT: done
    // OUTPUT: {email: 'bud@mail.com', authenticated: true}
    
    // Additionally with blocking and more concise syntax
    const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
    const jsonResponse = await httpResponse.json();
    console.log(jsonResponse);
    console.log('done');
    
    // OUTPUT: {email: 'bud@mail.com', authenticated: true}
    // OUTPUT: done
    ```