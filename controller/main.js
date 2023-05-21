var dsnv = new DSNV();

var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV(isAdd) {
    var _taiKhoan = getEle("tknv").value;
    var _user = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    /**
    Validation 
    */
    var isValid = true;

    if (isAdd) {
        // Validation Tài khoản
        isValid &=
            validation.kiemTraRong(
                _taiKhoan,
                "tbTKNV",
                "(*) Vui lòng nhập tên tài khoản"
            ) &&
            validation.kiemTraDoDaiKiTu(
                _taiKhoan,
                "tbTKNV",
                "(*) Vui lòng nhập tên tài khoản có độ dài từ 4 đến 10",
                4,
                10
            ) &&
            validation.kiemTraPattern(
                _taiKhoan,
                /^[0-9]+$/,
                "tbTKNV",
                "(*) Vui lòng nhập tài khoản là số"
            ) &&
            validation.kiemTraMaNVTonTai(
                _taiKhoan,
                "tbTKNV",
                "(*) tài khoản đã tồn tại",
                dsnv.arr
            );
    }

    //Validation User
    isValid &=
        validation.kiemTraRong(_user, "tbTen", "(*) Vui lòng nhập họ và tên") &&
        validation.kiemTraPattern(
            _user,
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            "tbTen",
            "(*) Vui lòng nhập họ và tên phải là chữ"
        );

    //Validation email
    isValid &=
        validation.kiemTraRong(_email, "tbEmail", "(*) Vui lòng nhập email") &&
        validation.kiemTraPattern(
            _email,
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "tbEmail",
            "(*) Vui lòng nhập email hợp lệ"
        );

    //Validation matKhau
    isValid &=
        validation.kiemTraRong(
            _matKhau,
            "tbMatKhau",
            "(*) Vui lòng nhập mật khẩu"
        ) &&
        validation.kiemTraPattern(
            _matKhau,
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
            "tbMatKhau",
            "(*) Vui lòng nhập mật khẩu có ít nhất 1 chữ in hoa và 1 ký tự đặt biệt"
        );

    //Validation ngayLam
    isValid &=
        validation.kiemTraRong(
            _ngayLam,
            "tbNgay",
            "(*) Vui lòng nhập ngày làm"
        ) &&
        validation.kiemTraPattern(
            _ngayLam,
            /^(0[1-9]|1[0-9]|2[0-9]|3[01])[- /.](0[1-9]|1[0-2])[- /.](19|20)\d\d$/,
            "tbNgay",
            "(*) Vui lòng nhập ngày làm hợp lệ theo ngày tháng năm"
        );

    //Validation luongCoBan
    isValid &=
        validation.kiemTraRong(
            _luongCoBan,
            "tbLuongCB",
            "(*) Vui lòng nhập lương cơ bản"
        ) &&
        validation.kiemTraNumber(
            _luongCoBan,
            "tbLuongCB",
            "(*) Vui lòng nhập lương cơ bản phải từ 1.000.000 đến 20.000.000",
            1000000,
            20000000
        );

    //Validation chucVu
    isValid &= validation.kiemTraChucVu(
        "chucvu", //id select
        "tbChucVu",
        "(*) Vui lòng chọn chức vụ"
    );

    //Validation gioLam
    isValid &=
        validation.kiemTraRong(
            _gioLam,
            "tbGiolam",
            "(*) Vui lòng nhập giờ làm"
        ) &&
        validation.kiemTraNumber(
            _gioLam,
            "tbGiolam",
            "(*) Vui lòng nhập giờ làm từ 80 đến 200",
            80,
            200
        );

    if (!isValid) return null;

    var nv = new NhanVien(
        _taiKhoan,
        _user,
        _email,
        _matKhau,
        _ngayLam,
        _luongCoBan,
        _chucVu,
        _gioLam
    );

    // Tính tổng lương
    nv.tinhTL();
    // Tính xếp loại
    nv.tinhXL();

    return nv;
}

function renderTable(data) {
    var content = "";

    for (var i = 0; i < data.length; i++) {
        var nv = data[i];

        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.user}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <i class="fa-solid fa-pen text-primary" onclick="editNV('${nv.taiKhoan}')"></i>
                    <i class="fa-solid fa-dumpster text-danger" onclick="deleteNV('${nv.taiKhoan}')"></i>
                </td>
            </tr>        
        `;
    }
    getEle("tableDanhSach").innerHTML = content;
}

// Reset
getEle("btnThem").addEventListener("click", function (event) {
    event.preventDefault();
    // on btnThemNV
    getEle("btnThemNV").style.display = "inline-block";

    //clear value
    getEle("formNV").reset();
    getEle("tknv").disabled = false;
});

// Thêm NV
getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();

    var nv = layThongTinNV(true);

    if (nv) {
        //thêm nv vào mảng arr
        dsnv.themNV(nv);

        renderTable(dsnv.arr);

        setLocalStorage();
    }
});

// Edit Nv
function editNV(maNV) {
    $("#myModal").modal("show");
    var nv = dsnv.layThongTinEdit(maNV);
    if (nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;

        getEle("name").value = nv.user;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;

        getEle("btnThemNV").style.display = "none";
    }
}

// Cập nhật NV
getEle("btnCapNhat").addEventListener("click", function (event) {
    event.preventDefault();

    var nv = layThongTinNV(false);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
});

//Xóa NV
function deleteNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage();
}

//Tìm kiếm NV
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
});

function setLocalStorage() {
    //convert từ Json sang String
    var dataString = JSON.stringify(dsnv.arr);
    //Set localStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    //check condition
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //convert String sang Json và gắn vào mảng arr trong DSNV
        dsnv.arr = JSON.parse(dataString);
        //renderTable
        renderTable(dsnv.arr);
    }
}
