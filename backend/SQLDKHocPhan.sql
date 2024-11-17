-- Create database
CREATE DATABASE UniversityDB;
USE UniversityDB;

-- Create tables
CREATE TABLE Khoa (
    id_khoa INT PRIMARY KEY AUTO_INCREMENT,
    ten_khoa VARCHAR(255)
);

CREATE TABLE nganh_hoc (
    id_nganh_hoc INT PRIMARY KEY AUTO_INCREMENT,
    ten_nganh_hoc VARCHAR(255),
    id_khoa INT,
    FOREIGN KEY (id_khoa) REFERENCES Khoa(id_khoa)
);

CREATE TABLE que_quan (
    id_que_quan INT PRIMARY KEY AUTO_INCREMENT,
    ten_huyen VARCHAR(255),
    ten_tinh VARCHAR(255)
);

CREATE TABLE doi_tuong (
    id_doi_tuong INT PRIMARY KEY AUTO_INCREMENT,
    ten_loai_doi_tuong VARCHAR(255),
    tile_giam_hoc_phi INT
);

CREATE TABLE hoc_ky (
    id_hoc_ky INT PRIMARY KEY AUTO_INCREMENT,
    ten_hoc_ky VARCHAR(255),
    nam_hoc YEAR
);

CREATE TABLE loai_mon (
    id_loai_mon INT PRIMARY KEY AUTO_INCREMENT,
    ten_loai_mon VARCHAR(255)
);

CREATE TABLE mon_hoc (
    id_mon_hoc INT PRIMARY KEY AUTO_INCREMENT,
    ten_mon_hoc VARCHAR(255),
    id_loai_mon INT,
    so_tiet INT,
    tin_chi INT,
    FOREIGN KEY (id_loai_mon) REFERENCES loai_mon(id_loai_mon)
);

CREATE TABLE chuong_trinh_hoc (
    id_chuong_trinh_hoc INT PRIMARY KEY AUTO_INCREMENT,
    id_nganh_hoc INT,
    id_hoc_ky INT,
    id_mon_hoc INT,
    ghi_chu VARCHAR(255),
    FOREIGN KEY (id_nganh_hoc) REFERENCES nganh_hoc(id_nganh_hoc),
    FOREIGN KEY (id_hoc_ky) REFERENCES hoc_ky(id_hoc_ky),
    FOREIGN KEY (id_mon_hoc) REFERENCES mon_hoc(id_mon_hoc)
);

CREATE TABLE lop_hoc (
    id_lop_hoc INT PRIMARY KEY AUTO_INCREMENT,
    id_chuong_trinh_hoc INT,
    ten_lop NVARCHAR(255),
    si_so_toi_da INT,
    si_so_hien_tai INT DEFAULT 0,
    FOREIGN KEY (id_chuong_trinh_hoc) REFERENCES chuong_trinh_hoc(id_chuong_trinh_hoc)
);

CREATE TABLE sinh_vien (
    id_sinh_vien INT PRIMARY KEY AUTO_INCREMENT,
    ho_ten VARCHAR(255),
    ngay_sinh DATE,
    gioi_tinh VARCHAR(255),
    id_que_quan INT,
    id_doi_tuong INT,
    id_nganh_hoc INT,
    FOREIGN KEY (id_que_quan) REFERENCES que_quan(id_que_quan),
    FOREIGN KEY (id_doi_tuong) REFERENCES doi_tuong(id_doi_tuong),
    FOREIGN KEY (id_nganh_hoc) REFERENCES nganh_hoc(id_nganh_hoc)
);

CREATE TABLE tai_khoan (
    id_tk INT PRIMARY KEY AUTO_INCREMENT,
    id_sinh_vien INT,
    ten_tai_khoan VARCHAR(255),
    mat_khau VARCHAR(255),
    vai_tro VARCHAR(255),
    FOREIGN KEY (id_sinh_vien) REFERENCES sinh_vien(id_sinh_vien)
);

CREATE TABLE dang_ky (
    so_phieu_dk INT PRIMARY KEY AUTO_INCREMENT,
    id_sinh_vien INT,
    ngay_lap_phieu_dk DATE,
    id_lop_hoc INT,
    FOREIGN KEY (id_sinh_vien) REFERENCES sinh_vien(id_sinh_vien),
    FOREIGN KEY (id_lop_hoc) REFERENCES lop_hoc(id_lop_hoc)
);

