import Swup from 'swup';
import SwupFragmentPlugin from '@swup/fragment-plugin';

document.addEventListener("DOMContentLoaded", function () {
  const swup = new Swup({
      plugins: [new SwupFragmentPlugin()]
  });

  swup.on('contentReplaced', () => {
      document.documentElement.classList.remove('is-leaving');
      document.documentElement.classList.add('is-animating');
  });

  swup.on('animationOutDone', () => {
      document.documentElement.classList.add('is-leaving');
  });
});
