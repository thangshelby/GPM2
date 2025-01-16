import { LuJapaneseYen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../store/store";
const TableRow = ({
  index,
  rowValue,
  setRic,
}: {
  index: number;
  rowValue: {
    sector: string;
    name: string;
    ric: string;
    old_price: number;
    new_price: number;
  };
  setRic: (ric: string) => void;
}) => {
  const navigate = useNavigate();
  const {setCompany} = useCompanyStore();
  return (
    <tr key={rowValue.ric} className=" w-full ">
      <td className=" flex-row items-center justify-center truncate overflow-hidden whitespace-nowrap">
        <div className="flex flex-row items-center gap-x-[0.8rem] p-[0.8rem] ">
          <img
            className=" w-[3rem] h-[3rem] rounded-full"
            src={companyImages[index] || Image_logo[rowValue.sector]}
          />

          <p
            onClick={() => {
              setRic(rowValue.sector);
              setCompany(rowValue);
              navigate("/ric");
            }}
            className="text-[1.6rem] text-white hover:text-text_primary hover:cursor-pointer font-semibold"
          >
            {rowValue.name}
          </p>
        </div>
      </td>
      <td className="truncate overflow-hidden whitespace-nowrap px-[1.6rem]">
        <p className="text-[1.6rem] font-semibold  text-white text-start">
          {rowValue.ric}
        </p>
      </td>
      <td className="px-[1.6rem] ">
        <p
          className="text-[1.6rem] text-start font-semibold text-white  
        w-64 truncate overflow-hidden whitespace-nowrap flex flex-row items-center"
        >
          <LuJapaneseYen className=" w-[1.6rem] h-[1.6rem]" />
          {rowValue.old_price}
        </p>
      </td>
      <td className="px-[1.6rem] flex-row items-start justify-center w-[4rem]">
        <p
          className={`text-[1.6rem] ${
            rowValue.new_price > rowValue.old_price
              ? "text-[#30bf87]"
              : "text-[#f2495e]"
          }  text-start font-semibold  
        w-64 truncate overflow-hidden whitespace-nowrap flex flex-row items-center`}
        >
          <LuJapaneseYen
            className={`${
              rowValue.new_price > rowValue.old_price
                ? "text-[#30bf87]"
                : "text-[#f2495e]"
            }   w-[1.6rem] h-[1.6rem]`}
          />
          {rowValue.new_price.toFixed(2)}{" "}
          {rowValue.new_price > rowValue.old_price ? "📈" : "📉"}
        </p>
      </td>
      {/* <td className="px-[1.6rem]  flex-row items-start justify-center ">
        <p className="text-[1.6rem] h-full text-start font-semibold text-white  w-64 truncate overflow-hidden whitespace-nowrap">
          {rowValue.Currency}
        </p>
      </td> */}

      <td className="p-[1.6rem] ">
        <div className=" w-full font-semibold py-[0.8rem] px-[1.2rem] rounded-[5rem] bg-[#353638]">
          <p className="text-white text-[1.4rem]">Mô hình Arima đánh giá</p>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
const companyImages = [
  "https://thumbs.dreamstime.com/b/toyota-motor-corporation-japanese-multinational-automotive-manufacturer-headquartered-toyota-city-aichi-japan-toyota-s-142175210.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqOrQbyviN_jlkVtKG-jGEFKbJD4_NhGvGg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnrQ4FszqNnv-54wXsqRInOutD1YpSQvbSg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg7MP0SRJdjTQAM-TgYx2u_o7Dr7-2K8fPhg&s",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/Nippon_Telegraph_and_Telephone_logo.svg",
  "https://group.softbank/sites/default/files/assets/img/logo-group-square.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDLplIbVQTwqaM3XLBA9GYu3-hUEbzAp72rQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qc7XaQigmASkZzi19gDQVKUJd9jOqAExfQ&s",
  "data:image/png;base64,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",
  "https://www.mitsubishitrungthuong.org/files/logo-mitsubishi-3zeHax1dlr.png",
];

const Image_logo: { [key: string]: string } = {
  "8058.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKlHCa2LjXAkIr_X9vs5GOkTGaX5ZQMixlw&s",
  "4063.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Shin-Etsu_Chemical_logo.svg/2560px-Shin-Etsu_Chemical_logo.svg.png",
  "7267.T":
    "https://e7.pngegg.com/pngimages/551/66/png-clipart-honda-logo-honda-motor-company-motorcycle-honda-angle-text.png",
  "9433.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/KDDI_Logo.svg/2560px-KDDI_Logo.svg.png",
  "8031.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvAaAqWMsmE71tjdFbiOvm0DG-aJAAzngaAg&s",
  "4568.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG5wdVz-5w2bdlj3to451mhQQulGLLb0aFgA&s",
  "6902.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfq_HfzkrG9P--TP8e4tthCE84FnjK3xVTLQ&s",
  "2914.T":
    "https://storage.googleapis.com/youth-media/post-thumbnails/1BvugQiw54OShxJlOkyShzB9J93CfVvBqlYNW7rw.jpg",
  "7011.T":
    "https://upload.wikimedia.org/wikipedia/commons/4/45/Mitsubishi_Heavy_Industries.png",
  "7741.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70xX_Ih33vHA_ETi0QoISq_hlGxJRWrw8WQ&s",
  "7751.T": "https://banner2.cleanpng.com/20180529/hoo/avplxg8y1.webp",
  "4661.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Oriental_Land_logo.svg/2560px-Oriental_Land_logo.svg.png",
  "4502.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Takeda_Pharmaceutical_Company_logo.svg/2560px-Takeda_Pharmaceutical_Company_logo.svg.png",
  "6702.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Fujitsu-Logo.svg/2560px-Fujitsu-Logo.svg.png",
  "6503.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mitsubishi_Electric_logo.svg/1200px-Mitsubishi_Electric_logo.svg.png",
  "8725.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyN5SFvRK-Cc9DMYSmMD0UiZkFfIkHJQsX-w&s",
  "3382":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBhxwC4h5WRBNuV7lnTchrI5iw-mRsYRu7g&s",
  "8002.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Marubeni_Logo.svg/2560px-Marubeni_Logo.svg.png",
  "6981.T":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Murata_Manufacturing_logo.svg/2560px-Murata_Manufacturing_logo.svg.png",
  "6273.T":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfakqzb0cpsHuJii_ruG775pC1j2TSbQVq0w&s",
};
