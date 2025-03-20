"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Customer } from "@/types/customer";

// 요청서 타입 정의
interface Request {
  id: string;
  customerId: string;
  customerName: string;
  customerCompany: string;
  eventType: string;
  eventDate: string;
  venue: string;
  budget: string;
  status: string;
  createdAt: string;
}

export default function RequestsPage() {
  const router = useRouter();
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 액션 상태
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  // 샘플 요청서 데이터
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "REQ-001",
      customerId: "CUST-001",
      customerName: "김민수",
      customerCompany: "(주)이벤트 플래닝",
      eventType: "웨딩",
      eventDate: "2024-06-15",
      venue: "웨딩홀 A",
      budget: "5000000",
      status: "pending",
      createdAt: "2024-03-20",
    },
    {
      id: "REQ-002",
      customerId: "CUST-002",
      customerName: "이지영",
      customerCompany: "웨딩 홀 A",
      eventType: "기업 행사",
      eventDate: "2024-07-01",
      venue: "컨퍼런스 센터",
      budget: "8000000",
      status: "in_progress",
      createdAt: "2024-03-19",
    },
  ]);

  // 필터링된 요청서 목록
  const filteredRequests = requests.filter((request) => {
    // 상태 필터
    if (statusFilter !== "all" && request.status !== statusFilter) {
      return false;
    }

    // 검색어 필터
    if (
      searchQuery &&
      !request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.customerCompany
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      !request.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // 상태에 따른 배지 색상
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "대기중";
      case "in_progress":
        return "진행중";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소";
      default:
        return status;
    }
  };

  // 요청서 상세 페이지로 이동
  const handleViewDetail = (id: string) => {
    router.push(`/admin/requests/${id}`);
  };

  // 요청서 수정
  const handleEdit = (id: string) => {
    router.push(`/admin/requests/${id}/edit`);
  };

  // 요청서 삭제
  const handleDelete = (id: string) => {
    if (confirm("정말로 이 요청서를 삭제하시겠습니까?")) {
      // 실제로는 API 호출이 필요하지만 현재는 샘플 데이터만 사용
      alert(`요청서 ${id}가 삭제되었습니다.`);
      // 실제 구현에서는 목록을 다시 불러오거나 상태 업데이트 필요
    }
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">견적 요청서 관리</h1>
          <p className="text-gray-600 mt-1">
            모든 견적 요청서를 확인하고 관리하세요.
          </p>
        </div>
        <Link
          href="/admin/requests/new"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          새 견적 요청
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                요청서 번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객 정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이벤트 유형
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이벤트 날짜
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                장소
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                예산
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                등록일
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {request.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {request.customerCompany}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.eventType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.eventDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.venue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Number(request.budget).toLocaleString()}원
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      request.status
                    )}`}
                  >
                    {getStatusText(request.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/requests/${request.id}`}
                    className="text-orange-600 hover:text-orange-900 mr-3"
                  >
                    상세
                  </Link>
                  <Link
                    href={`/admin/requests/${request.id}/edit`}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    수정
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
