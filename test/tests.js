/* jshint expr: true */
chai.should();

describe('Schema form', function() {

  describe('directive', function() {
    beforeEach(module('templates'));
    beforeEach(module('schemaForm'));
    beforeEach(module('schemaForm-uiselect'));
    beforeEach(
      //We don't need no sanitation. We don't need no though control.
      module(function($sceProvider) {
        $sceProvider.enabled(false);
      })
    );

    it('should return correct form type for format "uiselect"',function(){
      inject(function($compile,$rootScope, schemaForm){
        var string_schema = {
          type: "object",
          properties: {
            file: {
              type: "string",
            }
          }
        };

        var uiselect_schema = {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "uiselect"
            }
          }
        };

        schemaForm.defaults(string_schema).form[0].type.should.be.eq("text");
        schemaForm.defaults(uiselect_schema).form[0].type.should.be.eq("uiselect");
      });
    });
    it('should return correct form type for format "uimultiselect"',function(){
      inject(function($compile,$rootScope, schemaForm){
        var string_schema = {
          type: "object",
          properties: {
            file: {
              type: "string",
            }
          }
        };

        var uimultiselect_schema = {
          type: "object",
          properties: {
            file: {
              type: "array",
              format: "uiselect"
            }
          }
        };

        schemaForm.defaults(string_schema).form[0].type.should.be.eq("text");
        schemaForm.defaults(uimultiselect_schema).form[0].type.should.be.eq("uimultiselect");
      });
    });

    it('should search by multiple values', inject(function(whereMultiFilter) {
      items = [
        {value: 'aaa'},
        {value: 'abb'},
        {value: 'ccc'}
      ]
      match = [
        {value: 'aaa'},
        {value: 'abb'}
      ]
      result = whereMultiFilter(items, 'value', ['aaa', 'abb']);
      compare = !(result<match || match<result)
      compare.should.be.eq(true);
    }));
  });
});
