import api from './axios';

interface UserProfile {
  username: string;
  email: string;
  badWordCount: number;
}

interface UploadProfileResponse {
  profileImageUrl: string;
}

interface UpdateProfileData {
  username?: string;
  email?: string;
  [key: string]: any; // 추가 필드 허용
}

/**
 * 사용자 프로필 정보 가져오기
 */
const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/user/profile');
  return response.data;
};

/**
 * 사용자 비속어 사용 횟수 가져오기
 */
const postPenaltyCount = async (): Promise<number> => {
  const response = await api.post('/user/penaltyCount');
  return response.data;
};

// 비속어 전체 사용  횟수
const PenaltyCountAll = async (): Promise<number> => {
  try {
    const response = await api.get('/api/user/penalty/all');
    return response.data.count || 0;
  } catch (error) {
    console.error('전체 비속어 사용 횟수 조회 실패:', error);
    return 0;
  }
};
/**
 * 프로필 이미지 업로드
 */
const uploadProfileImage = async (file: File): Promise<UploadProfileResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/user/profile/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * 사용자 프로필 정보 업데이트
 */
const updateProfile = async (profileData: UpdateProfileData): Promise<UserProfile> => {
  const response = await api.put('/user/profile', profileData);
  return response.data;
};

/**
 * 회원 탈퇴 요청
 */
const withdrawUser = async (): Promise<void> => {
  await api.post('/user/withdrawal');
};

const userApi = {
  getProfile,
  postPenaltyCount,
  uploadProfileImage,
  updateProfile,
  withdrawUser,
  PenaltyCountAll
};

export default userApi;
