
$(document).ready(function() {

	html2canvas( $("#screen"), {

		onrendered: function( canvas ) {

			var touchArea = document.getElementById('touch-area');
			var touchAreaHeight = parseInt( $("#touch-area").height() );
			var device = document.getElementById('device');
			var $blurCanvas = $(canvas)
			.addClass('blur-canvas')
			.css({
				"-webkit-filter": "blur(10px)",
				"-moz-filter": "blur(10px)",
				"-ms-filter": "blur(10px)",
				"-o-filter": "blur(10px)",
				"filter": "blur(10px)"
			});


			function expandNotificationPanel() {

				$("#notification").animate({

					height: touchAreaHeight + 'px'

				}, 550, 'easeOutBounce', function() {

					$("#notification")
					.removeClass('pull-out-start')
					.addClass('pull-out-end');

				});

			}


			function compressNotificationPanel() {

				$("#notification").animate({

					height: 0 

				}, 550, 'easeInOutQuart', function() {

					$("#notification")
					.removeClass('pull-out-end')
					.removeClass('push-back-start');

				});

			}


			$("#notification").prepend( $blurCanvas );


			Hammer( device ).on( 'drag', function( e ) {

				var deviceOffsetY = e.gesture.srcEvent.offsetY;

				// start to pull out notification panel from top edge.
				if ( deviceOffsetY > 0 && deviceOffsetY < 5 ) {
					if ( ! $("#notification").hasClass('pull-out-start') &&
					     ! $("#notification").hasClass('pull-out-end') ) {
						$("#notification").addClass('pull-out-start');	
					}
				}

				// start to push back notification panel from bottom edge.
				if ( deviceOffsetY < 690 && deviceOffsetY > 683 ) {
					if ( $("#notification").hasClass('pull-out-end') && 
						 ! $("#notification").hasClass('push-back-start') ) {
						$("#notification")
						.addClass('push-back-start');	
					}
				}

			// end of drag handler on device.
			});


			Hammer( touchArea ).on( 'drag', function( e ) {

				var touchAreaOffsetY = e.gesture.srcEvent.offsetY;

				/** 
				 * pull out notification panel from top edge.
				 *
				 * if : 
				 * 	1. the notification panel has been dragged out from the top edge; 
				 * 	2. you move your finger/mouse within the $('#touch-area') area;
				 *
				 * then : 
				 * 	we are fine to drag it down the way.
				 *
				 */
				if ( $("#notification").hasClass('pull-out-start') &&
				     touchAreaOffsetY > 0 ) {

					if ( touchAreaOffsetY > touchAreaHeight ) $("#notification").height( touchAreaHeight );
					else $("#notification").height( touchAreaOffsetY );

				}

				/** 
				 * push back notification panel from bottom edge.
				 *
				 * if : 
				 * 	1. the notification panel has reached to bottom edge; 
				 * 	2. the notification panel has been dragged from the bottom edge; 
				 * 	3. you move your finger/mouse within the $('#touch-area');
				 *
				 * then : 
				 * 	we are fine to drag it down the way.
				 *
				 */
				if ( $("#notification").hasClass('pull-out-end') &&
					 $("#notification").hasClass('push-back-start') &&
				     touchAreaOffsetY > 0 ) {

					if ( touchAreaOffsetY > touchAreaHeight ) $("#notification").height( touchAreaHeight );
					else $("#notification").height( touchAreaOffsetY );

				}

			// end of drag handler on touchArea.
			});


			/* put the notification panel into its right places 
			 * at the end of the dragging if your finger/mouse
			 * was still in the $('#touch-area').
			 */
			Hammer( touchArea ).on( 'dragend', function( e ) {

				if ( $("#notification").hasClass('pull-out-start') ) {

					expandNotificationPanel();

				}

				if ( $("#notification").hasClass('pull-out-end') &&
					 $("#notification").hasClass('push-back-start') ) {

					compressNotificationPanel();

				}

			// end of dragend handler on touchArea.
			});


			/* get the notification panel moved to the right 
			 * places in case you moved finger/mouse out of
			 * the $('#touch-area').
			 */
			Hammer( device ).on( 'dragend', function( e ) {

				var dragEndDeviceOffsetY = e.gesture.srcEvent.offsetY;

				if ( $("#notification").hasClass('pull-out-start') &&
				     dragEndDeviceOffsetY > touchAreaHeight ) {

					expandNotificationPanel();

				}

				if ( $("#notification").hasClass('pull-out-end') &&
					 $("#notification").hasClass('push-back-start') ) {

					compressNotificationPanel();

				}

			// end of dragend handler on device.
			});

		// end of html->canvas onredered handler.
		}

	// end of html->canvas.
	});

// end of document ready callback.
});