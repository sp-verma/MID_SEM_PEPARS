import Item from "./Item";
import { Developer, RESOURCES,  } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={Developer} title="Developer" />
      <Item Links={RESOURCES} title="RESOURCES" className=" text-bold" />
      
      
    </div>
  );
};

export default ItemsContainer;
