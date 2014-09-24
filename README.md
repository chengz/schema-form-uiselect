ng-flow add-on
=================

This ng-flow add-on uses as the name implies the ng-flow plugin to provide a file upload interface. [ng-flow](https://github.com/flowjs/ng-flow) is used.

This add-on takes an options object via `flowOptions` in the form. More info below at [Options](#Options).

Installation
------------
The editor is an add-on to the Bootstrap decorator. To use it, just include
`schema-form-ngflow.min.js`.

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install chengz/schema-form-ngflow
```

You'll need to load a few additional files to use the editor:

**Be sure to load this projects files after you load angular schema form**

Example

```HTML
<script type="text/javascript" src="/bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src="bower_components/ng-flow/dist/ng-flow-standalone.js"></script>
<script src="bower_components/tv4/tv4.js"></script>
<script src="bower_components/objectpath/lib/ObjectPath.js"></script>
<script src="bower_components/angular-schema-form/dist/schema-form.min.js"></script>
<script src="bower_components/angular-schema-form/dist/bootstrap-decorator.min.js"></script>
<script src="schema-form-ngflow.js"></script>
```

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm', 'schemaForm-ngflow']);
```

Usage
-----
The add-on adds a new form type, `ngflow`, and a new default
mapping.

| Schema             |   Default Form type  |
|:-------------------|:------------:|
| "type": "string" and "format": "ngflow"   |   ng-flow   |


Options
-------
The `ng-flow` form takes one option, `flowOptions`. This is an object with any
and all options availible to tinymce.

### Example
This example replaces the standard toolbar with one we choose.

```javascript
{
  "key": "invitation",
  "flowOptions": {
    "dropEnabled": false,
    "fileSuccess": "uploaded()"
  }
},
```
