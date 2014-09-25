/*global angular */
'use strict';

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var app = angular.module('app', ['angular-underscore/filters', 'schemaForm-uiselect', 'pascalprecht.translate'])
.controller('SelectController', function($scope){
  $scope.schema = {
    type: 'object',
    title: 'Select',
    properties: {
      name: {
        title: 'Name',
        type: 'string'
      },
      select: {
        title: 'Single Select',
        type: 'string',
        format: 'uiselect',
        description: 'Only single item is allowd',
        enum: [
          { value: 'one', label: 'label1'},
          { value: 'two', label: 'label2'},
          { value: 'three', label: 'label3'}
        ]
      },
      select2: {
        title: 'Single Select',
        type: 'string',
        format: 'uiselect',
        description: 'Only single item is allowd',
        enum: [
          { value: 'one', label: 'label1'},
          { value: 'two', label: 'label2'},
          { value: 'three', label: 'label3'}
        ]
      },
      multiselect: {
        title: 'Multi Select',
        type: 'array',
        format: 'uiselect',
        description: 'Multi single items arre allowd',
        enum: [
          { value: 'one', label: 'label1'},
          { value: 'two', label: 'label2'},
          { value: 'three', label: 'label3'}
        ]
      },
      another: {
        title: 'Multi Select 2',
        type: 'array',
        format: 'uiselect',
        description: 'Multi single items arre allowd',
        default: [],
        enum: [
          { value: 'one', label: 'labelx'},
          { value: 'two', label: 'labelc'},
          { value: 'three', label: 'label3'}
        ]
      }
    }
  };
  $scope.form = [
    'name',
     {
       key: 'select',
       options: {
         uiClass: 'short'
       }
     },
     {
       key: 'select2'
     },
     {
       key: 'another'
     },
     {
       key: 'multiselect'
     },
     {
        type: "submit",
        style: "btn-info",
        title: "OK"
      }
  ];
  $scope.model = {
    select: 'three',
    multiselect: ['one', 'three']
  };
  $scope.submitted = function(form){
    console.log($scope.model);
  };
});
