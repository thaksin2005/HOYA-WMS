const calculateColumnWidth = (title) => {
  // คำนวณความกว้างตามความยาวของ title
  return `${Math.max(title.length * 10, 100)}px`; // กำหนดความกว้างขั้นต่ำที่ 100px
};

export default calculateColumnWidth;