CREATE TABLE thu_hoc_phi (
    so_phieu_thu_hp INT PRIMARY KEY AUTO_INCREMENT,
    id_sinh_vien INT,
    ngay_lap_phieu_thu_hp DATE,
    so_tien_dk INT,
    so_tien_dong INT,
    so_tien_con_lai INT,
    id_hoc_ky INT,
    FOREIGN KEY (id_sinh_vien) REFERENCES sinh_vien(id_sinh_vien),
    FOREIGN KEY (id_hoc_ky) REFERENCES hoc_ky(id_hoc_ky)
);

CREATE TABLE tham_so (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tien_hoc_moi_tin_chi_ly_thuyet INT,
    tien_hoc_moi_tin_chi_thuc_hanh INT
);

USE UniversityDB;
INSERT INTO `universitydb`.`tai_khoan` (`ten_tai_khoan`, `mat_khau`, `vai_tro`) VALUES ('admin', 'admin', 'Người quản lý');
INSERT INTO `universitydb`.`loai_mon` (`ten_loai_mon`) VALUES ('LT');
INSERT INTO `universitydb`.`loai_mon` (`ten_loai_mon`) VALUES ('TH');
INSERT INTO `universitydb`.`tham_so` (`tien_hoc_moi_tin_chi_ly_thuyet`, `tien_hoc_moi_tin_chi_thuc_hanh`) VALUES ('27000', '37000');

INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('A Lưới', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Biên', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Dương', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Khê', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Lão', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Lão', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Minh', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Nhơn', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('An Phú', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ân Thi', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Anh Sơn', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ayun Pa', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Bể', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Chẽ', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Đình', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Đồn', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bà Rịa', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bá Thước', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Tơ', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Tri', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ba Vì', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bác Ái', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Bình', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Giang', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Hà', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Kạn', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bạc Liêu', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Mê', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Ninh', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Quang', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Sơn', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Tân Uyên', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Trà My', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Từ Liêm', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bắc Yên', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bạch Long Vĩ', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bạch Thông', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bảo Lạc', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bảo Lâm', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bảo Lâm', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bảo Lộc', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bảo Thắng', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bảo Yên', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bát Xát', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bàu Bàng', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bến Cát', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bến Cầu', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bến Lức', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bến Tre', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Biên Hòa', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bỉm Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Chánh', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Đại', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Gia', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Giang', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Liêu', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Long', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Lục', 'Hà Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Minh', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Sơn', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Tân', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Tân', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Thạnh', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Thủy', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bình Xuyên', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bố Trạch', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bù Đăng', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bù Đốp', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Bù Gia Mập', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Buôn Đôn', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Buôn Hồ', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Buôn Ma Thuột', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cà Mau', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cái Bè', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cai Lậy-TX', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cai Lậy', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cái Nước', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cái Răng', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Giàng', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Khê', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cam Lâm', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Lệ', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cam Lộ', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Mỹ', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Phả', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cam Ranh', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Thủy', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cẩm Xuyên', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cần Đước', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cần Giờ', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cần Giuộc', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Can Lộc', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Càng Long', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cao Bằng', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cao Lãnh-TP', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cao Lãnh', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cao Lộc', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cao Phong', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cát Hải', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cát Tiên', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cầu Giấy', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cầu Kè', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cầu Ngang', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Đốc', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Đức', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Phú', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Châu Thành A', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chi Lăng', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chí Linh', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chiêm Hóa', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chợ Đồn', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chợ Gạo', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chợ Lách', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chợ Mới', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chợ Mới', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chơn Thành', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chư Păh', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chư Prông', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chư Pưh', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chư Sê', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Chương Mỹ', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cờ Đỏ', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cô Tô', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cồn Cỏ', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Con Cuông', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Côn Đảo', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Củ Chi', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cư Jút', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cư Kuin', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cù Lao Dung', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cư M''gar', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Cửa Lò', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đà Bắc', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đạ Huoai', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đakrông', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đà Lạt', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đạ Tẻh', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đại Lộc', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đại Từ', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đak Đoa', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đăk Glei', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đắk Glong', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đăk Hà', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đắk Mil', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đak Pơ', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đắk R''lấp', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đắk Song', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đăk Tô', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đầm Dơi', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đầm Hà', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đam Rông', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đan Phượng', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đất Đỏ', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Dầu Tiếng', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Dĩ An', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Di Linh', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Điện Bàn', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Điện Biên', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Điện Biên Đông', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Điện Biên Phủ', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Diễn Châu', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Diên Khánh', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Định Hóa', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đình Lập', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Định Quán', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đô Lương', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồ Sơn', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đoan Hùng', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đơn Dương', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Anh', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đống Đa', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Giang', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Hà', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Hải', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Hòa', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồng Hới', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Hưng', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồng Hỷ', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồng Phú', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đông Triều', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồng Văn', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồng Xoài', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đồng Xuân', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Cơ', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Hòa', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Huệ', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Linh', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Phổ', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Thọ', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Đức Trọng', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Dương Kinh', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Dương Minh Châu', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Duy Tiên', 'Hà Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Duy Xuyên', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Duyên Hải-TX', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Duyên Hải', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ea H''leo', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ea Kar', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ea Súp', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gia Bình', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gia Lâm', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gia Lộc', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gia Nghĩa', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Giá Rai', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gia Viễn', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Giang Thành', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Giao Thủy', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gio Linh', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Giồng Riềng', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Giồng Trôm', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gò Công', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gò Công Đông', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gò Công Tây', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gò Dầu', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gò Quao', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Gò Vấp', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hà Đông', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hà Giang', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hạ Hòa', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hạ Lang', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hạ Long', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hà Quảng', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hà Tiên', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hà Tĩnh', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hà Trung', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hải An', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hai Bà Trưng', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hải Châu', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hải Dương', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hải Hà', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hải Hậu', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hải Lăng', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hàm Tân', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hàm Thuận Bắc', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hàm Thuận Nam', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hàm Yên', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hậu Lộc', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hiệp Đức', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hiệp Hòa', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hòa An', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hòa Bình', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hòa Bình', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoa Lư', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hòa Thành', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hòa Vang', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoài Ân', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoài Đức', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoài Nhơn', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoàn Kiếm', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoằng Hóa', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoàng Mai', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoàng Mai', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoàng Sa', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hoàng Su Phì', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hóc Môn', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hội An', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hòn Đất', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hớn Quản', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hồng Bàng', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hồng Dân', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hồng Lĩnh', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hồng Ngự-TP', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hồng Ngự', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Huế', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hưng Hà', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hưng Nguyên', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hưng Yên', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hướng Hóa', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hương Khê', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hương Sơn', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hương Thủy', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hương Trà', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Hữu Lũng', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ia Grai', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ia H''Drai', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ia Pa', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kbang', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kế Sách', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Khánh Sơn', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Khánh Vĩnh', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Khoái Châu', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kiến An', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kiên Hải', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kiên Lương', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kiến Thụy', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kiến Tường', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kiến Xương', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kim Bảng', 'Hà Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kim Bôi', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kim Động', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kim Sơn', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kim Thành', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kinh Môn', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kon Plông', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kon Rẫy', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kon Tum', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kông Chro', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Ana', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Bông', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Búk', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Năng', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Nô', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Pa', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Krông Pắc', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kỳ Anh-TX', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kỳ Anh', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Kỳ Sơn', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('La Gi', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lạc Dương', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lạc Sơn', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lạc Thủy', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lai Châu', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lai Vung', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lắk', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lâm Bình', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lâm Hà', 'Lâm Đồng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lâm Thao', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lang Chánh', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lạng Giang', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lạng Sơn', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lào Cai', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lập Thạch', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lấp Vò', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lê Chân', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lệ Thủy', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Liên Chiểu', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lộc Bình', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lộc Hà', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lộc Ninh', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Biên', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Điền', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Hồ', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Khánh', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Mỹ-TX', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Mỹ', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Phú', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Thành', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Long Xuyên', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lục Nam', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lục Ngạn', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lục Yên', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lương Sơn', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lương Tài', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lý Nhân', 'Hà Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Lý Sơn', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('M''Drắk', 'Đắk Lắk');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mai Châu', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mai Sơn', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mang Thít', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mang Yang', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mê Linh', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mèo Vạc', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Minh Hóa', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Minh Long', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỏ Cày Bắc', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỏ Cày Nam', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mộ Đức', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mộc Châu', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mộc Hóa', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Móng Cái', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mù Cang Chải', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Ảng', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Chà', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Khương', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường La', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Lát', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Lay', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Nhé', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mường Tè', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỹ Đức', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỹ Hào', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỹ Lộc', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỹ Tho', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỹ Tú', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Mỹ Xuyên', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Na Hang', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Na Rì', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Năm Căn', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Đàn', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Định', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Đông', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Giang', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nậm Nhùn', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nậm Pồ', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Sách', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Trà My', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Trực', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nam Từ Liêm', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngã Bảy', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngã Năm', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nga Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngân Sơn', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghi Lộc', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghi Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghi Xuân', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghĩa Đàn', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghĩa Hành', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghĩa Hưng', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nghĩa Lộ', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngô Quyền', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngọc Hiển', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngọc Hồi', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngọc Lặc', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ngũ Hành Sơn', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nguyên Bình', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nhà Bè', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nha Trang', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nho Quan', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nhơn Trạch', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Như Thanh', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Như Xuân', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Bình', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Giang', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Hải', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Hòa', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Kiều', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Phước', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ninh Sơn', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nông Cống', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Nông Sơn', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Núi Thành', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ô Môn', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Pác Nặm', 'Bắc Kạn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phan Rang – Tháp Chàm', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phan Thiết', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phổ Yên', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phong Điền', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phong Điền', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phong Thổ', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Bình', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phù Cát', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phù Cừ', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Giáo', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Hòa', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Lộc', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Lương', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phủ Lý', 'Hà Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Mỹ', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phù Mỹ', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Nhuận', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Ninh', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phù Ninh', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Quốc', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Quý', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Riềng', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Tân', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Tân', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Thiện', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Thọ', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Vang', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phú Xuyên', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phù Yên', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phúc Thọ', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phúc Yên', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phụng Hiệp', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phước Long', 'Bình Phước');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phước Long', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Phước Sơn', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Pleiku', 'Gia Lai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 1', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 3', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 4', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 5', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 6', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 7', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 8', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 10', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 11', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quận 12', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quản Bạ', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quan Hóa', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quan Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quang Bình', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Điền', 'Thừa Thiên Huế');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Hòa', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Ngãi', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Ninh', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Trạch', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Trị', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Xương', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quảng Yên', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quế Phong', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quế Sơn', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quế Võ', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quốc Oai', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quỳ Châu', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quỳ Hợp', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quy Nhơn', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quỳnh Lưu', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quỳnh Nhai', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Quỳnh Phụ', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Rạch Giá', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sa Đéc', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sa Pa', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sa Thầy', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sầm Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Si Ma Cai', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sìn Hồ', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sóc Sơn', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sóc Trăng', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Động', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Dương', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Hà', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Hòa', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn La', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Tây', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Tây', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Tịnh', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sơn Trà', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sông Cầu', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sông Công', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sông Hinh', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sông Lô', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sông Mã', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Sốp Cộp', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Bình', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Đảo', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Điệp', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Dương', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Đường', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Kỳ', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Nông', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tam Nông', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân An', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Biên', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Bình', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Châu', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Châu', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Hiệp', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Hồng', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Hưng', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Kỳ', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Lạc', 'Hòa Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Phú', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Phú', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Phú Đông', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Phước', 'Tiền Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Sơn', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Thạnh', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Trụ', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Uyên', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Uyên', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tân Yên', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tánh Linh', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tây Giang', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tây Hồ', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tây Hòa', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tây Ninh', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tây Sơn', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạch An', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạch Hà', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạch Thành', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạch Thất', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thái Bình', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thái Hòa', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thái Nguyên', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thái Thụy', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Than Uyên', 'Lai Châu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thăng Bình', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Ba', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Bình', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Chương', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Hà', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Hóa', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạnh Hóa', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Khê', 'Đà Nẵng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Liêm', 'Hà Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Miện', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Oai', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạnh Phú', 'Bến Tre');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Sơn', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Thủy', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Trì', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thạnh Trị', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thanh Xuân', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tháp Mười', 'Đồng Tháp');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thiệu Hóa', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thọ Xuân', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thoại Sơn', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thới Bình', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thới Lai', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thống Nhất', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thốt Nốt', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thủ Dầu Một', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thủ Đức', 'Thành phố Hồ Chí Minh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thủ Thừa', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thuận An', 'Bình Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thuận Bắc', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thuận Châu', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thuận Nam', 'Ninh Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thuận Thành', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thường Tín', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thường Xuân', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Thủy Nguyên', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiên Du', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiền Hải', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiên Lãng', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiên Lữ', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiên Phước', 'Quảng Nam');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiên Yên', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tiểu Cần', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tịnh Biên', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trà Bồng', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trà Cú', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trà Ôn', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trà Vinh', 'Trà Vinh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trạm Tấu', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trần Đề', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trần Văn Thời', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trấn Yên', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trảng Bàng', 'Tây Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trảng Bom', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tràng Định', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tri Tôn', 'An Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Triệu Phong', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Triệu Sơn', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trực Ninh', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trùng Khánh', 'Cao Bằng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Trường Sa', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tứ Kỳ', 'Hải Dương');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tu Mơ Rông', 'Kon Tum');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tư Nghĩa', 'Quảng Ngãi');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Từ Sơn', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tủa Chùa', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuần Giáo', 'Điện Biên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tương Dương', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuy An', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuy Đức', 'Đắk Nông');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuy Hòa', 'Phú Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuy Phong', 'Bình Thuận');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuy Phước', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuyên Hóa', 'Quảng Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Tuyên Quang', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('U Minh Thượng', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('U Minh', 'Cà Mau');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ứng Hòa', 'Hà Nội');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Uông Bí', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Bàn', 'Lào Cai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vân Canh', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Chấn', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vân Đồn', 'Quảng Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Giang', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vân Hồ', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Lâm', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Lãng', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vạn Ninh', 'Khánh Hòa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Quan', 'Lạng Sơn');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Văn Yên', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vị Thanh', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vị Thủy', 'Hậu Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vị Xuyên', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Việt Trì', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Việt Yên', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Bảo', 'Hải Phòng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Châu', 'Sóc Trăng');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Cửu', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Hưng', 'Long An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Linh', 'Quảng Trị');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Lộc', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Lợi', 'Bạc Liêu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Long', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Thạnh', 'Cần Thơ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Thạnh', 'Bình Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Thuận', 'Kiên Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Tường', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vĩnh Yên', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vinh', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Võ Nhai', 'Thái Nguyên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vụ Bản', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vũ Quang', 'Hà Tĩnh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vũ Thư', 'Thái Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vũng Liêm', 'Vĩnh Long');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Vũng Tàu', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Xín Mần', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Xuân Lộc', 'Đồng Nai');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Xuân Trường', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Xuyên Mộc', 'Bà Rịa – Vũng Tàu');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Ý Yên', 'Nam Định');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Bái', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Bình', 'Yên Bái');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Châu', 'Sơn La');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Định', 'Thanh Hóa');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Dũng', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Khánh', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Lạc', 'Vĩnh Phúc');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Lập', 'Phú Thọ');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Minh', 'Hà Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Mô', 'Ninh Bình');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Mỹ', 'Hưng Yên');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Phong', 'Bắc Ninh');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Sơn', 'Tuyên Quang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Thành', 'Nghệ An');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Thế', 'Bắc Giang');
INSERT INTO `universitydb`.`que_quan` (`ten_huyen`, `ten_tinh`) VALUES ('Yên Thủy', 'Hòa Bình');

