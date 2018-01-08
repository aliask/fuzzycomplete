# fuzzycomplete [![Build Status](https://travis-ci.org/aliask/fuzzycomplete.svg?branch=master)](https://travis-ci.org/aliask/fuzzycomplete)

jQuery plugin for fuzzy search in an autocomplete form, which uses [Fuse.js](https://github.com/krisk/Fuse).

By harnessing the flexibility Fuse.js, this plugin allows you to do cool stuff, like multiple search keys, case sensitivity selection, customized result ordering, etc. Oh and fuzzy searching, obviously.

## Usage

Fuzzycomplete replaces the selected `<input>` element with a similarly named `<select>` within a HTML form.

The `<input>` field is still visible, and the `<select>` is not displayed, giving the user the ability to free-type their selection before being presented with a list of valid options.

The simplest usage of the plugin is to simply call the plugin on your jQuery selected elements with one parameter, a JSON encoded list of elements to autocomplete.

## Options

`display` (type: `String`)

Defines which property of the supplied JSON data will be used as the displayed text.

`key` (type: `String`)

Defines which property of the supplied JSON data will be used as the `value` parameter for the hidden `<select>` element.

`resultsLimit` (type: `Integer`)

Defines the maximum number of results to display at a time.

`fuseOptions` (type: `Object`)

See the [Fuse.js github](https://github.com/krisk/Fuse) for full documentation.

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
