var companies = [
              {"companyName":"Aperture Science"},
              {"companyName":"MomCorp"},
              {"companyName":"Wayne Enterprises"},
              {"companyName":"Umbrella Corp"},
              {"companyName":"Gringotts"},
              {"companyName":"Globex"}
            ];
var airports = [
              {"airportCode":"MEL","cityName":"Melbourne, Australia"},
              {"airportCode":"LAX","cityName":"Los Angeles, USA"},
              {"airportCode":"LHR","cityName":"Heathrow, London"},
              {"airportCode":"HKG","cityName":"Hong Kong"},
              {"airportCode":"NRT","cityName":"Narita, Tokyo, Japan"},
              {"airportCode":"FRA","cityName":"Frankfurt, Germany"}
            ];
var items = [
              {"itemCode":"item3442","itemName":"Bag of doorknobs"},
              {"itemCode":"item3446","itemName":"Blinker fluid"},
              {"itemCode":"item3479","itemName":"Widgets"},
              {"itemCode":"item3495","itemName":"Firefly class transport ship"},
              {"itemCode":"item3400","itemName":"Perpetual motion machine"},
              {"itemCode":"item3454","itemName":"Penrose triangle"}
            ];

var fuseOptions2 = { keys: ["airportCode", "cityName"] };
var options2 = { display: "cityName", key: "airportCode", fuseOptions: fuseOptions2 };

var fuseOptions3 = { keys: ["itemName"] };
var options3 = { display: "itemName", key: "itemCode", fuseOptions: fuseOptions3 };

$(document).ready(function(){
  $("#companyPicker").fuzzyComplete(companies);
  $("#airportPicker").fuzzyComplete(airports, options2);
  $("#itemPicker").fuzzyComplete(items, options3);

  $('input').on('keyup blur', function() {
    $(this).parent().find(".output").html($(this).parent().find("select").val());
  });
});