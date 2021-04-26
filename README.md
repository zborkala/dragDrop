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
    Body body = new Body()
                   .put("username", "Zikkoo")
                   .put("pwd", "8styadf")
                   .put("email", "example@gmail.com");
                   
    //You can upload more than one file, here I am uploading two files   
    Body files = new Body()
                     .put("file1", "filePath1")
                     .put("file2", "filePath2");
    new NetFimno(context,"https://example.com/something.php").multipart(files.getMap(), body.getMap(), new NetFimno.OnResultUpload() {
                            @Override
                            public void onSuccess(String response) {   
                               //Your code comes here
                            }

                            @Override
                            public void getProgress(int progress) {
                                // Progress is always in percentage
                                // myProgressBar.setProgress(progress);
                            }
                        });
 ```
 
  ## Uploading files with no other data
  
   ``` 
    Body files = new Body()
                     .put("file1", "filePath1")
                     .put("file2", "filePath2");
    new NetFimno(context,"https://example.com/something.php").multipart(files.getMap(), null, new NetFimno.OnResultUpload() {
                            @Override
                            public void onSuccess(String response) {   
                               //Your code comes here
                            }

                            @Override
                            public void getProgress(int progress) {
                                // Progress is always in percentage
                                // myProgressBar.setProgress(progress);
                            }
                        });
 ```
  ## Downloading a file from the server 

 ```
     new NetFimno(context,"https://example.com/somfile.mp3")
     .setFileName("mySong.mp3")
     .setPath("audios")
     .setOnDownload(new NetFimno.OnDownload() {
          @Override
          public void progress(int percent) {   
              // Progress is always in percentage
              // myProgressBar.setProgress(progress);            
          }

          @Override
          public void complete() {
             //Your code comes here
          }
     }).download(true);
 ```
 `.setFileName()`, `.setPath()` and `setDownload()` are optionals. You can use it or leave it like this.
 ```
 new NetFimno(context,"https://example.com/somfile.mp3").download(true);
``` 
 `.download(true)` to make notification visible and `.download(false)` is to make it invisible

  ## JSON Checker
  You can also check the response whether is in JSON format or not using static `NetFimno.isJSON(response)` method 
  `NetFimno.isJSON(response)` returns true if the response is in JSON format. Otherwise, it returns false.
  

 
