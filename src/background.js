
function updatebadge() {
  $.getJSON("https://api.tenderapp.com/github/discussions/pending", function(data){
    chrome.browserAction.setBadgeText({text: ""+data["total"]})
  })
}

$(function() {
  $.ajaxSetup({"beforeSend": function(xhr) {
      xhr.setRequestHeader("Accept", "application/vnd.tender-v1+json");
      xhr.setRequestHeader("X-Tender-Auth", "6efdae1ad9e459d218a33875ab9369270b620612");
  }});
  setInterval(updatebadge,"60000");
  updatebadge();
});
