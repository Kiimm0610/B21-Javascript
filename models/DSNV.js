function DSNV() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.timViTri = function (taiKhoan) {
        /**
        * 0. tạo biến index = -1
        * 1. duyệt mảng
        * 2. sv = arr[i]
        * 3. Nếu sv.maSV trùng với maNV
                => true => index = i
                            break
        */
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var sv = this.arr[i];
            if (sv.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };

    this.layThongTinEdit = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            return this.arr[index];
        }

        return null;
    };

    this.capNhatNV = function (nv) {
        var index = this.timViTri(nv.taiKhoan);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.timKiemNV = function (keyword) {
        var mangTimKiem = [];

        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            //Chuyển keyword về chữ viết thường
            var keywordToLowerCase = keyword.toLowerCase();
            //Chuyển nv.user về chữ viết thường
            var tenNVToLowerCase = nv.user.toLowerCase();
            if (tenNVToLowerCase.indexOf(keywordToLowerCase) !== -1) {
                mangTimKiem.push(nv);
            }
        }
        return mangTimKiem;
    };
}
