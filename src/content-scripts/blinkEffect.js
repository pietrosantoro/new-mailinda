window.$ = window.jQuery = require('jquery');

function getActiveFrame() {
    let frame = $('iframe.x-border-panel[src^="https://smbsalesimplementation.my.salesforce.com"]').add('iframe.x-border-panel[src^="/"]').not('iframe.x-border-panel[src*="ResourceCalendar"]').filter(":visible").contents().find("html");
    if (frame.length == 0)
      frame = $("html");
    return frame
  }

/* blinking effect for some of the mandatory fields */
 
 function blinkTheField(){
   
    let iframes = getActiveFrame()
    let element=document.querySelector("#\\30 0N3600000TPtiv_ilecell")

    if(element){
    var text = document.querySelector("#\\30 0N3600000TPtiv_ileinner").innerText.trim()
    if(text){
        var colors = ["red",""];
        var currentIndex = 0;
    
        setInterval(function() {
        document.querySelector("#\\30 0N3600000TPtiv_ilecell").style.cssText = "background-color: " + colors[currentIndex];
        currentIndex++;
        if (currentIndex == undefined || currentIndex >= colors.length) {
            currentIndex = 0;
        }
        }, 1000);
    }
    
    
    }
    var checkTagsStatus = iframes[0].querySelectorAll(".cellCol5")
    //if the ticket is opened in a new window (not in a frame) the class selector is different
    if(checkTagsStatus.length == 0){
      checkTagsStatus = document.querySelectorAll(".dataCell")
    }
    checkTagsStatus.forEach(function(status){
      /* if task satus is still opened, the filed is gonna blink */
      if(status.innerText == "Open"){
        
        var colors = ["red",""];
        var currentIndex = 0;
    
        setInterval(function() {
        status.style.cssText = "background-color: " + colors[currentIndex];
        currentIndex++;
        if (currentIndex == undefined || currentIndex >= colors.length) {
            currentIndex = 0;
        }
        }, 1000);
      }
      })
  }

  blinkTheField()

console.log("blinkEffect.js")