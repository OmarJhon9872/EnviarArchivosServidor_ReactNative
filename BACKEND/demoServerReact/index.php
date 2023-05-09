<?php

if (empty($_FILES['file_attachment']['name'])) {
    die(json_encode([
        "status" => 0,
        "msg" => "error en peticion."
    ]));
}

$target_dir = "uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777);
}

$target_file = $target_dir . basename($_FILES["file_attachment"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

if (file_exists($target_file)) {
    $target_file = $target_dir . uniqid() .basename($_FILES["file_attachment"]["name"], '');
}

if ($_FILES["file_attachment"]["size"] > 50000000) {
    die(json_encode([
        "status" => 0,
        "msg" => "archivo muy pesado."
    ]));
}

if (move_uploaded_file($_FILES["file_attachment"]["tmp_name"], $target_file)) {
    die(json_encode([
        "status" => 1,
        "msg" => "archivo " . basename($_FILES["file_attachment"]["name"]) . " subido."
    ]));
} else {
    die(json_encode([
        "status" => 0,
        "msg" => "error al subir el archivo."
    ]));
}
