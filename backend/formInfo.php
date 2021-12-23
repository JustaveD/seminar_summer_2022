<?php 

$id = strtoupper($_POST['id']);
$name = ucwords(ucfirst($_POST['name']));
$department = $_POST['department'];

$res = ['message'=>'','userData'=>['id'=>$id,'name'=>$name,'department'=>$department]];



if($id == ''){

    $res['message'] = 'Vui lòng nhập mã số sinh viên!';
    die(json_encode($res));
}else{
   
    if(!preg_match("/PS\d{5}/", $id)){
        $res['message'] = 'Mã số sinh viên phải có dạng PSXXXX!';
        die(json_encode($res));
    }
}

if($name == ''){
    $res['message'] = 'Vui lòng nhập họ và tên!';
    die(json_encode($res));
}

if($department == ''){
    $res['message'] = 'Vui lòng chọn chuyên ngành!';
    die(json_encode($res));
}


// cập nhật lên db, tên mssv, chuyên ngành, thời gian hiện tại.



die(json_encode($res));
