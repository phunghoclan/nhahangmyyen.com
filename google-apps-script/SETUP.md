# Quy trình đặt bàn và tiếp nhận yêu cầu

## Hệ thống thực hiện

1. Lưu yêu cầu từ website vào Google Trang tính.
2. Gửi email thông báo cho `nhahangmyyen88@gmail.com`.
3. Gửi email báo đã nhận yêu cầu nếu khách cung cấp email.
4. Nhân viên kiểm tra khả năng phục vụ, liên hệ khách và chỉ tạo lịch sau khi hai bên xác nhận.

Như vậy, **đã nhận yêu cầu** luôn được phân biệt rõ với **đã xác nhận đặt chỗ**.

## Thiết lập một lần

1. Đăng nhập `nhahangmyyen88@gmail.com` và mở Google Apps Script.
2. Tạo dự án tên `Mỹ Yến — Yêu cầu từ website` rồi thay mã mặc định bằng nội dung trong `Code.gs`.
3. Trong **Cài đặt dự án → Thuộc tính tập lệnh**, thêm `REQUEST_SHEET_ID` với giá trị `1SGHBJwgJXMuDToSKKlLA5jwmRu2qcpxZ8JUCJuRKaIs`. Bước này kết nối biểu mẫu với bảng theo dõi hiện có và tránh tạo bảng trùng.
4. Triển khai dưới dạng **Ứng dụng web**. Chọn thực thi bằng tài khoản nhà hàng và cho phép mọi người truy cập.
5. Cho phép quyền Google Trang tính, Gmail và Google Lịch khi Google yêu cầu.
6. Sao chép đường dẫn triển khai kết thúc bằng `/exec` vào `reservation-config.js`.
7. Lần đầu tạo lịch đã xác nhận, hệ thống sẽ tạo lịch riêng tên `Mỹ Yến — Đặt bàn & Sự kiện`. Chia sẻ lịch này cho nhân viên với quyền **Xem tất cả chi tiết sự kiện** hoặc **Thay đổi sự kiện**, tùy vai trò.

## Quy tắc xử lý cho nhân viên

- Phản hồi yêu cầu mới trong vòng **30–60 phút, từ 06:00 đến 21:00**.
- Không hứa còn chỗ trong email báo đã nhận yêu cầu.
- Trước khi tạo lịch, xác nhận ngày, giờ, số khách hoặc số suất, khu vực phục vụ, thực đơn, tiền cọc và người phụ trách.
- Trường hợp gấp trong ngày, dùng Zalo `0948900488` hoặc gọi `0948 900 488`.

## Zalo

Website có thể đưa khách đến Zalo ngay. Chỉ thêm thông báo Zalo tự động sau khi nhà hàng có Zalo Official Account và quyền dùng API phù hợp. Dự án này không lưu thông tin đăng nhập Zalo.
