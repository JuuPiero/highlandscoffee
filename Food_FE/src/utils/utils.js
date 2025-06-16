const formatDateTimeLocal = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // để xử lý timezone nếu cần
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
};

export {
    formatDateTimeLocal
}