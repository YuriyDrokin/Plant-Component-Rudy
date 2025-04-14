let productions = [
  { name: 'Production' },
  { name: 'Morning', },
  { name: 'Chicken 22323' },
  { name: 'Chicken 3', id: 10003 },
  { name: 'Chicken 4', id: 10004 },
  { name: 'Chicken 5', id: 10005 },
  { name: 'Chicken 6', id: 10006 },
  { name: 'Chicken 7', id: 10007 },
  { name: 'Chicken 8', id: 10008 },
  { name: 'Chicken 9', id: 10009 },
  { name: 'Chicken 10', id: 10010 },
  { name: 'Chicken 11', id: 10011 },
  { name: 'Chicken 12', id: 10012 },
  { name: 'Chicken 13', id: 10013 },
  { name: 'Chicken 14', id: 10014 },
  { name: 'Chicken 15', id: 10015 }
];

let dayLimit = 15;
let max = 90;
let registerLimit = 15;
let page = 1;
let leftLimit = 0;
let dateArr = [];
let partialDateCountArr = [];

function generateDateArr() {
  max = parseInt(document.getElementById('days').value);
  let newDateNow = Date.now();
  let newFechaDesde = new Date(newDateNow + (4 * 60 * 60 * 1000));

  dateArr = new Array(max);
  for (let i = 0; i < max; i++) {
    dateArr[i] = new Date(newFechaDesde.getTime() + (i * 24 * 60 * 60 * 1000));
  }

  setPartialDateCountArr();
  setNumberPages();
  resetPage();
  setRightRange(leftLimit + registerLimit);
  updateTable();
}

function setPartialDateCountArr() {
  let arr = [];
  let currentPeriod;

  dateArr.slice(leftLimit, leftLimit + dayLimit).forEach(function (element) {
    currentPeriod = getMonthName(element.getMonth()) + ' ' + element.getFullYear();
    let indexOfPeriod = arr.findIndex(function (el) {
      return el.period == currentPeriod;
    });

    if (indexOfPeriod != -1) {
      arr[indexOfPeriod].count++;
    } else {
      arr.push({ period: currentPeriod, count: 1 });
    }
  });

  partialDateCountArr = arr;
}

function pageBack() {
  if (page == 1) return;
  page--;
  leftLimit -= dayLimit;
  setRightRange(leftLimit + registerLimit);
  setPartialDateCountArr();
  updateTable();
}

function pageForward() {
  page++;
  leftLimit += dayLimit;
  setRightRange(leftLimit + registerLimit);
  setPartialDateCountArr();
  updateTable();
}

function resetPage() {
  page = 1;
  leftLimit = 0;
}

function enableBackPagination() {
  return (page - 1 > 0);
}

function enableForwardPagination() {
  return (leftLimit + dayLimit < dateArr.length);
}

function setNumberPages() {
  document.getElementById('numberPages').innerText = Math.ceil(dateArr.length / dayLimit);
}

function setRightRange(num) {
  document.getElementById('pageRightRange').innerText = (num > max) ? max : num;
}

function getMonthName(num) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[num];
}

function updateTable() {
  let periodHeaders = '';
  partialDateCountArr.forEach(function (el) {
    periodHeaders += `<th class="text-center" colspan="${el.count}">${el.period}</th>`;
  });
  document.getElementById('periodHeaders').innerHTML = periodHeaders;

  let dateHeaders = '';
  dateArr.slice(leftLimit, leftLimit + dayLimit).forEach(function (el) {
    dateHeaders += `<th class="text-center">${el.getDate()}</th>`;
  });
  document.getElementById('dateHeaders').innerHTML = dateHeaders;

  let tableBody = '';
  productions.forEach(function (production) {
    tableBody += `<tr><td>${production.name}</td>`;
    for (let i = 0; i < dayLimit; i++) {
      tableBody += `<td></td>`;
    }
    tableBody += ``;
  });
  document.getElementById('tableBody').innerHTML = tableBody;

  document.getElementById('page').innerText = page;
  document.getElementById('startDate').innerText = `${getMonthName(dateArr[leftLimit].getMonth())} ${dateArr[leftLimit].getDate()}, ${dateArr[leftLimit].getFullYear()}`;
  document.getElementById('endDate').innerText = `${getMonthName(dateArr[leftLimit + dayLimit - 1].getMonth())} ${dateArr[leftLimit + dayLimit - 1].getDate()}, ${dateArr[leftLimit + dayLimit - 1].getFullYear()}`;

  document.getElementById('backButton').disabled = !enableBackPagination();
  document.getElementById('forwardButton').disabled = !enableForwardPagination();
}

document.addEventListener('DOMContentLoaded', function () {
  generateDateArr();
});




