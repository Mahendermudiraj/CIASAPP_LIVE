
function retriveColumns() {
		columnbox();
		if($('#table_select').val()){
			
			// assigning table select value to columns toggle while retrieving favorite list js
			$("#table_btn").val($('#table_select').text().trim()+"(Fields)");
			$("#table_btn_join").hide();
		     $.ajax({   
	    	        type : "POST",
	                url : 'retriveColumns',
	                dataType : "json",
	                data : $('#table_select').val(),
	                contentType : "application/json; charset=utf-8",
	                error : function(xhr, status, error) {
	                    closeModal();
	                },
	                beforeSend : function() {
	                    if ($("#table_select").hasClass("table_select_error"))
	                        $("#table_select").removeClass("table_select_error");
	                    openModal();
	                },
	                success : function(response) {
	                 //clearAllFilterFields();
	                    closeModal();
	                    localStorage.setItem("dbColumns", JSON.stringify(response));
	                    $.each(response,function(i, value) {
	                           if(isNumber(value)){
	                              $('#columns').append($("<li class = 'active'>")
	                                           .append($("<a class='btn btn-secondary' style='background-color:#566573;color:white' data-toggle='collapse' aria-expanded='false'>")
	                                           .text("(P) "+getAppLabel(response,value.name))
	                                           .attr({  href:'#'+stringRemove(value.name), id : "drag" +i, }))
	                                           .append($("<ul class='collapse list-unstyled'>")
	                                           .attr('id',stringRemove(value.name))
	                                           .append($("<li>") 
	                                           .append($("<a class='btn btn-secondary' style='background-color:#566573;color:white'>")
	                                           .text("(P) "+getAppLabel(response,value.name))
	                                           .attr({value:value.name+' AS '+stringRemove(value.name),onclick:'moveButton(this)',id : "drag" +i, })))
	                                  
	                                           .append($("<li>")
	                                           .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                           .text('SUM('+"(P) "+getAppLabel(response,value.name)+')')
	                                           .attr({ value:'SUM('+value.name+') As '+'Sum'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                           
	                                           .append($("<li>")
	                                           .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                           .text('AVG('+"(P) "+getAppLabel(response,value.name)+')')
	                                           .attr({ value:'AVG('+value.name+') As '+'Avg'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                           .append($("<li>") 
	                                           .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                           .text('MIN('+"(P) "+getAppLabel(response, value.name)+')')
	                                           .attr({value:'MIN('+value.name+') As '+'Min'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                           .append($("<li>") 
	                                           .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                           .text('MAX('+"(P) "+getAppLabel(response,value.name)+')')
	                                           .attr({value:'MAX('+value.name+') As '+'Max'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                           )); 
	                                        } else if(isRequired(value) && isString(value) ){
	                                               $('#columns').append($("<li class = 'active'>")
	                                                            .append($("<a type ='button' class ='btn btn-secondarys' style='background-color:#EC7063;color:white;' data-toggle = 'dropdown'>")
	                                                            .text("(P) "+getAppLabel(response,value.name))
	                                                            .attr({ href : '#'+ value.name,value : value.name+' AS '+stringRemove(value.name),onclick : 'moveButton(this)',id : "drag"+ i,})));
	                                              } else{
	                                            	  $('#columns').append($("<li class = 'active'>")
	                                                            .append($("<a type ='button' class ='btn btn-secondarys' style='background-color:#566573;color:white' data-toggle = 'dropdown'>")
	                                                            .text("(P) "+getAppLabel(response,value.name))
	                                                            .attr({ href : '#'+ value.name,value : value.name+' AS '+stringRemove(value.name),onclick : 'moveButton(this)',id : "drag"+ i,})));
	                                              }
	                            
	                                        if (isRequired(value)) {
	                                        	
	                                        	$('#s1').append($('<option></option>')
	                                            		.text("")
	                                                    .attr({ value : "", }));
	                                        	
	                                            $('#s1').append($('<option></option>')
	                                                    .text(getAppLabel(response,value.name))
	                                                    .attr({ value : value.name,style : 'color:red;', }));
	                                            
	                                            $('#pri').append($('<option></option>')
	                                                    .text(getAppLabel(response,value.name))
	                                                    .attr({ value : value.name,style : 'color:red;', }));
	                                            
	                                            $('#pri2').append($('<option></option>')
	                                                    .text(getAppLabel(response,value.name))
	                                                    .attr({ value : value.name,style : 'color:red;', }));
	                                            
	                                        } else if (isString(value)) {
	                                        	
	                                        	$('#s1').append($('<option></option>')
	                                            		.text("")
	                                                    .attr({ value : "", }));
	                                        	
	                                            $('#s1').append($('<option></option>')
	                                                    .text(getAppLabel(response,value.name))
	                                                    .attr({value : value.name,}));
	                                        } else {
	                                        	
	                                        	$('#s1').append($('<option></option>')
	                                            		.text("")
	                                                    .attr({ value : "", }));
	                                        	
	                                            $('#s1').append($('<option></option>')
	                                                    .text(getAppLabel(response,value.name))
	                                                    .attr({value : value.name,}));
											    }
										});
	                    openNav();
	                    validateSelectedValue();
						filterColumns(response)
					},
				});
		}
	}


	function retriveJoinColumns() {
		if($('#table_select2').val()){
			
			 $("#table_btn_join").show();
			 $("#jointablediv").slideToggle();
			 $("#jf").slideToggle();
			 $("#joindivArea").slideToggle();
			
			// assigning table select value to columns toggle while retrieving favorite list js
	        $("#table_btn_join").val($('#table_select2').text().trim()+"(Fields)");
	  
	    $.ajax({   
	        type : "POST",
	        url : 'retriveColumns',
	        dataType : "json",
	        data : $('#table_select2').val(),
	        contentType : "application/json; charset=utf-8",
	        error : function(xhr, status, error) {
	            closeModal();
	        },
	        beforeSend : function() {
	            if ($("#table_select2").hasClass("table_select_error"))
	                $("#table_select2").removeClass("table_select_error");
	            openModal();
	        },
	        success : function(response) {
	       // clearAllFilterJoinFields();
	            closeModal();
	            localStorage.setItem("JoindbColumns", JSON.stringify(response));
	            $.each(response,function(i, value) {
	                   if(isNumber(value)){
	                      $('#columnsJoin').append($("<li class = 'active'>")
	                                   .append($("<a class='btn btn-secondary' style='background-color:#3F729B;color:white' data-toggle='collapse' aria-expanded='false'>")
	                                   .text("(S) "+getAppLabel(response,value.name))
	                                   .attr({  href:'#'+stringRemove(value.name), id : "drag" +i, }))
	                                   .append($("<ul class='collapse list-unstyled'>")
	                                   .attr('id',stringRemove(value.name))
	                                   .append($("<li>") 
	                                   .append($("<a class='btn btn-secondary' style='background-color:#3F729B;color:white'>")
	                                   .text("(S) "+getAppLabel(response,value.name))
	                                   .attr({value:value.name+' AS '+stringRemove(value.name),onclick:'moveButton(this)',id : "drag" +i, })))
	                                   
	                                    .append($("<li>")
	                                    .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                    .text('SUM('+"(S) "+getAppLabel(response,value.name)+')')
	                                    .attr({ value:'SUM('+value.name+') As '+'Sum'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                   
	                                   .append($("<li>")
	                                   .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                   .text('AVG('+"(S) "+getAppLabel(response,value.name)+')')
	                                   .attr({ value:'AVG('+value.name+') As '+'Avg'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                   .append($("<li>") 
	                                   .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                   .text('MIN('+"(S) "+getAppLabel(response, value.name)+')')
	                                   .attr({value:'MIN('+value.name+') As '+'Min'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                   .append($("<li>") 
	                                   .append($("<a class='btn btn-secondary' style='border-color:green'>")
	                                   .text('MAX('+"(S) "+getAppLabel(response,value.name)+')')
	                                   .attr({value:'MAX('+value.name+') As '+'Max'+stringRemoveOFlabel(value.name),onclick :'moveButton(this)',id : "drag" +i,}))) 
	                                   )); 
	                                } else if(isRequired(value) && isString(value) ){
	                                       $('#columnsJoin').append($("<li class = 'active'>")
	                                                    .append($("<a type ='button' class ='btn btn-secondary' style='background-color:#EC7063;color:white;' data-toggle = 'dropdown'>")
	                                                    .text("(S) "+getAppLabel(response,value.name))
	                                                    .attr({ href : '#'+ value.name,value : value.name+' AS '+stringRemove(value.name),onclick : 'moveButton(this)',id : "drag"+ i,})));
	                                      } else{
	                                    	  $('#columnsJoin').append($("<li class = 'active'>")
	                                                    .append($("<a type ='button' class ='btn btn-secondary' style='background-color:#3F729B;color:white' data-toggle = 'dropdown'>")
	                                                    .text("(S) "+getAppLabel(response,value.name))
	                                                    .attr({ href : '#'+ value.name,value : value.name+' AS '+stringRemove(value.name),onclick : 'moveButton(this)',id : "drag"+ i,})));
	                                      }
	                    
	                                if (isRequired(value)) {
	                                	
	                                	$('#sj').append($('<option></option>')
                                        		.text("")
                                                .attr({ value : "", }));
	                                	
	                                    $('#sj').append($('<option></option>')
	                                            .text(getAppLabel(response,value.name))
	                                            .attr({ value : value.name,style : 'color:red;', }));
	                                    
	                                    $('#sec').append($('<option></option>')
	                                            .text(getAppLabel(response,value.name))
	                                            .attr({ value : value.name,style : 'color:red;', }));
	                                    
	                                    $('#sec2').append($('<option></option>')
	                                            .text(getAppLabel(response,value.name))
	                                            .attr({ value : value.name,style : 'color:red;', }));
	                                    
	                                } else if (isString(value)) {
	                                	
	                                	$('#sj').append($('<option></option>')
                                        		.text("")
                                                .attr({ value : "", }));
	                                	
	                                    $('#sj').append($('<option></option>')
	                                            .text(getAppLabel(response,value.name))
	                                            .attr({value : value.name,style : 'color:green;',}));
	                                } else {
	                                	
	                                	$('#sj').append($('<option></option>')
                                        		.text("")
                                                .attr({ value : "", }));
	                                	
	                                    $('#sj').append($('<option></option>')
	                                            .text(getAppLabel(response,value.name))
	                                            .attr({value : value.name,style : 'color:green;',}));
							  		    }
								});
	            
				     validateSelectedValue();
						/*openNav();*/
					 filterColumns(response)
					},
				});
	       }
      }	
	
	
function filterColumns(response) {
	var parameter=localStorage.getItem("parameter");
	var parameterObj = parameter.split(',');
	$.each(parameterObj, function(key, value) {
		$("#columns li a").each(function() {
			var text = $(this).attr("value");
			if (value == text) {
				$(this).detach().appendTo('#drag');
			}
		});

	});
	
	$.each(parameterObj, function(key, value) {
		$("#columnsJoin li a").each(function() {
			var textjoin = $(this).attr("value");
			if (value == textjoin) {
				$(this).detach().appendTo('#drag');
			}
		});

	});
//localStorage.setItem("parameter", "");
}



// check box select 

$('.checkid').click(function(){
	 var valu="";
	 var valu1="";
	 valu=$(this).val();
	 if ($(this).is(":checked")) {
		 $("input[id='checkid2']:checkbox").each(function(){
			 valu1=$(this).val();
			 if(valu == valu1) {
				 $(this).prop('checked',true);
			 }
		});  
	 } else {
		 $("input[id='checkid2']:checkbox").each(function(){
			 valu1=$(this).val();
			 if(valu == valu1) {
				 $(this).prop('checked',false);
			 }
		});
	 }
	 
});

$('.checkid1').click(function(){
	 var valu="";
	 var valu1="";
	 valu=$(this).val();
	 if ($(this).is(":checked")) {
		 $("input[id='checkid1']:checkbox").each(function(){
			 valu1=$(this).val();
			 if(valu == valu1){
				 $(this).prop('checked',true);
			 } 
		});  
	 } else {
		 $("input[id='checkid1']:checkbox").each(function(){
			 valu1=$(this).val();
			 if(valu == valu1){
				 $(this).prop('checked',false);
			 } 
		});  
	 }
	  
});