ALTER TABLE lop_hoc
ADD CONSTRAINT unique_huyen_tinh UNIQUE (ten_lop, id_chuong_trinh_hoc);

ALTER TABLE dang_ky
ADD CONSTRAINT chk_dang_ky UNIQUE (id_sinh_vien, id_lop_hoc); 

ALTER TABLE thu_hoc_phi
ADD CONSTRAINT chk_thu_hoc_phi UNIQUE (id_sinh_vien, id_hoc_ky);

ALTER TABLE thu_hoc_phi
ADD CONSTRAINT chk_so_tien_dong CHECK (so_tien_dong >= 0);

ALTER TABLE hoc_ky
ADD CONSTRAINT chk_nam_hoc CHECK (nam_hoc >= 0);

ALTER TABLE tham_so
ADD CONSTRAINT chk_tham_so CHECK (tien_hoc_moi_tin_chi_ly_thuyet >= 0 AND tien_hoc_moi_tin_chi_thuc_hanh >= 0);

ALTER TABLE que_quan
ADD CONSTRAINT unique_huyen_tinh UNIQUE (ten_huyen, ten_tinh);

ALTER TABLE doi_tuong
ADD CONSTRAINT chk_tile_giam_hoc_phi CHECK (tile_giam_hoc_phi >= 0 AND tile_giam_hoc_phi <= 100);
-- Sửa đổi bảng Khoa để đảm bảo ten_khoa là duy nhất
ALTER TABLE Khoa
ADD CONSTRAINT unique_ten_khoa UNIQUE (ten_khoa);

