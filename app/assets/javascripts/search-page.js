$('input[type=submit]').on('click', function(e) {
  var form = $(".form");
  var inputVal = $("#radio-home-address").val();

  if(inputVal == "Yes") {
    navigator.geolocation.getCurrentPosition(function(position) {
      var location = {};
          location.lat = position.coords.latitude;
          location.lng = position.coords.longitude;

      $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+location.lat+','+location.lng+''
        })
        .done(function(data) {
          var town = data.results[4].formatted_address;
              town = town.split(',');
              town = town[0];

          $("#location").val(town);

          form.submit();
        }, function(error) {
          alert('Please enter your location manually');
        });
    });
  } else {
    form.submit();
  }

  e.preventDefault();
});
