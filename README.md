# Dashboard kinh doanh · Wireframe Phase 1

Bản sao đã gỡ nhãn đánh dấu triển khai, hiện có 6 tab nội dung nghiệp vụ của [repo gốc](https://github.com/louisgiang/wireframe-phase1-dashboard).

## Nội dung

| Tab | Nội dung chính |
| --- | --- |
| Tổng quan | 8 chỉ tiêu chính, doanh số và dư nợ theo ngày |
| Doanh số | GTGD, phí net, hoa hồng dự tính, xếp hạng CTV/TVĐT/KH, bảng theo cây môi giới, danh sách KH |
| Dư nợ & Món vay | Dư nợ, giải ngân, thu nợ, lãi phí, cơ cấu nợ, danh sách KH/TK và món vay |
| KH hiện hữu | Số khách hàng, active, NAV, dư nợ, phân bổ NAV, danh sách khách hàng |
| KH mở mới | Số khách hàng mới, active, tài khoản nộp tiền, NAV, dư nợ, phễu và chi tiết tài khoản |
| Nộp rút | Dòng tiền, Top KH nộp/rút ròng, nộp/rút ròng theo người quản lý |

Xem [kiểm kê repo gốc](docs/REPO-INVENTORY.md) để biết cấu trúc, chỉ tiêu, bảng, quy tắc và giới hạn. [Bản trích xuất nội dung đầy đủ](docs/SCREEN-CONTENT.md) liệt kê văn bản và số liệu của cả 6 màn sau khi gỡ nhãn.

## Chạy

Mở `wireframe-phase1-v2-tabs.html` trực tiếp trong trình duyệt, hoặc chạy:

```sh
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080/wireframe-phase1-v2-tabs.html`.

Không cần cài dependency hay chạy build. Khi import repo vào Vercel, dùng preset **Other**; `vercel.json` đã ánh xạ `/` đến trang HTML.

## Phạm vi bản này

- Bỏ toàn bộ phần “0. Kết luận”.
- Bỏ hai tab “So sánh & Ranking CP” và “Doanh số, phí net & hoa hồng”, gồm cả nội dung và nút điều hướng.
- Tổng quan có 8 chỉ tiêu theo thứ tự: KH quản lý, KH mở mới, GTGD cổ phiếu, Dư nợ, Vòng quay tài sản (lần), Doanh thu phí, Phí net, Hoa hồng dự kiến. Hiển thị 4 cột trên máy tính và 2 cột trên màn hình nhỏ.
- KH mở mới, GTGD cổ phiếu, Dư nợ, Vòng quay tài sản và Doanh thu phí có thanh tiến độ. Hai mức kế hoạch mẫu được chọn cho demo là 1 lần và 60 triệu đồng, tương ứng 40% và 40,2%. Doanh thu phí lấy tổng phí cổ phiếu 24,1 triệu trước phí sàn; phí net là 20,4 triệu. Vòng quay tài sản là 0,4 lần. Giữ đơn vị tài khoản cho số mở mới 38/50 theo dữ liệu nguồn.

- Gỡ chú giải và nhãn đánh dấu triển khai ở cả 6 tab, gồm các biến thể viết tắt và nhãn của màn v1.2.
- Gỡ dải tiêu đề nền đen giới thiệu wireframe/phiên bản ở cả 6 tab.
- Bỏ khoảng đệm/CSS chỉ dành cho các nhãn đã gỡ.
- Gỡ toàn bộ chú thích giải nghĩa, ghi chú triển khai, khối đối chiếu bản test và khối minh họa trạng thái KPI trên giao diện.
- Giữ các KPI nghiệp vụ, biểu đồ, bảng, cảnh báo, hành động và điều hướng; giữ tên chuỗi dữ liệu để đọc biểu đồ.
- Giữ lịch sử commit gốc; không sửa repo hay deployment Vercel gốc.

Đây là wireframe với dữ liệu minh họa nhúng trong HTML. Chuyển tab, deep link và bàn phím hoạt động; Bộ lọc kỳ báo cáo và phạm vi dữ liệu có thể thao tác, đồng bộ trên cả 6 tab; phân trang hoạt động ở hai bảng tab Doanh số và bảng KH hiện hữu; lọc Active/Inactive hoạt động ở bảng KH hiện hữu; tìm kiếm, phân trang các tab khác và các thao tác nghiệp vụ khác chưa được lập trình. Số liệu, biểu đồ và ngày chốt dữ liệu vẫn là dữ liệu minh họa cố định, chưa được tính lại theo bộ lọc.

Nguồn: commit `2b9227bf933b7212a4c8014862139c22988f60ef`, kiểm kê ngày 29/09/2026. Repo gốc không có tệp LICENSE.

## Bộ lọc chung

- Gỡ dòng thời điểm dữ liệu/cập nhật khỏi cả 6 tab; ô ngày và ô phạm vi dùng cùng chiều cao 36 pixel và căn cùng hàng trên máy tính.

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

- Thẻ chỉ tiêu hiển thị số khách hàng hiện hữu, số khách hàng active, NAV, thay đổi NAV và dư nợ; chú giải KH active hiển thị bằng tooltip khi rê chuột, chạm hoặc focus biểu tượng thông tin. KH active là khách hàng có ít nhất một giao dịch khớp trong kỳ báo cáo.
- Biểu đồ tỷ lệ tài khoản active dùng trục phần trăm theo ngày; số tài khoản có giao dịch khớp từ đầu kỳ đến ngày đang xem chia 692 tài khoản quản lý. Dữ liệu mẫu kết thúc ngày 27/09 với 48 tài khoản (6,94%), thuộc 42 khách hàng active; không đồng nhất số khách hàng với số tài khoản.
- Tăng trưởng NAV là NAV tại ngày đang xem trừ NAV đầu kỳ của từng kỳ, đơn vị tỷ đồng. Mẫu kỳ hiện tại tăng từ 275,8 tỷ đầu kỳ lên 283,5 tỷ ngày 27/09, thay đổi +7,7 tỷ, đồng bộ thẻ chỉ tiêu. Chỉ hiển thị một đường kỳ hiện tại; các điểm hàng ngày là dữ liệu minh họa, không tính lại theo bộ lọc.
- Tỷ lệ KH active theo TVĐT dùng mẫu 20/180, 12/150, 7/100 và 3/70, tổng 42/500 khách hàng. Không lấy một trừ tỷ lệ ngủ đông do hai chỉ tiêu khác định nghĩa và đơn vị đếm.

## Danh sách khách hàng hiện hữu

- Chín cột: Số tài khoản, Họ tên KH, NAV cuối kỳ, Số lệnh CP, Số lệnh TP, GTGD CP, GTGD TP, Phí net, Người quản lý. Tài khoản dạng 069Cxxxxxx; người quản lý dạng mã MG/RE - họ tên.
- Lọc Active/Inactive, mặc định Active. Active khi tài khoản có ít nhất một lệnh cổ phiếu hoặc trái phiếu khớp trong kỳ; Inactive khi không có lệnh khớp. Số lệnh mẫu trong bảng là số lệnh đã khớp. Không đồng nhất Inactive với trạng thái ngủ đông nhiều tháng.
- Phân trang 20 bản ghi sau khi lọc; đổi bộ lọc quay về trang 1. Dữ liệu minh họa gồm 24 tài khoản active và 3 inactive, là tập con dùng để thể hiện hai trang; không thay đổi số tổng hợp toàn danh mục. Có tài khoản chỉ giao dịch trái phiếu để minh họa điều kiện active. Số lệnh, tài khoản bổ sung và mã RE là dữ liệu mẫu.
- Bỏ toàn bộ khối Điểm sáng, Cần lưu ý, Việc nên làm trên tất cả các màn.

## Cấu trúc khách hàng và khách hàng mở mới

- KH hiện hữu: 500 khách hàng, 42 khách hàng active, tổng NAV 283,5 tỷ, thay đổi NAV +7,7 tỷ, dư nợ mẫu 2,34 tỷ. Tổng 692 tài khoản vẫn là mẫu số của biểu đồ tỷ lệ tài khoản active và phân bổ NAV.
- KH mở mới: 38 khách hàng, 5 khách hàng active theo giao dịch khớp, 11 tài khoản nộp tiền, NAV 3,9 tỷ, dư nợ 0,2 tỷ. Mẫu giả định mỗi khách hàng mới có một tài khoản. Số 11 là dữ liệu nộp tiền minh họa, không suy ra từ NAV trong triển khai thật.
- Phễu: 38 tài khoản mở mới → 11 tài khoản nộp tiền → 5 tài khoản giao dịch. Biểu đồ ngày cộng đủ 38 mở mới/5 active; Top TVĐT là 15/10/8/5 tài khoản.
- Các bậc NAV trên hai màn: [0; 500 triệu), [500 triệu; 2 tỷ), [2 tỷ; 5 tỷ), [5 tỷ; 10 tỷ), từ 10 tỷ. Phân bổ tài khoản mẫu hiện hữu: 620/48/15/6/3 (tổng 692); mẫu mở mới: 36/2/0/0/0 (tổng 38). Bậc hiện hữu là phân bổ minh họa mới, không thể suy ra chính xác từ các bậc cũ.
- Chi tiết mở mới có đủ 38 dòng mẫu, 5 Active và 33 Inactive; mặc định Active, 20 bản ghi/trang. Active là có giao dịch khớp trong kỳ; có tiền hoặc NAV dương chưa đủ để active. Các cột gồm số tài khoản, họ tên, ngày mở đầy đủ ngày/tháng/năm, NAV, GTGD CP, người quản lý. Bộ lọc trạng thái hoạt động; bộ lọc chung vẫn chưa tính lại dữ liệu mẫu.

## Nộp Rút

- Bốn chỉ tiêu: Tổng nộp 17,6 tỷ, Tổng rút 4,03 tỷ, Nộp/Rút ròng +13,57 tỷ, Số lượng KH nộp/rút 38/17. Bỏ thanh tiến độ và kế hoạch Tổng nộp, bỏ số lượt nộp/rút.
- Biểu đồ Nộp Rút theo thời gian: hai cột theo ngày, không có bộ chọn Ngày/Tuần/Tháng. Nộp/Rút ròng: một cột mỗi ngày bằng nộp trừ rút, dương trên đường 0 và âm dưới đường 0; không lũy kế, không so sánh kỳ trước.
- Các mốc tiền mẫu tạm dùng: 0/2/4/6/8/10 tỷ cho nộp-rút; −2/0/2/4/6/8/10 tỷ cho ròng. Có thể thay mốc khi được chốt. Giữ các nhãn ngày 02, 06, 10, 14, 18, 22, 25, 27 tháng 09.
- Dữ liệu ngày là minh họa tháng 09/2026; tổng khớp ba thẻ tiền. Ngày 10/09 ròng −0,4 tỷ và 26/09 ròng −1,62 tỷ minh họa âm; ngày 27/09 nộp 9,5 tỷ, rút 0,2 tỷ. Tooltip cho biết ngày, nộp, rút và ròng; dữ liệu vẫn chưa tính lại theo bộ lọc chung.

## Xếp hạng Nộp/Rút

- Hai biểu đồ Top 10 KH nộp ròng/rút ròng giữ dạng thanh ngang; bên trái số tài khoản 069Cxxxxxx - họ tên, bên phải số tiền. Mỗi biểu đồ hiển thị tối đa 10 khách hàng thực sự có số ròng cùng dấu; không thêm khách hàng giá trị 0 để đủ 10.
- Bộ chọn Trong ngày (27/09)/Trong kỳ hoạt động, mặc định trong ngày; áp dụng đồng thời cho bốn biểu đồ xếp hạng. Mẫu trong kỳ có 10 khách hàng mỗi phía; mẫu ngày có 2 khách hàng nộp ròng và 4 khách hàng rút ròng.
- Phần quản lý chia hai biểu đồ Nộp ròng và Rút ròng. Nhãn MG/RE - họ tên; số tiền mang dấu + hoặc −. Cộng số ròng của khách hàng theo người quản lý, rồi chia nhóm theo dấu; không xếp một người vào cả hai nhóm trong cùng kỳ.
- Dữ liệu minh họa mới tính bằng triệu đồng: toàn kỳ nộp 17.600, rút 4.030, ròng 13.570; ngày 27/09 nộp 9.500, rút 200, ròng 9.300, khớp biểu đồ diễn biến. Các tài khoản/ràng buộc quản lý bổ sung là mẫu; chưa tính lại theo bộ lọc chung.
- Bỏ Giao dịch nộp/rút lớn nhất, Tỷ lệ KH nộp ròng/rút ròng và toàn bộ mục 4 KH tiền chờ & bảng tổng hợp.
