'use strict';

angular.module('scrumPoker.version', [
  'scrumPoker.version.interpolate-filter',
  'scrumPoker.version.version-directive'
])

.value('version', '0.1');
