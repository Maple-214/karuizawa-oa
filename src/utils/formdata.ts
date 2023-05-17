export const objectToArray = (obj: {}): Array<any> =>  Object.entries(obj).map(([key, value]) => ({ key, value }))


