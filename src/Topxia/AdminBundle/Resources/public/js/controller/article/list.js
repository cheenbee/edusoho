define(function(require, exports, module) {

	exports.run = function() {
		$("#article-table").on('click', '[data-role=trash-item]', function(){
			$.post($(this).data('url'), function(){
				window.location.reload();
			});
		});

		$("#article-table").on('click', '[data-role=publish-item]', function(){
			$.post($(this).data('url'), function(){
				window.location.reload();
			});
		});	

		$("#article-table").on('click', '[data-role=unpublish-item]', function(){
			$.post($(this).data('url'), function(){
				window.location.reload();
			});
		});	

		$("#article-table").on('click', '[data-role=delete-item]', function(){
			if (!confirm('真的要永久删除该内容吗？')) {
				return ;
			}
			$.post($(this).data('url'), function(){
				window.location.reload();
			});
		});

		$(".featured-label").on('click', function() {
			var $self = $(this);
			var span = $(".featured-label").find('span');
			var spanClass = span.attr('class');
			var postUrl = "";

			if(spanClass == "label label-default"){
				postUrl = $self.data('setUrl');
			}else{
				postUrl = $self.data('cancelUrl');
			}
			$.post(postUrl, function(response) {
				var status = response.status;
				var labelStatus = "label label-"+status;
				span.attr('class',labelStatus)
			});
		});		

		$(".promoted-label").on('click', function(){

			var $self = $(this);
			var span = $(".promoted-label").find('span');
			var spanClass = span.attr('class');
			var postUrl = "";

			if(spanClass == "label label-default"){
				postUrl = $self.data('setUrl');
			}else{
				postUrl = $self.data('cancelUrl');
			}

			console.log(postUrl);
			$.post(postUrl, function(response) {
				var status = response.status;
				var labelStatus = "label label-"+status;
				span.attr('class',labelStatus)
			});
		});		

		$(".sticky-label").on('click', function(){
		
			var $self = $(this);
			var span = $(".sticky-label").find('span');
			var spanClass = span.attr('class');
			var postUrl = "";
			
			if(spanClass == "label label-default"){
				postUrl = $self.data('setUrl');
			}else{
				postUrl = $self.data('cancelUrl');
			}

			$.post(postUrl, function(response) {
				var status = response.status;
				var labelStatus = "label label-"+status;
				span.attr('class',labelStatus)
			});
		});

		var $container = $('#aticle-table-container');
		var $table = $('#article-table');
		 require('../../util/batch-select')($container);
		 require('../../util/batch-delete')($container);
		 require('../../util/item-delete')($container);
	};

});