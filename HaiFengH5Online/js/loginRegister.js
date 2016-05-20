// JavaScript Document

//注册 登录
function enableSubmit(bool) {
	if (bool) $("#submit").removeAttr("disabled");
	else $("#submit").attr("disabled", "disabled");
}

function v_submitbutton() {
	if ($("#agree").attr("checked") != "checked") {
		enableSubmit(false);
		$(".readagreement-wrap").css("color", "#f99");
		return;
	} else {
		$(".readagreement-wrap").css("color", "#fff");
	}
	for (f in flags)
		if (!flags[f]) {
			enableSubmit(false);
			return;
		}
	enableSubmit(true);
}

function showAgreement() {
	$("#readagreement").removeAttr("onclick");
	$("#agreement").show();
	$("#agreement iframe").attr("src", "http://sc.chinaz.com");
}

function agree() {
	$("#agreement").hide();
	$("#readagreement").attr("onclick", "showAgreement();");
	if ($("#agree").attr("checked") != "checked") $("#agree").trigger("click");
}

function onReadAgreementClick() {
	return;
	if ($("#agree").attr("checked")) {
		$("#agree").removeAttr("checked");
	} else {
		$("#agree").attr("checked", "checked");
	}
	v_submitbutton();
}
var flags = [false, false, false];


var RegPhone = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;

function lineState(name, state, msg) {
	if (state == "none") {
		$("#line_" + name + " div").attr("class", "none");
		return;
	}
	if (state == "corect") {
		$("#line_" + name + " div").attr("class", "corect");
		return;
	}
	$("#line_" + name + " span").text(msg);
	$("#line_" + name + " div").attr("class", "error");
}

function v_phone_number() {
	var phone_number = $("#phone_number").val();
	if (!RegPhone.test(phone_number)) {
		lineState("phone_number", "error", "格式不正确");
		flags[0] = false;
		enableSubmit(false);
	} else {
		lineState("phone_number", "corect", "");
		flags[0] = true;
	}
	v_submitbutton();
}


function v_password() {
	var password = $("#password").val();
	if (password.length < 6) {
		lineState("password", "error", "必须多于或等于6个字符");
		flags[1] = false;
	} else {
		if (password.length > 16) {
			lineState("password", "error", "必须少于或等于16个字符");
			flags[1] = false;
		} else {
			lineState("password", "corect", "");
			flags[1] = true;
		}
	}
	v_repeat();
	v_submitbutton();
}

function v_repeat() {
	if (!flags[1]) {
		lineState("repeat", "none", "");
		return;
	}
	if ($("#password").val() != $("#repeat").val()) {
		lineState("repeat", "error", "密码不一致");
		flags[2] = false;
	} else {
		lineState("repeat", "corect", "");
		flags[2] = true;
	}
	v_submitbutton();
}

function adaptValue() {
	return true;
}