
const Products = (pageIndex: number, pageSize: number, type: number) => {

  const dataTmp = [
    {
      "Code": "162324APCAA",
      "Name": "Gạch Ốp Lát",
      "Type": 0,
      "Price": 1200000,
      "Image": "gach_op_lat_1jpg",
      "Description": "Gạch ốp lát chất lượng cao"
    },
    { "Code": "162324APSTLP", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 1299, "Image": "gach_op_lat_2jpg", "Description": "Gạch ốp lát kiểu mới" },
    { "Code": "165TAVEGEDI", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 899, "Image": "gach_op_lat_3jpg", "Description": "Gạch ốp lát thiết kế độc đáo" },
    { "Code": "165TAVENE", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 999, "Image": "gach_op_lat_4jpg", "Description": "Gạch ốp lát phong cách hiện đại" },
    { "Code": "2290ALBBA", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 1199, "Image": "gach_op_lat_5jpg", "Description": "Gạch ốp lát bền đẹp" },
    { "Code": "27939001", "Name": "Đầu sen tắm trần bằng đồng mạ crôm", "Type": 1, "Price": 4599, "Image": "sen_tam_dau_1jpg", "Description": "Đầu sen tắm sang trọng" },
    { "Code": "30OASIMI", "Name": "Gạch mosaic", "Type": 0, "Price": 1599, "Image": "gach_mosaic_1jpg", "Description": "Gạch mosaic độc đáo" },
    { "Code": "33751_031", "Name": "Sen tắm trần (dài 387 mm) bằng đồng thau mạ crôm", "Type": 1, "Price": 2999, "Image": "sen_tam_tran_1jpg", "Description": "Sen tắm trần đồng mạ crôm" },
    { "Code": "37525_515", "Name": "Bồn tắm đứng tự do", "Type": 1, "Price": 19999, "Image": "bon_tam_dung_1jpg", "Description": "Bồn tắm đứng tự do hiện đại" },
    { "Code": "45925_521", "Name": "Bồn tắm đứng tự do bằng đá nhân tạo, đã bao gồm bộ xả", "Type": 1, "Price": 25999, "Image": "bon_tam_dung_2jpg", "Description": "Bồn tắm đứng tự do sang trọng" },
    { "Code": "4607AS01", "Name": "Bồn cầu 1 khối bằng sứ", "Type": 1, "Price": 14999, "Image": "bon_cau_1_khoi_1jpg", "Description": "Bồn cầu 1 khối chất lượng" },
    { "Code": "46100_031", "Name": "Vòi nước gắn tường dùng cho lavbô", "Type": 1, "Price": 5499, "Image": "voi_nuoc_gan_tuong_1jpg", "Description": "Vòi nước gắn tường đẹp và tiện ích" },
    { "Code": "46127_080", "Name": "Bộ tay sen có luôn bộ phận cấp nước cho tay sen và bát đỡ đồng bộ", "Type": 1, "Price": 7999, "Image": "tay_sen_bo_1jpg", "Description": "Bộ tay sen đồng bộ và hiện đại" },
    { "Code": "46715_521", "Name": "Bồn tắm đứng tự do bằng đá nhân tạo", "Type": 1, "Price": 29999, "Image": "bon_tam_dung_3jpg", "Description": "Bồn tắm đứng tự do đẳng cấp" },
    { "Code": "47188_031", "Name": "Vòi lavabô gắn tường", "Type": 1, "Price": 3999, "Image": "voi_lavabo_gan_tuong_1jpg", "Description": "Vòi lavabo gắn tường hiện đại" },
    { "Code": "48TWSAMA", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 1399, "Image": "gach_op_lat_8jpg", "Description": "Gạch ốp lát chất lượng cao" },
    { "Code": "49088_031", "Name": "Vòi lavabô gắn tường", "Type": 1, "Price": 4499, "Image": "voi_lavabo_gan_tuong_2jpg", "Description": "Vòi lavabo gắn tường tiện dụng" },
    { "Code": "52990019000", "Name": "Bồn tắm đứng tự do", "Type": 1, "Price": 24999, "Image": "bon_tam_dung_4jpg", "Description": "Bồn tắm đứng tự do sang trọng" },
    { "Code": "612JW12", "Name": "Gạch lát nền", "Type": 0, "Price": 1199, "Image": "gach_lat_nen_1jpg", "Description": "Gạch lát nền chất lượng cao" },
    { "Code": "624M6RQ", "Name": "Gạch Lát Nền", "Type": 0, "Price": 1499, "Image": "gach_lat_nen_2jpg", "Description": "Gạch lát nền hiện đại" },
    { "Code": "624M6RR", "Name": "Gạch Lát Nền", "Type": 0, "Price": 1399, "Image": "gach_lat_nen_3jpg", "Description": "Gạch lát nền đa dạng" },
    { "Code": "918ANST", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 1499, "Image": "gach_op_lat_9jpg", "Description": "Gạch ốp lát đa dạng màu sắc" },
    { "Code": "918EXTRKRY", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 999, "Image": "gach_op_lat_10jpg", "Description": "Gạch ốp lát chống trơn trượt" },
    { "Code": "918ANST", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 1499, "Image": "gach_op_lat_6jpg", "Description": "Gạch ốp lát đa dạng màu sắc" },
    { "Code": "918EXTRKRY", "Name": "Gạch Ốp Lát", "Type": 0, "Price": 999, "Image": "gach_op_lat_7jpg", "Description": "Gạch ốp lát chống trơn trượt" }
  ].map(item => ({ ...item, Image: item.Code + '.jpg', SalePrice: item.Price * 0.9 })); // Added salePrice
  // Filter the array based on the type
  const filteredData = dataTmp.filter((item) => item.Type === type);

  // If type is not -1, return the filtered data
  if (type !== -1) {
    return filteredData;
  }
  return dataTmp;
};
export default Products;