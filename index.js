// Create viewer
viewer = pannellum.viewer('panorama', {
  "type": "equirectangular",
  "panorama": "Equirectangular.png",
  "hotSpots": [
    { // 3
      "pitch": -3,
      "yaw": -119,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenLeftPanel("historicalArchives") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Historical Archives"
    },
    { // 8
      "pitch": -25,
      "yaw": -40,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("newspaper") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "The Script News"
    },
    // 11
    {
      "pitch": -4,
      "yaw": 31,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("coffeePot") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Coffee Pot"
    },
    {// 4
      "pitch": 5,
      "yaw": 179,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("window") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Window"
    },
    {// 2
      "pitch": 5,
      "yaw": 123,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("artGallery") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Art Gallery"
    },
    {// 1
      "pitch": -12,
      "yaw": 125,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("mindfulness") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Mindfulness"
    },
    {//9
      "pitch": -14,
      "yaw": 70,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("mindfulness") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Earth Action Club"
    },
    {//10
      "pitch": 6,
      "yaw": 61,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("mindfulness") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Sister Constantina Kakonya Mono Print"
    },
    {//5
      "pitch": 14,
      "yaw": -105,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("mindfulness") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Sculpture (name?)"
    },
    {//5
      "pitch": 14,
      "yaw": -73,
      "cssClass": "custom-hotspot",
      "clickHandlerFunc": function () { handleOpenModal("mindfulness") },
      "createTooltipFunc": hotspot,
      "createTooltipArgs": "Sculpture (name?)"
    }

  ],
  // DS 4/12/2020
  // Make it load automatically, and turn on the hotspot debugger.
  "autoLoad": true,
  "hotSpotDebug": true,
  // DS 4/12/2020
  // Here I'm going to configure the camera
  // The ceiling and floors don't look very good,
  // so let's limit the view of it.
  "maxPitch": 65,
  "minPitch": -95
  // Upon testing, this seems to work best at lower resolutions.
  // We may want to move the viewer into a fixed size window, but that might make it strange on mobile.
  // Haven't yet tested this on mobile - this change can be removed if it doesn't work out.
});

/*begin global constants*/
var VERSION = '0.2';
var RIGHT_SIDEPANEL_ID = 'rightSidepanel';
var LEFT_SIDEPANEL_ID = 'leftSidepanel';
var MODAL_ID = 'modal';
var LEFT_SIDEPANEL_CLOSE_ID = 'leftSidepanelClose';
var RIGHT_SIDEPANEL_CLOSE_ID = 'rightSidepanelClose';
var MODAL_CLOSE_ID = 'modalClose';
var CONTENT_CONTAINER_SHOW_CLASS = 'show-contentContainer';
var CONTENT_SHOW_CLASS = 'show-content';
/*end global constants*/

console.log('VERSION: ' + VERSION);

function handleOpenLeftPanel(hotspotContentId) {
  handleOpenContentContainer(hotspotContentId, LEFT_SIDEPANEL_ID);
}

function handleOpenRightPanel(hotspotContentId) {
  handleOpenContentContainer(hotspotContentId, RIGHT_SIDEPANEL_ID);
}

function handleOpenModal(hotspotContentId) {
  handleOpenContentContainer(hotspotContentId, MODAL_ID);
}

function closeAllOpenContentHolders(classThatDeterminesHideShow) {
  elementsToHide = document.getElementsByClassName(classThatDeterminesHideShow);

  Array.prototype.forEach.call(elementsToHide, function (hotspot) {
    hotspot.classList.remove(classThatDeterminesHideShow)
  });
}

function handleOpenContentContainer(hotspotContentId, contentContainerId) {
  closeAllOpenContentHolders(CONTENT_SHOW_CLASS);
  closeAllOpenContentHolders(CONTENT_CONTAINER_SHOW_CLASS);

  var contentContainer = document.getElementById(contentContainerId);
  var hotspotContentDiv = document.getElementById(hotspotContentId);

  setTimeout(function () {
    contentContainer.classList.add(CONTENT_CONTAINER_SHOW_CLASS);
    hotspotContentDiv.classList.add(CONTENT_SHOW_CLASS);
  }, 500);
}

function addCloseClickHandlers(contentContainerId, contentContainerCloseId) {
  var contentContainer = document.getElementById(contentContainerId);
  var contentContainerClose = document.getElementById(contentContainerCloseId);

  contentContainerClose.addEventListener('click', function () {
    contentContainer.classList.remove(CONTENT_CONTAINER_SHOW_CLASS);
  }, false)
}

function addContentContainerActions() {
  addCloseClickHandlers(RIGHT_SIDEPANEL_ID, RIGHT_SIDEPANEL_CLOSE_ID)
  addCloseClickHandlers(LEFT_SIDEPANEL_ID, LEFT_SIDEPANEL_CLOSE_ID)
  addCloseClickHandlers(MODAL_ID, MODAL_CLOSE_ID)
}

/*start pannellum setup code*/
function hotspot(hotSpotDiv, args) {
  hotSpotDiv.classList.add('custom-tooltip');
  var span = document.createElement('span');
  span.innerHTML = args;
  hotSpotDiv.appendChild(span);
  span.style.width = span.scrollWidth - 20 + 'px';
  span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
  span.style.marginTop = -span.scrollHeight - 12 + 'px';
}
/*end pannellum setup code*/


/*start custom function calls*/
addContentContainerActions();
/*end custom function calls*/


//ES, 4-17-20, I tried to create a carousel
//but I couldn't quite get it to work.
//I think the issue is in determining the width of the slide in the slides array.
//When I tried "console.log(slideWidth);" to check if it was working, it returned 0.
//Maybe this is because it's in a modal window.
//I followed a tutorial, I wouldn't know how to do this otherwise.
//I spent a good deal of time on it so I wanted to put it here, but feel free to change this so we have something that works!

/*start art gallery code*/
/*
var track = document.querySelector('.carousel_track');
var slides = Array.from(track.children);
var nextButton = document.querySelector('#buttonRight');
var prevButton = document.querySelector('#buttonLeft');
var dotsNav = document.querySelector('.carousel_nav');
var dots = Array.from(dotsNav.children);

var slideWidth = slides[0].getBoundingClientRect().width;

console.log(track.children);

//Arrange the slides next to one another
var setSlidePosition = function(slide, index) {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

var moveToSlide = function(track, currentSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

//When I click right, move slides to the right
nextButton.addEventListener('click', e => {
  var currentSlide = track.querySelector('.current-slide');
  var nextSlide = currentSlide.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
})

//When I click left, move slides to the left
prevButton.addEventListener('click', e => {
  var currentSlide = track.querySelector('.current-slide');
  var prevSlide = currentSlide.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);
})


//Whn I click nav indicators, move to that slides
dotsNav.addEventListener('click', e => {
  // what indicator was clicked on?
  var targetDot = e.target.closest('button');

  if (!targetDot) return;

  var currentSlide = track.querySelector('.current-slide');
  var currentDot = dotsNav.querySelector('.current-slide');
  var targetIndex = dots.findIndex(dot => dot === targetDot);
  console.log(targetIndex);
})
*/
/*end art gallery code*/
