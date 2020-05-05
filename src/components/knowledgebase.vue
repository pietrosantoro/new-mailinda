<template>
    <div class="container">
    <div class="mainDiv">
        <div class="inputSearch">
            <p> What are you looking for ?</p>
        </div>
        <div class="row">
            <div class="row-centered dropdownCmsDiv column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:mouseover="mouseOver">CMS</button>
                <div class="dropdown-content-cmsDiv">
                    <div id="taskSearch" class="dropdown-item dropdown dropright" v-for="(data,key) in cmsKeys"
                        :key="key" v-on:click="stopPropagation">
                        <button type="button" name="task" class="dropdown-item dropdown-toggle" data-toggle="dropdown"
                            v-on:mouseover="mouseOver">{{data}}</button>
                        <div class="dropdown-content dropdownTask">
                            <input type="search" class="form-control" id="myInput" v-model="search"
                                placeholder="Search" />
                            <div id="taskSearch" v-for="(data,key) in cmsFiltered" :key="key">
                                <button type="button" name="task" class="dropdown-item"
                                    v-on:click="chooseTask">{{data}}</button>
                            </div>
                        </div>
                    </div>
                </div>             
            </div>
            <div class="row-centered dropdown column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:mouseover="mouseOver">Analytics</button>
                <div class="dropdown-content dropdownAnalytics">
                    <input type="search" class="form-control" v-model="search" placeholder="Search" />
                    <div id="taskSearch" v-for="(data,key) in analyticsFiltered" :key="key">
                        <button type="button" name="task" id="" class="dropdown-item" data-toggle="dropdown"
                            v-on:click="chooseTask">{{data}}</button>
                    </div>
                </div>
            </div>
            <div class="row-centered dropdown column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:mouseover="mouseOver">Adwords</button>
                <div class="dropdown-content dropdownAnalytics">
                    <input type="search" class="form-control" v-model="search" placeholder="Search" />
                    <div id="taskSearch" v-for="(data,key) in adwordsFiltered" :key="key">
                        <button type="button" name="task" id="" class="dropdown-item" data-toggle="dropdown"
                            v-on:click="chooseTask">{{data}}</button>
                    </div>
                </div>
            </div>
            <div class="row-centered dropdown column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:mouseover="mouseOver">Shopping</button>
                <div class="dropdown-content dropdownShopping">
                    <input type="search" class="form-control" v-model="search" placeholder="Search" />
                    <div id="taskSearch" v-for="(data,key) in shoppingFiltered" :key="key">
                        <button type="button" name="task" id="" class="dropdown-item" data-toggle="dropdown"
                            v-on:click="chooseTask">{{data}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>>

<script>
export default {
    name : 'knowledgebase',
    data() {
        return {
            subject: "",
            task: "",
            cms: "",
            //result is the json file from gitlab
            result: {},
            shoppingKeys: ["Gearloose", "Merchant Center Setup", "Shopping Feed Setup", "Shopping Feed Optimization", "Merchant Center Features", "Handy Go Links", "Offline Shopping GSS"],
            taskKeys: ["Ads Conversion Tracking", "Analytics Event Tracking", "Standard Remarketing", "Dynamic Remarketing", "Standard Ecommerce", "Enhanced Ecommerce", "Analytics", "Google Tag Manager", "Cross Domain Tracking", "Website Call Conversion", "Shopping"],
            cmsKeys: ["Wordpress", "Prestashop", "Shopify", "Magento", "Shopware"],
            adwordsKeys: ["Conversion Tracking", "Standard Remarketing", "Dynamic Remarketing Retail", "Dynamic Remarketing non Retail", "Site Wide Tracking ITP", "Website Call Conversion", "Offline Conversion Tracking"],
            analyticsKeys: ["Goal Tracking","Cross Domain Tracking", "Standard Ecommerce", "Enhanced Ecommerce", "Standard Remarketing", "Dynamic Remarketing Retail", "Dynamic Remarketing non Retail", "Filters", "Audience lists"],           
            search: '',
            code: {},
            href: ""
        };
    },
    computed: {
        cmsFiltered: function(){
            return this.taskKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        },
        analyticsFiltered: function(){
            return this.analyticsKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        },
        adwordsFiltered: function(){
            return this.adwordsKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        },
        shoppingFiltered: function(){
            return this.shoppingKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        }
    },
    methods: {
        //to select the cms by mouseover 
        chooseSubject: function(subjectChosen){
            this.subject = subjectChosen.target.innerText.split(' ').join('-').toLowerCase() + "/";
            console.log(this.subject);

        },
        stopPropagation: function(){
            jQuery('.dropdown-menu').on('click', function (e) {
                e.stopPropagation();
              }); 
        },
        mouseOver: function (cmsChosen) {
            this.cms = cmsChosen.target.innerText.split(' ').join('-').toLowerCase() + "/";
            console.log(this.cms);
        },
        //after choose cms, open new tab to the knowledge base with the task chosen 
        chooseTask: function (taskChosen) {
            this.task = taskChosen.target.innerText.split(' ').join('-').toLowerCase();
            this.href = "http://kb.stsandbox.vddigi.com/docs/" + this.subject + this.cms + this.task;
            console.log(this.href);
            window.open("http://kb.stsandbox.vddigi.com/docs/" + this.subject + this.cms + this.task);

        },   
    },
    activated: function () {
        console.log('Knowledge Base activated')
    },
    deactivated: function () {
        console.log('Knowledge Base deactivated')
    },
    mounted: function () {
        window.dataLayer.push("KnowledgeBaseTab")
        console.log('Knowledge Base mounted');
        
    },
    destroyed: function () {
        console.log('Knowledge Base destroyed')
    },
}
</script>

<style scoped>
.container{
    margin-top: 10px;
}
.mainDiv{
    background-color:#252a2e; 
    color:white;
}

#myInput{
    margin: 10px;
}

