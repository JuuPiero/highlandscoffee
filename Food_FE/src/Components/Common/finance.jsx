export function formatCurrencyVND(price) {
  if (!price) return "0 ₫"; // Handle empty string case

  const number = parseFloat(`${price}`.replace(/[^\d.-]/g, ""));
  if (isNaN(number)) return "0 ₫";

  // Format number to Vietnamese currency
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("vi-VN", options);
};

export const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(":");
  return `${hour}:${minute}`;
};
