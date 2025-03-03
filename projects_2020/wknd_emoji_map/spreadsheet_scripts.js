
// Client ID and API key from the Developer Console
var CLIENT_ID = "973527401705-9ors538g0aoua3beupp29b6a3t4lb84b.apps.googleusercontent.com";
var API_KEY = "AIzaSyAQqWoI7xhE5-K5sGD7HIVNmNCoWF9k_4U";
    
var SPREADSHEET_ID = "1zD2lO7d-Cbyoh3xifTg07OzctNeulwcTNMlK4C7ke6k"; //from the URl for the spreadhseet https://docs.google.com/spreadsheets/d/1zD2lO7d-Cbyoh3xifTg07OzctNeulwcTNMlK4C7ke6k/edit#gid=0

var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets"; //maybe authorize it to do more


/**
 *  On load, called to load the auth2 library and API client library.
 */
function init() {
    gapi.load('client:auth2', function() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(loadData, function (error) { console.log(error) });
    });
}


function loadData() {
    console.log(gapi)
    gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'coords!A2:C1500',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            data = range.values.filter((item) => {

                item.filter((el) => el != "")      
                if (item.length == 0){
                    return false
                } else {
                    return true
                }
            })
            locations = data
            console.log("recieved")
          } 
          build_map_icons() //build the map icons, either the ones loaded or the ones that are used as defaults
        }, function(response) {
          console.log('Error: ' + response.result.error.message);
        });
}

function add_to_gsheet(new_entry) {
    console.log(gapi)
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'coords!A2',
        validInputOption: 'USER_ENTERED',
        resource: {
            values: [
                new_entry
            ]
        }
    }).then(() => console.log("updated"), (err) => console.log(err));
}


    