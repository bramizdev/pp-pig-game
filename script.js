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

let currentPlayer = 0;
let current = 0;
const maxScore = 20;
const score = [0, 0];
let dice;

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
  score.forEach((s) => 0);
  $titlePlayer0.textContent = 'Player 1';
  $titlePlayer1.textContent = 'Player 2';
  $$('.score__final').forEach((score) => (score.textContent = 0));
  $$('.current__score').forEach((currScore) => (currScore.textContent = 0));
  $('.player__0').classList.add('player__active');
  dice = 0;
  $dice.classList.add('hidden');
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
