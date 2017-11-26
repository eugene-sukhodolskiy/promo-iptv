var IfInpNoEmpty = function(inpList, that, els){

    var self = this;
    this.inpList = inpList; // must be array selectors to inp
    this.that = that; // func
    this.els = els; // func
    
    this.radio = function(name){
        var flag = false;
        
        $('[name="'+name+'"]').each(function(index){
            if($(this).prop('checked')){
                flag = true;
                return false;
            }
        });
        
        return flag;
    }
    
    this.radioBtn = function(name){
        $('[name="'+name+'"]').change(function(){
//            self.radio($(this).attr('name'));
            $('[name="'+name+'"]').attr('data-ifinpnoempty', 'empty');
            self.check();
        });
    }

    this.run = function(){
        for(var i=0;i<self.inpList.length;i++){
            if($(self.inpList[i]).attr('type') == 'checkbox'){
                $(self.inpList[i]).change(function(e){
                    if($(this).prop('checked')){
                        $(this).attr('data-ifinpnoempty', 'no-empty');
                    }else{
                        $(this).attr('data-ifinpnoempty', 'empty');
                    }

                    self.check();
                });
            }else{
                $(self.inpList[i]).keyup(function(e){

                    if($(this).prop('value') != ''){
                        $(this).attr('data-ifinpnoempty', 'no-empty');
                    }else{
                        $(this).attr('data-ifinpnoempty', 'empty');
                    }

                    self.check();
                });
            }
        }
    }

    this.check = function(){
        for(var i=0;i<self.inpList.length;i++){
            if($(self.inpList[i]).attr('data-ifinpnoempty') != 'no-empty'){
                self.els();
                return false;
            }
        }

        self.that();
    }

    self.run();

}
