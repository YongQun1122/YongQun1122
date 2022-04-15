import { Breadcrumb as AntdBreadcrumb } from "antd";
import _ from "lodash";

interface BreadcrumbProps {
  className?: React.HtmlHTMLAttributes<any>["className"];
  style?: React.CSSProperties;
  items: BreadcrumbItem[];
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ className, style, items }) => {
  return (
    <AntdBreadcrumb className={className} style={style} separator=">">
      <AntdBreadcrumb.Item href="/">Home</AntdBreadcrumb.Item>
      {_.map(items, item => {
        if (_.isString(item)) return <AntdBreadcrumb.Item>{item}</AntdBreadcrumb.Item>;
        return <AntdBreadcrumb.Item href={item.url}>{item.text}</AntdBreadcrumb.Item>;
      })}
    </AntdBreadcrumb>
  );
};

type BreadcrumbItem =
  | {
      text: string;
      url: string;
    }
  | string;

Breadcrumb.defaultProps = {
  className: "mb-5"
};

export default Breadcrumb;
