
// Regular expression that matches the vWorker search results page
var RE_VWORKER_SEARCH_RESULTS_URL = 'http://www.vworker.com/RentACoder/SoftwareBuyers/SearchCodersAction.asp?';
//var RE_VWORKER_SEARCH_RESULTS_URL = 'SearchCodersAction.asp';

// XPath expression that returns the checkboxes
var XPATH_CHECKBOXES = '//input[@name="lngCoderPersonId"]'


/**
 * Main object
 */
var vworkerUtil = {
  console : null,

  /**
   * 'load' event handler
   */
  onLoad: function()
  {
    this.initialized = true;

    // add listener to OnPageLoad
    window.addEventListener('DOMContentLoaded', vworkerUtil.onPageLoad, true);
    // init console
    console = Components.classes['@mozilla.org/consoleservice;1'].
        getService(Components.interfaces.nsIConsoleService);
  },


  /**
   * 'DOMContentLoaded' event handler
   */
  onPageLoad: function(aEvent)
  {
    var doc = aEvent.originalTarget;

    if ( vworkerUtil.isSearchResultsUrl(doc) )
    {
      // check if the 'Autoload' feature is activated
      var menuAutoload = document.getElementById('vworker-menu-autoload');

      if (menuAutoload.hasAttribute('checked'))
        vworkerUtil.toggleCheckboxes(doc, true);
    }

  },


  /**
   * Check if the URL belongs to a valid vWorker sellers search results page
   */
  isSearchResultsUrl: function(doc)
  {
    // Check if we load a document, not favicon
    if (doc.nodeName == '#document')
      if (doc.location.href.search(RE_VWORKER_SEARCH_RESULTS_URL) > -1)
          return true;

    return false;
  },


  /**
   * Toggles the state of the sellers' checkboxes 
   * @doc document that contains the search results
   * @checked desired state of the checkboxes
   */
  toggleCheckboxes: function(doc, checked)
  {
    console.logStringMessage(doc.toString());
    // retrieve the checkboxes via XPath
    var nodesSnapshot = doc.evaluate(XPATH_CHECKBOXES, doc, null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

    // toggle them on/off according to the 'checked' param
    for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
      nodesSnapshot.snapshotItem(i).checked = checked;
  },


  /**
   * Enables/disables the context menu items depending on the current URL
   */
  toggleMenuitemsState: function(doc)
  {
    var menuToggleon = document.getElementById('vworker-menu-toggleon');
    var menuToggleoff = document.getElementById('vworker-menu-toggleoff');

    var enabled = vworkerUtil.isSearchResultsUrl(doc);
    
    // enable or disable menuitems
    menuToggleon.setAttribute('disabled', !enabled);
    menuToggleoff.setAttribute('disabled', !enabled);

    return true
  }
}


window.addEventListener('load', vworkerUtil.onLoad, false);

