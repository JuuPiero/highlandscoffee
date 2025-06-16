import React from "react";
import "./Services.css";
const Services = () => {
  return (
    <section className="service py-10 bg-[#8e5a2d] text-white">
      <div className="container mx-auto">
        <section className="service__top text-center mb-8">
          <p className="service__label text-base text-white">
            What we do for you?
          </p>
          <h2 className="service__heading text-[45px] leading-[48px] font-bold text-white">
            Our Services
          </h2>
        </section>
        <div className="service__inner flex flex-wrap ">
          <div className="service__column w-full md:w-1/3 px-4 flex flex-col justify-around">
            {/* Item 1 */}
            <article className="service-item mb-6 p-[30px] border-[.25px] border-[#dddddd]   rounded-lg transition-transform transform hover:scale-[1.025]">
              <h3 className="text-xl font-semibold">
                <a href="" className="service-item__heading">
                  Đồ uống thơm ngon
                </a>
              </h3>
              <p className="service-item__desc my-2">
                Hương Vị Tươi Mới: Thưởng thức những hỗn hợp cà phê thơm ngon,
                được chăm chút tỉ mỉ để bắt đầu một ngày mới đầy năng lượng.
              </p>
            </article>

            {/* Item 2 */}
            <article className="service-item mb-6 p-[30px] border-[.25px] border-[#dddddd]  rounded-lg transition-transform transform hover:scale-[1.025]">
              <h3 className="service-item__heading text-xl font-semibold">
                Trà quyến rũ
              </h3>
              <p className="service-item__desc my-2">
                Trà Thảo Mộc Ngon Nghẻ: Khám phá bộ sưu tập trà được lựa chọn kỹ
                càng, thích hợp cho những khoảnh khắc thư giãn và làm mới bản
                thân.
              </p>
            </article>

            {/* Item 3 */}
            <article className="service-item mb-6 p-[30px] border-[.25px] border-[#dddddd]  rounded-lg transition-transform transform hover:scale-[1.025]">
              <h3 className="service-item__heading text-xl font-semibold">
                đồ ăn ngon miệng
              </h3>
              <p className="service-item__desc my-2">
                Đồ ăn tuyệt Vời: Thỏa thích với bộ sưu tập bánh mì được làm tươi
                mỗi ngày, kết hợp với các nguyên liệu chất lượng cao.
              </p>
            </article>
          </div>

          <div className="service__column w-full md:w-1/3 px-4 flex flex-col items-center mt-6">
            <figure className="service__media mb-6">
              <img src="./cup.png" alt="" className="service__img mx-auto" />
            </figure>
          </div>

          <div className="service__column w-full md:w-1/3 px-4 flex flex-col mt-6 justify-around">
            {/* Item 4 */}
            <article className="service-item mb-6 p-[30px]  border-[.25px] border-[#dddddd]  rounded-lg transition-transform transform hover:scale-[1.025]">
              <h3 className="service-item__heading text-xl font-semibold">
                Đồ ăn nhẹ độc đáo
              </h3>
              <p className="service-item__desc my-2">
                Món Ăn Vặt Đặc Sắc: Khám phá các món ăn nhẹ sáng tạo, làm từ
                những nguyên liệu tươi ngon, hoàn hảo cho mỗi dịp.
              </p>
            </article>

            {/* Item 5 */}
            <article className="service-item mb-6 p-[30px] border-[.25px] border-[#dddddd]  rounded-lg transition-transform transform hover:scale-[1.025]">
              <h3 className="service-item__heading text-xl font-semibold">
                Thức uống trái cây tươi
              </h3>
              <p className="service-item__desc my-2">
                Đồ Uống Trái Cây Tươi Mát: Thưởng thức những ly nước ép trái cây
                tươi mát, giàu dinh dưỡng, làm từ những loại trái cây tươi ngon
                nhất.
              </p>
            </article>

            {/* Item 6 */}
            <article className="service-item mb-6 p-[30px] border-[.25px] border-[#dddddd]  rounded-lg transition-transform transform hover:scale-[1.025]">
              <h3 className="service-item__heading text-xl font-semibold">
                Đặc sản vùng miền
              </h3>
              <p className="service-item__desc my-2">
                Hương Vị Đặc Sản Địa Phương: Đắm mình trong những món ăn đặc sản
                vùng miền, mang lại hương vị đặc biệt và đậm đà của đất trời
                Việt Nam.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
