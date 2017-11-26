var TypeNumber = function(sel){
    var self = this;
    this.selector = sel;
    
    this.addPropToEl = function(){
        $(self.selector).each(function(){
            this.valPlus = function(){
                var step = parseInt($(this).attr('step'));
                var max = parseInt($(this).attr('max'));
                var val = parseInt($(this).attr('value'));

                var newVal = val + step;
                if(newVal <= max){
                    $(this).attr('value', newVal);
                    $(this).prop('value', newVal);
                }
            }
            
            this.valMinus = function(){
                var step = parseInt($(this).attr('step'));
                var min = parseInt($(this).attr('min'));
                var val = parseInt($(this).attr('value'));

                var newVal = val - step;
                if(newVal >= min){
                    $(this).attr('value', newVal);
                    $(this).prop('value', newVal);
                }
            }  
            
            $(this).blur(function(){
                var min = parseInt($(this).attr('min'));
                var val = parseInt($(this).prop('value'));
                var max = parseInt($(this).attr('max'));
                
                if(val < min){
                    $(this).prop('value', min);
                    $(this).attr('value', min);
                }
                
                if(val > max){
                    $(this).prop('value', max);
                    $(this).attr('value', max);
                }
            });
            
        });
        
    }
    
    this.plus = function(id){
        $('#'+id).each(function(){
            this.valPlus();
        });
    }

    this.minus = function(id){
        $('#'+id).each(function(){
            this.valMinus();
        });
    }

    this.btn = function(){
        $('[data-fn-start]').click(function(){
            self[$(this).attr('data-fn-start')]($(this).attr('data-inp-id'));
        });
    }
    
    this.addPropToEl();
    this.btn();
    
}