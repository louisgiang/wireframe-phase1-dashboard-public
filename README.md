# Dashboard kinh doanh · Wireframe Phase 1

Bản sao đã gỡ nhãn đánh dấu triển khai, giữ 8 tab và nội dung nghiệp vụ của [repo gốc](https://github.com/louisgiang/wireframe-phase1-dashboard).

## Nội dung

| Tab | Nội dung chính |
| --- | --- |
| Tổng quan | Kết luận, KPI, trạng thái dữ liệu, doanh số và dư nợ theo ngày, cảnh báo và việc nên làm |
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

- Gỡ chú giải và nhãn đánh dấu triển khai ở cả 8 tab, gồm các biến thể viết tắt và nhãn của màn v1.2.
- Gỡ dải tiêu đề nền đen giới thiệu wireframe/phiên bản ở cả 8 tab.
- Bỏ khoảng đệm/CSS chỉ dành cho các nhãn đã gỡ.
- Giữ số liệu, biểu đồ, bảng, cảnh báo nghiệp vụ, ghi chú đối chiếu, trạng thái dữ liệu và điều hướng.
- Giữ lịch sử commit gốc; không sửa repo hay deployment Vercel gốc.

Đây là wireframe với dữ liệu minh họa nhúng trong HTML. Chuyển tab, deep link và bàn phím hoạt động; bộ lọc, tìm kiếm, phân trang và các thao tác nghiệp vụ chưa được lập trình. Tab v1.2 cuối cùng dùng phạm vi/ngày/số liệu khác 7 tab v2 đầu tiên.

Nguồn: commit `2b9227bf933b7212a4c8014862139c22988f60ef`, kiểm kê ngày 29/09/2026. Repo gốc không có tệp LICENSE.
