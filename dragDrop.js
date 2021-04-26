 function dragDrop(target) {
	var $ = this;
	$.obj = null;
	$.target = target;
	$.obj = {
		a_upload: target,
		upload_files: [],
	};


	$.upload = function (url, img, datar, functo) {
		var y = new FormData();
		var q = $.obj;
		for (var i = 0; i < q.upload_files.length; i++) {
			y.append(img+'[]', q.upload_files[i]);
		}
		if (datar !== undefined) {
			var xa = Object.keys(datar);
			for (var m = 0; m < xa.length; m++) {
				if (Array.isArray(datar[xa[m]])) {
					var lo = datar[xa[m]];
					for (var t = 0; t < lo.length; t++) {
						y.append(xa[m] + '[]', lo[t]);
					}
				} else {
					y.append(xa[m], datar[xa[m]]);

				}
			}
		}
		var x = new XMLHttpRequest();
		x.open('POST', url, true);
		var tip = q.a_upload.getElementsByClassName("progressor_a")[0];
		x.upload.onprogress = function (e) {
			var cip = Math.ceil(e.loaded / e.total * 100);
			tip.style.width = cip + "%";
			if (cip == 100) {
				tip.style.background = "#4BB543";
				q.a_upload.getElementsByClassName("fa-cloud-upload")[0].style.color = "#4BB543";
			}
			var f1 = e.loaded / 1024 / 1024;
			var f2 = f1.toFixed(2) + " MB";
			var f11 = e.total / 1024 / 1024;
			var f21 = f11.toFixed(2) + " MB";
			q.a_upload.getElementsByClassName("progressor_b")[0].innerHTML = f2 + " / " + f21;
		}

		x.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var gh = this.responseText;
				setTimeout(function () {
					functo(gh);

					q.upload_files = [];
					q.a_upload.getElementsByClassName("prev")[0].innerHTML = '';
					q.a_upload.getElementsByClassName("fa-cloud-upload")[0].style.color = "#dadada";
					var k = q.a_upload.getElementsByClassName("progressor")[0];
					k.children[0].style.background = 'orange';
					k.style.width = "0%";
				}, 500);
			}
		};
		x.send(y);
	}

	$.fa_cloud = function(z) {
		var k = z.getElementsByClassName("progressor")[0];
		var a = z.getElementsByClassName("fa-cloud-upload")[0];
		if (z.getElementsByClassName('prev')[0].children.length < 1) {
			a.style.color = "#dadada";
			k.style.width = "0%";
		} else {
			a.style.color = "#ff0000";
			k.style.width = "100%";
		}
	}

	$.rem = function(e,targ) {
			var a = new celem('div').new('span').on('click', function(e){
			var i = 0;
			var a = e.currentTarget;
			var child = a.parentNode;
			pid = child.parentNode.parentNode.id;
			while( (child = child.previousSibling) != null ) 
				i++;
			$.obj.upload_files.splice(i,1);
			a.parentNode.remove();
			fa_cloud(document.getElementById(pid));
		}).html('X').join('img').atr('src',e.currentTarget.result).append(targ.getElementsByClassName('prev')[0]);
		$.fa_cloud(targ);

	}

	$.init = function() {
		$.css();
		var a = new celem('div','drag-center');
		a.on('dragover', function(e) {
			e.preventDefault();
		}).on('drop', function(ev) {
			ev.preventDefault();
			if (ev.dataTransfer.items) {
				var a = ev.dataTransfer;
				for (var i = 0; i < ev.dataTransfer.items.length; i++) {
					if (ev.dataTransfer.items[i].kind === 'file') {
						var file = ev.dataTransfer.items[i].getAsFile();
						$.obj.upload_files.push(a.files[i]);
						var reader = new FileReader();
						var z = ev.currentTarget;
						reader.onload = function (e) {
							$.rem(e,z);
						};
						reader.readAsDataURL(a.files[i]);
					}
				}
			}
		}).div('drop-here').on('click', function(e) {
			e.currentTarget.getElementsByTagName('input')[0].click();
		}).new('input').type('file').style('display:none;').on('change',function(e) {
					var a = e.currentTarget;
					var z = a.parentNode;
					for(var i = 0;i < a.files.length;i++) {
						$.obj.upload_files.push(a.files[i]);
						var reader = new FileReader();
						reader.onload = function (e) {
							$.rem(e,z.parentNode);
						}
						reader.readAsDataURL(a.files[i]);
					} 
			}).atr('multiple','true')
			.join('div').align('center').style('color:grey;padding:8px;border-radius:5px;')
			.new('i','fa fa-cloud-upload').style('color:#dadada;font-size:48px;')
			.join('br')
			.join('div').html('Drag & Drop files <span class="rounded_span">OR</span> Click here to select')
			.par('div',2,'progress_b').div('progressor').style('')
			.div('progressor_a').style('height:20px;display:inline-block;background:blue;')
			.join('div','progressor_b')
			.par('div',4,'prev').append($.target);

	}

	$.css = function() {
		var style = '.drag-center{position:relative;border:2px dashed #dadada;border-radius:10px;padding:12px;margin:10px;}.progress_b{width:100%;overflow:hidden;transition:.5s width;height:15px;border-radius:10px;border:1px solid #e1e1e1;margin-top:6px}.progressor{position:relative;height:20px;display:inline-block;background:orange;transition:1s width}.progressor_b{position:absolute;top:0;left:0;width:100%;color:#fff;height:20px;background:#00000000;text-align:center;z-index:10}.prev{width:100%;max-height:400px}.prev div{width:70px;height:100px;border:1px solid #00f;margin:4px;display:inline-block;float:left;position:relative}.prev div img{max-width:100%;height:auto;overflow:hidden}.prev div span{position:absolute;right:3px;top:3px;background:red;color:#fff;border-radius:50%;width:13px;height:13px;font-size:10px;text-align:center}.rounded_span{width:25px;height:25px;padding:5px;border:1px solid #bdbdbd;border-radius:50%}';
		var a = document.getElementsByTagName('head')[0];
		var b = document.createElement('style');
		b.innerHTML = style;
		a.appendChild(b);
	}

	var celem = function(n,c) {
		var $c = this;
		$c.elem = document.createElement(n);
		$c.parent = null;
		$c.super = null;
		if(c != undefined) $c.elem.setAttribute('class',c);

		$c.par = function(n,s,c) {
			var parent = $c.elem;
			for(var i = 0; i < s; i++) {
				parent = parent.parentNode;
			}
			$c.parent = parent;
			$c.elem = document.createElement(n);
			if(c != undefined) $c.elem.setAttribute('class',c);
			$c.append();
			return $c;
		}

		$c.new = function(n,c) {
			if($c.super == null & $c.parent != null) {
				$c.super = $c.parent;
			}
			$c.parent = $c.elem;
			$c.elem = document.createElement(n);
			if(c != undefined) $c.elem.setAttribute('class',c);
			$c.append();
			return $c;
		}
		$c.div = function(c) {
			return $c.new('div',c);
		}
		$c.join = function(n,c) {
			$c.elem = document.createElement(n);
			if(c != undefined) $c.elem.setAttribute('class',c);
			$c.append();
			return $c;
		}

		$c.html = function(e) {
			$c.elem.innerHTML = e;
			return $c;
		}
		$c.atr = function(k,v) {
			$c.elem.setAttribute(k,v);
			return $c;
		}
		$c.type = function(v) {
			return $c.atr('type',v);
		}
		$c.align = function(v) {
			return $c.atr('align',v);
		}
		$c.id = function(v) {
			$c.elem.id = v;
			return $c;
		}
		$c.style = function(v) {
			$c.elem.setAttribute('style',v);
			return $c;
		}
		$c.on = function(e,f) {
			$c.elem.addEventListener(e,function(e) {
				f(e);
			});
			return $c;
		}
		$c.append = function(p) {
			var parent;
			var elem;
			if(p == undefined) {
				parent = $c.parent;
				elem = $c.elem;
			} else if($c.super != null) {
				parent = p;
				elem = $c.super;
			} else if($c.parent != null) {
				parent = p;
				elem = $c.parent;
			} else {
				parent = p;
				elem = $c.elem;
			}
			parent.appendChild(elem);
			return $c;
		}
		return $c;
	}

	$.init();

	return $;
}
