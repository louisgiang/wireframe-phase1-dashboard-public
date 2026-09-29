# Kiểm kê repo gốc

Ngày kiểm kê: 29/09/2026.

## Nguồn và cấu trúc

- Repository: https://github.com/louisgiang/wireframe-phase1-dashboard
- Website gốc: https://wireframe-phase1-dashboard.vercel.app/
- Chủ sở hữu: `louisgiang`; chế độ public; nhánh duy nhất tại thời điểm kiểm tra: `main`.
- Commit được rà soát: `2b9227bf933b7212a4c8014862139c22988f60ef`.
- Tạo ngày 28/09/2026; mô tả repo: “Wireframe Phase 1 v2 — dashboard kinh doanh với 8 tab tương tác.”
- Toàn bộ cây mã nguồn có 2 tệp:

| Tệp | Kích thước gốc | Vai trò |
| --- | ---: | --- |
| `wireframe-phase1-v2-tabs.html` | 129.884 byte | HTML, CSS, JavaScript, dữ liệu mẫu và biểu đồ của toàn bộ dashboard |
| `vercel.json` | 149 byte | Rewrite `/` sang `/wireframe-phase1-v2-tabs.html` |

Không có package manifest, framework, dependency ngoài, backend, API, database, ảnh rời, bộ test, README hay LICENSE trong cây nguồn gốc.

Lịch sử gốc có 3 commit: tạo wireframe 7 tab (`f52f408`), thêm tab gộp doanh số/phí/hoa hồng (`c20e583`), sửa trang chủ Vercel 404 (`2b9227b`). Phạm vi kiểm kê là toàn bộ tệp và lịch sử mã nguồn đã clone; không bao gồm cài đặt riêng hay biến môi trường của tài khoản Vercel.

## Kiến trúc và hành vi

- Một trang HTML tiếng Việt; giao diện đơn sắc, tối đa 1.200 px, font hệ thống.
- CSS nội tuyến: thẻ KPI, thanh tiến độ, bảng, bộ lọc mẫu, heatmap, phễu, biểu đồ cột HTML/CSS và đường SVG.
- Responsive tại 1.240/820/600 px; thanh tab cuộn ngang. Chế độ in hiện cả 8 màn.
- JavaScript chỉ quản lý 8 tab: click, ArrowLeft/ArrowRight, Home/End, trạng thái ARIA, tiêu đề trang và URL hash. Hash không hợp lệ trở về Tổng quan.
- Các nội dung mô tả “lọc”, “mở KH”, “bấm dòng”, tìm kiếm, phân trang, chọn tháng/phạm vi, đổi chỉ tiêu và chế độ biểu đồ là mẫu giao diện, chưa có logic xử lý.
- Không có đăng nhập, phân quyền thực, kết nối Flex/SHA/DWH hay thao tác giao dịch.

## Ngữ cảnh chung

Bảy tab v2: khoảng tháng 09/2026 → 09/2026, phạm vi toàn nhánh, dữ liệu đến 27/09, cập nhật 28/09 14:21. Có đối chiếu với bản test ở cuối từng tab. Các đoạn đối chiếu là nội dung thiết kế, không chứng minh hệ thống thật đã triển khai các chức năng.

Tab v1.2 cuối: Tổng → TT MG Hà Nội 1 → Phòng MG 3 → Nguyễn Văn A, Cá nhân/Đơn vị, kỳ 09/2026, dữ liệu đến 13/09, cập nhật 06:30 ngày 14/09.

## 1. Tổng quan (`#tong-quan`)

