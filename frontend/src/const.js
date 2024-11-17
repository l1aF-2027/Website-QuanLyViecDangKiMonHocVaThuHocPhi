export const code = {
  success: 200,
};
export const role = ['Người quản lý', 'Sinh viên'];

export const convertDate = (date, isVn) => {
  const newDate = new Date(date);
  const day = String(newDate?.getDate())?.padStart(2, '0');
  const month = String(newDate?.getMonth() + 1)?.padStart(2, '0');
  const year = String(newDate?.getFullYear());
  if (date) {
    if (isVn) {
      return date ? `${day}-${month}-${year}` : '';
    } else {
      return date ? `${year}-${month}-${day}` : '';
    }
  }
  return '';
};

export const formatCost = (num) => {
  const numberFormat = new Intl.NumberFormat('en-US');
  return num ? numberFormat.format(num) : 0;
};
