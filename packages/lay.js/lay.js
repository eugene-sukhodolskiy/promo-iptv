var LayJS = function(){
    var self = this;
    this.fileAttrName = 'data-include';
    this.callbackAttrName = 'data-callback';
    this.callbacks = {};
    this.countIncs = 0;
    this.curIndex;
    
    this.include = function(file, replaceEl, callbackName){
        $.get(file, function(data){
            console.log(file);
            $(replaceEl).replaceWith(data);
            if(typeof callbackName != 'undefined'){
                self.callbacks[callbackName](data);
            }
            self.rerun();
        });
    }
    
    this.rerun = function(){
        if(self.curIndex == self.countIncs - 1){
            self.replaceSpecialEls();
        }
    }
    
    this.replaceSpecialEls = function(){
        var incs = $('[' + self.fileAttrName + ']');
        self.countIncs = incs.length;
        if(incs.length > 0){
            $('[' + self.fileAttrName + ']').each(function(i){
                self.curIndex = i;
                var file = $(this).attr(self.fileAttrName);
                var callbackName = $(this).attr(self.callbackAttrName);
                self.include(file, this, callbackName);
            });
        }else{
            self.ending();
        }
    }
    
    this.setCallback = function(name, func){
        if(typeof self.callbacks[name] == 'undefined'){
            self.callbacks[name] = func;
        }else{
            console.log('This callback func already exists "'+name+'" = "'+self.callbacks[name]+'"');
        }
    }
    
    this.run = function(){
        self.replaceSpecialEls();
    }
    
    this.ending = function(){}
}