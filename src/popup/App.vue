<template>
   <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">



      <div class="navbar-collapse" id="navbarsExample05">
        <ul class="navbar-nav pl-md-5 ml-auto">
          <li v-for="tab in tabs" v-bind:key="tab" v-bind:class="['nav-item nav-link', { active: currentTab === tab }]"
            v-on:click="changeTab(tab)">
            {{ tab }}

          </li>

        </ul>


      </div>

    </nav>

    <component v-bind:props="this.propsToChild" v-bind:is="this.currentComponent" class="tab"></component>
   </div>
</template>

<script>


import newemail from '../components/newemail'
import ghostforce from '../components/ghostforce'
import gtminjector from '../components/gtminjector'
import emaltemplate from '../components/emailtemplate'
import knowledgebase from '../components/knowledgebase'


export default {
  name: 'App',
  components: {
    newemail,
    ghostforce,
    gtminjector,
    emaltemplate,
    knowledgebase
  },
  data: function() {
    return {
      currentTab: 'New Email',
      currentComponent:'',
      tabs: ['New Email', 'Ghost Force', 'GTM injector', 'Email Template', 'Knowledge Base'],
      check_first_component : true,
      propsToChild: {
        newEmailCounter : '',
        baseUrl:'',
        logInSalesforce : false,
        allEmail : '',
        collapsedCases : '',
        gitlabDataRepo : 'data-process/general-data/-/raw/master/',
        ghostforce_active : false,
        gitlabUrl : 'http://35.242.128.211/',
        tempJsonFolder : './general-data/'  ,
        all_salesforce_fields : ''
      }
    };
  },
  mounted: function () {
      const newThis = this
      // ask all variables to the background script
      chrome.runtime.sendMessage(
      {
        type: "get_all_variables",
      },
      function (response) {
        newThis.propsToChild.newEmailCounter = response.data.newEmailCounter
        newThis.propsToChild.baseUrl = response.data.baseUrl
        newThis.propsToChild.logInSalesforce = response.data.logInSalesforce
        newThis.propsToChild.allEmail = response.data.allEmail
        newThis.propsToChild.collapsedCases = response.data.collapsedCases
      });
      document.documentElement.style.setProperty('--tabNumber', this.tabs.length);      //set CSS variable in popup.css placed in :root
      //every time the popup is clicked, we checked the first component to load. If we are inside a salesforce ticket page, first component will be ghostforce
      if (this.check_first_component) {
          console.log("dentro check")
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
              var activeTab = tabs[0];
              chrome.tabs.sendMessage(activeTab.id, {
                txt: "start"
              },
                function (response) {
                  //Message sent to script. If script response is an error is because we are not inside a salesforce ticket so we load new email as first component
                  if (chrome.runtime.lastError) {
                    var new_tab = "New Email"
                    newThis.propsToChild.ghostforce_active = false;
                    newThis.currentComponent = new_tab.replace(" ", "").toLowerCase();
                    console.log(new_tab)
                  }
                  else if (response.message == "inside case") {
                    //click on extension from salesforce ticket, so we load ghostforce as first component and we ask to gitlab for mandatory fields
                    fetch(newThis.propsToChild.tempJsonFolder + 'process.json')
                      .then(response => response.json())
                      .then(data => {
                        //call the function that sets the background color
                        let msg = {
                          data: data,
                          txt: "checkTicket"
                        }
                        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                          chrome.tabs.sendMessage(tabs[0].id, msg,
                            function (response) {
                              newThis.propsToChild.all_salesforce_fields = response.data
                              var new_tab = "Ghost Force"
                              newThis.propsToChild.ghostforce_active = true
                              newThis.currentComponent = new_tab.replace(" ", "").toLowerCase();
                              console.log(new_tab)
                            });
                        });
                      })
                      .catch(err => {
                        //handle the error
                        console.log(' Cant fetch the JSON file, Im inside popup.js')
                      })

                  }
                  else {
                    var new_tab = "New Email"
                    newThis.propsToChild.ghostforce_active = false;
                    newThis.currentComponent = new_tab.replace(" ", "").toLowerCase();
                    console.log(new_tab)
                  }
                });
            });
      }
      else {
        newThis.currentComponent = this.currentTab.replace(" ", "").toLowerCase();
      }
    console.log('App Mounted')
  },
  computed:{
    test: function(){
      console.log(this.propsToChild.logInSalesforce)
      return 'ok'
    }
  },
  methods:{
    changeTab: function(tab){
      this.currentTab = tab
      this.currentComponent = tab.replace(" ", "").toLowerCase();

    }
  }
}
</script>

<style>
:root{
  --tabNumber: 4      /* default value or tab in menu. The value is set via Javascript in popup.js*/
}

body {
    font-family: "Oxygen", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    font-size: 15px;
    line-height: 1.8;
    height: 500px;
    width: 600px;
    background-color:#252a2e;
}
::-webkit-scrollbar {
    width: 1px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}

#app{
    min-height: 100%;
}



.navbar {
    position: relative;
    height: 100px;
    width: 100%;
    background: black !important;
    padding-top: .5rem;
    padding-bottom: .5rem;
    font-family: "Montserrat", sans-serif;
}

.navbar-nav{
    display: grid;
    grid-template-columns: repeat(var(--tabNumber), 1fr);  /* tabNumber is the number of menu items and it set via Javascript in popup.js */
}

.navbar .nav-link {
  position: relative;
    padding: .5rem 0rem;
    outline: none !important;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: .2em;
    -webkit-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease;
    text-decoration: none;
    cursor:pointer;
}

.navbar .nav-link.active {
  color: #fff;
}

nav.link:hover {
  text-decoration: none;
}
</style>
