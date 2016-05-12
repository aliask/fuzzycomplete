# fuzzycomplete
[![Build Status](https://travis-ci.org/aliask/fuzzycomplete.svg?branch=master)](https://travis-ci.org/aliask/fuzzycomplete)
jQuery plugin for fuzzy search (using Fuse.js) in an autocomplete form, among other things, allowing multiple search keys.

## Examples

### Basic Usage

Fuzzycomplete can be called with no options, simply with the data to be searched via jQuery.

In this case it will search all fields supplied within the JSON data, displaying and outputting the first key.

#### Code

```javascript
var companies = [
        {"companyName":"Aperture Science"},
        {"companyName":"MomCorp"},
        {"companyName":"Wayne Enterprises"},
        {"companyName":"Umbrella Corp"},
        {"companyName":"Gringotts"},
        {"companyName":"Globex"}
      ];

$(document).ready(function(){
  $("#companyPicker").fuzzyComplete(companies);
});
```

### Advanced usage

#### Searching multiple sets of data

You might have a set of data which has two (or more) ways of referring to a particular item.

An example might be airports, which have:

- City Name
- Airport Code

To help users, you can allow them to search by either type.

##### Code

```javascript
var airports = [
                {"airportCode":"MEL","cityName":"Melbourne, Australia"},
                {"airportCode":"LAX","cityName":"Los Angeles, USA"},
                {"airportCode":"LHR","cityName":"Heathrow, London"},
                {"airportCode":"HKG","cityName":"Hong Kong"},
                {"airportCode":"NRT","cityName":"Narita, Tokyo, Japan"},
                {"airportCode":"FRA","cityName":"Frankfurt, Germany"}
              ];
var fuseOptions = { keys: ["airportCode", "cityName"] };
var options = { display: "cityName", key: "airportCode", fuseOptions: fuseOptions };

$(document).ready(function(){
  $("#airportPicker").fuzzyComplete(airports, options);
}
```

#### Non-searchable output

You might use an internal value to track items (a database key, for example), but you don't wish for this value to be searchable. Only fields in the "keys" section of fuseOptions will be searched, so simply omit fields you don't wish to be searched.

##### Code

```javascript
var items = [
              {"itemCode":"item3442","itemName":"Bag of doorknobs"},
              {"itemCode":"item3446","itemName":"Blinker fluid"},
              {"itemCode":"item3479","itemName":"Widgets"},
              {"itemCode":"item3495","itemName":"Firefly class transport ship"},
              {"itemCode":"item3400","itemName":"Perpetual motion machine"},
              {"itemCode":"item3454","itemName":"Penrose triangle"}
            ];
var fuseOptions = { keys: ["itemName"] };
var options = { display: "itemName", key: "itemCode", fuseOptions: fuseOptions };

$(document).ready(function(){
  $("#itemPicker").fuzzyComplete(items, options);
});
```