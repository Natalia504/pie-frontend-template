export const mockCall = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const rand = Math.random();
    if (rand > 0.5) {
      resolve("Resolved!!!");
    }
    reject("Rejected!!!");
  });
