import "./header-block.styles.scss";
import {FC} from "react";

type CheckoutHeaderProps = {
  header: string;
}

const CheckoutHeader: FC<CheckoutHeaderProps> = ({ header }) => {
  return (
    <div className="header-block">
      <span>{header}</span>
    </div>
  );
};

export default CheckoutHeader;
