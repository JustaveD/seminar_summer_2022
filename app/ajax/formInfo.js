function showInfo() {
  const btnInfo = document.querySelector(".btn-info");
  const loading = document.querySelector(".loading");
  const form = document.querySelector(".form-info");
  const formQuestion = document.querySelector(".form_question");
  const message = document.querySelector(".backend-error");
  const information = document.querySelector(".information");

  const http = new XMLHttpRequest();

  http.open("post", "./backend/formInfo.php", true);
  http.onload = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {

        let data = JSON.parse(http.response);
        if (data.message == "") {
          loading.style.opacity = 1;
          btnInfo.classList.add("disable");


          setTimeout(function () {

            formQuestion.innerHTML = data.questionData;

            let today = Date.now();

            today = new Date(today);

            let timeStart = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            // sortable
            const el = document.querySelector('.answer_wrapper');

            let sortable = new Sortable(el, {
              animation: 150,
              ghostClass: 'blue-background-class'
            });


            // animation
            form.style.left = "-100%";
            formQuestion.classList.add("active");

            information.innerHTML = `
                        <div><span>Họ và Tên:</span> ${data.userData.name}</div>
                        <div><span>Mã sinh viên:</span> ${data.userData.id}</div>
                        <div><span>Chuyên ngành:</span> ${data.userData.department}</div>
                        `;

            const finishBtn = document.querySelector(".btn-finish");

            finishBtn.addEventListener('click', () => {
              const answers = document.querySelectorAll('.answer');
              let userAnswer = ''
              answers.forEach(a => {
                userAnswer += a.getAttribute('data') + '-';
              })

              userAnswer = userAnswer.slice(0, -1)

              const http2 = new XMLHttpRequest();

              http2.open("post", "./backend/submitResult.php", true);
              http2.onload = () => {
                if (http2.readyState === XMLHttpRequest.DONE) {
                  if (http2.status === 200) {
                    finishBtn.classList.add('disable');
                    window.location.href = "./ranked/";
                  }
                }
              }


              http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              http2.send("userAnswer=" + userAnswer + "&questionId=" + data.questionId + "&timeStart=" + timeStart + "&studentId=" + data.studentId);


            })


          }, 1000);

        } else {
          message.innerHTML = `<p>${data.message}</p>`;
        }
      }
    }
  };
  let data = new FormData(form);
  http.send(data);
}
