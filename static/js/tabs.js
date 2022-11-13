$(document).ready(function () {
    // Add active class on tab click
    $(".tab").on("click", function () {
      var categoryId = $(this).data("id");
  
      $(".tab, .tab-pane").removeClass("active");
      $(this).addClass("active");
      $("#" + categoryId).addClass("active");
    });
  });