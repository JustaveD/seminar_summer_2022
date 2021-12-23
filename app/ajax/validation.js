const btnInfo = document.querySelector('.btn-info');
const loading = document.querySelector('.loading');
const form = document.querySelector('.form-info');
const formQuestion = document.querySelector('.form_question');
const message = document.querySelector('.message');
const information = document.querySelector('.information');

btnInfo.addEventListener('click', function () {


    const http = new XMLHttpRequest();

    http.open("post", "./backend/formInfo.php", true);
    http.onload = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                let data = JSON.parse(http.response);
                if (data.message == '') {
                    loading.style.opacity = 1;
                    btnInfo.classList.add('disable');

                    setTimeout(function () {
                        form.style.left = '-100%';
                        formQuestion.classList.add('active');

                        information.innerHTML = ` 
                        <div><span>Họ và Tên:</span> ${data.userData.name}</div>
                        <div><span>Mã sinh viên:</span> ${data.userData.id}</div>
                        <div><span>Chuyên ngành:</span> ${data.userData.department}</div>
                        `;

                    }, 1000);

                } else {
                    message.innerHTML = `<p>${data.message}</p>`;
                }
            }
        }
    }
    let data = new FormData(form);
    http.send(data);
})