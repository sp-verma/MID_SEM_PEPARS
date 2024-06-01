import Item from "./Item";
import { BRANCHS, Developer, RESOURCES, } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-evenly gap-6 sm:px-8 px-5 py-16">
      <Item Links={Developer} title="Developer" />
      <Item Links={RESOURCES} title="LINKS" className=" text-bold" />
      <Item Links={BRANCHS} title="BRANCHS" className=" text-bold" />


    </div>
  );
};

export default ItemsContainer;
