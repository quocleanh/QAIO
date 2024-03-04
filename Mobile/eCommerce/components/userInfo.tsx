// Date: 09/08/21
 interface User {
    _id: string;
    name: string;
    email: string;
    google_id: string;
    avatar: string;
    is_verified: boolean;
    role_id: number;
    language: string;
    created_time: number;
    updated_time: number;
  }

  interface LoginResponse {
    msg: string;
    msg_key: string;
    data: {
      user: User;
      token: string;
      refresh_token: string;
    };
  }