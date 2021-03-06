<?php 
    require "./dao/pdo.php";
?>
<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang chủ</title>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./style/style.css">
    
</head>

<body>
    <header>
        <div class="wrap">
            <a class="logo" href='./'>
                <img src="./access/images/logo.png" alt="">
            </a>
            <div class='navigation'>
                <p>Seminar Summer 2022</p>
                <a href="./ranked/">Bảng xếp hạng</a>
            </div>
        </div>
    </header>

    <div class="information">

    </div>

    <div class="container">

        <form class="form-info" id='form-info'>
            <div class="backend-error"></div>
            <div class="field uppercase">
                <p class="message"></p>
                <input type="text" name="id" id="id" placeholder=" " required autocomplete='off'>
                <label for=""><span>Mã sinh viên</span></label>
            </div>
            <div class="field capitalize">
                <p class="message"></p>
                <input type="text" name="name" id="name" placeholder=" " required autocomplete='off'>
                <label for=""><span>Họ và tên</span></label>
            </div>

            <div class="custom-select field" style="width:100%; height: 50px;">
                <p class="message"></p>
                <select name='department'>
                    <option value="">Chuyên ngành:</option>
                    <?php
                        $sql = "select * from departments";

                        $allDepartments = pdo_get_all_rows($sql);

                        foreach($allDepartments as $department){
                            extract($department);
                            echo "<option value='{$department_id}'>{$department_name}</option>";
                        }
                    
                   
                    ?>
                </select>

            </div>

            <div class="button btn-info"><span>Tiếp tục</span></div>
            <div class="loading">
                <img src="./access/images/loading.gif" alt="">
            </div>

        </form>

        <div class="form_question">

           

        </div>


    </div>

    <!-- Custom JS file -->
    <script src="./app/select.js"></script>
    <!-- Sortable libraries -->
    <script src='./vendor/Sortable-master/Sortable.min.js'></script>
    <script src="./app/ajax/formInfo.js"></script>
    <script src="./app/script.js"></script>

    <!-- validation -->
    <script src="./app/validator.js"></script>
    <script>
        Validator({
            form: '#form-info',
            formGroupSelector: ".field",
            errorSelector: '.message',
            rules: [
                Validator.isName('#name'),
                Validator.isMSSV('#id'),
                Validator.isRequired("select[name='department']", "Vui lòng chọn chuyên ngành"),
            ]
        })

        let select = document.querySelector(".select-selected");
        select.addEventListener("click", () => {
            select.previousElementSibling.previousElementSibling.innerText = "";
        });
    </script>
    
</body>

</html>