
function IllegalAPIException(name) {
  this.message = "No Such API [" + name + "]";
  this.name = 'IllegalAPIException';
}

var we = new Proxy(wx, {
  get: function (target, propKey, receiver) {
    if (propKey in target) {
      return function (obj) {
        return new Promise((resolve, reject) => {
          obj = obj || {}
          obj.success = (res) => {
            resolve(res)
          }
          obj.fail = (error) => {
            reject(error)
          }
          target[propKey](obj)
        })
      }
    } else {
      throw new IllegalAPIException(propKey);
    }
  }
})
export default we