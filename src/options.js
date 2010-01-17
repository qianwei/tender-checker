
function set_error() {
  var val = localStorage.lastError
  if (val && val != "") {$("#error").text(val)}
  else {$("#error").text("No errors")}
}

$(function() {
  $("#profile").attr("href", "http://" + (localStorage.subdomain || "domain_not_set") + ".tenderapp.com/profile/edit")

  function set_domain() {
    localStorage.subdomain = $("#domain").val()
    $("#profile").attr("href", "http://" + (localStorage.subdomain || "domain_not_set") + ".tenderapp.com/profile/edit")
    chrome.extension.getBackgroundPage().updatebadge()
  }
  $("#domain").val(localStorage.subdomain || "").keypress(set_domain).change(set_domain);

  function set_api() {
    localStorage.apikey = $("#apikey").val()
    chrome.extension.getBackgroundPage().updatebadge()
  }
  $("#apikey").val(localStorage.apikey || "").keypress(set_api).change(set_api)

  set_error()
});