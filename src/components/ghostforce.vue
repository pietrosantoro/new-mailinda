<template>
     <div id='ghostforceComponent'>

<!-- Ghost icon   -->
     <div class='icon'>

       <h1><img src="../images/ghost_icons/ghost.png">Ghosting</h1>
       <div :class="['row_icon', { graybtn: ghostforce_active == false}]">
        <a v-for=" (img,key) in ghost_images" :key="key"   @click='ghost(img.name)' href="#" :class="['tool', {graybtn: ghostforce_active == true && img.name == 'Merchant Center' && !all_salesforce_fields['MC-ID']} ]">
          <span class='tip'>{{img.name}}</span>
          <img class='quickbtn' :src='img.src'>
        </a>
       </div>

       <div class="row_icon" v-if="ghostforce_active">


        <a v-if="this.current_subject == 'Tag Implementation' "  href="#" class='tool'>
           <span class='tip'>Tag Implementation</span>
           <img class='quickbtn' src='../images/ghost_icons/price-tag.png'>
         </a>
         <a v-if="this.current_subject == 'Shopping Campaign' " href="#" class='tool'>
           <span class='tip'>Shopping Campaign</span>
           <img class='quickbtn' src='../images/ghost_icons/business.png'>
         </a>
       
         <a v-if="this.current_program == 'Scaled' "  href="#" class='tool'>
           <span class='tip'>Scaled</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-scaled.svg'>
         </a>
         <a v-if="this.current_program == 'High Touch' " href="#" class='tool'>
           <span class='tip'>High Touch</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-high-touch.svg'>
         </a>

          <a v-if="this.current_level == 'L1' "  href="#" class='tool'>
           <span class='tip'>Level 1</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-level-1.png'>
         </a>
         <a v-if="this.current_level == 'L2' " href="#" class='tool'>
           <span class='tip'>Level 2</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-level-2.png'>
         </a>

       </div>


      </div>

<!-- End Ghost icon   -->

<!-- Task info   -->

      <div class='task_info' v-if="ghostforce_active">
        <h1><img src="../images/ghost_icons/completed-task.png">Task info</h1>
        <div class="line_info">
        
        <div v-for="task in this.all_task" class="task" :class="task['Status']">
            <b>{{ task["Task_Type"] }}</b>
           <div id="task-comment"v-if="task['Special_instructions']">{{ task['Special_instructions'] }}</div>
          </div>
        </div>
        <!-- Bad leads section   -->

        <button type="button" class="call_button call_button_modifier" data-toggle="collapse" data-target="#lead">
          <b>Bad Leads Report</b>
          <i class="fas fa-angle-down"></i>
        </button>
        <br>
        <div id="lead" class="collapse">
          <p v-for="badLead in bad_leads" @click='lead($event,badLead)' class="call_button"><span class='tip'>Click to fill</span>{{badLead}}</p>
          
        </div>
        


<!-- End of bad leads section   -->
        
      </div>

<!-- End Task info   -->

<!-- Contact info   -->


      <div class='detail_info' v-if="ghostforce_active">


          <h1><img src="../images/ghost_icons/phonebook2.png">Contact info</h1>

          <div v-for="contact in all_salesforce_fields['Case_Contacts']" class="line_info">
            <img src="../images/ghost_icons/dot7.png">
            <b>{{contact['Contact_Type']}}: </b>
            
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='clientname' @click="copy_text(contact['Contact'])"> {{ contact['Contact'] }} </div>
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='clientmail' @click="copy_text(contact['Contact_Email'])"> {{ contact['Contact_Email'] }} </div>
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='clientphone' @click="copy_text(contact['Contact_Phone'])"> {{ contact['Contact_Phone'] }} </div>
            </div>


          </div>
          
          <div  class="line_info">
            <img src="../images/ghost_icons/dot7.png">
            <b>Sales Rep:</b>
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='gsalesrepname' @click="copy_text(all_salesforce_fields['Googler Name'])"> {{ all_salesforce_fields['Googler Name'] }} </div> 
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='gsalesrepmail' @click="copy_text(all_salesforce_fields['Googler Email'])"> {{ all_salesforce_fields['Googler Email'] }} </div> 
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='gsalesrepteam' @click="copy_text(all_salesforce_fields['Team'])"> {{ all_salesforce_fields['Team'] }} </div>
            </div>
        
          </div>
    
          <div v-for="contact in all_salesforce_fields['Case_Contacts']" class="call_button" @click="on_call(contact['Contact_Phone'])">
            Call {{contact['Contact_Type']}}
          </div>
          <br>

           <!-- customer button to call   -->
       
            <input class="text_button"type="text" placeholder="Enter the phone number here" v-model='phoneNumber'>

            <div v-if="phoneNumber"class="call_button" @click="on_call(phoneNumber)">
            Call {{phoneNumber}}
          </div>

         <!-- customer button to call   finished -->

         </div>
