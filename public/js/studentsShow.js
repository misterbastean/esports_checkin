const flagRemoveBtn = document.getElementById('flagRemoveBtn');
const flagYellowBtn = document.getElementById('flagYellowBtn');
const flagOrangeBtn = document.getElementById('flagOrangeBtn');
const flagRedBtn = document.getElementById('flagRedBtn');
const studentName = document.getElementById('studentName');

flagRemoveBtn.addEventListener('click', function () {
  changeFlag(studentId, 'none');
});
flagYellowBtn.addEventListener('click', function () {
  changeFlag(studentId, 'yellow');
});
flagOrangeBtn.addEventListener('click', function () {
  changeFlag(studentId, 'orange');
});
flagRedBtn.addEventListener('click', function () {
  changeFlag(studentId, 'red');
});

async function sendFlagRequest(id, flag) {
  const url = `/api/v1/students/${id}`;
  const data = JSON.stringify({ flag });

  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  return response.json();
}

function changeFlag(id, flag) {
  sendFlagRequest(id, flag)
    .then((res) => {
      if (res.data.flag === 'none') {
        studentName.className = 'mt-3 text-center';
      } else if (res.data.flag === 'yellow') {
        studentName.className = 'mt-3 text-center bg-warning';
      } else if (res.data.flag === 'orange') {
        studentName.className = 'mt-3 text-center btn-orange';
      } else if (res.data.flag === 'red') {
        studentName.className = 'mt-3 text-center bg-danger text-white';
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
