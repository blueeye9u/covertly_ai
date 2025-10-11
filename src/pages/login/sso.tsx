import React from "react";
import { useRouter } from "next/router";
import { useSocialAuthLogin } from "../../hooks/useSocialAuthLogin";
import withoutAuthentication from "../../components/hoc/withoutAuthentication";
import { decodeTokenHandler } from "../../utils/decodeTokenHandler";

const SSOLoginRedirect = () => {
  const { query }: any = useRouter();

  useSocialAuthLogin();

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">
          Logging you in with {query?.provider ? decodeTokenHandler(query.provider).charAt(0).toUpperCase() + decodeTokenHandler(query.provider).slice(1).toLowerCase() : "SSO"}...
        </h1>
        <svg
          className="mx-auto h-8 w-8 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-gray-600 mt-4">Please wait while we log you in...</p>
      </div>
    </div>
  );
};

export default withoutAuthentication(SSOLoginRedirect);