- Kết luận: GTGD 29,3% KPI; còn 56,6 tỷ để đạt 80 tỷ; 278/692 TK ngủ đông; phí net giảm 18%; gợi ý kích hoạt và chăm KH nộp ròng lớn.
- KPI: GTGD CP 23,4/80 tỷ; phí net CP 20,4/51,6 triệu; dư nợ 2,34/5 tỷ; mở mới 38 TK, 76% KPI, 11 active; hoa hồng dự tính 13,7 triệu.
- Bốn mẫu trạng thái: có KPI, chưa đặt KPI, chưa đồng bộ, thiếu ngày.
- Tỷ lệ phí bình quân 0,09%; lãi suất vay bình quân 12,9%/năm; doanh số trái phiếu 109,95 triệu.
- Chỗ dành cho cơ cấu Block Deal/HNW/UHNW/HVT/Active, phụ thuộc bộ định lượng phân khúc PT03.
- Biểu đồ GTGD CP lũy kế theo ngày và dư nợ cuối ngày, so cùng ngày kỳ trước.
- Điểm sáng: vòng quay tài sản CP 0,4 lần; không có dư nợ quá hạn. Cảnh báo ngủ đông 40,2%, giảm phí net 18%.
- Khuyến nghị và tham chiếu rule R-KD-012, R-DT-002.
- Đối chiếu giải thích chuyển Top nộp/rút sang tab Nộp rút; các mục Đặt KPI, Hiệu suất KPI, Cấu hình phòng ban chỉ được nhắc trong ghi chú, không phải tab được triển khai.

## 2. Doanh số (`#doanh-so`)

- Hai lựa chọn minh họa Net CHUẨN / Net THỰC THU.
- KPI: phí net CP 20,4/51,6 triệu; chênh lệch phí CP 0; GTGD CP 23,4/80 tỷ; GTGD TP 109,95 triệu; 42 KH, 318 lệnh; hoa hồng dự tính 13,7 triệu.
- Xu hướng phí net/GTGD theo ngày; Top CTV, Top TVĐT/phòng, Top KH theo phí net.
- Bảng cây môi giới: đơn vị, số KH, số lệnh, GTGD, tổng phí, phí sàn, chênh lệch, phí net, HH dự tính, chỉ tiêu, % đạt. Có 4 TVĐT và dòng tổng.
- Danh sách KH: mã/tên, số lệnh, GTGD CP, tổng phí, phí sàn, phí net, HH dự tính, giao dịch gần nhất, TVĐT. Bộ lọc sàn, mua/bán, ngừng giao dịch, khoảng phí net; tìm kiếm mẫu.
- Điểm sáng/cảnh báo/hành động: Top 3 chiếm 39% phí net, 4 KH lớn ngừng giao dịch; rule R-KD-042.
- Ghi chú phạm vi xem Top theo vai trò, định nghĩa net và nguồn tính hoa hồng PT07.

## 3. Dư nợ & Món vay (`#du-no-mon-vay`)

- KPI: dư nợ 2,34/5 tỷ, 31 KH; giải ngân 1,20 tỷ; thu gốc 0,85 tỷ; giải ngân ròng 0,35 tỷ; lãi/phí dồn tích 18,6 triệu; quá hạn 0.
- Biểu đồ giải ngân/thu nợ theo thời gian, cơ cấu Margin 1,68 tỷ/ứng trước 0,47 tỷ/khác 0,19 tỷ, trong hạn/quá hạn, quy mô theo TVĐT.
- Danh sách KH/TK: mã/tên, TK, loại nợ, dư nợ, lãi/phí dồn tích, quá hạn, đến hạn gần nhất, TVĐT.
- Món vay của KH đang chọn: mã món, loại nợ, ngày/giá trị giải ngân, dư nợ còn, lãi suất, lãi/phí dồn tích, trạng thái.
- Bộ lọc loại nợ, quá hạn, khoảng dư nợ, lãi/phí lớn, đến hạn ≤7 ngày; tìm kiếm mẫu.
- Tập trung 61% dư nợ ở 3 KH; rule R-VAY-005 cho lãi/phí ≥5 triệu.
- Ngày đến hạn và nguồn mức món chưa xác nhận. Không có giải ngân, gia hạn, thu nợ thực.

## 4. KH hiện hữu (`#kh-hien-huu`)

