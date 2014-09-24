angular.module('schemaForm-uiselect', ['schemaForm', 'ui.select']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var uiselect = function(name, schema, options) {
      if (schema.type === 'string' && schema.format == 'uiselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'uiselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(uiselect);

    var uimultiselect = function(name, schema, options) {
      if (schema.type === 'array' && schema.format == 'uiselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'uimultiselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };
    schemaFormProvider.defaults.array.unshift(uimultiselect);


  //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselect',
    'directives/decorators/bootstrap/uiselect/single.html');
    schemaFormDecoratorsProvider.createDirective('uiselect',
    'directives/decorators/bootstrap/uiselect/single.html');
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uimultiselect',
    'directives/decorators/bootstrap/uiselect/multi.html');
    schemaFormDecoratorsProvider.createDirective('uimultiselect',
    'directives/decorators/bootstrap/uiselect/multi.html');
  }])
  .filter('whereMulti', function() {
    return function(items, key, values) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          for (var i = 0; i < values.length; i++) {
            if (item[key] == values[i]) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  })
  .filter('propsFilter', function() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  });
