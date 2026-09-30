# Dashboard kinh doanh · Wireframe Phase 1

Bản sao đã gỡ nhãn đánh dấu triển khai, giữ 8 tab và nội dung nghiệp vụ của [repo gốc](https://github.com/louisgiang/wireframe-phase1-dashboard).

## Nội dung

| Tab | Nội dung chính |
| --- | --- |
| Tổng quan | 8 chỉ tiêu chính, doanh số và dư nợ theo ngày, cảnh báo và việc nên làm |
| Doanh số | GTGD, phí net, hoa hồng dự tính, xếp hạng CTV/TVĐT/KH, bảng theo cây môi giới, danh sách KH |
| Dư nợ & Món vay | Dư nợ, giải ngân, thu nợ, lãi phí, cơ cấu nợ, danh sách KH/TK và món vay |
| KH hiện hữu | Quy mô KH/TK, active/ngủ đông, NAV, phân bổ, danh sách chăm sóc |
| Mở mới | KPI mở tài khoản, active, NAV/tài sản, phễu chuyển đổi, chi tiết tài khoản |
| Nộp rút | Dòng tiền, Top KH nộp/rút ròng, tiền chờ, giao dịch lớn, bảng KH/TK |
| So sánh & Ranking CP | So sánh TVĐT, heatmap, vị trí cá nhân, ranking cổ phiếu, phí net theo tháng |
| Doanh số, phí net & hoa hồng | Màn gộp v1.2: KPI, diễn biến, giao dịch theo KH, phí và hoa hồng theo KH |

Xem [kiểm kê repo gốc](docs/REPO-INVENTORY.md) để biết cấu trúc, chỉ tiêu, bảng, quy tắc và giới hạn. [Bản trích xuất nội dung đầy đủ](docs/SCREEN-CONTENT.md) liệt kê văn bản và số liệu của cả 8 màn sau khi gỡ nhãn.

## Chạy

Mở `wireframe-phase1-v2-tabs.html` trực tiếp trong trình duyệt, hoặc chạy:

```sh
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080/wireframe-phase1-v2-tabs.html`.

Không cần cài dependency hay chạy build. Khi import repo vào Vercel, dùng preset **Other**; `vercel.json` đã ánh xạ `/` đến trang HTML.

## Phạm vi bản này

- Bỏ toàn bộ phần “0. Kết luận”, bao gồm hai khối kết luận trong tab gộp doanh số, phí và hoa hồng.
- Tổng quan có 8 chỉ tiêu theo thứ tự: KH quản lý, KH mở mới, GTGD cổ phiếu, Dư nợ, Vòng quay tài sản (lần), Doanh thu phí, Phí net, Hoa hồng dự kiến. Hiển thị 4 cột trên máy tính và 2 cột trên màn hình nhỏ.
- KH mở mới, GTGD cổ phiếu, Dư nợ, Vòng quay tài sản và Doanh thu phí có thanh tiến độ. Hai mức kế hoạch mẫu được chọn cho demo là 1 lần và 60 triệu đồng, tương ứng 40% và 40,2%. Doanh thu phí lấy tổng phí cổ phiếu 24,1 triệu trước phí sàn; phí net là 20,4 triệu. Vòng quay tài sản là 0,4 lần. Giữ đơn vị tài khoản cho số mở mới 38/50 theo dữ liệu nguồn.

- Gỡ chú giải và nhãn đánh dấu triển khai ở cả 8 tab, gồm các biến thể viết tắt và nhãn của màn v1.2.
- Gỡ dải tiêu đề nền đen giới thiệu wireframe/phiên bản ở cả 8 tab.
- Bỏ khoảng đệm/CSS chỉ dành cho các nhãn đã gỡ.
- Gỡ toàn bộ chú thích giải nghĩa, ghi chú triển khai, khối đối chiếu bản test và khối minh họa trạng thái KPI trên giao diện.
- Giữ các KPI nghiệp vụ, biểu đồ, bảng, cảnh báo, hành động và điều hướng; giữ tên chuỗi dữ liệu để đọc biểu đồ.
- Giữ lịch sử commit gốc; không sửa repo hay deployment Vercel gốc.

Đây là wireframe với dữ liệu minh họa nhúng trong HTML. Chuyển tab, deep link và bàn phím hoạt động; Bộ lọc kỳ báo cáo và phạm vi dữ liệu có thể thao tác, đồng bộ trên cả 8 tab; tìm kiếm, phân trang và các thao tác nghiệp vụ khác chưa được lập trình. Số liệu, biểu đồ và ngày chốt dữ liệu vẫn là dữ liệu minh họa cố định, chưa được tính lại theo bộ lọc. Tab v1.2 cuối cùng dùng phạm vi/ngày/số liệu khác 7 tab v2 đầu tiên.

Nguồn: commit `2b9227bf933b7212a4c8014862139c22988f60ef`, kiểm kê ngày 29/09/2026. Repo gốc không có tệp LICENSE.

## Bộ lọc chung

- Gỡ dòng thời điểm dữ liệu/cập nhật khỏi cả 8 tab; ô ngày và ô phạm vi dùng cùng chiều cao 36 pixel và căn cùng hàng trên máy tính.

- Kỳ báo cáo: chọn hoặc nhập Từ ngày và Đến ngày theo định dạng ngày/tháng/năm. Khi tải trang, mặc định từ ngày 01 của tháng hiện tại đến ngày hiện tại theo thiết bị; ví dụ mở ngày 05/10/2026 sẽ là 01/10/2026–05/10/2026. Kiểm tra ngày hợp lệ và ngày bắt đầu không sau ngày kết thúc.
- Phạm vi dữ liệu: mặc định `MG1268 - Trần Phương Anh`; danh sách dạng cây cho phép chọn Tất cả (bản thân và cấp dưới), bản thân hoặc một người cấp dưới. Các tên và mã lấy từ demo; quan hệ cấp dưới được mô phỏng, không phải dữ liệu tổ chức thật. Không đưa cấp trên vào danh sách.
- `dashboard-filters.js` quản lý trạng thái dùng chung và cập nhật nhãn lọc ở tab gộp. Bản triển khai thật phải nhận người dùng, cây cấp dưới và quyền truy cập từ máy chủ, rồi tải dữ liệu tương ứng. Danh sách trên giao diện không thay thế phân quyền máy chủ.
