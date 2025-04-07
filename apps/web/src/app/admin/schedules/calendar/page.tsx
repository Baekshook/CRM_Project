"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Schedule } from "@/types/scheduleTypes";
import { getSchedulesByDate } from "@/services/schedulesApi";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDaySchedules, setSelectedDaySchedules] = useState<Schedule[]>(
    []
  );

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSchedulesByDate(currentYear, currentMonth);
        setSchedules(data);
      } catch (err) {
        console.error("일정 목록 조회 오류:", err);
        setError("일정 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currentYear, currentMonth]);

  const getMonthDays = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (month: number) => {
    return new Date(0, month).toLocaleString("ko-KR", { month: "long" });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getSchedulesForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return schedules.filter((schedule) => {
      const scheduleDate = schedule.eventDate.includes("T")
        ? schedule.eventDate.split("T")[0]
        : schedule.eventDate;
      return scheduleDate === dateStr;
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "changed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "예정됨";
      case "in_progress":
        return "진행중";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소";
      case "changed":
        return "변경됨";
      default:
        return status;
    }
  };

  const isToday = (date: number) => {
    const today = new Date();
    return (
      today.getDate() === date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleScheduleClick = (scheduleId: string) => {
    router.push(`/admin/schedules/${scheduleId}`);
  };

  const handleDateCellClick = (date: number) => {
    const fullDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    // 날짜를 클릭하면 해당 날짜로 일정을 생성하는 폼으로 이동
    router.push(`/admin/schedules/new?date=${fullDate}`);
  };

  const renderCalendar = () => {
    const daysInMonth = getMonthDays(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDayOfMonth = getFirstDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const days = [];

    // 이전 달의 날짜들
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-32 border border-gray-200 p-2 bg-gray-50"
        ></div>
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const daySchedules = getSchedulesForDate(day);
      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-2 ${
            isToday(day) ? "bg-orange-50" : ""
          } hover:bg-gray-100 cursor-pointer`}
          onClick={() => handleDateCellClick(day)}
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-sm font-medium ${
                (firstDayOfMonth + day - 1) % 7 === 0
                  ? "text-red-500"
                  : (firstDayOfMonth + day - 1) % 7 === 6
                  ? "text-blue-500"
                  : ""
              }`}
            >
              {day}
            </span>
            {daySchedules.length > 0 && (
              <span className="text-xs bg-gray-700 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {daySchedules.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {daySchedules.slice(0, 2).map((schedule) => (
              <div
                key={schedule.id}
                className={`block text-xs p-1 rounded truncate ${getStatusBadgeClass(
                  schedule.status
                )}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleScheduleClick(schedule.id);
                }}
              >
                {schedule.eventTitle}
              </div>
            ))}
            {daySchedules.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{daySchedules.length - 2}개
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
            role="status"
          >
            <span className="sr-only">로딩중...</span>
          </div>
          <p className="mt-2 text-gray-600">일정을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️ 오류</div>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">일정 캘린더</h1>
          <p className="text-gray-600 mt-1">월별 일정을 확인하세요.</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/schedules/new"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            새 일정 등록
          </Link>
          <Link
            href="/admin/schedules"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            목록 보기
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          {/* 달력 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {currentDate.getFullYear()}년{" "}
              {getMonthName(currentDate.getMonth())}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-medium py-2 ${
                  index === 0
                    ? "text-red-500"
                    : index === 6
                    ? "text-blue-500"
                    : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 달력 그리드 */}
          <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
        </div>
      </div>
    </div>
  );
}
