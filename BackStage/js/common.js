// iframe高度自适应
function iFrameHeight() {
	var iframeid = document.getElementById("iframe"); //iframe id
	if (document.getElementById) {
		if (iframeid && !window.opera) {
			if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
				iframeid.height = iframeid.contentDocument.body.offsetHeight;
			} else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
				iframeid.height = iframeid.Document.body.scrollHeight;
			}
		}
	}
}
// 岗位选择
function addMark(obj) {
	// alert(obj.is(".hiretype"));
	obj.toggleClass("choosemark");
	if (obj.is(".hiretype") !== true) {
		// alert(12);
		obj.siblings("a").removeClass("choosemark");
	} else {
		var txt = obj.text();
		var curIn = obj.attr("data-index");
		var html = "";
		if (obj.is(".choosemark") == true) {
			// alert(1);
			html = '<a href=\"javascript:void(0);\" data-rtIndex=' + curIn + ' onclick=\"delResult($(this))\">' + txt + '<span>×</span> </a>';
			$("#chooseResult").append(html);
		} else {
			// alert(2);
			$("[data-rtIndex=" + curIn + "]").remove();
		}
	}
}

// 清除岗位选中项
function delResult(a) {
	var curRtIndex = a.attr("data-rtIndex");
	a.remove();
	$("[data-index=" + curRtIndex + "]").removeClass("choosemark");
}

//默认弹出框
var oDialog = null;

function dialogModality(url, toptitlecn, areaSize, btnName) {
		var toptitlecn="";
		var cancelValP="取消"
	if (!areaSize)
	// areaSize = ['490px', '273px'];
		areaSize = ['518px', '218px'];

	if (!btnName)
		btnName = ['确定'];
	var cancelB = false;

	if (btnName[1] == "取消") {
		cancelB = true;
	}
	if (btnName[0] == "关闭") {
		cancelB = true;
		cancelValP="下一个";
	}

	oDialog = $.dialog({
		skin: 'gray',
		width: areaSize[0],
		height: areaSize[1],
		// title: false,
		title: toptitlecn,
		lock: true,
		opacity: 0.5,
		max: false,
		min: false,
		cancelVal: cancelValP,
		cancel: cancelB,
		// 自定义按钮
		button: [{
				// name: '继续看',
				name: btnName[0],
			}
			// ,
			// {
			//     name: btnName[1]
			// }
		],
		content: 'url:' + url

	});
}

$(function() {
	// 选择岗位范围
	$("#chooseSpan").click(function() {
		$(".hiretype-content").toggle();
	});
	$(".confirm-type").click(function() {
		$(".hiretype-content").hide();
	});


	// 时间日期选择
	$("#startDate").click(function() {
		WdatePicker({
			dateFmt: 'yyyy-MM-dd HH:mm',
			maxDate: '#F{$dp.$D(\'endDate\')}'
		});
	});

	$("#endDate").click(function() {
		WdatePicker({
			dateFmt: 'yyyy-MM-dd HH:mm',
			minDate: '#F{$dp.$D(\'startDate\')}'
		});
	});
})