-- Sửa đổi bảng nganh_hoc để đảm bảo ten_nganh_hoc là duy nhất
ALTER TABLE nganh_hoc
ADD CONSTRAINT unique_ten_nganh_hoc UNIQUE (ten_nganh_hoc);

-- Sửa đổi bảng tai_khoan để đảm bảo ten_tai_khoan là duy nhất
ALTER TABLE tai_khoan
ADD CONSTRAINT unique_ten_tai_khoan UNIQUE (ten_tai_khoan),
ADD CONSTRAINT unique_ten_tai_khoan_2 UNIQUE (id_sinh_vien);
-- Sửa đổi bảng mon_hoc để đảm bảo ten_mon_hoc là duy nhất
ALTER TABLE mon_hoc
ADD CONSTRAINT unique_ten_mon_hoc UNIQUE (ten_mon_hoc, id_loai_mon);

-- Sửa đổi bảng loai_mon để đảm bảo ten_loai_mon là duy nhất
ALTER TABLE loai_mon
ADD CONSTRAINT unique_ten_loai_mon UNIQUE (ten_loai_mon);

-- Sửa đổi bảng hoc_ky để đảm bảo sự kết hợp duy nhất của ten_hoc_ky và nam_hoc
ALTER TABLE hoc_ky
ADD CONSTRAINT unique_hoc_ky_nam_hoc UNIQUE (ten_hoc_ky, nam_hoc);

