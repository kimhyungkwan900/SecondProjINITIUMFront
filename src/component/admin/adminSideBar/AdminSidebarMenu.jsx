import SidebarMenuItem from "./AdminSidebarMenuItem";

export default function AdminSidebarMenu({ menuList, filter }) {
  const filteredList = filter
    ? menuList
        .map(item => ({
          ...item,
          children: item.children
            ? item.children.filter(
                c => c.label.includes(filter)
              )
            : undefined,
        }))
        .filter(
          item =>
            item.label.includes(filter) ||
            (item.children && item.children.length > 0)
        )
    : menuList;

  return (
    <nav>
      {filteredList.map(item => (
        <SidebarMenuItem key={item.label} item={item} level={0} />
      ))}
    </nav>
  );
}
