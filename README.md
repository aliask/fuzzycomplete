# fuzzycomplete
[![Build Status](https://travis-ci.org/aliask/fuzzycomplete.svg?branch=master)](https://travis-ci.org/aliask/fuzzycomplete)
jQuery plugin for fuzzy search (using Fuse.js) in an autocomplete form, among other things, allowing multiple search keys.

## Examples

### Searching by an abbreviated name, as well as full name

```javascript
var teams = [{"id":1,"name":"M5","longname":"Moscow 5"},{"id":2,"name":"CRS","longname":"Curse"},{"id":3,"name":"FNC","longname":"Fnatic"},{"id":4,"name":"SKT T1","longname":"SK Telecom T1"}];
var fuseOptions = { keys: ["name", "longname"] };

$(document).ready(function(){
  $(".teamPicker").fuzzyComplete(teams, fuseOptions);
}
```