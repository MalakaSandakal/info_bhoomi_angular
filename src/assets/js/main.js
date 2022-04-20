 $('.polygon-tool').css({
  'position' : 'absolute'
 })
 
 /* begin: Dashboard Content Change Dummy */
 var overview_section = $('.overview-section');
 var save_section = $('.save-section');
 var share_section = $('.share-section');
 var bw_mc_section = $('.bw-mc-section'); 
 var sidebar_width = $('.sidebar-col').width();
 var sidebar_details_col = $('.sidebar-details-col');
 var map_section = $('.map-section');
 var btns = document.getElementsByClassName("nav-link");
 var check_class = sidebar_details_col.hasClass('hide');
 var controllers = $('.ol-overlaycontainer-stopevent');
 var toolbar = $('.map-toolbar-sec');

/* UI jquery */
$(document).ready(function() {

  /* Map Section Positioning */
  map_section.css({
    "margin-left": sidebar_width,
  });

  /* Dashboard Section Positioning */
  sidebar_details_col.css({
    "margin-left": sidebar_width
  });

  /* Dashboard Expand Function */
  $(".nav-link").each(function(index) {
    $(this).on("click", function() {

      if (check_class) {
        sidebar_details_col.removeClass('hide');
      } else {
        return;
      }

      toolbar.addClass('go-right-toolbar');
      $('.ol-overlaycontainer-stopevent').addClass('go-right');
    });
  });

  /* Dashboard Close Function */
  $(".btn-sidebar-det-close").click(function() {

    sidebar_details_col.addClass('hide');

    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
    };

    toolbar.removeClass('go-right-toolbar');
    $('.ol-overlaycontainer-stopevent').removeClass('go-right');

  });

  /* Add active class to the current button (highlight it) */
  $(".nav-link").click(function() {

    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
    };

    $(this).addClass('active');

  });

  /* Parcel Click to Open Overview & Active Sidebar Overview */
  $('.expand-btn').click(function() {
    
    overview_section.removeClass('hide-section');
    save_section.addClass('hide-section');
    share_section.addClass('hide-section');

    if (check_class) {
      sidebar_details_col.removeClass('hide');
    } else {
      return;
    }

    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
    };

    $('#overview-btn').addClass('active');

  });

  /* To Be Removed */
  $("#overview-btn").click(function() {
    overview_section.removeClass('hide-section');
    save_section.addClass('hide-section');
    share_section.addClass('hide-section');
    bw_mc_section.addClass('hide-section');
  });
  /* To Be Removed */
  $("#save-btn").click(function() {
    save_section.removeClass('hide-section');
    overview_section.addClass('hide-section');
    share_section.addClass('hide-section');
    bw_mc_section.addClass('hide-section');
  });
  /* To Be Removed */
  $("#share-btn").click(function() {
    share_section.removeClass('hide-section');
    overview_section.addClass('hide-section');
    save_section.addClass('hide-section');
    bw_mc_section.addClass('hide-section');
  });
  /* To Be Removed */
  $("#bw-mc-btn").click(function() {
    bw_mc_section.removeClass('hide-section');
    overview_section.addClass('hide-section');
    save_section.addClass('hide-section');
    share_section.addClass('hide-section');
  });
  /* end: Dashboard Content Change Dummy */

});