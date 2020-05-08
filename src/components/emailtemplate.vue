<template>
 <div id="emailtemplatecomponent">

    <div class="container-fluid">

      <div class="ghost-inactive" v-if="!ghostforce_active">
         <div class="subsection">

            <h1><img src="../images/template_icons/multimedia.png"> Email Template not available </h1>

            <div class="single-email">
              
            <div>
              The email template is not available outside your Salesforce tickets.
              <br>
             Just open Mailinda on the ticket of interest. Copy and Paste!
              </div>
            
            </div>

          
          </div>
      </div>
      <div v-else>
        <div class="btn-group">
          <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{current_market}}
          </button>
          <div class="dropdown-menu">
            <a v-for="market in this.all_market"class="dropdown-item" href="#" @click="change_market(market)">{{market}}</a>
          </div>
        </div>

        <div class="all-emails"> 

        <div class="subsection" v-for="(section, x) in this.sections">
        
          <h1><img src="../images/template_icons/multimedia.png">{{section}} </h1>

        <div class="single-email" v-for="(email,y) in template_global[section]">
          <button type="button" data-toggle="collapse" :data-target="['#single-email-' + x + '-' + y]">
          <b>{{email.subject}}</b>
          <i class="fas fa-angle-down"></i>
        </button>
        <div @click="copy_text($event)" class="collapse" :id="['single-email-' + x + '-' + y]">
          <v-runtime-template  :template="email.body"/>
          </div>

          
          </div>

        </div>
      </div>
      
      </div>
    </div>
  </div>
</template>

<script>

import VRuntimeTemplate from "v-runtime-template";

export default {
  name: 'emailtemplate',
  props: ['props'],
  components: {
    VRuntimeTemplate
  },
  data() {
    return {
      template_global: "",
      sections: "",
      all_market: "",
      current_market: "",
      sfdc: this.props.all_salesforce_fields,
      tempJsonFolder: this.props.tempJsonFolder,
      ghostforce_active: this.props.ghostforce_active,
    };
  },
  activated: function () {
    console.log('Email Template activated')
  },
  deactivated: function () {
    console.log('Email Template deactivated')
  },
  mounted: function () {
    const newThis = this
    // everytime the component is mounted, I get market from local storage
    chrome.storage.sync.get(['market'], function (result) {
      if (result.market) {
        console.log(result.market)
        newThis.current_market = result.market;
        newThis.fetch_template(newThis,newThis.current_market)
        
      }
      else {
        //set market default when the extension is installed for the first time
         newThis.current_market = "Polish";
         newThis.fetch_template(newThis,newThis.current_market)
      }

    })
    fetch('../' + newThis.tempJsonFolder + 'Email%20Template/all_market.json')
      .then(response => response.json())
      .then(data => {
        newThis.all_market = data.all_market
      }).catch(error => console.error(error))
      //window.dataLayer.push("EmailTemplateTab")
    console.log('Email Template  mounted')
  },
  computed: {
   
  },
  methods: {
   fetch_template(newThis,market) {
     fetch('../' + newThis.tempJsonFolder + 'Email%20Template/email_templates_' + market + '.json')
        .then(response => response.json())
        .then(data => {
          // add div to the body of the email in order to render correctly the copmponent with VRuntimeTemplate library
          newThis.template_global = data.email_template
          newThis.sections = Object.keys(data.email_template)

          for (var subsection in newThis.template_global){
            for(var index in newThis.template_global[subsection]){
              newThis.template_global[subsection][index].body = "<div class='email-body'> " + newThis.template_global[subsection][index].body + "</div>"
            }
          }
        })
        .catch(error => console.error(error))
    },
    change_market(market) {
      const newThis = this
      console.log(market)
      newThis.current_market = market;
      newThis.fetch_template(newThis,newThis.current_market)
      chrome.storage.sync.set({ market: market }, function (result) {
        console.log("market set to " + market);
      });
    },
    copy_text(event){
      console.log(event.target.innerHTML)
      var text = event.target.innerHTML
      function listener(e) {
          e.clipboardData.setData("text/html", text);
          e.clipboardData.setData("text/plain", text);
          e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
      
    }
  },
}
</script>

<style scoped>
  
#emailtemplatecomponent {
  padding-top: 15px;
}
  
  
.all-emails {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    letter-spacing: 1px;
}


.subsection {
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

.email-body{
    padding: 1rem;
    text-align: left;
    position: relative;
    margin: 10px auto 10px auto;
    border: hidden 1px rgba(255,255,255,.075);
    background-color: #666666;
    width: 90%;
    border-radius: 1.5rem;
}
 
.email-body:hover{
   cursor: copy;
   border: groove 1px rgba(255,255,255,.075);
    border-radius: 1.5rem;
    cursor: copy;
    background-color: rgba(255, 255, 255, 0.158);
}

 h1 {
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
.single-email button{
    border: groove 1px rgba(255,255,255,.075);
    background-color: #666666;
    width: 95%;
    border-radius: 1.5rem;
    padding: 0.5rem;
    text-align: center;
    margin: 10px 10px 10px 10px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
     color: white;
  }

#emailtemplatecomponent  h1 > img {
    height: 20px;
    width: 20px;
    margin: 0 10px 2px 0;
    -webkit-box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
    -moz-box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
    box-shadow: 10px -12px 86px -5px rgba(250,250,230,1);
}
</style>