- KPI: 692 TK/500 KH; 42 KH active (8,4%); 278 TK ngủ đông (40,2%); NAV 283,5 tỷ; giảm 7,7 tỷ (2,6%) từ 291,2 tỷ đầu kỳ.
- Biểu đồ ngủ đông theo tháng, NAV theo ngày, phân bổ NAV theo bậc, tỷ lệ ngủ đông theo TVĐT.
- Phân bổ NAV: 208 TK NAV=0; 84 dưới 10 triệu; 180 từ 10–100 triệu; 152 từ 100 triệu–1 tỷ; 68 từ 1 tỷ.
- Danh sách: mã/tên KH, số TK, trạng thái, GD gần nhất, NAV đầu/cuối kỳ, chênh lệch, GTGD kỳ, TVĐT.
- Bộ lọc active/ngủ đông, chưa GD N ngày, bậc NAV, NAV giảm >10%, tìm kiếm; minh họa mở từ Tổng quan với rule đang áp dụng.
- Rule R-KD-012: ngủ đông; R-KD-009: NAV ≥10 tỷ, không GD >30 ngày (23 KH); R-KD-031: NAV giảm >10% (14 KH).
- Chưa xác nhận định nghĩa active và cách đếm KH nhiều TK; NAV giảm chưa tách ảnh hưởng giá.

## 5. Mở mới (`#mo-moi`)

- KPI: 38/50 TK, 76%; 11 active; 28,9%; NAV 3,9 tỷ; tài sản 4,1 tỷ; dư nợ 0,2 tỷ; tiền nộp 4,2 tỷ; 5 TK đã GD.
- Biểu đồ mở mới/active theo thời gian; phễu 38 → 11 → 5; phân bổ NAV 27/3/4/2/2 TK theo 5 bậc; mở mới theo TVĐT.
- Danh sách: khách hàng, ngày mở, NAV, tài sản, dư nợ, active, nộp lần đầu, GD lần đầu, bước, TVĐT.
- Bộ lọc NAV=0, active chưa GD, đã GD, ngày mở và tìm kiếm.
- 27 TK chưa có tài sản, 6 active chưa GD; rule R-KD-021 với ngưỡng 7 ngày cấu hình PT03; liên hệ cùng tập tiền chờ M08.
- Ghi chú phân biệt active theo NAV với đã nộp tiền; mẫu số tỷ lệ đã GD có thể là toàn bộ TK mới hoặc TK active.

## 6. Nộp rút (`#nop-rut`)

- KPI: nộp 17,6/40 tỷ (44%); rút 4,03 tỷ; net +13,57 tỷ; 61/23 lượt nộp/rút; 38/17 KH.
- Biểu đồ nộp/rút theo thời gian, net lũy kế so kỳ trước, net theo bộ phận; tỷ lệ KH nộp/rút ròng 69%/31%.
- Top 10 KH nộp/rút ròng (hiển thị một số dòng mẫu), lựa chọn ngày/kỳ; bảng giao dịch lớn nhất gồm KH, ngày, loại, số tiền.
- Danh sách tiền chờ: mô tả 6 KH đã nộp >7 ngày chưa GD; các dòng mẫu và hướng mở danh sách để liên hệ.
- Bảng KH/TK: mã/tên, TK, tổng nộp/rút, net, phát sinh/GD gần nhất, TVĐT; bộ lọc net, tiền chờ, khoảng giá trị, tìm kiếm.
- Rule R-DT-002: nộp ròng ≥1 tỷ, chưa GD. Cảnh báo tiền rút tập trung ở 2 KH.
- Ghi chú cần xác nhận điều chuyển nội bộ, chuyển chứng khoán, hủy/điều chỉnh và tích hợp gọi hàng loạt.

## 7. So sánh & Ranking CP (`#so-sanh-ranking`)

- So sánh dạng cột theo phí net và heatmap nhiều chỉ số/TVĐT.
- Heatmap: GTGD %KPI, phí net %KPI, dư nợ %KPI, mở mới %KPI, nộp ròng, %ngủ đông; màu theo tứ phân vị, đảo chiều cột ngủ đông.
- Thẻ vị trí cá nhân #1/4 cho phí net, GTGD và mở mới.
- Ranking 6 mã CP: CEO, NVL, HOM, APG, VIB, HPG; loại trái phiếu; phí net theo đơn vị/tháng.
- Ghi chú quyền xem số của đồng nghiệp theo vai trò. Quyền này chỉ được mô tả, chưa thực thi trong mã.

## 8. Doanh số, phí net & hoa hồng (`#doanh-so-phi-hoa-hong`)

