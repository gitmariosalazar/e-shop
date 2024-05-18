interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 font-bold hover:bg-slate-700 hover:text-fuchsia-700 transition"
    >
      {children}
    </div>
  );
};

export default MenuItem;