<!-- End Contact info   -->


<!-- Appointment info   -->

      <div class='appointment_info' v-if="ghostforce_active">

        <h1><img src="../images/ghost_icons/calendar2.png">Appointment info</h1>    
        <div class="line_info">
          <img src="../images/ghost_icons/dot1.png">
          <b>Initial Appointment:</b>
          <div class='btcp'>
            <span class='tip'>Click to copy</span>
            <div id='clientname' @click="copy_text(all_salesforce_fields['Appointment Date/Time'])"> {{ all_salesforce_fields['Appointment Date/Time'] }} </div>
          </div>
        </div>
       
        <div v-if="all_salesforce_fields['Rescheduled Appointment Date/Time']" class="line_info">
          <img src="../images/ghost_icons/dot1.png">
          <b>Rescheduled Appointment:</b>
          <div class='btcp'>
            <span class='tip'>Click to copy</span>
            <div id='clientname' @click="copy_text(all_salesforce_fields['Rescheduled Appointment Date/Time'])"> {{ all_salesforce_fields['Rescheduled Appointment Date/Time'] }} </div> 
          </div>
    
        </div>

     </div>

<!-- End Appointment info   -->



<!-- Case comment info   -->

      <div class='case_info' v-if="ghostforce_active">
        <h1><img src="../images/ghost_icons/comment2.png">Case comment</h1>
        <div class="line_info">
    
          {{ all_salesforce_fields["Comments"]}}
        </div>
       

      </div>

<!-- End Case comment info   -->



   </div>
</template>

