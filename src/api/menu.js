const Menu = [
  { header: "欢迎" },
  {
    title: "任务看板",
    group: "apps",
    icon: "dashboard",
    name: "Dashboard"
  },
  { header: "工作台" },
  {
    title: "General",
    group: "forms",
    component: "forms",
    icon: "edit",
    items: [
      {
        name: "schedule",
        title: "计划排产",
        component: "components/schedule"
      },
      {
        name: "package",
        title: "包装计划",
        component: "components/package"
      }
    ]
  },
  { divider: true }
];
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
});

export default Menu;
