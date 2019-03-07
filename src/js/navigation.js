
document.addEventListener("DOMContentLoaded", function(event) {

    /* ==================== [Polyfill for IE10] ===================== */
    if (!Array.from) {
        Array.from = (function() {
            var toStr = Object.prototype.toString;
            var isCallable = function(fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            return function from(arrayLike/*, mapFn, thisArg */) {
                var C = this;
                var items = Object(arrayLike);
                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                }
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }
                var len = toLength(items.length);
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                var k = 0;
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                A.length = len;
                return A;
            };
        }());
    }

    /* ==================== [Navigation Panel Mobile] ===================== */

    let btn_nav = document.getElementById('btn_nav'),
        btn_nav__close = document.getElementById('btn_nav__close'),
        nav_panel = document.getElementById('nav_panel');

    btn_nav.addEventListener('click', function() {
        nav_panel.classList.add('header__nav--shown');
    });

    btn_nav__close.addEventListener('click', function() {
        nav_panel.classList.remove('header__nav--shown');
    });

    /* ==================== [Location Input] ===================== */

    let input_location = document.getElementById('input_location'),
        input_location_item =  document.getElementsByClassName('locations__list__item'),
        input_location_results = document.getElementById('location_results');

    input_location.addEventListener('focus', function() {
        if(this.value.length >= 2) {
            input_location_results.style.display = 'block';
        }
    });

    input_location.addEventListener('keyup', function() {
        if(this.value.length >= 2) {
            input_location_results.style.display = 'block';
        } else {
            input_location_results.style.display = 'none';
        }
    });

    Array.from(input_location_item).forEach(function(element) {
        element.addEventListener('click', function() {
            input_location.value = this.innerHTML;
            input_location_results.style.display = 'none';
            /********* Additional Check for Listing Page ********/
            if (document.getElementById('locations_panel')) {
                let locations_panel = document.getElementById('locations_panel');
                if(locations_panel.style.display == 'block') {
                    setTimeout(function () {
                        locations_panel.style.display = 'none';
                        locations_panel.classList.remove('locations--shown');
                    },100);
                }
            }
        });
    });

    input_location.addEventListener('blur', function() {
        setTimeout(function () {
            input_location_results.style.display = 'none';
        },200);
    });

});