<script>
export default {
  name: 'ghostforce',
  props: ['props'],
  data() {
    return {
      ghostforce_active: this.props.ghostforce_active,
      ghost_images: [
        { name: "Website  Adwords  Analytics", src: require("../images/ghost_icons/icon-open-three.png") },
        { name: "Adwords", src: require("../images/ghost_icons/icon-google-ads.png") },
        { name: "Analytics", src: require("../images/ghost_icons/icon-analytics.png") },
        { name: "Website", src: require("../images/ghost_icons/icon-browser.svg") },
        { name: "Tag Manager", src: require("../images/ghost_icons/icon-tagmanager.png") },
        { name: "Merchant Center", src: require("../images/ghost_icons/icon-merchant.png") },
        { name: "Gerloose", src: require("../images/ghost_icons/icon-gearloose.png") }
      ],
      current_subject: "",
      program_level: "",
      phoneNumber:'',
      current_program: "",
      bad_leads:[],
      all_task: [],
      task_level: "",
      current_level: "",
      all_salesforce_fields: this.props.all_salesforce_fields,
      tempJsonFolder: this.props.tempJsonFolder,

    };
  },
  activated: function () {
    console.log('Ghost Force activated')
  },
  deactivated: function () {
    console.log('Ghost Force  deactivated')
  },
  mounted: function () {
    const newThis = this
    if (this.ghostforce_active) {
      
      newThis.current_subject = newThis.all_salesforce_fields.Subject;     // Tag implementation or Shopping Campaign
      //fetch all program data
      fetch('../' + newThis.tempJsonFolder + 'program_data_updated.json')
        .then(response => response.json())
        .then(data => {
          newThis.program_level = data;
          console.log(newThis.program_level)

          let current_obj = newThis.program_level.programList.find(obj => {
            //console.log(obj)
            return obj["programName"] === newThis.all_salesforce_fields["Team"]
          })
          if (current_obj) {
            newThis.current_program = current_obj.programLevel
          }


          console.log(newThis.current_program)
          console.log(newThis.program_level)
        })
        .catch(err => {
          //handle the error
          console.log(' Cant fetch the JSON file, Im inside ghostforce.js')
        })
             //fetch Bad Leads and set the bad_leads data object to the array coming from gitLab bellow
         
      fetch('../' + newThis.tempJsonFolder + 'bad_leads.json')
      .then(response => response.json())
      .then(data => {
        newThis.bad_leads = data
        console.log(newThis.bad_leads)
      })
      .catch(err => {
        //handle the error        
        console.log(err+' Cant fetch the bad-leads file, Im inside ghostforce.js')
      })

      //fetch all task
      fetch('../' + newThis.tempJsonFolder + 'task_data.json')
        .then(response => response.json())
        .then(data => {
          newThis.task_level = data;
          var task_type = []
          var current_obj = []
          if (newThis.current_subject == "Shopping Campaign") {
            newThis.all_task.push({
              Task_Type: newThis.all_salesforce_fields["Shopping Code Type"],
              Special_instructions: newThis.all_salesforce_fields['Special Instructions/Troubleshooting']
            })

            console.log(newThis.all_task)
            task_type.push(newThis.all_task)
            console.log(task_type)
          }
          else if (newThis.current_subject == "Tag Implementation") {
            //all_task is an array which contains all ticket tasks 
            newThis.all_task = newThis.all_salesforce_fields["Tags"]
            console.log(newThis.all_task)
            //task_type is an array which contains all ticket tasks type

            newThis.all_task.forEach(element => {
              //console.log(element.Task_Type)
              task_type.push(element.Task_Type)
            });
            //console.log(task_type)
          }
          task_type.forEach(element => {
            var temp = newThis.task_level.taskList.find(obj => {
              // console.log(obj)
              // console.log(element)
              return obj["task_Name"] === element
            })
            if (temp) {
              current_obj.push(temp.task_LVL)
              //console.log(current_obj)
            }
          })
          console.log(current_obj)

          //current_level is the level of the ticket. If I found a level 2 task, the ticket will be level 2, otherwise level 1
          newThis.current_level = current_obj.find(obj => {
            return obj == "L2"
          })
          if (!newThis.current_level) {
            newThis.current_level = "L1"
          }
          console.log(newThis.current_level)
        })
        .catch(err => {
          //handle the error
          console.log(' Cant fetch the JSON file, Im inside ghostforce.js')
        })
    }
    setTimeout(function () {
      
      console.log(newThis.all_salesforce_fields)
      console.log(newThis.program_level)
      console.log(newThis.current_program)
    }, 2000)
    //window.dataLayer.push("GhostForceTab")
    console.log('Ghost Force  mounted')
  },
  destroyed: function () {
    console.log('Ghost Force  destroyed')
  },
  methods: {
    ghost(event) {
      const newThis = this
      if (this.ghostforce_active) {
        console.log(event)
        if(event == 'Website  Adwords  Analytics') {
          
       chrome.windows.getCurrent(function (currentWindow) {
          chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
            activeTabs.map(function (tab) {
              var index = tab.index + 1;
              console.log('current '+ index)
              chrome.tabs.create({
                url: "https://adwords.corp.google.com/aw/go?external_cid=" + newThis.all_salesforce_fields['Customer ID'], 'index': index
              })
              chrome.tabs.create({
                url: "https://analytics-ics.corp.google.com/home?q=" + newThis.all_salesforce_fields['Customer ID'], 'index': index
              })
              chrome.tabs.create({
                url: newThis.all_salesforce_fields['URL'], 'index': index
              })
            });
          });
        });
        
        }
        else if (event == 'Adwords') {
          if(this.all_salesforce_fields['Customer ID'])
            window.open("https://adwords.corp.google.com/aw/go?external_cid=" + this.all_salesforce_fields['Customer ID'])
        }
        else if (event == 'Analytics') {
          if(this.all_salesforce_fields['Customer ID'])
            window.open("https://analytics-ics.corp.google.com/home?q=" + this.all_salesforce_fields['Customer ID'])
        }
        else if (event == 'Website') {
          if(this.all_salesforce_fields['URL'])
            window.open(this.all_salesforce_fields['URL'])
        }
        else if (event == 'Tag Manager') {
          if( this.all_salesforce_fields['Customer ID'])
          window.open("https://tagmanager-ics.corp.google.com/?q=" + this.all_salesforce_fields['Customer ID'])
        }
        else if (event == 'Merchant Center') {
          if(this.all_salesforce_fields['MC-ID'])
            window.open("https://mcn-ics.corp.google.com/mc?a=" + this.all_salesforce_fields['MC-ID'])
        }
        else if (event == 'Gerloose') {
          if(this.all_salesforce_fields['Customer ID'])
           window.open("https://gearloose2.corp.google.com/#/search/merchants?q=awid:" + this.all_salesforce_fields['Customer ID'])
        }
      }
    },
    on_call(number){
      console.log(number)
      chrome.storage.sync.clear()   //clear the chrome storage before set the value
      chrome.storage.sync.set({
        number: number,

      }, function() {
          console.log('Value is set to ' + number);
      });
      chrome.windows.create({
            url: "https://smbsalesimplementation--c.na81.visual.force.com/apex/Click2Dial",
            left: 300,
            top: 300,
            width: 400,
            height: 400,
            focused: true
          })
    },
    copy_text(text){
    if (!navigator.clipboard) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position="fixed";  //avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);

      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });


      
    },
     // Get the call from the bad leads button when clicked, and pass the click event 
     lead(clickEvent,badlead){  

      // prevent default behavior
      clickEvent.preventDefault()
      var comment = 'BAD Lead - ' + badlead
        let msg = {

          // Get the inner text of the event click
          data: comment,

          //pass text message to script.js
          txt: "bad_lead"
        }
        // Send the message object to script.js
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, msg);
        });
    },
    test() {
      console.log(this.current_program)
    }
  }
}
</script>

