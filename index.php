<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>information</title>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./style/style.css">
</head>

<body>
    <header>
        <div class="wrap">
            <div class="logo">
                <img src="./access/images/logo.png" alt="">
            </div>
            <p>Seminar Summer 2022</p>
        </div>
    </header>

    <div class="information">
       
    </div>

    <div class="container">



        <form class="form-info">
            <div class="message">
                
            </div>


            <div class="field uppercase">
                <input type="text" name="id" id="" placeholder=" " required autocomplete='off'>
                <label for=""><span>Mã sinh viên</span></label>
            </div>
            <div class="field capitalize">
                <input type="text" name="name" id="" placeholder=" " required autocomplete='off'>
                <label for=""><span>Họ và tên</span></label>
            </div>

            <div class="custom-select" style="width:100%; height: 50px;">

                <select name='department'>
                  <option value="">Chuyên ngành:</option>
                  <option value="1">TKT</option>
                  <option value="2">BMW</option>
                  <option value="3">Citroen</option>
                  <option value="4">Ford</option>
                  <option value="5">Honda</option>
                  
                </select>

            </div>

            <div class="button btn-info"><span>Tiếp tục</span></div>
            <div class="loading">
                <img src="./access/images/loading.gif" alt="">
            </div>

        </form>

        <div class="form_question">

            <div class="question">
                <p>
                    <span>Câu hỏi:</span> ABCXYZ?asdfjkasdfjks kls adj fkls adjfklo dasjf klasd jfkl sdj ak l fjasdkljfklasdj
                </p>
            </div>
            <p class="instructions">Sắp xếp các câu trả lời theo thứ tự đúng nhất! </p>
            <div class="answer_wrapper">
                <div class="answer">
                    <p>A Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, eaque?</p>
                </div>
                <div class="answer">
                    <p>C</p>
                </div>
                <div class="answer">
                    <p>Bsdflsdflkasdlk</p>
                </div>
                <div class="answer">
                    <p>Y</p>
                </div>
                <div class="answer">
                    <p>Z</p>
                </div>
                <div class="answer">
                    <p>Y</p>
                </div>
                <div class="answer">
                    <p>Z</p>
                </div>
                <div class="answer">
                    <p>Y</p>
                </div>
            </div>

            <div class="button btn-finish"><span>Hoàn thành</span></div>

        </div>


    </div>

    <!-- Custom JS file -->
    <script src="./app/select.js"></script>
    <!-- sortable JS libraries -->
    <script src="./vendor/Sortable-master/Sortable.min.js"></script>
    <script src="./app/ajax/validation.js"></script>
    <script src="./app/script.js"></script>
</body>

</html>