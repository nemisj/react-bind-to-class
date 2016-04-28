var excludeMethods = [
  /^constructor$/, 
  /^render$/, 
  /^component[A-Za-z]+$/
];

function isExcluded(methodName) {
  return excludeMethods.some(function (reg) {
    return reg.test(method) === false;
  });
}

function bindToClass(scope, methods) {
  var componentName = scope.constructor.toString().match(/^function\s+([a-zA-Z]+)\(/)[1];

  methods.forEach(function(methodName) {
    if (methodName in scope) {
      scope[methodName] = scope[methodName].bind(scope);
    } else {
      throw new Error('Method "' + methodName + '" does not exists in "' + componentName + '"');
    }
  });

  // for debugging purposes only?
  // if (process.env.NODE_ENV != 'production') {
  if (Object.getOwnPropertyNames) {
    var proto = scope.constructor.prototype;

    Object.getOwnPropertyNames(proto).forEach(function(methodName) {
      if (isExcluded(methodName) && methods.indexOf(methodName) === -1) {
        var original = scope[methodName];
        scope[methodName] = function () {
          // test whether the scope is different
          if (this !== scope) {
            var e = 'Warning: Method "' + methodName + '" of "' + componentName + '" is not bound. Bad you!';
            console.warn(e);
          }

          return original.apply(scope, arguments);
        };
      }
    });

  }
  // }
}

module.exports = bindToClass;
