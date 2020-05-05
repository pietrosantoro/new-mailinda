<template>
  <div id="emailtemplatecomponent">
    <div class="container-fluid">
      <div class="btn-group">
    <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{current_market}}
    </button>
    <!-- <img class="country" v-bind:src="'images/' + this.current_location + '.png'" >  -->
    <div class="dropdown-menu">
      <a v-for="market in this.all_market"class="dropdown-item" href="#" @click="change_market(market)">{{market}}</a>
    </div>
  </div>
      <div class="table-responsive table-dark">  
        <!-- <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th class="th-sm" scope="col">Hour</th>
              <th class="th-sm" scope="col">Agent Available</th>
              <th  class="th-sm" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(agent,index) in this.junior_sme_daily" v-bind:class="['clickable-row',{ 'bg-info': index == current_hours }]"  role="button">
              <td>{{ index }}:00</td>
              <td>{{agent}}</td>
              <td ><p v-if="index==current_hours && agent" @click="hangoutLink(agent)">Ping Me! <i class="fas fa-comment-dots fa-lg"></i></p></td>
            </tr>
          </tbody>
        </table> -->
        
        <div v-for="(email,index) in this.template_global">
          <h2>{{email.subject}}</h2>
          <v-runtime-template :template="email.body"/>
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
      count: 0,
      test: "test interpolation",
      test1: '<div>{{test}}</div>',
      template_global: "",
      all_market: "",
      current_market: "",
      body : "",
      all_salesforce_fields: this.props.all_salesforce_fields,
      tempJsonFolder: this.props.tempJsonFolder,
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
    //checkMarket()
    var market;
    // everytime the component is mounted, I get market from local storage
    chrome.storage.sync.get(['market'], function (result) {
      if (result.market) {
        console.log(result.market)
        market = result.market;
        newThis.current_market = result.market;
        
      }
      else {
        // market = ""
        // this.current_market = result.market;
      }

    })
    // console.log(current_date)
    // console.log(this.current_day)
    // console.log(this.current_hours)
    fetch('../' + newThis.tempJsonFolder + 'Email%20Template/all_market.json')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // console.log(data.juniorsme[this.current_day])
        newThis.all_market = data.all_market
        
        console.log(this.all_market)
        //this.all_location = Object.keys(data)
        //this.current_location = location
        //console.log(data[this.current_location])
        //this.junior_sme_daily = data[this.current_location].juniorsme[this.current_day]
        //this.hangout_link = data[this.current_location].hangout_link
        // console.log(this.hangout_link)
      }).catch(error => console.error(error))
      fetch('../' + newThis.tempJsonFolder + 'Email%20Template/email_templates_' + 'Italian' + '.json')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // console.log(data.juniorsme[this.current_day])
        // add div to the body of the email in order to render correctly the copmponent with VRuntimeTemplate library
        newThis.template_global = data.email_template
        newThis.template_global.forEach(function(element,index){
          this[index].body = "<div class='email-body'>" + element.body + "</div>"
          console.log(this[index].body)
          
        },newThis.template_global);   // use newThis.template_global as "this" object inside the callback function in order to edit the original array
        console.log(newThis.template_global)
        //test1 = data.email_template
        //console.log(test1)
        //this.all_location = Object.keys(data)
        newThis.current_market = market
        //console.log(data[this.current_location])
        //this.junior_sme_daily = data[this.current_location].juniorsme[this.current_day]
        //this.hangout_link = data[this.current_location].hangout_link
        // console.log(this.hangout_link)
      })
      .catch(error => console.error(error))
      //window.dataLayer.push("EmailTemplateTab")
    console.log('Email Template  mounted')
  },
  computed: {
    // parsedSomeText() {
    //   console.log(this.all_market)
    //   let ret = this.template_global[1].body

      
    //   if (/[^{\}]+(?=})/g.test(this.template_global[1].body)) {
    //     let keyArr = String(this.template_global[1].body).match(/[^{\}]+(?=})/g)
    //     // console.log(keyArr)
    //     keyArr.forEach(element => {
    //       console.log(element)
    //       if (this.all_salesforce_fields){
    //         var regex = new RegExp("{{" + element + "}}");
    //        // console.log(regex)
    //         ret = ret.replace(regex, this.$data.all_salesforce_fields[element])
    //        // console.log(ret)
    //       }
    //     });
        
    //   }
    //   return ret
    // }
  },
  methods: {
    checkMarket() {
    },
    change_market(market) {
      console.log(market)
      this.current_market = market;
     // this.junior_sme_daily = this.junior_sme_global[this.current_location].juniorsme[this.current_day];
      chrome.storage.sync.set({ market: market }, function (result) {
        console.log("market set to " + market);
      });
    }
  },
}
</script>

<style scoped>
  #emailtemplatecomponent{
      padding-top: 15px;
  }

  #emailtemplatecomponent tr {
      display: grid;
      grid-template-columns: 1.3fr 2fr 2fr;
      text-align: center;
      
  }

  #emailtemplatecomponent .country{
      height: 35px;
      width: 35px;
      margin-left: 20px;
  }
</style>