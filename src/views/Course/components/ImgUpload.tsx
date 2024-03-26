import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import gjyCLoud from "leancloud-storage";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
interface ImgUploadPropsType {
  onChange?: (url: string) => void;
  value?: string;
}
const ImgUpload: React.FC<ImgUploadPropsType> = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(()=>{
    console.log("props", props);

  },[])

  //   const handleChange: UploadProps['onChange'] = (info) => {
  //     if (info.file.status === 'uploading') {
  //       setLoading(true);
  //       return;
  //     }
  //     if (info.file.status === 'done') {
  //       // Get this url from response in real world.
  //       getBase64(info.file.originFileObj as FileType, (url) => {
  //         setLoading(false);
  //         setImageUrl(url);
  //       });
  //     }
  //   };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleUploadgjy = (infogjy: any) => {
    console.log("props", props);

    console.log("info", infogjy);
    getBase64(infogjy.file, (base64) => {
      console.log("base64", base64);
      const cloudFilegjy = new gjyCLoud.File("gjy.png", { base64 });
      cloudFilegjy.save().then((res: any) => {
        console.log("cloudfile res", res);
        setImageUrl(res.attributes.url);
        props.onChange!(res.attributes.url);
      });
    });
  };

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        // onChange={handleChange}
        customRequest={handleUploadgjy}
      >
        {imageUrl || props.value ? (
          <img
            src={imageUrl || props.value}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      {/* <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload> */}
    </>
  );
};

export default ImgUpload;
