import { useNavigate } from "react-router-dom";
import {
  DirBackgroundImage,
  DirectoryBody,
  DirectoryItemContainer,
} from "./directory-item.styles";
import { FC } from "react";
import { DirectoryCategory } from "../directory/directory.component";

type DirectoryItemProps = {
  category: DirectoryCategory
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category: { imageUrl, title, route } }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <DirBackgroundImage imageUrl={imageUrl} />
      <DirectoryBody>
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </DirectoryBody>
    </DirectoryItemContainer>
  );
};
export default DirectoryItem;
