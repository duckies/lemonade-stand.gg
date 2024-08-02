export const nullBodyResponses = new Set([101, 204, 205, 304]);

export const responseTypes = {
  json: "application/json",
  text: "text/plain",
  formData: "multipart/form-data",
  arrayBuffer: "*/*",
  blob: "*/*",
} as const;
