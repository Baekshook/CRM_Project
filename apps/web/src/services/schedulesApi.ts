import axios from "axios";
import { Schedule, Contract, Singer, Venue } from "@/types/scheduleTypes";

// 백엔드 서버 URL
const API_URL = "http://localhost:4000/api";

// 일정 관련 API 함수들

// 모든 일정 조회
export const getAllSchedules = async (): Promise<Schedule[]> => {
  try {
    const response = await axios.get(`${API_URL}/schedules`);
    return response.data;
  } catch (error) {
    console.error("일정 목록 조회 오류:", error);
    throw error;
  }
};

// 상태별 일정 조회
export const getSchedulesByStatus = async (
  status: string
): Promise<Schedule[]> => {
  try {
    const response = await axios.get(`${API_URL}/schedules`, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error("상태별 일정 조회 오류:", error);
    throw error;
  }
};

// 일정 상세 조회
export const getScheduleById = async (id: string): Promise<Schedule> => {
  try {
    const response = await axios.get(`${API_URL}/schedules/${id}`);
    return response.data;
  } catch (error) {
    console.error("일정 상세 조회 오류:", error);
    throw error;
  }
};

// 일정 생성
export const createSchedule = async (
  scheduleData: Partial<Schedule>
): Promise<Schedule> => {
  try {
    const response = await axios.post(`${API_URL}/schedules`, scheduleData);
    return response.data;
  } catch (error) {
    console.error("일정 생성 오류:", error);
    throw error;
  }
};

// 일정 수정
export const updateSchedule = async (
  id: string,
  scheduleData: Partial<Schedule>
): Promise<Schedule> => {
  try {
    const response = await axios.patch(
      `${API_URL}/schedules/${id}`,
      scheduleData
    );
    return response.data;
  } catch (error) {
    console.error("일정 수정 오류:", error);
    throw error;
  }
};

// 일정 삭제
export const deleteSchedule = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/schedules/${id}`);
  } catch (error) {
    console.error("일정 삭제 오류:", error);
    throw error;
  }
};

// 날짜별 일정 조회
export const getSchedulesByDate = async (
  year: number,
  month: number,
  day?: number
): Promise<Schedule[]> => {
  try {
    const params: any = { year, month };
    if (day) {
      params.day = day;
    }

    const response = await axios.get(`${API_URL}/schedules/date`, { params });
    return response.data;
  } catch (error) {
    console.error("날짜별 일정 조회 오류:", error);
    throw error;
  }
};

// ========== 계약 관련 API 함수들 ==========

// 모든 계약 조회
export const getAllContracts = async (): Promise<Contract[]> => {
  try {
    const response = await axios.get(`${API_URL}/contracts`);
    return response.data;
  } catch (error) {
    console.error("계약 목록 조회 오류:", error);
    throw error;
  }
};

// 상태별 계약 조회
export const getContractsByStatus = async (
  status: string
): Promise<Contract[]> => {
  try {
    const response = await axios.get(`${API_URL}/contracts`, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error("상태별 계약 조회 오류:", error);
    throw error;
  }
};

// 계약 상세 조회
export const getContractById = async (id: string): Promise<Contract> => {
  try {
    const response = await axios.get(`${API_URL}/contracts/${id}`);
    return response.data;
  } catch (error) {
    console.error("계약 상세 조회 오류:", error);
    throw error;
  }
};

// 계약 생성
export const createContract = async (
  contractData: Partial<Contract>
): Promise<Contract> => {
  try {
    const response = await axios.post(`${API_URL}/contracts`, contractData);
    return response.data;
  } catch (error) {
    console.error("계약 생성 오류:", error);
    throw error;
  }
};

// 계약 수정
export const updateContract = async (
  id: string,
  contractData: Partial<Contract>
): Promise<Contract> => {
  try {
    const response = await axios.patch(
      `${API_URL}/contracts/${id}`,
      contractData
    );
    return response.data;
  } catch (error) {
    console.error("계약 수정 오류:", error);
    throw error;
  }
};

// 계약 삭제
export const deleteContract = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/contracts/${id}`);
  } catch (error) {
    console.error("계약 삭제 오류:", error);
    throw error;
  }
};

// 계약서 서명
export const signContract = async (
  id: string,
  signatureData: any
): Promise<Contract> => {
  try {
    const response = await axios.post(
      `${API_URL}/contracts/${id}/sign`,
      signatureData
    );
    return response.data;
  } catch (error) {
    console.error("계약서 서명 오류:", error);
    throw error;
  }
};

// ========== 리소스 관련 API 함수들 ==========

// 모든 장소 리소스 조회
export const getAllVenues = async (): Promise<Venue[]> => {
  try {
    const response = await axios.get(`${API_URL}/venues`);
    return response.data;
  } catch (error) {
    console.error("장소 목록 조회 오류:", error);
    throw error;
  }
};

// 장소 상세 정보 조회
export const getVenueById = async (id: string): Promise<Venue> => {
  try {
    const response = await axios.get(`${API_URL}/venues/${id}`);
    return response.data;
  } catch (error) {
    console.error("장소 상세 조회 오류:", error);
    throw error;
  }
};

// 모든 가수 리소스 조회
export const getAllSingers = async (): Promise<Singer[]> => {
  try {
    const response = await axios.get(`${API_URL}/singers`);
    return response.data;
  } catch (error) {
    console.error("가수 목록 조회 오류:", error);
    throw error;
  }
};

// 가수 상세 정보 조회
export const getSingerById = async (id: string): Promise<Singer> => {
  try {
    const response = await axios.get(`${API_URL}/singers/${id}`);
    return response.data;
  } catch (error) {
    console.error("가수 상세 조회 오류:", error);
    throw error;
  }
};
