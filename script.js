'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $newBtn = $('#new');
const $rollBtn = $('#roll');
const $holdBtn = $('#hold');
const $rulesBtn = $('#rules');
const $aboutBtn = $('#about');
const $dice = $('.dice');
const $$players = $$('.player');
const $titlePlayer0 = $('.player__title-0');
const $titlePlayer1 = $('.player__title-1');
const $modal = $('.modal');
const $closeModal = $('.modal__Close-btn');
const $modalContent = $('.modal__content');

let currentPlayer = 0;
let current = 0;
const maxScore = 100;
const score = [0, 0];
let dice;

const rulesHTML = `
  <h2>Pig game - Rules</h2>
  <h3>Objective:</h3>
  <p>The first player to reach 100 points or more wins the game.</p>
  <h3>Gameplay:</h3>
  <ol class="game__rules">
    <li>
      <p>
        Each turn, a player rolls a the die with the roll button as many
        times as they wish and accumulates points equal to the sum of
        the numbers rolled.
      </p>
    </li>
    <li>
      <p>
        If a player rolls a "1," their turn ends and they lose all the
        points accumulated during that turn.
      </p>
    </li>
    <li>
      <p>
        If a player chooses to "hold" before rolling a "1," they keep
        the points they've earned that turn and add them to their
        overall score.
      </p>
    </li>
    <li>
      <p>
        The game continues with each player taking turns until one
        player reaches 100 points or more.
      </p>
    </li>
  </ol>
  `;

const aboutHTML = `<h2>Pig game - About</h2>
  <p>
    This is a really small project created to practice HTML, CSS,
    Javascript and DOM manipulation.
  </p>
  <p>
    The project is part of the Jonas Schmedtmann's The Complete
    JavaScript Course 2023: From Zero to Expert! course, I added a few
    additional feautures such as responsive view and accessibility.
  </p>`;

const rollDice = () => {
  return Math.ceil(Math.random() * 6);
};

const resetCurrent = () => {
  current = 0;
  $(`#current-score__player-${currentPlayer}`).textContent = current;
};

const switchActivePlayer = () => {
  $$players.forEach((player) => player.classList.remove('player__active'));
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  $(`.player__${currentPlayer}`).classList.add('player__active');
};

const init = () => {
  $$players.forEach((player) =>
    player.classList.remove('player__active', 'player__winner')
  );
  currentPlayer = 0;
  current = 0;
  score.forEach((_, i) => (score[i] = 0));
  $titlePlayer0.textContent = 'Player 1';
  $titlePlayer1.textContent = 'Player 2';
  $$('.score__final').forEach((score) => (score.textContent = 0));
  $$('.current__score').forEach((currScore) => (currScore.textContent = 0));
  $('.player__0').classList.add('player__active');
  dice = 0;
  $dice.classList.add('hidden');
  $holdBtn.removeAttribute('disabled');
  $rollBtn.removeAttribute('disabled');
};

const fillModal = (html) => {
  $modalContent.insertAdjacentHTML('afterbegin', html);
};

$rollBtn.addEventListener('click', () => {
  if (score[currentPlayer] >= maxScore)
    return $rollBtn.setAttribute('disabled', '');
  dice = rollDice();
  $dice.src = `./img/dice-${dice}.png`;
  $dice.alt = `Dice ${dice}.`;
  $dice.classList.remove('hidden');

  if (dice === 1) {
    resetCurrent();
    switchActivePlayer();
    return;
  }
  current += dice;
  $(`#current-score__player-${currentPlayer}`).textContent = current;
});

$holdBtn.addEventListener('click', () => {
  score[currentPlayer] += current;
  $(`#score-player-${currentPlayer}`).textContent = score[currentPlayer];
  if (score[currentPlayer] >= maxScore) {
    $(`.player__${currentPlayer}`).classList.add('player__winner');
    $(`.player__title-${currentPlayer}`).textContent = 'You win!!!';
    $holdBtn.setAttribute('disabled', '');
    return;
  }
  resetCurrent();
  switchActivePlayer();
});

$newBtn.addEventListener('click', init);

$rulesBtn.addEventListener('click', () => {
  fillModal(rulesHTML);
  $modal.showModal();
});

$closeModal.addEventListener('click', () => {
  $modalContent.innerHTML = '';
  $modal.close();
});

$aboutBtn.addEventListener('click', () => {
  fillModal(aboutHTML);
  $modal.showModal();
});
