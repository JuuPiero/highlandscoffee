const db = require("../Database");

module.exports = {
    getShippings: (req, res) => {
        const query = "SELECT * FROM shipping"
        db.query(query, (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn:", err);
                res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            } else {
                res.json(results);
            }
        })
    }, 


    addShipping: (req, res) => {
        const {
            city,
            price
        } = req.body;

        const query = `
            INSERT INTO shipping (city, price)
            VALUES (?, ?)
        `;
        db.query(
            query,
            [city, price],
            (err, result) => {
                if (err) {
                    console.error("Lỗi khi thêm shipping:", err);
                    res.status(500).json({ error: "Lỗi khi thêm giá ship" });
                } else {
                    res.status(201).json({ message: "Thêm shipping thành công", shipping_id: result.insertId });
                }
            }
        );
    },
    updateShipping: (req, res) => {
        const { id } = req.params;
        const {
            city, price
        } = req.body;

        const query = `
            UPDATE shipping
            SET city = ?, price = ?
            WHERE id = ?
        `;

        db.query(
            query,
            [city, price, id],
            (err, result) => {
                if (err) {
                    console.error("Lỗi khi cập nhật shipping:", err);
                    res.status(500).json({ error: "Lỗi khi cập nhật shipping" });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: "Không tìm thấy shipping để cập nhật" });
                } else {
                    res.json({ message: "Cập nhật shipping thành công" });
                }
            }
        );
    },
    deleteShipping: (req, res) => {
        const { id } = req.params;

        const query = `DELETE FROM shipping WHERE id = ?`;

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error("Lỗi khi xoá shipping:", err);
                res.status(500).json({ error: "Lỗi khi xoá shipping" });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: "Không tìm thấy shipping để xoá" });
            } else {
                res.json({ message: "Xoá shipping thành công" });
            }
        });
    },


}