-- Sửa đổi bảng doi_tuong để đảm bảo ten_loai_doi_tuong là duy nhất
ALTER TABLE doi_tuong
ADD CONSTRAINT unique_ten_loai_doi_tuong UNIQUE (ten_loai_doi_tuong);

-- Sửa đổi bảng que_quan để đảm bảo sự kết hợp duy nhất của ten_huyen và ten_tinh
ALTER TABLE que_quan
ADD CONSTRAINT unique_huyen_tinh UNIQUE (ten_huyen, ten_tinh);

-- Sửa đổi bảng chuong_trinh_hoc để đảm bảo sự kết hợp duy nhất của id_nganh_hoc, id_mon_hoc, id_hoc_ky
ALTER TABLE chuong_trinh_hoc
ADD CONSTRAINT unique_chuong_trinh_hoc UNIQUE (id_nganh_hoc, id_mon_hoc, id_hoc_ky);

DELIMITER //
-- Tạo Stored Procedure để kiểm tra điều kiện
CREATE PROCEDURE check_mon_hoc_conditions(IN p_id_loai_mon INT, IN p_so_tiet INT, IN p_tin_chi INT)
BEGIN
    DECLARE loai_mon_name VARCHAR(255);

    -- Lấy tên loại môn học
    SELECT ten_loai_mon INTO loai_mon_name
    FROM loai_mon
    WHERE id_loai_mon = p_id_loai_mon;

    -- Kiểm tra điều kiện
    IF loai_mon_name = 'LT' AND p_so_tiet / 15 != p_tin_chi THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Đối với môn học LT, số tiết / 15 phải bằng số tín chỉ';
    ELSEIF loai_mon_name = 'TH' AND p_so_tiet / 30 != p_tin_chi THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Đối với môn học TH, số tiết / 30 phải bằng số tín chỉ';
    END IF;
END//

-- Trigger cho INSERT
CREATE TRIGGER before_mon_hoc_insert
BEFORE INSERT ON mon_hoc
FOR EACH ROW
BEGIN
    CALL check_mon_hoc_conditions(NEW.id_loai_mon, NEW.so_tiet, NEW.tin_chi);
END//

