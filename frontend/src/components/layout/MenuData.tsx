import { MenuItem } from "./MenuItems";
import {
  DashboardIcon,
  CustomerIcon,
  RequestIcon,
  NegotiationIcon,
  ScheduleIcon,
  RecruitmentIcon,
  ReviewIcon,
  NotificationIcon,
  SettingsIcon,
} from "./MenuIcons";

// 사이드바 메뉴 정의
export const menuItems: MenuItem[] = [
  {
    name: "대시보드",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    name: "고객 관리",
    path: "/admin/customers",
    icon: <CustomerIcon />,
    subMenus: [
      { name: "고객 목록", path: "/admin/customers" },
      { name: "활성 고객", path: "/admin/customers?status=active" },
      { name: "VIP 고객", path: "/admin/customers?grade=VIP" },
    ],
  },
  {
    name: "요청서 관리",
    path: "/admin/requests",
    icon: <RequestIcon />,
    subMenus: [
      { name: "전체 요청서", path: "/admin/requests" },
      { name: "진행 중", path: "/admin/requests/in-progress" },
      { name: "완료", path: "/admin/requests/completed" },
      { name: "취소", path: "/admin/requests/canceled" },
    ],
  },
  {
    name: "매칭/협상 관리",
    path: "/admin/negotiations",
    icon: <NegotiationIcon />,
    subMenus: [
      { name: "매칭 관리", path: "/admin/negotiations" },
      { name: "협상 진행", path: "/admin/negotiations/negotiations" },
      { name: "최종 견적서", path: "/admin/negotiations/final-quotes" },
    ],
  },
  {
    name: "스케줄/계약 관리",
    path: "/admin/schedules",
    icon: <ScheduleIcon />,
    subMenus: [
      { name: "스케줄 달력", path: "/admin/schedules" },
      { name: "계약 관리", path: "/admin/schedules/contracts" },
      { name: "리소스 관리", path: "/admin/schedules/resources" },
    ],
  },
  {
    name: "섭외 공고 관리",
    path: "/admin/recruitments",
    icon: <RecruitmentIcon />,
  },
  {
    name: "후기/리뷰 관리",
    path: "/admin/reviews",
    icon: <ReviewIcon />,
  },
  {
    name: "알림/로그 관리",
    path: "/admin/notifications",
    icon: <NotificationIcon />,
  },
  {
    name: "설정",
    path: "/admin/settings",
    icon: <SettingsIcon />,
    subMenus: [
      { name: "일반 설정", path: "/admin/settings" },
      { name: "사용자 관리", path: "/admin/settings/users" },
      { name: "권한 설정", path: "/admin/settings/roles" },
      { name: "알림 설정", path: "/admin/settings/notifications" },
      { name: "데이터 백업", path: "/admin/settings/backup" },
    ],
  },
];
