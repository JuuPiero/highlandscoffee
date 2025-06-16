const db = require("../Database");

module.exports = {
    getVouchers: (req, res) => {
        const query = "SELECT * FROM  vouchers"
        db.query(query, (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn:", err);
                res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            } else {
                res.json(results);
            }
        })
    }, 

    addVoucher: (req, res) => {
        const {
            name,
            code,
            description,
            type,
            value,
            expires_at,
            usage_limit
        } = req.body;

        const query = `
            INSERT INTO vouchers (name, code, description, type, value, expires_at, usage_limit)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [name, code, description, type, value, expires_at || null, usage_limit || null],
            (err, result) => {
                if (err) {
                    console.error("Lỗi khi thêm voucher:", err);
                    res.status(500).json({ error: "Lỗi khi thêm voucher" });
                } else {
                    res.status(201).json({ message: "Thêm voucher thành công", voucher_id: result.insertId });
                }
            }
        );
    },
    updateVoucher: (req, res) => {
        const { id } = req.params;
        const {
            name,
            code,
            description,
            type,
            value,
            expires_at,
            usage_limit
        } = req.body;

        const query = `
            UPDATE vouchers
            SET name = ?, code = ?, description = ?, type = ?, value = ?, expires_at = ?, usage_limit = ?
            WHERE id = ?
        `;

        db.query(
            query,
            [name, code, description, type, value, expires_at || null, usage_limit || null, id],
            (err, result) => {
                if (err) {
                    console.error("Lỗi khi cập nhật voucher:", err);
                    res.status(500).json({ error: "Lỗi khi cập nhật voucher" });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: "Không tìm thấy voucher để cập nhật" });
                } else {
                    res.json({ message: "Cập nhật voucher thành công" });
                }
            }
        );
    },
    deleteVoucher: (req, res) => {
        const { id } = req.params;

        const query = `DELETE FROM vouchers WHERE id = ?`;

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error("Lỗi khi xoá voucher:", err);
                res.status(500).json({ error: "Lỗi khi xoá voucher" });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: "Không tìm thấy voucher để xoá" });
            } else {
                res.json({ message: "Xoá voucher thành công" });
            }
        });
    },

}