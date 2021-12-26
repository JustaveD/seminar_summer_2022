<?php 
    require "../dao/pdo.php";

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Bảng xếp hạng</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->

    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="css/util.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!-- Custom CSS -->

    <!--===============================================================================================-->
</head>

<body>
    <header>
        <div class="wrap">
            <a class="logo" href='../'>
                <img src="../access/images/logo.png" alt="">
            </a>
            
            <p>Seminar Summer 2022</p>
        </div>
    </header>
    
    <div class="limiter">
    
        <div class="container-table100" >
        <h2 class='heading_ranking'>Bảng xếp hạng</h2>
            <div class="wrap-table100">
                <div class="table100">
                    <table>
                        <thead>
                            <tr class="table100-head">
                                <th class="column1">Thứ tự</th>
                                <th class="column2">MSSV</th>
                                <th class="column3">Họ và Tên</th>
                                <th class="column5">Chuyên ngành</th>
                                <th class="column6">Thời gian làm</th>

                            </tr>
                        </thead>
                        <tbody>
                            <?php 
                            
                            $sql = "SELECT * from students left join result on students.student_id = result.student_id
                            where result.result_result = 1 ORDER BY result.result_total_time limit 5";

                            $topFive = pdo_get_all_rows($sql);
                            $i = 1;
                            foreach($topFive as $u){
                                extract($u);

                                $sql = "SELECT * FROM departments where department_id = ?";
                                $department = pdo_get_one_row($sql,$department_id);

                                echo "<tr>
                                <td class='column1'>{$i}</td>
                                <td class='column2'>{$student_code}</td>
                                <td class='column3'>{$student_name}</td>
                                <td class='column5'>{$department['department_name']}</td>
                                <td class='column6'>{$result_total_time}s</td>

                            </tr>";
                            $i++;

                            }
                            
                            ?>
                            


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>




    <!--===============================================================================================-->
    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/bootstrap/js/popper.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/select2/select2.min.js"></script>
    <!--===============================================================================================-->
    <script src="js/main.js"></script>

</body>

</html>