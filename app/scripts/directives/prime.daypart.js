(function($){
    $.fn.dayPart = function(daypartOptions) {
        // setup options
        var cfg = {
        	    beforeLoad : function() {
                    // do something .
                },
			    afterLoad : function() {
			        // do something .
			                },
			    debug : false
        };
                               
        var options = $.extend({}, cfg, daypartOptions);
        
        // support MetaData plugin
        if ($.meta){
            options = $.extend({}, options, this.data());
        }
        
        // SETUP private variabls;
        var self = this;
        
        var days =  [
                     {'label':'Sunday', 'id':"0"},
                     {'label':'Monday', 'id':"1" },
                     {'label':'Tuesday', 'id':"2" },
                     {'label':'Wednesday', 'id':"3"},
                     {'label':'Thursday', 'id':"4"},
                     {'label':'Friday', 'id':"5"},
                     {'label':'Saturday', 'id':"6"}
                     ];
    	var time = [
    	            {'label':'Morning', 'id':"1", "hours" : "6,7,8,9"},
    	            {'label':'Office Hours', 'id':"2" , "hours" : "10,11,12,13,14,15,16,17"},
    	            {'label':'Evening', 'id':"3" , "hours" : "18,19,20,21"},
    	            {'label':'Night', 'id':"4" , "hours" : "22,23,0,1,2,3,4,5"}
    	           ];
    	
    	
    	var wrap = $("<div />").addClass('sourceplate-wrap');
        var daysW = $("<div />").addClass('source-lft left');
        var hoursW = $("<div />").addClass('sourceplate source-rgt left');
        wrap.append(daysW).append(hoursW);
        
        self.append(wrap);
        
        var selectAllW = $("<p />");
        var selectAll = $('<label for="days" class="ez-group-chk"><input id="days" type="checkbox" class="selAll"/>Days </label>');
        selectAllW.append(selectAll);
        daysW.append(selectAllW);
        
        //Creates view for the day labels
        _populateDays = function(){
          	 var dayscontaioner = $('<ul />');
          	 daysW.append(dayscontaioner);
          	 for(var i =0; i<days.length;i++){
           		var day = $('<li><label for='+days[i].label+'><input id='+days[i].label+' type="checkbox" day_id='+days[i].id+' name='+days[i].label+'/>'+days[i].label+'</label></li>')
           		dayscontaioner.append(day);
           	}
          };
          
        //Creates view for the time labels with all li
       _populateHours = function(){
        	var hoursLabelW = $("<p />");
    		for(var i =0; i<time.length;i++){
    			var label_class = (i%2==0)?"morning-evening":"office-night";
        		var labels = '<label for='+time[i].label+' class="'+label_class+' ez-group-chk"><input _id='+time[i].id+' type="checkbox" class='+time[i].label+'/>'+time[i].label+'</label>';
        		hoursLabelW.append(labels);
    		}
    		hoursW.append(hoursLabelW);
    		for(var i =0; i<days.length;i++){
    			var matrixRowW = $("<ul />").attr('day_id',days[i].id).attr('_name',days[i].label);
        		for(var j =0; j<time.length;j++){
        			var label_class = (j%2==0)?"morning-evening":"office-night";
        			var matrixColW = $("<div />").addClass(label_class).addClass("left").addClass(time[j].label).attr('time_gr_id',time[j].id);
        			var hours = time[j].hours.split(',');
        			for(k in hours){
        				var li = '<li _id='+hours[k]+'>';
        				matrixColW.append(li);
        			}
        			matrixRowW.append(matrixColW);
        		}
        		hoursW.append(matrixRowW);
    		}
      };
      
      //Shows the numeric label of time groups beloe the matrix
	    _showHourSlots = function(){
	    	hoursW.append('<span class="morning-evening in-block">06:00</span>');
	    	hoursW.append('<span class="office-night in-block">10:00</span>');
	    	hoursW.append('<span class="morning-evening in-block">18:00</span>');
	    	hoursW.append('<span class="office-night">22:00</span>');
	    	hoursW.append('<span class="right link_grey">06:00</span>');
	    };
	    
	    
        _populateDays();
        _populateHours();
        _showHourSlots();
        
        var selected_times = new Array();
    	var selected_days  = new Array();
    	var myselection = '';
    	var myselectionString = '';
    	var reqParams= [];
    	
    	var updateMySelection = function(){
    		    myselection = new Array();
    		    var allHourSelected = true;
    			if(selected_days.length> 0){
    				selected_days.sort();
    				for(i in selected_days){
                        var daypart = {};
                        var hours= new Array();
                        for(var j=0;j<24;j++){
                        			if(jQuery(".sourceplate ul[day_id="+selected_days[i]+"] li[_id="+j+"]").hasClass("selected")){
                        				hours.push(j);
                        	}else{
                        		allHourSelected = false;
                        	}
                        }
                        daypart.day = selected_days[i];
                        daypart.hours = hours;
                        myselection[i] = daypart;
    				}
    			}
    			myselection = JSON.stringify(myselection);
    			if(selected_days.length == 7 && allHourSelected){
    				reqParams = JSON.stringify(new Array());
    			}else{
    				reqParams = myselection;
    			}
    	};
    
    	var setSelection = function(day,hour,is_checked){
    		if(is_checked){
    			 $("ul[day_id="+day+"]").find("div[time_gr_id ="+hour+"]").find("li").addClass("selected"); 
    		}else{
    			$("ul[day_id="+day+"]").find("div[time_gr_id ="+hour+"]").find("li").removeClass("selected"); 
    		}
    	};
    	
 	   var updateAllDaysCheckbox = function(is_checked) {
		   var is_all_selected = true;
			for ( var i = 0; i < 7; i++) {
				if (jQuery.inArray(i, selected_days) > -1) {
					if(!updateDaysCheckbox(i)){
						is_all_selected = false; 
					}
				}
			}
			if(is_all_selected && selected_days.length == 7)
				jQuery(".selAll").attr("checked", true).change();
			else
				jQuery(".selAll").attr("checked", false).change();
		 };
    	
    	// Refresh the selection based on the current selected_days and selected_times value
		var refreshSelection = function(day_id, time_goup_id, is_checked) {
			if(day_id === false)
				day_id = -1;
			if (day_id > -1 && time_goup_id) {
				setSelection(day_id, time_goup_id, is_checked);
			} else if (day_id > -1 && !time_goup_id) {
				if(selected_times.length > 0){
					if(is_checked){
						for ( var j in selected_times) {
							setSelection(day_id, selected_times[j], is_checked);
						}
					}else{
						$("ul[day_id="+day_id+"]").find("li").removeClass("selected"); 
					}
				}else{
					for ( var j =1 ;j<5;j++) {
						setSelection(day_id, j, is_checked);
					}
				}

			} else if (day_id == -1 && time_goup_id) {
				for ( var i in selected_days) {
					setSelection(selected_days[i], time_goup_id, is_checked);
				}
			} else {
				for ( var i in selected_days) {
					day = $("ul[day_id=" + selected_days[i] + "]");
					for ( var j in selected_times) {
						setSelection(selected_days[i], selected_times[j],is_checked);
					}
				}
			}
	    	updateAllDaysCheckbox();
			updateMySelection();
			//mySelectionString();
			obj = '{"daypart":' + myselection + '}';
	  		var xx = $.getDaypartSelectionHtml(obj, '');
	  		jQuery('#my_daypart_selection').html(xx);
		};
		 
		 var updateTimeGrpCheckbox = function(time_gr_id,is_checked){
			 if (time_gr_id) {
				if(is_checked){
					for ( var i = 0; i < 7; i++) {
						var tim = time[time_gr_id - 1].hours.split(',');
						day = $("ul[day_id=" + i + "]");
						for (var t in tim) {
							if(!day.find("li[_id="+tim[t]+"]").hasClass("selected")){	
								return ;
							}
						}
					}
					 if(jQuery.inArray(time_gr_id, selected_times) == -1){
						 selected_times.push(parseInt(time_gr_id));
					 }
					jQuery(".source-rgt input[_id="+time_gr_id+"]").attr("checked", true).change();
				}
				else{
					for ( var i = 0; i < 7; i++) {
						var tim = time[time_gr_id - 1].hours.split(',');
						day = $("ul[day_id=" + i + "]");
						for (var t in tim) {
							if(day.find("li[_id="+tim[t]+"]").hasClass("selected")){	
								return ;
							}
						}
					}
					 if(jQuery.inArray(time_gr_id, selected_times) > -1){
						 selected_times.splice(selected_times.indexOf(parseInt(time_gr_id)), 1);
					 }
					jQuery(".source-rgt input[_id="+time_gr_id+"]").attr("checked", false).change();
				}
			}
		 };
		 
		 
		 
		 var updateAllTimeGrpCheckbox = function(is_checked){
			 if(is_checked){
				 for(var i=1;i<5;i++){
					 updateTimeGrpCheckbox(i,is_checked);
				 }
			 }else{
				 selected_times = [];
				 jQuery(".selAll").attr("checked", false).change();
				 jQuery(".source-rgt input[type='checkbox']").attr("checked", false).change();
			 }
		 };
		 
		 var updateDaysCheckbox = function(day_id){
			var day = $("ul[day_id="+day_id+"]");
			 for(var j=0;j<=24;j++){
				 if(day.find("div[time_gr_id ="+j+"]").find("li").hasClass("selected"))
				 {
					 return true;
				 }
			 }
			 if(jQuery.inArray(day_id, selected_days) > -1){
				 selected_days.splice(selected_days.indexOf(day_id), 1);
			 }
			 jQuery(".source-lft input[day_id="+day_id+"]").attr("checked", false).change();
			 jQuery(".selAll").attr("checked", false).change();
			 return false;
		 };
		 
		 var select_all_days = function(){
			 for(var i=0;i<days.length;i++){
				 selected_days.push(parseInt(days[i].id));
				 jQuery(".source-lft input[day_id="+days[i].id+"]").attr("checked", "checked").change();
			 }
		 };
		 
		 var select_all_time_group = function(){
			 for(var i=0;i<time.length;i++){
				 selected_times.push(parseInt(time[i].id));
			 }
		 };
		 
    	var updateCheckBox = function(){
			 for(var i=1;i<5;i++){
				 updateTimeGrpCheckbox(i,true);
			 }
			 for(var i=0;i<7;i++){
				 updateDaysCheckbox(i);
			 }
		 };
		 
		 // Click events
		 // toggle individual li
		 
		 jQuery(".sourceplate li").click(function(){
		    var day_id = parseInt(jQuery(this).parent().parent().attr('day_id'));
		    var time_gr_id = parseInt(jQuery(this).parent().attr('time_gr_id'));
		    var is_checked = false;
	        jQuery(this).toggleClass("selected");
	        if($(this).hasClass("selected")){
	        	is_checked= true;
	        	jQuery(".source-lft input[day_id="+day_id+"]").attr("checked", "checked").change();
	        	if(jQuery.inArray(day_id, selected_days) == -1){
	        		selected_days.push(day_id);
	        	}
	        	//updateTimeGrpCheckbox(time_gr_id);
	    	}else{
	    		//jQuery(".source-rgt input[_id="+time_gr_id+"]").attr("checked", false).change();
	    		updateDaysCheckbox(day_id);
	    	}
	        updateTimeGrpCheckbox(time_gr_id,is_checked);
	        updateMySelection();
	       // mySelectionString();
	        obj = '{"daypart":' + myselection + '}';
	  		var xx = $.getDaypartSelectionHtml(obj, '');
	  		jQuery('#my_daypart_selection').html(xx);
	     });
		 
		 // Select All Checkbox click
		 
		 jQuery(".selAll").click(function(){
			 var is_checked = true;
			 if(jQuery(this).is(":checked")){
				 selected_times = [];
				 selected_days = [];
				 select_all_days();
				 select_all_time_group();
				 jQuery(".source-rgt input[type='checkbox']").attr("checked", "checked").change();
		    	}else{
					 selected_times = [];
					 selected_days = [];
		        	 is_checked = false;
		        	 jQuery(".source-rgt li").removeClass("selected");
		        	 jQuery(".source-rgt input[type='checkbox']").attr("checked", false).change();
		        	 jQuery(".source-lft input[type='checkbox']").attr("checked", false).change();
		    	}
			 refreshSelection(false,false,is_checked);
		 });
		 
		 //select days
		 jQuery(".source-lft").find("ul").find("input[type='checkbox']").click(function(){
	    	var day_id = parseInt(jQuery(this).attr('day_id'));
	    	var is_checked = false;
	    	if($(this).is(":checked")){
	    		is_checked = true;
	    		selected_days.push(day_id);
	    	}else{
	    		selected_days.splice(selected_days.indexOf(day_id), 1);
	    		if(selected_days.length == 0){
	    			jQuery(".source-rgt input[type='checkbox']").attr("checked", false).change();
	    			selected_times = [];
	    		}
	    	}
	    	refreshSelection(day_id,false,is_checked);
	    	if (selected_days.length == 7) {
				for ( var i = 1; i < 5; i++) {
					updateTimeGrpCheckbox(i,is_checked);
				}
			}
	    	
	     });
     
		//select times group
	    jQuery(".source-rgt input[type='checkbox']").click(function(){
	    	var time_id = parseInt(jQuery(this).attr('_id'));
	    	var is_checked = false;
	    	if(jQuery(this).is(":checked")){
	    		is_checked = true;
	    		if(selected_days.length == 0){
	    			select_all_days();
	    		}
	    		selected_times.push(time_id);
	    	}else{
	    		
	    		selected_times.splice(selected_times.indexOf(time_id), 1);
	    	}
	    	refreshSelection(false,time_id,is_checked);
	     });
        
	    
        // PUBLIC functions
                
        this.getOptions = function() {
            return options;
        };
        
        this.getSelectionString = function() {
        	return myselectionString;
        };
        
        this.getSelection = function() {
            return '{"daypart":' + reqParams + '}';
        };

        this.clearSelection = function() {
	    	 selected_times = [];
			 selected_days = [];
        	 is_checked = false;
        	 jQuery(".source-rgt li").removeClass("selected");
        	 jQuery(".source-rgt input[type='checkbox']").attr("checked", false).change();
        	 jQuery(".source-lft input[type='checkbox']").attr("checked", false).change();
        	 refreshSelection(false,false,false);
            return true;
        };
        
        
        this.updateSelection = function(expr) {
        	selected_times = new Array();
        	selected_days  = new Array();
			if (expr) {
				var dayPartObj = JSON.parse(expr);
				if (dayPartObj.daypart) {
					var daypart = dayPartObj.daypart;
					for ( var i = 0; i < daypart.length; i++) {
						var sel = daypart[i];
						var day = parseInt(sel.day);
						jQuery(".source-lft input[day_id="+day+"]").attr("checked", "checked").change();
						selected_days.push(day);
						var hours = sel.hours;
						for ( var j = 0; j < hours.length; j++) {
							$("ul[day_id=" + day + "]").find(
									"li[_id=" + hours[j] + "]").addClass(
									"selected");
						}
					}
				}
			}
        	updateMySelection();
        	//mySelectionString();
            updateCheckBox();
            updateAllDaysCheckbox();
        };
        self.find('input[type="checkbox"]').ezMark();
        self.find('input.iphone-switch').ezMark({checkboxCls:'ez-checkbox-iphone', checkedCls: 'ez-checked-iphone'});
        return self;
    };
    
    $.getDaypartSelectionHtml = function(obj, fromPage){
    	var days = Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
    	var time = [ {'label':'Morning', 'id':"1", "hours" : "6,7,8,9"},
    	             {'label':'Office', 'id':"2" , "hours" : "10,11,12,13,14,15,16,17"},
    	             {'label':'Evening', 'id':"3" , "hours" : "18,19,20,21"},
    	             {'label':'Night', 'id':"4" , "hours" : "22,23,0,1,2,3,4,5"}];
    	var myselectionString = '';
		if(typeof obj == 'string' && obj != ''){
			var dayPartObj = eval('(' + obj + ')');
    		if (dayPartObj.daypart) {
    			if(!jQuery.isEmptyObject(dayPartObj.daypart)){
    				var daypart = dayPartObj.daypart;
    				var allDayAllTimeSelected = true;
    				myselectionString = $('<div />');
    				
    				
    				if(fromPage == 'detail_page' || fromPage == 'review_page'){
    					myselectionString.append('<div class="left">'+
        						'<img align="right" src="/themes/default/css/images/TargetingIcon.png">'+
        						'</div>');
    					var dayWrap = $('<div class="grid_14" />');
    				}else{
    					var dayWrap = $('<ul />');
    				}

    				for ( var i = 0; i < daypart.length; i++) {
    					var dayObj = daypart[i];
    					var allTimeSelected = true;
    					var daylabel = days[parseInt(dayObj.day)];
    					if(fromPage == 'detail_page' || fromPage == 'review_page'){
    						var timeHolder = $('<div class="grid_5" />');
    						if(fromPage == 'detail_page')
    							 timeHolder = $('<div class="grid_8" />');
    						timeHolder.append("<p>"+daylabel+"</p>");
    						var timeWrap = $('<div />').addClass("suggest nudge-up");
    						var timeContainer =  $('<div />');
    					}else{
    						var timeHolder = $('<li />');
    						timeHolder.append(daylabel);
    						var timeWrap = $('<div />').addClass("suggest");
    						var timeContainer =  $('<div />').addClass(' wrap-out')
    					}
    					
    					//timeHolder.append(daylabel);
    					//timeHolder.append('<span class="clear"></span>');
    					
    					
    					//timeWrap.append('<span class="clear"></span>');
    					var timeHours = dayObj.hours;
    					for (j in time) {
    						var timeLabel = time[j].label;
    						var hour = time[j].hours.split(',');
    						var hrh = '', hrv = '', strs = '', stre = '';
    						var timeHWrap = $('<div />').addClass('form-content-left');
    						var timeVWrap = $('<div />').addClass('form-content-right');

    						for (h in hour) {
    							if (jQuery.inArray(parseInt(hour[h]), timeHours) != -1) {
    								stre = '';
    								if (hrh == '') {
    									hrh = time[j].label;
    								}
    								if (strs == '') {
    									strs = parseInt(hour[h]) == 0?24:parseInt(hour[h]);
    								}
    								if (hour.length - 1 == h) {
    									stre = parseInt(hour[h]) + 1;
    								}
    							} else {
    								allTimeSelected = false;
    								allDayAllTimeSelected = false;
    								if (strs != '') {
    									stre =  parseInt(hour[h]) == 0?24:parseInt(hour[h]) ;
    								}
    								if (strs != '' && stre != '') {
    									hrv = (hrv == '') ? strs+'.00' + ' - ' + stre+'.00'
    											: hrv + ', ' + strs+'.00' + ' - ' + stre+'.00';
    								}
    								strs = '';
    							}
    							if (strs != '' && stre != '') {
    								hrv = (hrv == '') ? strs+'.00' + ' - ' + stre+'.00' : hrv
    										+ ', ' + strs+'.00' + ' - ' + stre+'.00';
    							}
    						}
    						if (hrh != '' && hrv != '') {
    							timeHWrap.append(hrh);
    							if(fromPage == 'detail_page' || fromPage == 'review_page'){
    								timeVWrap.append("("+hrv+")");
    							}else{
    								timeVWrap.append(hrv);
    							}
    							timeWrap.append(timeHWrap);
    							timeWrap.append(timeVWrap);
    							timeWrap.append('<span class="clear">');
    						}
    					}
    				    if(allTimeSelected){
    				    	if(fromPage == 'detail_page' || fromPage == 'review_page'){
        						timeWrap =  $('<div />').addClass("suggest nudge-up").html('');
        					}else{
        						timeWrap =  $('<div />').addClass("suggest wrap-out").html('');
        					}
    				    	timeWrap.append('<span class="form-content-left">All Hours</span>');
    				    }
    					timeWrap.append('<span class="clear"></span>');
    					timeContainer.append(timeWrap);
    				    timeHolder.append(timeContainer);
    					dayWrap.append(timeHolder);
    					//dayWrap.append('<span class="wrap-out"></span>');
    					myselectionString.append(dayWrap);
        			}
    				if(allDayAllTimeSelected && daypart.length == 7){
    					var dayWrap = $('<ul />');
    					var timeHolder = $('<li />');

    					timeHolder.append('All Days');
    					if(fromPage == 'detail_page' || fromPage == 'review_page'){
    						var timeWrap =  $('<div />').addClass("suggest"); //Removed nudge-up class for the "All Hours" alignment in detail page.
    					}else{
    						var timeWrap =  $('<div />').addClass("suggest wrap-out");
    					}
				    	timeWrap.append('<span class="form-content-left wrap-out">All Hours</span>');
				    	timeWrap.append('<span class="clear"></span>');
				    	
				    	timeHolder.append(timeWrap);
				    	
				    	dayWrap.append(timeHolder);
				    	
    					myselectionString.html('');
    					myselectionString.append(dayWrap);
    				}
    			}
    		}
    	}
		if(fromPage == 'detail_page' || fromPage == 'review_page'){
			var a = $(myselectionString).find('div.grid_14 > div.grid_5:nth-child(3n)');
			if(fromPage == 'detail_page')
				a = $(myselectionString).find('div.grid_14 > div.grid_8:nth-child(2n)');
			a.after('<div class="clear" /><div class="wrap-out">&nbsp;</div>');
		}
		return myselectionString;    
    };
})(jQuery);
