import React from "react";
import "./About.css";
export default function About() {
  return (
    <div>
      <div>
        <div className=" m-[0_auto] flex items-center justify-center gap-10 relative">
          <div className="captionwrap flex-1 w-[585px]">
            <div className="captionWrap">
              <div className="max-w-[1200px] p-[0_15px] m-[0_auto]">
                <p className="title tent text-[45px] leading-[48px] uppercase block font-bold text-[#53382c] hover:text-[#CC9554] transition mb-5">
                  <a href="">NGUỒN GỐC</a>
                </p>
                <div className="desc w-[585px] mb-10">
                  <p className="text-lg">CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH</p>
                  <p className="text-base">
                    Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ
                    tình yêu dành cho đất Việt cùng với cà phê và cộng đồng nơi
                    đây. Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là
                    có thể phục vụ và góp phần phát triển cộng đồng bằng cách
                    siết chặt thêm sự kết nối và sự gắn bó giữa người với người.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="img flex-1">
            <a href="">
              <img
                src="https://www.highlandscoffee.com.vn/vnt_upload/about/ABOUT-CAREER3.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className=" m-[0_auto] flex items-center justify-center gap-10 relative bg-[#bd945d]">
          <div className="img bg2 flex-1">
            <a href="">
              <img
                src="https://www.highlandscoffee.com.vn/vnt_upload/about/Highlands_4577_R3_-_Copy.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="captionwrap flex-1 w-[585px]">
            <div className="captionWrap">
              <div className="max-w-[1200px] p-[0_15px] m-[0_auto] ">
                <div className="w-[585px] float-right text-right">
                  <p className="title tent text-[45px] leading-[48px] uppercase block font-bold text-white hover:text-[#CC9554] transition mb-5">
                    <a href="">DỊCH VỤ</a>
                  </p>
                  <div className="desc w-[585px] mb-10">
                    <p className="text-base text-white">
                      DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH
                    </p>
                    <p className="text-base">
                      Highlands Coffee® là không gian của chúng mình nên mọi thứ
                      ở đây đều vì sự thoải mái của chúng mình. Đừng giữ trong
                      lòng, hãy chia sẻ với chúng mình điều bạn mong muốn để
                      cùng nhau giúp Highlands Coffee® trở nên tuyệt vời hơn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" m-[0_auto] flex items-center justify-center gap-10 relative bg-[#8e5a2d]">
          <div className="captionwrap flex-1 w-[585px]">
            <div className="captionWrap">
              <div className="max-w-[1200px] p-[0_15px] m-[0_auto]">
                <p className="title tent text-[45px] leading-[48px] uppercase block font-bold text-white hover:text-[#CC9554] transition mb-5">
                  <a href="">NGHỀ NGHIỆP</a>
                </p>
                <div className="desc w-[585px] mb-10">
                  <p className="text-base text-white">
                    CƠ HỘI NÀY LÀ CỦA CHÚNG MÌNH
                  </p>
                  <p className="text-base">
                    Là điểm hội tụ của cộng đồng, Highlands Coffee® luôn tìm
                    kiếm những thành viên mới với mong muốn không ngừng hoàn
                    thiện một không gian dành cho tất cả mọi người. Chúng mình
                    luôn chào đón bạn trở thành một phần của Highlands Coffee®
                    để cùng nhau siết chặt thêm những kết nối và sự gắn bó giữa
                    người với người.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="img bg3 flex-1">
            <a href="">
              <img
                src="https://www.highlandscoffee.com.vn/vnt_upload/about/Highlands_5557_R3_-_Copy.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
