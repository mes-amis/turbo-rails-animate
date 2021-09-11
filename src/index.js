window.TurboRailsAnimate = window.TurboRailsAnimate || new function () {
  this.options = {};
  this.inline = false;
  this.element = null;
  this.elements = null;
  this.disappearing = false;
  this.initialized = false;
  this.animations = [
    { name: 'fadeIn', disappear: 'fadeOut', reverse: null },
    { name: 'fadeOut', disappear: true, reverse: null },
    { name: 'fadeInUp', disappear: 'fadeOutUp', reverse: 'fadeInDown' },
    { name: 'fadeOutUp', disappear: true, reverse: 'fadeOutDown' },
    { name: 'fadeInDown', disappear: 'fadeOutDown', reverse: 'fadeInUp' },
    { name: 'fadeOutDown', disappear: true, reverse: 'fadeOutUp' },
    { name: 'fadeInLeft', disappear: 'fadeOutLeft', reverse: 'fadeInRight' },
    { name: 'fadeOutLeft', disappear: true, reverse: 'fadeOutRight' },
    { name: 'fadeInRight', disappear: 'fadeOutRight', reverse: 'fadeInLeft' },
    { name: 'fadeOutRight', disappear: true, reverse: 'fadeOutLeft' },
    { name: 'fadeInUpBig', disappear: 'fadeOutUpBig', reverse: 'fadeInDownBig' },
    { name: 'fadeOutUpBig', disappear: true, reverse: 'fadeOutDownBig' },
    { name: 'fadeInDownBig', disappear: 'fadeOutDownBig', reverse: 'fadeInUpBig' },
    { name: 'fadeOutDownBig', disappear: true, reverse: 'fadeOutUpBig' },
    { name: 'fadeInLeftBig', disappear: 'fadeOutLeftBig', reverse: 'fadeInRightBig' },
    { name: 'fadeOutLeftBig', disappear: true, reverse: 'fadeOutRightBig' },
    { name: 'fadeInRightBig', disappear: 'fadeOutRightBig', reverse: 'fadeInLeftBig' },
    { name: 'fadeOutRightBig', disappear: true, reverse: 'fadeOutLeftBig' },
    { name: 'bounceIn', disappear: 'bounceOut', reverse: null },
    { name: 'bounceOut', disappear: true, reverse: null },
    { name: 'bounceInUp', disappear: 'bounceOutUp', reverse: 'bounceInDown' },
    { name: 'bounceOutUp', disappear: true, reverse: 'bounceOutDown' },
    { name: 'bounceInDown', disappear: 'bounceOutDown', reverse: 'bounceInUp' },
    { name: 'bounceOutDown', disappear: true, reverse: 'bounceOutUp' },
    { name: 'bounceInLeft', disappear: 'bounceOutLeft', reverse: 'bounceInRight' },
    { name: 'bounceOutLeft', disappear: true, reverse: 'bounceOutRight' },
    { name: 'bounceInRight', disappear: 'bounceOutRight', reverse: 'bounceInLeft' },
    { name: 'bounceOutRight', disappear: true, reverse: 'bounceOutLeft' },
    { name: 'flipInX', disappear: 'flipOutX', reverse: 'flipInY' },
    { name: 'flipOutX', disappear: true, reverse: 'flipOutY' },
    { name: 'flipInY', disappear: 'flipOutY', reverse: 'flipInX' },
    { name: 'flipOutY', disappear: true, reverse: 'flipOutX' },
    { name: 'lightSpeedIn', disappear: 'lightSpeedOut', reverse: null },
    { name: 'lightSpeedOut', disappear: true, reverse: null },
    { name: 'rotateIn', disappear: 'rotateOut', reverse: null },
    { name: 'rotateOut', disappear: true, reverse: null },
    { name: 'rotateInDownLeft', disappear: 'rotateOutDownLeft', reverse: 'rotateInUpRight' },
    { name: 'rotateOutDownLeft', disappear: true, reverse: 'rotateOutUpRight' },
    { name: 'rotateInDownRight', disappear: 'rotateOutDownRight', reverse: 'rotateInUpLeft' },
    { name: 'rotateOutDownRight', disappear: true, reverse: 'rotateOutUpLeft' },
    { name: 'rotateInUpLeft', disappear: 'rotateOutUpLeft', reverse: 'rotateInDownRight' },
    { name: 'rotateOutUpLeft', disappear: true, reverse: 'rotateOutDownRight' },
    { name: 'rotateInUpRight', disappear: 'rotateOutUpRight', reverse: 'rotateInDownLeft' },
    { name: 'rotateOutUpRight', disappear: true, reverse: 'rotateOutDownLeft' },
    { name: 'rollIn', disappear: 'rollOut', reverse: null },
    { name: 'rollOut', disappear: true, reverse: null },
    { name: 'zoomIn', disappear: 'zoomOut', reverse: null },
    { name: 'zoomOut', disappear: true, reverse: null },
    { name: 'zoomInUp', disappear: 'zoomOutUp', reverse: 'zoomInDown' },
    { name: 'zoomOutUp', disappear: true, reverse: 'zoomOutDown' },
    { name: 'zoomInDown', disappear: 'zoomOutDown', reverse: 'zoomInUp' },
    { name: 'zoomOutDown', disappear: true, reverse: 'zoomOutUp' },
    { name: 'zoomInLeft', disappear: 'zoomOutLeft', reverse: 'zoomInRight' },
    { name: 'zoomOutLeft', disappear: true, reverse: 'zoomOutRight' },
    { name: 'zoomInRight', disappear: 'zoomOutRight', reverse: 'zoomInLeft' },
    { name: 'zoomOutRight', disappear: true, reverse: 'zoomOutLeft' },
    { name: 'slideInUp', disappear: 'slideOutUp', reverse: 'slideInDown' },
    { name: 'slideOutUp', disappear: true, reverse: 'slideOutDown' },
    { name: 'slideInDown', disappear: 'slideOutDown', reverse: 'slideInUp' },
    { name: 'slideOutDown', disappear: true, reverse: 'slideOutUp' },
    { name: 'slideInLeft', disappear: 'slideOutLeft', reverse: 'slideInRight' },
    { name: 'slideOutLeft', disappear: true, reverse: 'slideOutRight' },
    { name: 'slideInRight', disappear: 'slideOutRight', reverse: 'slideInLeft' },
    { name: 'slideOutRight', disappear: true, reverse: 'slideOutLeft' }
  ];
  let array = [];
  this.animations.forEach((animation) => array.push(animation.name));
  this.animateClasses = array;

  this.init = (options) => {
    let defaults = {
      element: document.querySelector('body'),
      animation: 'fadein',
      duration: '0.3s',
      delay: false,
      reversedDisappearing: false,
      breakpoints: [
        { name: 'mobile', width: 500 },
        { name: 'tablet', width: 1024 },
        { name: 'desktop', width: 1440 }
      ],
      customListeners: false
    };
    options = extend({}, defaults, options);

    TurboRailsAnimate.element = options.element;
    TurboRailsAnimate.setOptions(options);
    if ('scrollRestoration' in history)
      history.scrollRestoration = 'manual';

    if (TurboRailsAnimate.initialized == false && options.customListeners == false) {
      document.addEventListener('turbo:request-start', () => {
        TurboRailsAnimate.disappear();
      });
      window.addEventListener('popstate', () => {
        TurboRailsAnimate.disappear();
      });
      let ignoreBeforeunload = false;
      document.querySelectorAll('a[href^=mailto]').forEach((element) => element.addEventListener('click', () => ignoreBeforeunload = true));
      window.addEventListener('beforeunload', () => {
        if (!ignoreBeforeunload)
          TurboRailsAnimate.disappear();
        ignoreBeforeunload = false;
      });
      document.addEventListener('turbo:before-render', (event) => {
        TurboRailsAnimate.prepareTransition(event.data.newBody);
      });
      document.addEventListener('turbo:render', () => {
        TurboRailsAnimate.transition();
      });
    }

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('click', () => {
        if (typeof element.dataset.TurboRailsAnimateAnimation !== 'undefined')
          TurboRailsAnimate.inline = true;
        TurboRailsAnimate.options.animation = element.dataset.TurboRailsAnimateAnimation || options.animation;
        TurboRailsAnimate.options.appear = element.dataset.TurboRailsAnimateAppear;
        TurboRailsAnimate.options.duration = element.dataset.TurboRailsAnimateDuration || options.duration;
        TurboRailsAnimate.options.delay = element.dataset.TurboRailsAnimateDelay || options.delay;
        TurboRailsAnimate.options.type = element.dataset.TurboRailsAnimateType;
      });
    });

    TurboRailsAnimate.initialized = true;
    if (options.customListeners == false)
      TurboRailsAnimate.appear();
  };

  this.setOptions = (options) => {
    let previousType = TurboRailsAnimate.options.type,
      appear = TurboRailsAnimate.options.appear;

    TurboRailsAnimate.options = {
      animation: options.animation,
      duration: options.duration,
      delay: options.delay,
      reversedDisappearing: options.reversedDisappearing,
      breakpoints: options.breakpoints,
      previousType: previousType,
      appear: appear
    };
  };

  this.prepareTransition = (newBody) => {
    document.querySelectorAll('[data-turbo-rails-animate-transition]').forEach((element) => {
      let properties = element.dataset.TurboRailsAnimateTransition.split(','),
        matchingElements = newBody.querySelectorAll(element.tagName + '[data-turbo-rails-animate-transition]'),
        newElement = null;

      if (matchingElements.length == 1) {
        newElement = matchingElements[0];
      } else if (matchingElements.length > 1) {
        newElement = newBody.querySelector('#' + element.id);
      } else {
        return;
      }

      properties.forEach((property) => {
        newElement.style[cssPropertyToCamelCase(property)] = getComputedStyle(element).getPropertyValue(property);
      });
    });
  };

  this.transition = () => {
    document.querySelectorAll('[data-turbo-rails-animate-transition]').forEach((element) => {
      setTimeout(() => {
        let properties = element.dataset.TurboRailsAnimateTransition.split(',');
        properties.forEach((property) => {
          element.style[cssPropertyToCamelCase(property)] = null;
        });
      }, 1);
    });
  };

  this.appear = () => {
    TurboRailsAnimate.disappearing = false;
    TurboRailsAnimate.toggle();
  };
  this.disappear = () => {
    TurboRailsAnimate.disappearing = true;
    TurboRailsAnimate.toggle();
  };
  this.toggle = () => {
    if (TurboRailsAnimate.options.animation != 'false') {
      TurboRailsAnimate.resetClasses();
      TurboRailsAnimate.getElements();
      TurboRailsAnimate.useOptions();
      Turbolinks.clearCache();
      TurboRailsAnimate.animate();
      TurboRailsAnimate.reset();
    }
  };

  this.getElements = () => {
    TurboRailsAnimate.elements = [];

    function getChildren(parent) {
      let type = TurboRailsAnimate.options.type || TurboRailsAnimate.options.previousType || 'true';
      if (parent.dataset.TurboRailsAnimatePersist == type) {
        return;
      } else if (parent.dataset.TurboRailsAnimatePersistItself == type || parent.querySelectorAll('[data-turbo-rails-animate-persist]').length > 0 || parent.querySelectorAll('[data-turbo-rails-animate-persist-itself]').length > 0) {
        let children = parent.children;
        for (let i = 0; i < children.length; i++) {
          getChildren(children[i]);
        }
      } else {
        TurboRailsAnimate.elements.push(parent);
      }
    }

    getChildren(TurboRailsAnimate.element);
  };
  this.useOptions = () => {
    if (TurboRailsAnimate.elements != null) {
      TurboRailsAnimate.elements.forEach((element) => {
        element.style.animationDuration = TurboRailsAnimate.options.duration;
        if (TurboRailsAnimate.options.delay != false)
          element.style.animationDelay = TurboRailsAnimate.options.delay;
      });
    }
  };

  this.reset = () => {
    delete TurboRailsAnimate.options.appear;
    delete TurboRailsAnimate.options.previousType;
    TurboRailsAnimate.inline = false;
  };
  this.resetClasses = () => {
    if (TurboRailsAnimate.elements != null) {
      TurboRailsAnimate.elements.forEach((element) => {
        TurboRailsAnimate.animateClasses.forEach((animation) => element.classList.remove(animation));
      });
    }
  };

  this.animate = () => {
    let animation = TurboRailsAnimate.getAnimation();

    TurboRailsAnimate.element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', (event) => {
      if (event.currentTarget.dataset.triggered)
        return;
      event.currentTarget.dataset.triggered = true;

      dispatchEvent('turbo:animation-end', { detail: { element: TurboRailsAnimate.element, disappearing: TurboRailsAnimate.disappearing } });
    });

    dispatchEvent('turbo:animation-start', { detail: { element: TurboRailsAnimate.element, disappearing: TurboRailsAnimate.disappearing, animation: animation } });

    TurboRailsAnimate.elements.forEach((element) => {
      element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', () => {
        if (event.currentTarget.dataset.triggered)
          return;
        event.currentTarget.dataset.triggered = true;
        setTimeout(() => {
          if (TurboRailsAnimate.disappearing == false)
            TurboRailsAnimate.resetClasses();
        }, 250);
      });
      TurboRailsAnimate.getClassListFor(animation).forEach((animation) => element.classList.add(animation));
    });
  };
  this.getAnimation = () => {
    let animation;

    if (!TurboRailsAnimate.disappearing)
      animation = TurboRailsAnimate.options.appear;
    if (TurboRailsAnimate.inline) {
      animation = TurboRailsAnimate.options.animation;
    } else if (typeof TurboRailsAnimate.element.dataset.TurboRailsAnimateAnimation !== 'undefined') {
      animation = TurboRailsAnimate.element.dataset.TurboRailsAnimateAnimation;
    } else {
      animation = TurboRailsAnimate.options.animation;
    }

    return animation;
  };
  this.getClassListFor = (animations) => {
    let classList = ['animated'],
      browserWidth = window.innerWidth,
      animation = null;

    let breakpoints = TurboRailsAnimate.options.breakpoints.sort((a, b) => {
      return b.width - a.width;
    });
    breakpoints.forEach((k, breakpoint) => {
      if (animation == null && browserWidth <= breakpoint.width)
        animation = animations[breakpoint.name.toString];
    });
    if (animation == null)
      animation = animations;

    animation = TurboRailsAnimate.animations.filter(object => object.name.toLowerCase() == animation.toLowerCase())[0];
    if (TurboRailsAnimate.disappearing) {
      if (animation.disappear != true)
        animation = TurboRailsAnimate.animations.filter(object => object.name.toLowerCase() == animation.disappear.toLowerCase())[0];
      if (TurboRailsAnimate.options.reversedDisappearing && animation.reverse != null) {
        classList.push(animation.reverse);
      } else {
        classList.push(animation.name);
      }
    } else {
      classList.push(animation.name);
    }

    return classList;
  };
};


function dispatchEvent(name, options = {}) {
  let event = new Event(name, options);
  document.dispatchEvent(event);
}

function extend() {
  for (let i = 1; i < arguments.length; i++)
    for (let key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

function cssPropertyToCamelCase(property) {
  return property.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
}
