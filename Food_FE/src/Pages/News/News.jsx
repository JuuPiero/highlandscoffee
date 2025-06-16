import React, { useEffect, useState } from "react";
import "./News.css";
import axios from "axios";
import { formatDate, formatTime } from "../../Components/Common/finance";
export default function News() {
  const [Data, setData] = useState([]);
  const [Error, setError] = useState();
  const [visibleCount, setVisibleCount] = useState(6);
  const moreInfo = () => {
    setVisibleCount((prevVisibleCount) => prevVisibleCount + 3);
  };
  const lessInfo = () => {
    setVisibleCount(6);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Tintuc");
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      <div className="news py-11">
        <div className="news-wrapper px-[15px] max-w-[1200px] mx-auto">
          <div className="w-full">
            <div className="box w-full">
              <div className="mid-title mb-5 w-auto relative">
                <h1 className="text-[45px] leading-[55px] font-bold text-left text-[#53382c]">
                  TIN TỨC
                </h1>
              </div>
              <div className="mid-content">
                <div className="flex flex-wrap mx-[-15px] justify-center">
                  {Data.slice(0, visibleCount).map((item, index) => (
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2.5">
                      <div className="news-item mb-[30px]">
                        <div className="img-news pt-[66.666666%] relative overflow-hidden mb-2.5">
                          <a href="" className="transition">
                            <img
                              src={`http://localhost:3000/assets/${item.hinhanh}`}
                              alt=""
                              className="absolute top-0 left-0 w-full h-full object-cover transition"
                            />
                          </a>
                        </div>
                        <div className="tent mb-[5px]">
                          <h3 className="font-bold">
                            <a
                              href=""
                              className="block text-sm h-44px overflow-hidden"
                            >
                              {item.name}
                            </a>
                          </h3>
                        </div>
                        <div className="date text-[13px] leading-[21px] text-[#888888]">
                          <span>
                            {formatDate(item.day)}, {formatTime(item.hour)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {visibleCount < Data.length && (
                    <div
                      className="mt-[22px] flex items-center justify-center hover:text-white hover:border-[#b22830] hover:bg-[#b22830]  text-[12px] leading-5 border-[1px] border-solid border-[#cc9554] py-[7px] px-[70px] rounded-[5px] text-[#cc9554] uppercase transition"
                      onClick={moreInfo}
                    >
                      <p className="text-base font-normal  text-more">
                        Xem thêm
                      </p>
                    </div>
                  )}

                  {visibleCount >= Data.length && (
                    <div
                      className="mt-[22px] flex items-center justify-center hover:text-white hover:border-[#b22830] hover:bg-[#b22830]  text-[12px] leading-5 border-[1px] border-solid border-[#cc9554] py-[7px] px-[70px] rounded-[5px] text-[#cc9554] uppercase transition"
                      onClick={lessInfo}
                    >
                      <p className="text-base font-normal  text-more">
                        Thu gọn
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
