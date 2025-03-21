import myAxios from "@/request";

/**
 * 用户注册
 * @param params
 */
export const userRegister = async (params: never) => {
  return await myAxios.request({
    url: "/api/user/register",
    method: "POST",
    data: params,
  });
};

/**
 * 用户登录
 * @param params
 */
export const userLogin = async (params: never) => {
  return await myAxios.request({
    url: "/api/user/login",
    method: "POST",
    data: params,
  });
};
/**
 * 用户注销
 * @param params
 */
export const userLogout = async (params: never) => {
  return await myAxios.request({
    url: "/api/user/logout",
    method: "POST",
    data: params,
  });
};

/**
 * 获取当前用户
 */
export const getCurrentUser = async () => {
  return await myAxios.request({
    url: "/api/user/current",
    method: "GET",
  });
};

/**
 * 获取用户列表
 * @param username
 */
export const searchUsers = async (username: any) => {
  return await myAxios.request({
    url: "/api/user/search",
    method: "GET",
    params: {
      username,
    },
  });
};

/**
 * 删除用户
 * @param id
 */
export const deleteUser = async (id: string) => {
  return await myAxios.request({
    url: "/api/user/delete",
    method: "POST",
    data: id,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
