
const SocialIcons = ({ Icons }) => {
  return (
    <div className="text-teal-500">
      {Icons.map((icon, index) => (
        <a
          href={icon.link}
          target="_blank"
          key={index}
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
          {icon.name}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
