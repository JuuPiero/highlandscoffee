import React from 'react'
import { useEffect, useState } from 'react';
export default function Voucher({voucher, onSave, isDisplay = true}) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('saveVouchers');
        if (saved) {
            try {
                const savedList = JSON.parse(saved);
                const exists = savedList.some(item => item.id === voucher.id);
                setIsSaved(exists);
            } catch (e) {
                console.error("Lỗi đọc localStorage:", e);
            }
        }
    }, [voucher.id]); // chỉ check khi ID đổi

      const handleSave = () => {
        if (!isSaved) {
            onSave(voucher); // callback để lưu ở component cha
            setIsSaved(true); // cập nhật UI
        }
    };


    return (
        <div className='flex flex-col border p-3 border-[#b22830] rounded-[8px] gap-3 min-w-[400px] justify-between'>
            <strong className='text-[#b22830]'>{voucher.name}</strong>
            <p >{voucher.description}</p>
            <div className='bg-gray-200 text-black flex flex-row justify-between items-center py-1'>
                <strong className='uppercase'>{voucher.code}</strong>
                {isDisplay ? <button  onClick={handleSave}
                    disabled={isSaved} 
                    className='btn border text-white bg-[#b22830] px-3 py-1 text-sm rounded-[5px] disabled:bg-[white] disabled:border-[#b22830] disabled:text-[#b22830] border-transparent '>
                    {isSaved ? "Đã lưu" : "Lưu"}
                </button> : null }
            </div>
        </div>
    )
}
