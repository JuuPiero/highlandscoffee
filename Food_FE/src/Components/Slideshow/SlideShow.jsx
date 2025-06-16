import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../Slideshow/Slideshow.css";
const imgtintuc = [
  {
    img: "https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYCOFFEE/Untitled-1-01.png",
    imgsp:
      "https://www.highlandscoffee.com.vn/vnt_upload/cake/BACKGROUND/PNG/Cold_Brew_Lemon_copy.png",
    name: "DÒNG CÀ PHÊ ĐẶC BIỆT (SPECIALTY COFFEE)",
    title: `Với sự hội tụ giữa các hạt cà phê ngon nhất của Việt Nam và Thế Giới, cùng kết các phương pháp pha cà phê truyền thống và hiện đại. Highlands Bưu Điện Thành Phố đem lại các trải nghiệm độc đáo và mới lạ "CHỈ RIÊNG TẠI ĐÂY". `,
  },
  {
    img: "https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYTEA/MODULE_TRA.png",
    imgsp:
      "https://www.highlandscoffee.com.vn/vnt_upload/cake/BACKGROUND/PNG/Tra_Oi_Hong.png",
    name: `TINH HOA TRÀ HIGHLANDS (SPEACIALTY TEA)`,
    title: `Với việc kết hợp hương vị hiện đại và thảo mộc tinh tế, mang đến cho bạn hành trình trải nghiệm văn hóa Trà độc đáo, duy nhất tại Highlands Bưu Điện Thành Phố.`,
  },
  {
    img: "https://www.highlandscoffee.com.vn/vnt_upload/cake/STANDARDMENU/Untitled-1-03.png",
    imgsp:
      "https://www.highlandscoffee.com.vn/vnt_upload/cake/BACKGROUND/PNG/Phin_Den_Da.png",
    name: "MENU NGUYÊN BẢN (STANDARD MENU)",
    title: `Các sản phẩm đại diện của Chúng Mình mang đến hương vị tinh tế của văn hóa Việt Nam, gồm Phin Cà Phê Truyền Thống Coffee đậm đà,  Trà Sen Vàng độc đáo, Freeze Trà Xanh tuyệt vời và Phindi Hạnh Nhân ngon khó cưỡng. Mỗi sản phẩm tại Highlands Coffee là một câu chuyện, mời gọi bạn khám phá hương vị Việt qua từng ngụm, nơi giao thoa giữa Hiện Đại và Truyền Thống. `,
  },
];

function Slideshow() {
  return (
    <div className="">
      {imgtintuc.map((img, index) => (
        <div
          key={index}
          className="menu py-10 bg-cover"
          style={{
            backgroundImage: `url(${img.img})`,
          }}
        >
          <div className="max-w-[1200px] mx-auto px-[15px] flex flex-col md:flex-row items-center justify-around gap-10 my-10">
            <div className="captionslideshow flex-1 w-full md:w-[585px] md:order-1 order-2">
              <div className="title mb-5">
                <h3 className="text-3xl md:text-4xl leading-[48px] uppercase font-bold text-[#CC9554] hover:text-[#b22830] transition">
                  {img.name}
                </h3>
              </div>
              <div className="desc text-lg font-bold mb-10 text-[#CC9554]">
                {img.title}
              </div>
              <div className="action">
                <button className="hover:text-white hover:border-[#b22830] hover:bg-[#b22830] inline-block text-sm md:text-base leading-5 border-[1px] border-solid border-[#cc9554] py-[7px] px-[70px] rounded-[5px] text-[#cc9554] uppercase transition">
                  Khám phá thêm
                </button>
              </div>
            </div>
            <div className="imgslideshow flex-1 md:order-2 order-1">
              <a href=" " className="flex items-center justify-end">
                <img
                  src={img.imgsp}
                  alt=" "
                  className="w-full md:w-[392px] h-auto object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slideshow;
