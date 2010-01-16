
function updatebadge() {
  $.getJSON("https://api.tenderapp.com/github/discussions/pending", function(data){
    chrome.browserAction.setBadgeText({text: ""+data["total"]})
  })
}

function inbox() {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    var found = false
    $.each(tabs, function (i, tab) {
      if (tab.url && (/\/\/support\.github\.com\//).test(tab.url)) {
        chrome.tabs.update(tab.id, {selected: true});
        found = true;
        return false;
      }
    })
    if (!found) {chrome.tabs.create({url: "http://support.github.com/"})}
  });
}

$(function() {
  $.ajaxSetup({"beforeSend": function(xhr) {
      xhr.setRequestHeader("Accept", "application/vnd.tender-v1+json");
      xhr.setRequestHeader("X-Tender-Auth", "6efdae1ad9e459d218a33875ab9369270b620612");
  }});

  setInterval(updatebadge,"60000");
  updatebadge();

  chrome.browserAction.onClicked.addListener(function(tab) {inbox()});
});
