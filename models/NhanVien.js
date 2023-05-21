function NhanVien(
    _taiKhoan,
    _user,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam
) {
    this.taiKhoan = _taiKhoan;
    this.user = _user;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTL = function () {
        switch (this.chucVu) {
            case "Sếp":
                this.tongLuong = Number(this.luongCoBan) * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = Number(this.luongCoBan) * 2;
                break;
            case "Nhân viên":
                this.tongLuong = Number(this.luongCoBan);
                break;
            default:
                this.tongLuong = 0;
                break;
        }
        this.tongLuong = this.tongLuong.toLocaleString("vn-VN");
    };

    this.tinhXL = function () {
        if (this.gioLam >= 192) {
            this.xepLoai = "nhân viên xuất sắc";
        } else if (this.gioLam >= 176) {
            this.xepLoai = "nhân viên giỏi";
        } else if (this.gioLam >= 160) {
            this.xepLoai = "nhân viên khá";
        } else {
            this.xepLoai = "nhân viên trung bình";
        }
    };
}
