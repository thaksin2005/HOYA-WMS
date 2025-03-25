const filters = (dataSource, column) => {
  const uniqueValues = new Set(
    dataSource
      .filter((item) => item[column]) // กรองค่า null หรือว่างเปล่าออก
      .map((item) => item[column]) // สร้าง array ของค่าที่ไม่ซ้ำกัน
  );

  return Array.from(uniqueValues).map((value) => ({
    text: value.toString(),
    value: value.toString(),
  }));
};

export default filters;
