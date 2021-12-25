<?php

$id = strtoupper($_POST['id']);
$name = ucwords(ucfirst($_POST['name']));
$department = $_POST['department'];

$res = ['message' => '', 'userData' => ['id' => $id, 'name' => $name, 'department' => $department]];


// cập nhật lên db, tên mssv, chuyên ngành, thời gian hiện tại.


die(json_encode($res));