- Màn gộp v1.2 được thêm cuối repo, tồn tại cùng tab Doanh số v2.
- Hai khối kết luận riêng cho GTGD và phí/hoa hồng.
- KPI: GTGD 234,2/800 triệu; bình quân 23,4 triệu/ngày; 42 KH/47 TK; trái phiếu 109,95 triệu; phí net 10,2/25,8 triệu; tỷ lệ phí 0,09%; HH dự tính 6,8 triệu; HH xác nhận chưa có số.
- Biểu đồ GTGD lũy kế, GTGD ngày, phí net lũy kế, HH dự tính lũy kế.
- Bảng giao dịch KH: mã/tên, TK, nhóm KH, sản phẩm, GTGD mua/bán/tổng, GD gần nhất, TVĐT.
- Bảng phí/HH: mã/tên, nhóm KH, GTGD cơ sở, phí gộp, phí trả sở, phí net, tỷ lệ HH, HH dự tính, trạng thái.
- Bộ lọc chung kỳ/cây/phân khúc và bộ lọc riêng sản phẩm, chiều mua/bán, ngừng GD, khoảng GTGD, loại phí, trạng thái; tìm kiếm/phân trang mẫu.
- Điểm sáng/cảnh báo và rule R-KD-042, R-KD-051 (phí net <20% cùng kỳ).
- Ghi chú nguồn Flex/DWH/SHA, công thức PT07, biểu phí/tỷ lệ tại Portal do A4 quản lý, khoản khấu trừ, cách làm tròn, quyền xem; không có đặt lệnh.

## Giới hạn dữ liệu đã phát hiện

- Mọi số và tên đều là nội dung nhúng sẵn; chính trang ghi “số liệu minh họa”. Không có khả năng xác minh dữ liệu nghiệp vụ thật từ repo này.
- Tab v1.2 dùng ngày, phạm vi và bộ số khác v2; không nên gộp chúng làm một tập dữ liệu đồng nhất.
- Một số bảng chỉ có 3 dòng mẫu nhưng footer ghi số tổng 4/27/31/42/55/278; đây không phải dữ liệu đầy đủ để phân trang.
- KPI/tỷ lệ/công thức là văn bản tĩnh, chưa được tính bằng code. Ví dụ màn v1.2 giữ tỷ lệ phí 0,09% dù các thẻ GTGD và phí net không tự đối soát ra tỷ lệ đó.
- Việc gỡ nhãn không xác nhận các yêu cầu còn mở hoặc biến mẫu giao diện thành tính năng hoạt động.

## Thay đổi của bản công khai mới

Đã gỡ 7 bộ chú giải, 128 nhãn `wf-tag` (gồm biến thể ở màn v1.2), 3 pill độc lập và 2 tiền tố trạng thái trong flag. Gỡ CSS/khoảng trống dành riêng cho nhãn. Giữ các lời giải thích nghiệp vụ ở flag, các ghi chú đối chiếu và trạng thái thực như Dự tính, Trong hạn, Ngủ đông, KPI chưa đặt, chưa đồng bộ.

Toàn bộ bảng, SVG, giá trị KPI, nút tab và script đã được đối chiếu trực tiếp với commit nguồn để bảo đảm không thay đổi.

Cập nhật tiếp theo: gỡ toàn bộ 8 dải tiêu đề nền đen giới thiệu wireframe/phiên bản cùng CSS dành riêng cho chúng. Các phần nội dung nghiệp vụ bên dưới được giữ nguyên.

Cập nhật làm sạch nội dung: gỡ các dòng giải nghĩa, ghi chú triển khai/công thức/nguồn, lý do kèm mã rule, 7 khối đối chiếu bản test và toàn bộ khối minh họa 4 trạng thái KPI. Footer bảng chỉ giữ số lượng và kích thước trang. Các bảng dữ liệu, biểu đồ, KPI nghiệp vụ, cảnh báo, hành động và 8 tab vẫn được giữ. Phần kiểm kê phía trên mô tả repo nguồn trước chỉnh sửa; `SCREEN-CONTENT.md` phản ánh nội dung giao diện hiện tại.
