var travelModes = new Object(),
    directionsService,
    directionsDisplay;

var modes = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'];

var data = {
  'DRIVING': {
    'name': 'Driving',
    'body': 'drive',
    'class': 'fa fa-car'
  },
  'WALKING': {
    'name': 'Walking',
    'body': 'walk',
    'class': 'fa fa-male'
  },
  'BICYCLING': {
    'name': 'Bicycling',
    'body': 'cycle',
    'class': 'fa fa-bicycle'
  },
  'TRANSIT': {
    'name': 'Transit',
    'body': 'on public transport',
    'class': 'fa fa-train'
  }
};

function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay)
};

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  for(var i = 0; i < modes.length; i++) {
    directionsService.route({
      origin: userLocation,
      destination: jobLocation,
      travelMode: google.maps.TravelMode[modes[i]],
      unitSystem: google.maps.UnitSystem.METRIC
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        travelModes[response.request.travelMode] = response;
        renderType(response.request.travelMode, response.routes[0].legs[0])

        if(response.request.travelMode == 'DRIVING') {
            loadMapMode('DRIVING');
        };
       } else {
         window.alert('Directions request failed due to ' + status);
       }
    });
  }
};

function renderType(mode, body) {
  var elm = document.createElement('div');
        var anchor = document.createElement('a');
        anchor.setAttribute('data-mode', mode);
        anchor.setAttribute('href', '#');
        anchor.className = 'map-mode';
        anchor.innerHTML = body.duration.text;
        var icon = document.createElement('i');
        icon.className = data[mode].class;
        var span = document.createElement('span');
          span.className = 'font-xsmall';
          span.innerHTML = ' via '+data[mode].body+'';
        anchor.appendChild(span);
      elm.appendChild(icon);
      elm.appendChild(anchor);


  document.getElementById('response').appendChild(elm);
};

function loadMapMode(mode) {
  directionsDisplay.setDirections(travelModes[mode]);
}

$('body').on('click', '.map-mode', function(e) {
  e.preventDefault();
  var $this = $(this);

  loadMapMode($this.data('mode'));
});
