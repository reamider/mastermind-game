/*jshint jquery: true, devel: true */
$(function () {
    alert('Zacznij grę!');
});

$(document).ready(function () {
	$('#size').val('');
    $('#dim').val('');
    $('#max').val('');
	
	
	$('#zagraj').click(function () {
		var size = $("#size").val();
        var dim = $("#dim").val();
        var max = $("#max").val();
		
		var linkiRest = function(){
            if($('#size').val() !== '' && $('#dim').val() !== '' && $('#max').val() !== ''){
                var urlRest = "/play/size/" + size + "/dim/" + dim + "/max/" + max + "/";
                return urlRest;
            }
        };
		
		var poleGry = function(){            
            $('#zagraj').hide();
            $('#size').hide();
            $('#dim').hide();
            $('#max').hide();
        };    

		$.ajax({
            method: 'GET',
            urlRest: linkiRest()
                }).done(function(data){
                    poleGry();
                });
            });  
});