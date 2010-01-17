
function set_error(new_value) {
  localStorage.lastError = new_value
  if (new_value != "") {chrome.browserAction.setBadgeText({text: "ERR"})}
  $.each(chrome.extension.getViews(), function (i, view) {
    if (view.location.pathname == "/options.html") {view.set_error(new_value)}
  })
  return false
}


function validate_settings() {
  if (!localStorage.subdomain || localStorage.subdomain == "") {return set_error("Subdomain not set")}
  else if (!localStorage.apikey || localStorage.apikey == "") {return set_error("API key not set")}
  else {
    $.ajaxSetup({"beforeSend": function(xhr) {
      xhr.setRequestHeader("Accept", "application/vnd.tender-v1+json")
      xhr.setRequestHeader("X-Tender-Auth", localStorage.apikey)
    }});
    return true
  }
}


function updatebadge() {
  if (validate_settings()) {
    $.getJSON("https://api.tenderapp.com/" + localStorage.subdomain + "/discussions/pending", function(data){
      chrome.browserAction.setBadgeText({text: ""+data["total"]})
      set_error("")
    })
  }
}


function firstupdate() {
  if (validate_settings()) {
    $.getJSON("https://api.tenderapp.com/" + localStorage.subdomain + "/", function(data){localStorage.fulldomain = data["html_href"]})
    updatebadge()
  }
}

function inbox() {
  if (localStorage.lastError) {
    chrome.tabs.create({url: "options.html"})
  } else {
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
      var found = false
      $.each(tabs, function (i, tab) {
        if (tab.url && (new RegExp(localStorage.fulldomain)).test(tab.url)) {
          chrome.tabs.update(tab.id, {selected: true});
          found = true;
          return false;
        }
      })
      if (!found) {chrome.tabs.create({url: localStorage.fulldomain + "/dashboard"})}
    });
  }
}


$(function() {
  $("body").ajaxError(function(event, request, settings) {
    console.log(event, request, settings)
    set_error(request.statusText + "  " + request.responseText)
  });

  setInterval(updatebadge,"60000");
  firstupdate();

  chrome.browserAction.onClicked.addListener(function(tab) {inbox()});
});
