<?php
require "../dao/pdo.php";


$id = strtoupper($_POST['id']);
$name = ucwords(ucfirst($_POST['name']));
$department = $_POST['department'];

$sql = "select * from departments where department_id = ?";
$departmentInfo = pdo_get_one_row($sql,$department);

$departmentName = $departmentInfo['department_name'];

$res = ['message' => '', 'userData' => ['id' => $id, 'name' => $name, 'department' =>$departmentName ],'questionData'=>"",'questionId'=>'',"studentId" => ''];


// cập nhật lên db, tên mssv, chuyên ngành, thời gian hiện tại.

$sql = "select * from questions where department_id = ?";

$questionFromDB = pdo_get_one_row($sql,$department);

$questionAnswer = explode('|',$questionFromDB['question_answer']); 



$answerData = '';
$data = 1;
foreach($questionAnswer as $ques){
    $answerData .= "<div class='answer' data='{$data}' >
                        <p>{$data}. {$ques}</p>
                    </div>";
    $data++;
}

$res['questionData'] = "
<div class='question'>
                <p>
                    <span>Câu hỏi:</span> {$questionFromDB['question_question']}
                </p>
            </div>
            <p class='instructions'>Sắp xếp các câu trả lời theo thứ tự đúng nhất! </p>
            <div class='answer_wrapper'>
               {$answerData}
                
            </div>

            <div class='button btn-finish'><span>Hoàn thành</span></div>
           
           
";

$res['questionId'] = $questionFromDB['question_id'];

$sql = "select * from students where student_code = ?";

$allStudents = pdo_get_one_row($sql, $id);

if(!$allStudents){

    $sql = "insert into students (student_name, student_code, department_id) values (?,?,?)";
    
    $insertToDb = pdo_execute($sql, $name, $id, $department);
}else{
    $sql = "select * from result where student_id = ?";
    $studentResult = pdo_get_one_row($sql, $allStudents['student_id']);

    if($studentResult){
        $res['message'] = 'Bạn đã làm bài rồi!';
        die(json_encode($res));
    }
}

$sql = "select * from students where student_code = ?";

$studentInfo = pdo_get_one_row($sql, $id);

$res['studentId'] = $studentInfo['student_id'];


die(json_encode($res));


