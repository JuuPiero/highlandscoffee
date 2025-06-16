https:--www.material-tailwind.com-docs-react-carousel --SlideShow

Db:

table Tin tức(
idTintuc,
name,
hinhanh,
day,
hour,
)

table User(
idnguoidung,
email,
password,
ten,
tuoi,
gioitinh,
ngaysinh,
sdt,
)

table sanpham(
idsp,
tensp,
hinhanh,
giaban,
soluong,
)

sanphamchitiet(
idspct,
idsp khoa ngoai sanpham(idsp),
motasanpham,
thuonghieu,
)

donhang(
iddonhang,
soluongsanpham,
tongtien,
trangthai,
)

donhangchitiet(
iddonhangchitiet,
iddonhang khoa ngoai donhang(iddonhang),
sanpham(luu theo dang mot mang json ngan cach nhau boi dau phay bao gom hinhanh,tensp,soluong)
trangthai,
)

task
Kiem tra tinh trang don hang

-- ta cần
Admin

Them sua xoa thong tin san pham. ( Don gian hon = viec hien thi toan bo ke ca chi tiet sau do neu sua thi bat buoc sua tat ca. Them thi them tat ca. Phan mo ta co the bo trong )
them sua xoa thong tin cua tintuc,
kiem tra nguoi dung user, add them role
kiem tra don hang, check 3 trang thai
Xem duoc tien kiem duoc.( can them 1 cot gia nhập hàng )
So don hang thanh cong, dang xu ly, chua xac nhan
