var excludeMethods = [
  /^constructor$/, 
  /^render$/, 
  /^component[A-Za-z]+$/,
  /^shouldComponentUpdate$/
];

var displayNameReg = /^function\s+(_?[a-zA-Z]+)/;

function isExcluded(methodName) {
  return excludeMethods.some(function (reg) {
    return reg.test(methodName) === false;
  });
}

function bindToClass(scope, methods) {
  var componentName = scope.constructor.toString().match(displayNameReg)[1];
  methods = Array.isArray(methods) ? methods : [];

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
      var original = scope[methodName];
      if (typeof original === 'function' && isExcluded(methodName) && methods.indexOf(methodName) === -1) {
        scope[methodName] = function () {
          // test whether the scope is different
          if (this !== scope) {
            var e = 'Warning: Method "' + methodName + '" of "' + componentName + '" is not bound. Bad you!';
            console.error(e);
          }

          return original.apply(scope, arguments);
        };
      }
    });

  }
  // }
}

module.exports = bindToClass;
