'use strict';

//元件名稱
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//0. 初始設定

let scores, currentScore, activePlayer, playing;
/*★ A. 必須宣告總分的變數（即使看不見），以確實寫入控制台，方便後面的code利用。
  ★ B. 總分必須是全域變數 假如只在function內宣告，每次點擊roll dice按鈕分數都會改變。*/

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  //5. 重新開始功能--恢復初始畫面
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //3-2. 換另一位玩家
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; //★實際儲存的分數記得歸零

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //★寫toggle就不用另外檢查active是否存在
};

//創建擲骰子功能
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. 創造隨機數 ★必須是內部變數，才會隨著每次點擊按鈕生成隨機數；假如是全域變數，只會產生一次隨機數就永遠固定了。
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. 顯示相應的骰子圖片
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //★直接寫src就能改來源URL

    //3. 確認數字是否為1
    if (dice !== 1) {
      //3-1. 將骰子點數加到目前分數
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //★若無currentScore，直接在此加骰子點數，會變成字串的串接。
    } else {
      switchPlayer();
    }
  }
});

//4. 創建保留功能
//4-1. 點擊保留按鈕，目前分數加進總分
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //4-2. 檢查玩家總分是否大於100 => 獲勝
    if (scores[activePlayer] >= 100) {
      //4-4. 勝利畫面
      playing = false; //★停止遊戲的機制
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //4-3. 玩家交換
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
