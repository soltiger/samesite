var sitePages = {};

var getUrlParameter = function getUrlParameter(sParam) {
   sParameterName = window.location.hash.split('=');
   if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
   }
}

function addSitePage( title, tag, url ) {
  // Add page to sitePages
  sitePages[ tag ] = ( { title: title, tag: tag, url: url} );

  // Add navigation link
  $( ".nav" ).html(
      $( ".nav" ).html()
      + '<li id="' + tag + '">'
      + '<a href="#page=' + tag + '">' + title + '</a>'
      + '</li>'
      )
}

function clearActiveStatus() {
  $.each( Object.keys( sitePages ), function() {
    $( "#" + sitePages[ this ].tag, document ).removeClass( "active" );
  } );
}

function changePage() {
  clearActiveStatus();

  var page = getUrlParameter( "#page" );

  // If page param not given, display first page in sitePages (if exists)
  if( page === undefined ) {
    if( Object.keys( sitePages ).length ) {
      page = Object.keys( sitePages )[0];
    }
    else {
      var url = "empty.html";
    }
  }
  // Otherwise by default show not found
  else {
    url = "404.html";
  }

  // Try to get page meta-data
  pageData = sitePages[ page ];
  if( pageData !== undefined ) {
    url = pageData.url;
    $( "#" + pageData.tag, document ).addClass( "active" );
    $( "#sidebarTitle" ).html( "Current Page: " + pageData.title );
  }

  // Fetch page
  $.ajax( {
      url: url,
      success: function( result ) {
        // Show page
        $( "#page" ).html( result );
      }
   } );
}
