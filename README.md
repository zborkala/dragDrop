# JavaScript dragDrop

__JavaScript dragDrop is a JavaScript Library which helps you to easily add drag and drop files field to website.__

 ## What you can do with NetFimno are the following.
* Drag and drop files.
* Selecting files clicking on the field.
* Upload mutiple files along with other data.

 ## All you need is

  * Add the following script tag in your <head> tag
```
  <script src="dragDrop"></script>
```
   


 ## Adding drag and drop field to website.

 ```
 <script>
    var dragDrop = new dragDrop(document.getElementById('target_element_id'));
 </script>
 ```
 
 ## Uploading files along with other data.

```
  dragDrop.upload('upload.php','photos',{
			id : document.getElementById('id').value,
			name : document.getElementById('name').value
		}, function(response) {
			// Do what you want with server response
		});

```
 
 ## upload.php
 
 ```
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

?>
 ```
 


 
