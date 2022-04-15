import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <footer id="_footer" className="bg-bg-dark text-white sticky left-0">
        <div className="flex justify-center">
          <div className="flex-1 max-w-content" style={{ padding: "55px 8px 26px 8px" }}>
            <div className="flex justify-between mb-16 mobile:flex-col mobile:mb-5">
              <div className="mobile:ml-3 mobile:mb-5">Next.JS</div>

              <div className="flex-1 flex justify-around mobile:flex-col mobile:ml-5 max-w-sm">
                <div className="mobile:mb-5">
                  <Title text="More" />
                  <LinkText text="Home" url="/home" />
                  <LinkText text="About" url="/about" />
                  <LinkText text="Loyalty Program" url="loyalty-program" />
                  <LinkText text="Partner" url="partner" />
                  <LinkText text="News" url="news" />
                </div>

                <div className="mobile:mb-5">
                  <Title text="Support" />
                  <LinkText text="FAQ" url="/FAQ" />
                  <LinkText text="Terms & Conditions" url="/terms-conditions" />
                  <LinkText text="Privacy Policy" url="/privacy-policy" />
                  <LinkText text="How it works" url="/hows" />
                </div>

                <div className="mobile:mb-5">
                  <Title text="Categories" />
                  <LinkText text="Hottest Deals" url="/hottest-deals" />
                  <LinkText text="Last Calls" url="/last-calls" />
                  <LinkText text="Most Favorited" url="/most-favorited" />
                  <LinkText text="New Deals" url="/new-deals" />
                </div>
              </div>

              <div className="mobile:text-center">
                <div className="mb-4">Follow us on</div>
                <div className="flex mobile:justify-center">
                  <Button className="mx-1" type="link" icon={<FacebookFilled className="text-white" />} />
                  <Button className="mx-1" type="link" icon={<TwitterSquareFilled className="text-white" />} />
                  <Button className="mx-1" type="link" icon={<InstagramFilled className="text-white" />} />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mobile:flex-col">
              <div className="text-gray3 mobile:mb-5 mobile:text-center">
                Copyright © {moment().format("YYYY")} {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </div>

              <div className="flex mobile:mb-5 mobile:justify-center">
                <div className="mr-2">
                  <Image src="/assets/payment-visa.svg" width={51} height={32} />
                </div>
                <div className="mr-2">
                  <Image src="/assets/payment-mastercard.svg" width={51} height={32} />
                </div>
                <div className="mr-2">
                  <Image src="/assets/payment-fpx.svg" width={51} height={32} />
                </div>
                <div>
                  <Image src="/assets/payment-stripe.svg" width={51} height={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

const Title: React.FC<{ text: string }> = ({ text }) => {
  return <div className="mb-2">{text}</div>;
};

const LinkText: React.FC<{ text: string; url: string }> = ({ text, url }) => {
  return (
    <div className="mb-2">
      <Link href={url}>
        <span className="text-lg text-gray4 cursor-pointer">{text}</span>
      </Link>
    </div>
  );
};

export default Footer;
