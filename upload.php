<?php 
if(isset($_POST['name'])) {

	$name = $_POST['name'];
	$id = $_POST['id'];
	$total = count($_FILES['photos']["name"]);
  $files = [];
    for ($i = 0; $i < $total; $i++) {
        $tmpFilePath = $_FILES['photos']["tmp_name"][$i];
        if ($tmpFilePath != "") {
            $path = './uploads/';
            $newFilePath = $path . $_FILES['photos']["name"][$i];
            if (move_uploaded_file($tmpFilePath, $newFilePath)) {
                $files[] = $newFilePath;
             }
            
        }
    }
	echo json_encode(['name' => $name, 'id' => $id, 'files' => $files]);

}