#taskSearch{
    margin-top: 5px;
    padding-left: 0px !important;
}


.inputSearch{
    color: white;
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.row-centered {
    text-align:center;
}

.column {
    margin-left: -20px;
    margin-right: 20px;
    width: 25%;
} 

.dropdown-content, .dropdown-content-cmsDiv {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
}
.dropdownTask:hover .dropdown-content-task{
    display: block;
}

.dropdownTask{
    height: 240px; 
    overflow: scroll;
    transform: translate3d(120px, -230px, 320px)!important;
}

.dropdownAnalytics{
  height: 260px;
  overflow: scroll;
  float: left;
  min-width: 10rem;
  padding: .5rem 0;
  margin: .125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
}

.dropdownCmsDiv:hover .dropdown-content-cmsDiv{
    display: block;
    float: left;
    min-width: 10rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
}

.dropdown:hover .dropdownShopping {
    display: block;
    right: -45px;
    height: 260px;
    overflow: scroll;
    float: left;
    min-width: 10rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
  }


input {
	outline: none;
}
input[type=search] {
	-webkit-appearance: textfield;
	box-sizing: content-box;
	font-family: inherit;
	font-size: 100%;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
	display: none; 
}


input[type=search] {
	background: #ededed url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 9px center;
	border: solid 1px #ccc;
	padding: 9px 10px 9px 32px;
    width: 90px;
    height: 15px;
    margin: 2px 0px 0px 10px;
	
	-webkit-border-radius: 10em;
	-moz-border-radius: 10em;
	border-radius: 10em;
	
	-webkit-transition: all .5s;
	-moz-transition: all .5s;
	transition: all .5s;
}
input[type=search]:focus {
	width: 150px;
	background-color: #fff;
	border-color: #66CC75;
	
	-webkit-box-shadow: 0 0 5px rgba(109,207,246,.5);
	-moz-box-shadow: 0 0 5px rgba(109,207,246,.5);
	box-shadow: 0 0 5px rgba(109,207,246,.5);
}


input:-moz-placeholder {
	color: #999;
}
input::-webkit-input-placeholder {
	color: #999;
}
</style>