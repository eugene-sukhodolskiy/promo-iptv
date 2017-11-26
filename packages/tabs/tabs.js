var Tabs = function(params){
    
    this.tabsItemClass = typeof params.tabsItemClass == 'undefined' ? 'tabs-item' : params.tabsItemClass;
    this.tabSwicherClass = typeof params.tabSwitcherClass == 'undefined' ? 'tab-switcher' : params.tabSwitcherClass;
    this.currentTabId = '';
    this.defaultTabId = typeof params.defaultTabId == 'undefined' ? '' : params.defaultTabId;
    
    this.BeforeSwitch = {};
    this.AfterSwitch = {};
    
    var self = this;
    
    this.init = function(){
        $('.'+self.tabSwicherClass).click(function(){
            //self.switcherActive(this);
            //self.switch($(this).attr('data-tab-id'));
        });
    }
    
    this.activeDefault = function(tabId){
//        $('[data-tab-id="'+tabId+'"]').click();
        self.switcherActive($('[data-tab-id="'+tabId+'"]'));
        self.switch(tabId);
    }
    
    this.switcherActive = function(el){
        $('.tab-switcher-active').removeClass('tab-switcher-active');
        $(el).addClass('tab-switcher-active');
    }
    
    this.switch = function(tabId){
        if(self.currentTabId != ''){
            self.closeCurrentTab(self.currentTabId); // close last active tab
        }
        
        if(self.openTab(tabId)){ // open new tab
            self.currentTabId = tabId; // set new tab id
        }
    }
    
    this.openTab = function(tabId){
        self.generalBeforeSwitch(tabId);
        if(typeof self.BeforeSwitch[tabId] != 'undefined')
            self.BeforeSwitch[tabId]();
        $('#'+tabId).addClass('tab-active');
        if(typeof self.AfterSwitch[tabId] != 'undefined')
            self.AfterSwitch[tabId]();
        return true;
    }
    
    this.closeCurrentTab = function(tabId){
        $('#'+tabId).removeClass('tab-active');
    }
    
    this.addBeforeSwitch = function(tabId, callback){
        self.BeforeSwitch[tabId] = callback;
    }
    
    this.addAfterSwitch = function(tabId, callback){
        self.AfterSwitch[tabId] = callback;
    }
    
    this.generalBeforeSwitch = function(){}
    
    this.run = function(){
        if(self.defaultTabId != ''){
            self.activeDefault(self.defaultTabId);
        }
    }
    
    this.init();
    
}

$(document).ready(function(){
    var t = new Tabs({'defaultTabId': 'one'});
});