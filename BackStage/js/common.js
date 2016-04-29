function addMark(obj){
	// alert(obj.is(".hiretype"));
		if (obj.is(".hiretype")!==true) {
			// alert(12);
			obj.siblings("a").removeClass("choosemark");
		}
        obj.toggleClass("choosemark");
    }