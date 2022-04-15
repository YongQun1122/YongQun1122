import { Select } from "antd";
import { css } from "@emotion/react";
import { SelectProps } from "antd/lib/select";
import Image from "next/image";

export const Option = Select.Option;

interface Props extends SelectProps<any> {
  minWidth?: number;
}
const CustomSelect: React.FC<Props> = props => {
  const { minWidth = 200 } = props;
  return (
    <Select
      {...props}
      suffixIcon={<Image src="/icons/chevron-down.svg" height={18} width={18} />}
      css={css`
        .ant-select-selector {
          background: #f7f7f7 !important;
          border-radius: 50px !important;
          border: none !important;
          padding: 0 !important;
          height: 38px !important;
        }
        .ant-select-selection-item {
          font-weight: 600 !important;
          font-size: 14px !important;
          padding: 8px 16px !important;
          display: flex;
          align-items: center;
        }
        .ant-select-arrow {
          width: 18px;
          height: 18px;
          margin-top: -9px;
        }
      `}
      className={props.className}
      style={{ minWidth, ...props.style }}
      dropdownClassName="p-2 rounded-2xl"
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
    >
      {props.children}
    </Select>
  );
};

export default CustomSelect;
