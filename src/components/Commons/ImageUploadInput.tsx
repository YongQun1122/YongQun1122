import React, { useState, useEffect } from "react";
import { Upload, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import Avatar from "antd/lib/avatar/avatar";
import Image from "next/image";
import { fileToBase64 } from "@utils";

interface Props {
  className?: string;
  files?: UploadFile[];
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  onChange?: (value: UploadFile[]) => void;
  avatar?: boolean;
  avatarSize?: number;
  previewUrl?: string;
  deleteButton?: boolean;
}

const ImageUploadInput: React.FC<Props> = ({ disabled, multiple, avatar, onChange, className, ...props }) => {
  const { maxFileSize = 10, accept = "image/*", avatarSize = 64, children, deleteButton = false } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(props.files || []);
  const [previewUrl, setPreviewUrl] = useState<string>(props.previewUrl || "");
  const customRender = avatar || !!children;

  useEffect(() => {
    onChange?.(fileList);
    const f = fileList.length > 0 ? fileList[0].originFileObj : null;
    if (f) fileToBase64(f, setPreviewUrl);
  }, [fileList]);

  return (
    <div className={`flex-center ${className}`}>
      <Upload
        disabled={disabled}
        multiple={multiple}
        listType={customRender ? undefined : "picture-card"}
        itemRender={customRender ? () => null : undefined}
        accept={accept}
        showUploadList={{ showPreviewIcon: true }}
        fileList={fileList}
        beforeUpload={() => false}
        onChange={info => {
          if (info.fileList.length <= 0) {
            setFileList(info.fileList);
            return;
          }
          const file = info.fileList[info.fileList.length - 1];
          const isLt5M = (file.size || 0) / 1024 / 1024 <= maxFileSize;
          if (!isLt5M) return message.error(`File size cannot larger than ${maxFileSize}MB`);
          setFileList([file]);
        }}
      >
        {children ? (
          // @ts-ignore
          React.cloneElement(children, { previewUrl })
        ) : avatar ? (
          <div className="w-full text-center group">
            {previewUrl ? (
              <Avatar size={avatarSize} src={previewUrl} />
            ) : (
              <Image className="mx-auto" src="/icons/avatar.svg" width={avatarSize} height={avatarSize} />
            )}
            <div className="text-primary mt-2 font-semibold group-hover:text-info group-hover:underline">Upload profile photo</div>
          </div>
        ) : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      {deleteButton && fileList.length > 0 ? (
        <div className="text-primary ml-3 mb-1 font-semibold group-hover:text-info group-hover:underline">
          <Button
            onClick={() => {
              setFileList([]);
              setPreviewUrl("");
            }}
          >
            Delete
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

ImageUploadInput.defaultProps = {
  maxFileSize: 10
};

export default ImageUploadInput;
