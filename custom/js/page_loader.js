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
      + '<li>'
      + '<a href="#page=' + tag + '">' + title + '</a>'
      + '</li>'
      )
}

function changePage() {
  var page = getUrlParameter("#page");

  // If page param not given, display first page in sitePages (if exists)
  if( page === undefined ) {
    if( Object.keys( sitePages ).length ) {
      var url = sitePages[ Object.keys( sitePages )[0] ].url;
    }
    else {
      var url = "No pages!";
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
