export default function AdminSectionHeader({
  title,
  icon = "",
  iconClassName = "text-[26px] text-blue-600",
  titleClassName = "text-[26px] font-semibold",
  className = "mt-16",
  showDivider = true,
  actions = null,
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className={iconClassName}>{icon}</span>
        <span className={titleClassName}>{title}</span>
        {actions ? <div className="ml-auto">{actions}</div> : null}
      </div>
      {showDivider && <hr className="my-4 border-gray-200" />}
      <hr />
    </div>
  );
}