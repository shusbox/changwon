const history_1 = document.getElementById('history_1');

document.getElementById('history_1-click').addEventListener('click', () => {
  if (history_1.style.display === 'block') history_1.style.display = 'none';
  else history_1.style.display = 'block';
})