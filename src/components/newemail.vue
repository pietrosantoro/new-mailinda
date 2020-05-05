<template>
  <div id="newEmailComponent">
  <div class="container-fluid">
    <button @click='refresh()'  type="button" class="btn btn-danger btn-sm">Refresh</button>
  
          <div v-if="this.newEmailCounter && this.logInSalesforce">
              
            
              <div class="table-responsive">

                <table class="table table-hover table-dark">
                  <thead>
                      <tr>
                        <th class="th-sm" scope="col">Case Id</th>
                        <th class="th-sm" scope="col">Case Status</th>
                        <th class="th-sm" scope="col">Adv Contact Name</th>
                        <th class="th-sm" scope="col">New Email</th>
                      </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item,index) in this.collapsedCases">
                      <tr @click='collapseEmail(index)'v-if="item['Total Emails']"  role="button" class="clickable-row">
                        <td>
                          <button @click='clickCase( item["Case ID"],index )' type="button" class="btn btn-secondary btn-sm">{{ item["Case Number"] }}</button>
                        </td>
                        <td class='testColor'>
                            {{ item["Status"] }}
                        </td>
                        <td>
                          {{ item["Contact Name: Full Name"] }}
                      </td>
                        <td>
                          <span class="badge badge-danger badge-pill"> {{ item["Total Emails"] }} </span>
                        </td>
                        <tr v-for="(email,indexEmail) in item['Emails Indexes']" :class="['single-email-' + index]" v-if="allEmail[email]['Email Status']">
                          
                          
                            <td class="email-collapse"><div><button @click='clickCase( allEmail[email]["Email Message ID"],index)' type="button" class="btn btn-secondary btn-sm">Email</button></div></td>
                            <td class="email-collapse"><div>{{ allEmail[email]["Email Status"] }}</div></td>
                            <td class="email-collapse"><div>{{ allEmail[email]["From Address"] }}</div></td>
                            <td class="email-collapse"><div>{{ allEmail[email]["Message Date"] }}</div></td>
                          
                        </tr>
                      </tr>
                      
                    </template>
                  </tbody>
                </table>
              
              
            
              </div>
            </div>
            <div v-else-if="this.newEmailCounter == 0 && this.logInSalesforce" class="text-center align-middle">
              <p class="no-email top">No new emails</p>  
              <img class="horizontal-line" src="../images/no-email-check.svg">
              <p class="no-email bottom">You're all caught up!</p> 
            </div>
            <div v-else class="text-center salesforce">
              <a class= "btn btn-outline-light" href="https://login.salesforce.com/?locale=eu" target="_blank">Log in salesforce</a>
            </div>
          </div>

  </div>
</template>

<script>
export default {
  name: 'newemail',
  props: ['props'],
  data () {
    return {
      allEmail : this.props.allEmail,
      collapsedCases : this.props.collapsedCases,
      baseURL : this.props.baseURL,
      newEmailCounter : this.props.newEmailCounter,
      logInSalesforce : this.props.logInSalesforce,
      gitlabUrl: this.props.gitlabUrl,
      gitlabDataRepo : this.props.gitlabDataRepo,
      tempJsonFolder : this.props.tempJsonFolder,
      ghostforce_active : this.props.ghostforce_active,
      all_salesforce_fields : this.props.all_salesforce_fields
    }
  },
  activated: function () {
    console.log('New Email activated')
  },
  deactivated: function () {
    console.log('New Email deactivated')
  },
  mounted: function () {
    // ask to background all variables needed
    const newThis = this
    chrome.runtime.sendMessage(
      {
        type: "get_all_variables",
      },
      function (response) {
        newThis.newEmailCounter = response.data.newEmailCounter,
        newThis.baseURL = response.data.baseURL
        newThis.logInSalesforce = response.data.logInSalesforce
        newThis.allEmail = response.data.allEmail
        newThis.collapsedCases = response.data.collapsedCases
        console.log(newThis.baseURL)
      });
    //window.dataLayer.push("NewEmailTab")
    // console.log(this.allEmail)
    // console.log(this.collapsedCases)
    // console.log(this.baseURL)
    // console.log(this.newEmailCounter)
     console.log('from newEmail : ')
     console.log(this.allEmail)
    // console.log(this.gitlabUrl)
    // console.log(this.gitlabDataRepo)
    // console.log(this.tempJsonFolder)
    // console.log(this.ghostforce_active)
    // console.log(this.all_salesforce_fields)
    console.log('New Email mounted')
  },
  destroyed: function () {
    console.log('New Email destroyed')
  },
  methods: {
    clickCase(caseUrl, index) {
      var completeUrl = this.baseURL + caseUrl;
      window.open(completeUrl, "_blank");
    },
    refresh() {
      //ask background to call request when click refresh button
      chrome.runtime.sendMessage(
      {
        type: "refresh",
      },
      function (response) {
        
        console.log(response.message)
      });
      setTimeout(function () {
        location.reload(); //popup page reloaded after 0.5 sec to let request completed
      }, 500);
    },
    collapseEmail(index) {
      //collapse single email when table row is clicked
      var selector = ".single-email-" + index;
      $(selector).toggleClass("active");
    },
    test() {
      console.log('test called')
      console.log(this.collapsedCases);
      console.log(this.newEmailCounter);
      console.log(this.logInSalesforce)
    }
  }
}
</script>


<style scoped>
#newEmailComponent{
    padding-top: 15px;
}

table{
    margin-top: 4%;
   
}

.clickable-row{
    cursor:pointer;
    }

.align-middle{
    position: absolute;
    top: 30%;
    left: 10%;
}

.no-email {
    font-family: 'Roboto', sans-serif;
    color: white;
}

.no-email.top {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 0px;
}

.no-email.bottom {
    font-size: 20px;
    padding-top: 5px;
}
td.email-collapse{
  padding: 0;
  border: none;

}
tr[class^='single-email']{
    background-color: #434b53;
    
    font-size: 0.9rem;
}

/* align tr with grid */
#newEmailComponent tr {
    display: grid;
    grid-template-columns: 1.3fr 2fr 2fr 2fr;
    text-align: center;
    
}

tr, td {
    border-bottom: 0px;
    transition: border-bottom 0.5s;
    overflow: hidden;
  }

tr td div {
    max-height: 0;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    transition: max-height 0.3s, padding 0.3s;
    

}
tr.active td{
    border-bottom: 2px groove darkgrey;
    transition: border-bottom 0.2s;
}

tr.active td div {
    
    max-height: 100px;
    padding: 10px 10px;
    transition: max-height 0.6s, padding 0.6s;
}


.salesforce{
    position: absolute;
    top: 40%;
    left: 38%;
}

</style>