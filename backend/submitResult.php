<?php 

require "../dao/pdo.php";

date_default_timezone_set('Asia/Ho_Chi_Minh');

$userAnswer = $_POST['userAnswer'];

$questionId = $_POST['questionId'];

$studentId = $_POST['studentId'];

$timeStart = $_POST['timeStart'];

$timeStartTime = strtotime($timeStart);

$timeEnd = date('Y/m/d H:i:s', time());

$totalTime = strtotime($timeEnd) - $timeStartTime;


$sql = "select * from questions where question_id = ?";

$answerFromDB = pdo_get_one_row($sql,$questionId);


if($answerFromDB['question_answer_question'] === $userAnswer){
    $sql = "insert into result (result_time_start, result_total_time, result_data, result_finished, result_result, student_id) values (?,?,?,true,true,?)";

    $doIt = pdo_execute($sql,$timeStart,$totalTime,$userAnswer,$studentId);

}else{
    $sql = "insert into result (result_time_start, result_total_time, result_data, result_finished, result_result, student_id) values (?,?,?,true,false,?)";

    $doIt = pdo_execute($sql,$timeStart,$totalTime,$userAnswer,$studentId);
}






?>