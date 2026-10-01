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

Đây là wireframe với dữ liệu minh họa nhúng trong HTML. Chuyển tab, deep link và bàn phím hoạt động; Bộ lọc kỳ báo cáo và phạm vi dữ liệu có thể thao tác, đồng bộ trên cả 8 tab; phân trang hoạt động ở hai bảng tab Doanh số và bảng KH hiện hữu; lọc Active/Inactive hoạt động ở bảng KH hiện hữu; tìm kiếm, phân trang các tab khác và các thao tác nghiệp vụ khác chưa được lập trình. Số liệu, biểu đồ và ngày chốt dữ liệu vẫn là dữ liệu minh họa cố định, chưa được tính lại theo bộ lọc. Tab v1.2 cuối cùng dùng phạm vi/ngày/số liệu khác 7 tab v2 đầu tiên.

Nguồn: commit `2b9227bf933b7212a4c8014862139c22988f60ef`, kiểm kê ngày 29/09/2026. Repo gốc không có tệp LICENSE.

## Bộ lọc chung

- Gỡ dòng thời điểm dữ liệu/cập nhật khỏi cả 8 tab; ô ngày và ô phạm vi dùng cùng chiều cao 36 pixel và căn cùng hàng trên máy tính.

- Kỳ báo cáo: chọn hoặc nhập Từ ngày và Đến ngày theo định dạng ngày/tháng/năm. Khi tải trang, mặc định từ ngày 01 của tháng hiện tại đến ngày hiện tại theo thiết bị; ví dụ mở ngày 05/10/2026 sẽ là 01/10/2026–05/10/2026. Kiểm tra ngày hợp lệ và ngày bắt đầu không sau ngày kết thúc.
- Phạm vi dữ liệu: mặc định `MG1268 - Trần Phương Anh`; danh sách dạng cây cho phép chọn Tất cả (bản thân và cấp dưới), bản thân hoặc một người cấp dưới. Các tên và mã lấy từ demo; quan hệ cấp dưới được mô phỏng, không phải dữ liệu tổ chức thật. Không đưa cấp trên vào danh sách.
- `dashboard-filters.js` quản lý trạng thái dùng chung và cập nhật nhãn lọc ở tab gộp. Bản triển khai thật phải nhận người dùng, cây cấp dưới và quyền truy cập từ máy chủ, rồi tải dữ liệu tương ứng. Danh sách trên giao diện không thay thế phân quyền máy chủ.

## Cập nhật màn Doanh số

- Bốn chỉ tiêu: GTGD cổ phiếu, Phí net CP, GTGD TP, Hoa hồng dự kiến.
- Biểu đồ Doanh thu phí net lũy kế có hai kỳ, trục ngày/tháng, đơn vị triệu đồng và tooltip dùng chung theo ngày. Số kỳ hiện tại ngày 27 là 20,4 triệu; các điểm còn lại là dữ liệu biểu diễn mẫu.
- Hai biểu đồ Top MG/CTV và Top KH đặt cạnh nhau (xếp dọc trên màn hình nhỏ), mỗi biểu đồ 5 vị trí, xếp giảm dần theo phí net CP. Nhãn nhân sự hiển thị mã MG/RE - họ tên; nhãn khách hàng hiển thị số tài khoản - họ tên, khớp bảng bên dưới. Mã RE002 và RE005 là mã minh họa. Biểu đồ nhân sự gộp các tư vấn đầu tư và cộng tác viên đã có trong mẫu; số giữa hai nhóm không dùng để cộng thành tổng phí.
- Bảng môi giới có 7 cột; bảng khách hàng có 8 cột, số tài khoản dạng 069Cxxxxxx. Bảng mục 4 phân trang 10 bản ghi/trang, bảng mục 5 phân trang 20 bản ghi/trang, với nút Trước/Sau và thông tin số bản ghi. Dòng tổng cộng môi giới luôn hiển thị, không tính vào số bản ghi mỗi trang. Dữ liệu mẫu hiện có 4 môi giới và 7 khách hàng nên mỗi bảng chỉ có một trang. Không có lọc/tìm kiếm riêng.
- Bổ sung dữ liệu minh họa cho số khách hàng quản lý (180/150/100/70, tổng 500), số tài khoản, NAV và hai khách hàng xếp hạng thứ 4–5. Danh sách khách hàng là các dòng mẫu, không phải toàn bộ danh mục để cộng thành tổng kỳ. Phí net mỗi dòng bằng doanh thu phí trừ phí trả sở. Các bảng ở tab khác giữ bộ mẫu riêng.

- Xếp hạng Doanh số: mã – tên bên trái, thanh tỷ lệ ở giữa, số tiền bên phải trên cùng hàng. Thanh tỷ lệ giữ mức phí cao nhất của từng nhóm làm mốc 100%.

## Cập nhật khách hàng hiện hữu

- Thẻ chỉ tiêu bỏ dòng 500 KH và các tỷ lệ phụ; chú giải KH active hiển thị bằng tooltip khi rê chuột, chạm hoặc focus biểu tượng thông tin. KH active là khách hàng có ít nhất một giao dịch khớp trong kỳ báo cáo.
- Biểu đồ tỷ lệ tài khoản active dùng trục phần trăm theo ngày; số tài khoản có giao dịch khớp từ đầu kỳ đến ngày đang xem chia 692 tài khoản quản lý. Dữ liệu mẫu kết thúc ngày 27/09 với 48 tài khoản (6,94%), thuộc 42 khách hàng active; không đồng nhất số khách hàng với số tài khoản.
- Tăng trưởng NAV là NAV tại ngày đang xem trừ NAV đầu kỳ của từng kỳ, đơn vị tỷ đồng. Mẫu kỳ hiện tại tăng từ 275,8 tỷ đầu kỳ lên 283,5 tỷ ngày 27/09, thay đổi +7,7 tỷ, đồng bộ thẻ chỉ tiêu. Chỉ hiển thị một đường kỳ hiện tại; các điểm hàng ngày là dữ liệu minh họa, không tính lại theo bộ lọc.
- Tỷ lệ KH active theo TVĐT dùng mẫu 20/180, 12/150, 7/100 và 3/70, tổng 42/500 khách hàng. Không lấy một trừ tỷ lệ ngủ đông do hai chỉ tiêu khác định nghĩa và đơn vị đếm.

## Danh sách khách hàng hiện hữu

- Chín cột: Số tài khoản, Họ tên KH, NAV cuối kỳ, Số lệnh CP, Số lệnh TP, GTGD CP, GTGD TP, Phí net, Người quản lý. Tài khoản dạng 069Cxxxxxx; người quản lý dạng mã MG/RE - họ tên.
- Lọc Active/Inactive, mặc định Active. Active khi tài khoản có ít nhất một lệnh cổ phiếu hoặc trái phiếu khớp trong kỳ; Inactive khi không có lệnh khớp. Số lệnh mẫu trong bảng là số lệnh đã khớp. Không đồng nhất Inactive với trạng thái ngủ đông nhiều tháng.
- Phân trang 20 bản ghi sau khi lọc; đổi bộ lọc quay về trang 1. Dữ liệu minh họa gồm 24 tài khoản active và 3 inactive, là tập con dùng để thể hiện hai trang; không thay đổi số tổng hợp toàn danh mục. Có tài khoản chỉ giao dịch trái phiếu để minh họa điều kiện active. Số lệnh, tài khoản bổ sung và mã RE là dữ liệu mẫu.
- Bỏ toàn bộ khối Điểm sáng, Cần lưu ý, Việc nên làm trên tất cả các màn.
