ui-select add-on
=================

This ui-select add-on uses as the name implies the ui-select plugin to provide a select dropdown interface. [ui-select](https://github.com/angular-ui/ui-select) is used.

Installation
------------
The editor is an add-on to the Bootstrap decorator. To use it, just include
`schema-form-uiselect.min.js`.

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install chengz/schema-form-uiselect
```

You'll need to load a few additional files to use the editor:

**Be sure to load this projects files after you load angular schema form**

Example

```HTML
<script type="text/javascript" src="/bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src="bower_components/angular-translate/angular-translate.min.js"></script>
<script src='bower_components/angular-ui-select/dist/select.js'></script>
<script src="bower_components/tv4/tv4.js"></script>
<script src="bower_components/objectpath/lib/ObjectPath.js"></script>
<script src="bower_components/angular-schema-form/dist/schema-form.min.js"></script>
<script src="bower_components/angular-schema-form/dist/bootstrap-decorator.min.js"></script>
<script src="schema-form-strapselect.js"></script>
```

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm', 'schemaForm-uiselect']);
```

Usage
-----
The add-on adds a new form type, `uiselect`, and a new default
mapping.

| Schema             |   Default Form type  |
|:-------------------|:------------:|
| "type": "string" and "format": "uiselect"   |   uiselect   |
| "type": "array" and "format": "uiselect"   |   uimultiselect   |

### Schema Definintion
```javascript
person_list: {
  title: 'Person List',
  type: 'string',
  format: 'uiselect',
  items: [
    { value: '1', label: 'Person 1' },
    { value: '2', label: 'Person 2' }
  ]
},
persons_list: {
  title: 'Persons List',
  type: 'array',
  format: 'uiselect',
  items: [
    { value: '1', label: 'Person 1' },
    { value: '2', label: 'Person 2' },
    { value: '3', label: 'Person 3' }
  ]
}
```

Options
-------
The add-on provides only one option to specify a class for select
```javascript
{
  key: 'person_list',
  placeholder: 'Some Place Holder', //default will translate placeholder.select
  options: {
    uiClass: 'short_select'
  }
}
```
