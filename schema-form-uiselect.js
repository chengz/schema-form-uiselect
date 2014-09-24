angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/uiselect/multi.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\" ng-init=\"form.select_models=(form.schema.enum | whereMulti : \'value\' : $$value$$)\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div class=\"form-group\">\n    <ui-select multiple ng-model=\"form.select_models\" theme=\"bootstrap\" on-select=\"$$value$$.push($item.value)\" on-remove=\"$$value$$.splice($$value$$.indexOf($item), 1)\">\n      <ui-select-match placeholder=\"{{form.placeholder || \'defaut select\'}}\">{{$item.label}}</ui-select-match>\n      <ui-select-choices repeat=\"item in form.schema.enum | propsFilter: {label: $select.search}\">\n        <div ng-bind-html=\"item.label | highlight: $select.search\"></div>\n      </ui-select-choices>\n    </ui-select>\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n  </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/uiselect/single.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\" ng-init=\"select_models=(form.schema.enum | where : {value: $$value$$})\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div class=\"form-group\">\n    <ui-select ng-init=\"select_model.selected=select_models[0]\" ng-model=\"select_model.selected\" theme=\"bootstrap\" ng-disabled=\"form.disabled\" on-select=\"$$value$$=$item.value\">\n      <ui-select-match placeholder=\"{{form.placeholder || \'defaut select\'}}\">{{select_model.selected.label}}</ui-select-match>\n      <ui-select-choices repeat=\"item in form.schema.enum | propsFilter: {label: $select.search}\">\n        <div ng-bind-html=\"item.label | highlight: $select.search\"></div>\n      </ui-select-choices>\n    </ui-select>\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n  </div>\n</div>\n");}]);
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