-- Trigger cho UPDATE
CREATE TRIGGER before_mon_hoc_update
BEFORE UPDATE ON mon_hoc
FOR EACH ROW
BEGIN
    CALL check_mon_hoc_conditions(NEW.id_loai_mon, NEW.so_tiet, NEW.tin_chi);
END//

DELIMITER ;


DELIMITER //
-- Trigger cho INSERT
CREATE TRIGGER check_student_major_before_insert
BEFORE INSERT ON dang_ky
FOR EACH ROW
BEGIN
    CALL check_student_major(NEW.id_sinh_vien, NEW.id_lop_hoc);
END//

-- Trigger cho UPDATE
CREATE TRIGGER check_student_major_before_update
BEFORE UPDATE ON dang_ky
FOR EACH ROW
BEGIN
    CALL check_student_major(NEW.id_sinh_vien, NEW.id_lop_hoc);
END//

-- Stored Procedure để kiểm tra ngành học
CREATE PROCEDURE check_student_major(IN p_id_sinh_vien INT, IN p_id_lop_hoc INT)
BEGIN
    DECLARE student_major INT;
    DECLARE class_major INT;
    
    -- Lấy ngành học của sinh viên
    SELECT id_nganh_hoc INTO student_major
    FROM sinh_vien
    WHERE id_sinh_vien = p_id_sinh_vien;
    
    -- Lấy ngành học của lớp
    SELECT nganh_hoc.id_nganh_hoc INTO class_major
    FROM lop_hoc
    JOIN chuong_trinh_hoc ON lop_hoc.id_chuong_trinh_hoc = chuong_trinh_hoc.id_chuong_trinh_hoc
    JOIN nganh_hoc ON chuong_trinh_hoc.id_nganh_hoc = nganh_hoc.id_nganh_hoc
    WHERE lop_hoc.id_lop_hoc = p_id_lop_hoc;
    
    -- Kiểm tra xem ngành học của sinh viên có khớp với ngành học của lớp không
    IF student_major != class_major THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sinh viên chỉ được đăng ký lớp học thuộc ngành của mình';
    END IF;
END//

DELIMITER ;
DELIMITER //
CREATE TRIGGER before_insert_dang_ky
BEFORE INSERT ON dang_ky
FOR EACH ROW
BEGIN
    DECLARE count INT;

    SELECT COUNT(*)
    INTO count
    FROM dang_ky dk
    JOIN lop_hoc lh ON dk.id_lop_hoc = lh.id_lop_hoc
    JOIN chuong_trinh_hoc cth ON lh.id_chuong_trinh_hoc = cth.id_chuong_trinh_hoc
    WHERE dk.id_sinh_vien = NEW.id_sinh_vien
      AND cth.id_mon_hoc = (SELECT id_mon_hoc FROM lop_hoc lh2 WHERE lh2.id_lop_hoc = NEW.id_lop_hoc)
      AND cth.id_chuong_trinh_hoc = (SELECT id_chuong_trinh_hoc FROM lop_hoc lh2 WHERE lh2.id_lop_hoc = NEW.id_lop_hoc);

    IF count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sinh viên đã đăng ký lớp học này trong chương trình học này.';
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_update_dang_ky
BEFORE UPDATE ON dang_ky
FOR EACH ROW
BEGIN
    DECLARE count INT;

    SELECT COUNT(*)
    INTO count
    FROM dang_ky dk
    JOIN lop_hoc lh ON dk.id_lop_hoc = lh.id_lop_hoc
    JOIN chuong_trinh_hoc cth ON lh.id_chuong_trinh_hoc = cth.id_chuong_trinh_hoc
    WHERE dk.id_sinh_vien = NEW.id_sinh_vien
      AND cth.id_mon_hoc = (SELECT id_mon_hoc FROM lop_hoc lh2 WHERE lh2.id_lop_hoc = NEW.id_lop_hoc)
      AND cth.id_chuong_trinh_hoc = (SELECT id_chuong_trinh_hoc FROM lop_hoc lh2 WHERE lh2.id_lop_hoc = NEW.id_lop_hoc)
      AND dk.so_phieu_dk != NEW.so_phieu_dk;

    IF count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sinh viên đã đăng ký lớp học này trong chương trình học này.';
    END IF;
END;
//

DELIMITER ;

