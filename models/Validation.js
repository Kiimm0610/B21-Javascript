function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            // Sai
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        // Đúng
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };

    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }

        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraPattern = function (value, pattern, errorId, mess) {
        if (value.match(pattern)) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraNumber = function (value, errorId, mess, min, max) {
        if (min <= value && value <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraChucVu = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraMaNVTonTai = function (value, errorId, mess, arr) {
        var exist = false;

        for (var i = 0; i < arr.length; i++) {
            var nv = arr[i];
            if (nv.taiKhoan === value) {
                exist = true;
                break;
            }
        }

        if (exist) {
            // false
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }

        //true 
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
}
