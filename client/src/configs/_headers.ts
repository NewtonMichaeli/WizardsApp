// Config file - request headers

// sending json
export const _headers = (token: string) => ({
  "Content-Type": "application/json",
  "auth-token": token
})
