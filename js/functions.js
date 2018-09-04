/* functions.js */

function enableThemeFeatures()
{
    // load all JS and CSS files
    $.each(theme.features, function(key,feature){
        if(feature.enabled === true){
            if(feature.files.length > 0){
                loadThemeFeatureFiles(key);
            }
        }
    });
      
    console.log(themeName + " - feature files is loaded.");
    loadedThemeCSSandJS = true;
}

function loadThemeFeatureFiles(featureName) {
   
    // get file list from theme settings object
    var files = theme.features[featureName].files;
    var arrayLength = files.length;
    for (var i = 0; i < arrayLength; i++) {
        if(files[i].split('.').pop() == "js"){
            console.log("THEME JS - loading javascript for " + featureName + " feature");
            var getviarequire = "../acttheme/js/" + featureName;
            requirejs([getviarequire], function(util) {
                console.log(themeName + " - Javascript loaded by RequireJS");
            });
        }
        if(files[i].split('.').pop() == "css"){
            var CSSfile = "" + baseURL + "/acttheme/css/" + files[i] + "?" + themeName;
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", CSSfile);
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }
}

function unloadThemeFeatureFiles(featureName)
{
    $('head link[href*=' + featureName + ']').remove();
    $('head script[src*=' + featureName + ']').remove();
}

function checkSettingsHTML(){
	$.ajax({type: "GET", url: "../templates/Settings.html", data: { },success: function(){
		console.log(theme.name + " - Found 'Settings.html' in '../www/templates' directory");
		},error: function(){
		console.log("Can't find Settings.html in templates directory. Please copy Setting.html to ../www/templates folder");
		bootbox.alert("<h3>Error!</h3><br/><p>Can't find Settings.html in templates directory.</p><br/><p>If you recently installed this theme. Just copy and paste 'Settings.html' from '../styles/machinon/templates' to '../www/templates' ");
		}
	});
}

function searchFunction() {
	if (document.getElementById("dashcontent") || document.getElementById("lightcontent") || document.getElementById("scenecontent")|| document.getElementById("utilitycontent") || document.getElementById("weatherwidgets") || document.getElementById("tempwidgets")){
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("searchInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("main-view");
	  tr = table.getElementsByTagName("table");
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		tr[i].style.display = "";
	      } else {
		tr[i].style.display = "none";
	      }
	    }       
	  }
   	}	   
}

function DelRow() {
	$('#main-view div.row').each(function(){
		x=$(this).nextAll().children().detach();
		$(this).append(x).nextAll().remove();
		console.log('suppression de multiple row');
	});
}

function locationHashChanged() {
    if ( location.hash === "#/LightSwitches" || "#/DashBoard" ) {
		var changeclass = false;
		observer.disconnect();
		observer.observe(targetedNode, {
			childList: true,
			subtree: true
		});
		
    } else {
			console.log('Page change for: ' + location.hash);
		
    }
}