<style scoped>
#ghostforceComponent {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    letter-spacing: 1px;
}


#ghostforceComponent > div {
    width: 95%;
    background-color: #404040;
    margin: 17px auto;
    border-radius: 25px;
    padding: 0;
    -webkit-box-shadow: -2px 7px 13px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: -2px 7px 13px -1px rgba(0,0,0,0.75);
    box-shadow: -2px 7px 13px -1px rgba(0,0,0,0.75);
    color: #f2f2f2;
    text-align: center;
}

#ghostforceComponent > div > h1 {
    font-size: 16px;
    font-weight: bold;
    background-color: #666666;
    border-radius: 25px 25px 0 0;
    height: 45px;
    text-align: left;
    padding-left: 15px;
    color: white;
    padding: 10px 0 0 15px;
    letter-spacing: 1.4px;
}

#ghostforceComponent > div > h1 > img {
    height: 20px;
    width: 20px;
    margin: 0 10px 2px 0;
    -webkit-box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
    -moz-box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
    box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
}

#ghostforceComponent > div .line_info {
    
    text-align: left;
    padding: 10px;
    margin: 5px;
    min-width: 100%;

  }

  .call_button{
    border: groove 1px rgba(255,255,255,.075);
    background-color: #666666;
    width: 240px;
    border-radius: 1.5rem;
    padding: 0.5rem;
    text-align: center;
    margin: 20px 10px 10px 10px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    
  }

    p.call_button  {
    
        width: auto; 
        color: white;
        font-size: 0.8rem;
        -webkit-box-shadow: 2px 10px 7px -6px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 10px 7px -6px rgba(0,0,0,0.75);
        box-shadow: 2px 10px 7px -6px rgba(0,0,0,0.75);
        
       
    }

    button.call_button i {
        padding-left: 1rem;
    }

 
    .call_button_modifier {
        color: white;
    }

    p.call_button:hover .tip {
        visibility: visible;
    }

    .text_button{
    border: groove 1px rgba(255,255,255,.075);
    background-color: #b9b3b3;
    width: 240px;
    border-radius: 1.5rem;
    padding: 0.5rem;
    text-align: center;
    margin: 20px 10px 10px 10px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    }


    .text_button::placeholder{
        color: rgb(121, 116, 116);
    }

  #ghostforceComponent > div .line_info > img {
    height: 12px;
    width: 12px;
    margin: 0 10px 2px 0;
    -webkit-box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
    -moz-box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
    box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
  }

#ghostforceComponent .task {
    
    border: groove 1px rgba(255,255,255,.075);
    border-radius: 1.5rem;
    padding: 0.5rem;
    text-align: center;
    margin: 10px;
    
}
#ghostforceComponent .task > b{
    font-size: 16px;
}
#ghostforceComponent .task #task-comment{
    text-align: left;
}
#ghostforceComponent .Completed{
    background-color: rgb(81, 140, 14);
}

#ghostforceComponent .Open{
    background-color: rgb(207, 158, 4);
}
#ghostforceComponent .Inactive{
    background-color: rgb(200, 5, 28);
}

  

  #ghostforceComponent > div .btcp{
    display: inline-block;
    position: relative;
    padding: 0.1rem;
    margin: 0.1rem;
    border: hidden 1px rgba(255,255,255,.075);
}

.btcp:hover {
   
    border: groove 1px rgba(255,255,255,.075);
    border-radius: 0.4rem;
    cursor: copy;
    background-color: rgba(255,255,255,.075);
} 
.btcp:hover .tip {
    visibility: visible;
}
 
.icon{
    padding-top: 15px;
}

.row_icon{
    border-radius: 1.5rem;
    padding: 1rem 0.2rem 1rem 0.2rem;
    text-align: center;
    margin: 0px auto 0.6rem;
}

.quickbtn {
    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    /* filter: drop-shadow(3px 3px 6px #888); */
    
}

.graybtn {
    filter: grayscale(1) drop-shadow(3px 3px 6px #888);
    
}
.graybtn:hover{
    cursor: not-allowed;
}

.tool {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
}

.tip {
    visibility: hidden;
    width: 120px;
    background-color: #222;
    color: #f2f2f2;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -50px;
    margin-top: 10px;
}

.tool:hover .tip {
    visibility: visible;
}


</style>