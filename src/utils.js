/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-else-return */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
import {
    Dimensions,
    Platform,
    Share,
  } from 'react-native';

export const baseURL = "https://www.nowtv.com/";
export const getHeight = () => Dimensions.get('window').height;
export const getWidth = () => Dimensions.get('window').width;
let h = 0;
let w = 0;
const iphone8PlusOrLessRatio = (16/9)+ 0.3;

// Returns 0 if iphone 8plus or less, 1 if X or more
export const isRatioXOrMore = () => {
  h = !h ? getHeight() : h;
  w = !w ? getWidth() : w;
  const realRatio = (h / w);
  const r = realRatio > iphone8PlusOrLessRatio;
  return r};

export const isPortrait = () => getHeight() >= getWidth();

export const capitalizeFirstLetter = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const isAndroid = Platform.OS==='android';

export const getSharePressAction = item => Share.share({
  message: item.message,
  url: `https://www.nowtv.com/`,
  title: `NowTV User - ${item.firstName} ${item.lastName}`
}, {
  // Android only:
  dialogTitle: item.title,
});

// eslint-disable-next-line consistent-return
export const imageRandomiser = (id) => {
  // randomiserCallReverse = !randomiserCallReverse;
  const randomImg = [
    require("../assets/images/generic/Generic1.jpg"),
    require("../assets/images/generic/Generic2.jpg"),
    require("../assets/images/generic/Generic3.jpg"),
    require("../assets/images/generic/Generic4.jpg"),
    require("../assets/images/generic/Generic5.jpg"),
    require("../assets/images/generic/Generic6.jpg"),
    require("../assets/images/generic/Generic7.jpg"),
    require("../assets/images/generic/Generic8.jpg"),
    require("../assets/images/generic/Generic9.jpg"),
    require("../assets/images/generic/Generic10.jpg"),
  ];
  const randZeroCheck = rand => (rand < 1) ? rand + 1 : rand
  let rand = getRandomNumberByHexIDAndArray(id, randomImg);
  rand = (rand > randomImg.length) ? rand - randomImg.length : randZeroCheck(rand);
  rand = randomImg.length - rand;
  return randomImg[randZeroCheck(rand)-1];
}

export const getRandomNumberByHexIDAndArray = (id, array) => 
  Math.floor((Math.floor(parseInt(id.substring(id.length-2, id.length),16)) / 127 ) * array.length) % array.length

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing. args = func, wait, immediate
export function debounce(...args) {
  var timeout;

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return () => {
    // Store the context of this and any
    // parameters passed to executedFunction
    var context = this;
	    
    // The function to be called after 
    // the debounce time has elapsed
    var later = () => {
      // null timeout to indicate the debounce ended
      timeout = null;
	    
      // Call function now if you did not on the leading end
      if (!args[2]) args[0].apply(context, args);
    };

    // Determine if you should call the function
    // on the leading or trail end
    var callNow = args[2] && !timeout;
	
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the 
    // inside of the previous setTimeout  
    clearTimeout(timeout);
	
    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs node)
    timeout = setTimeout(later, args[1]);
	
    // Call immediately if you're dong a leading
    // end execution
    if (callNow) args[0].apply(context, args);
  };
};

export const throttled = (func, limit) => {
  let inThrottle
  // eslint-disable-next-line func-names
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      // eslint-disable-next-line no-return-assign
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function debounced(fn,delay) {
  let timerId;
  // eslint-disable-next-line func-names
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}