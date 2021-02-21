export const endpoints = {
  BaseUrl: "https://x0.tf",
  ApiBaseUrl: "https://api.x0.tf",
  StagingApiBaseUrl: "https://api.s.x0.tf",

  Info: "/v1/info",

  Namespaces: "/v1/namespaces",
  Namespace: "/v1/namespaces/%%namespace%%", // POST to register, DELETE to delete
  NamespaceResetToken: "/v1/namespaces/%%namespace%%/resetToken",
  NamespaceDeactivate: "/v1/namespaces/%%namespace%%/deactivate",
  NamespaceActivate: "/v1/namespaces/%%namespace%%/activate",
  NamespaceElements: "/v1/elements/%%namespace%%", // GET
  Element: "/v1/elements/%%namespace%%/%%key%%", // GET // DELETE to delete
  CreateElement: "/v1/elements/%%namespace%%/%%element%%/%%key%%",
  CreatePasteElement: "/v1/elements/%%namespace%%/paste/%%key%%",
  CreateRedirectElement: "/v1/elements/%%namespace%%/redirect/%%key%%",
};
